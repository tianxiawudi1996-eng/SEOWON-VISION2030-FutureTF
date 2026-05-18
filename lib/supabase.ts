import { createClient } from '@supabase/supabase-js';
import { Task } from '../interfaces/Organization';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// 환경변수 누락 시 명확한 경고 (브라우저 콘솔 + 서버 로그 모두)
export const isSupabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    supabaseUrl !== 'https://placeholder.supabase.co';

if (!isSupabaseConfigured) {
    const msg = '[Supabase] 환경변수 누락: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 가 설정되지 않았습니다. Vercel 환경변수를 확인하세요.';
    if (typeof window !== 'undefined') {
        console.error(msg);
    } else {
        console.warn(msg);
    }
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// 비밀번호 동기화를 위한 헬퍼 함수
export const syncPassword = async (userId: string, newPassword: string) => {
    try {
        const tableNames = ['password_changes'];
        let success = false;

        for (const tableName of tableNames) {
            const { error } = await supabase
                .from(tableName)
                .upsert({
                    user_id: userId,
                    new_password: newPassword,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });

            if (!error) {
                success = true;
                break;
            }
        }
        return success;
    } catch (e) {
        console.error('DB 동기화 치명적 실패:', e);
        return false;
    }
};

export const getRemotePassword = async (userId: string) => {
    try {
        const tableNames = ['password_changes'];
        for (const tableName of tableNames) {
            const { data, error } = await supabase
                .from(tableName)
                .select('new_password')
                .eq('user_id', userId)
                .maybeSingle();

            if (!error && data) {
                return data.new_password;
            }
        }
        return null;
    } catch (e) {
        console.error('DB 조회 실패:', e);
        return null;
    }
};

export const getAllRemotePasswords = async (): Promise<Record<string, { newPassword: string }>> => {
    try {
        const tableNames = ['password_changes'];
        for (const tableName of tableNames) {
            const { data, error } = await supabase
                .from(tableName)
                .select('user_id, new_password');

            if (!error && data) {
                type PasswordRow = { user_id: string; new_password: string };
                return (data as PasswordRow[]).reduce<Record<string, { newPassword: string }>>(
                    (map, item) => ({ ...map, [item.user_id]: { newPassword: item.new_password } }),
                    {}
                );
            }
        }
        return {};
    } catch (e) {
        return {};
    }
};

// --- 업무 (Task) 관련 함수 ---
export const syncTask = async (task: Task): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('tf_tasks')
            .upsert({
                id: task.id,
                user_id: task.assignedTo, // assignedTo -> user_id
                title: task.title,
                content: task.description, // description -> content
                priority: task.priority,
                status: task.status,
                track_id: task.trackId, // trackId -> track_id
                due_date: task.dueDate, // dueDate -> due_date
                created_at: task.createdAt
            }, { onConflict: 'id' });

        if (error) throw error;
        return true;
    } catch (e) {
        console.error('업무 동기화 실패:', e);
        return false;
    }
};

export const fetchRemoteTasks = async () => {
    try {
        const { data, error } = await supabase
            .from('tf_tasks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        type TaskRow = { id: string; user_id: string; title: string; content: string;
            priority: string; status: string; track_id: string; due_date?: string; created_at: string };
        return (data as TaskRow[]).map((t) => ({
            id: t.id,
            assignedTo: t.user_id,
            title: t.title,
            description: t.content,
            priority: t.priority as Task['priority'],
            status: t.status as Task['status'],
            trackId: t.track_id,
            dueDate: t.due_date,
            createdAt: t.created_at
        }));
    } catch (e) {
        console.error('업무 로드 실패:', e);
        return [];
    }
};

export const deleteRemoteTask = async (taskId: string) => {
    try {
        const { error } = await supabase.from('tf_tasks').delete().eq('id', taskId);
        return !error;
    } catch (e) {
        console.error('업무 삭제 실패:', e);
        return false;
    }
};

// --- 파일 저장 (Storage) 관련 함수 ---
// 실패 시 구체적 에러를 throw 하여 호출 측에서 사용자에게 표시 가능하게 함
export const uploadFile = async (file: File): Promise<string> => {
    if (!isSupabaseConfigured) {
        throw new Error('Supabase 환경변수가 설정되지 않았습니다. Vercel 설정을 확인하세요.');
    }

    // 파일명에 한글/공백 등이 있으면 Storage 경로 오류 가능 → 안전한 슬러그로 정규화
    const safeName = file.name
        .replace(/[^\w.\-]/g, '_')   // 영문/숫자/_/-/. 외 모두 _ 로 치환
        .replace(/_+/g, '_');         // 연속 _ 압축
    const fileName = `${Date.now()}_${safeName}`;

    const { error: uploadError } = await supabase.storage
        .from('tf_files')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) {
        // RLS / 버킷 미존재 / 권한 부족 등을 구분해 메시지 강화
        const raw = uploadError.message || String(uploadError);
        let hint = '';
        if (/row-level security|policy|permission|unauthorized/i.test(raw)) {
            hint = '\n\n[원인 추정] Supabase Storage 정책(RLS)이 anon 역할의 업로드를 차단하고 있습니다. tf_files 버킷의 INSERT 정책을 확인하세요.';
        } else if (/bucket.*not found|not_found/i.test(raw)) {
            hint = '\n\n[원인 추정] tf_files 버킷이 존재하지 않습니다. Supabase Storage에서 버킷을 생성하세요.';
        }
        throw new Error(`이미지 업로드 실패: ${raw}${hint}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from('tf_files')
        .getPublicUrl(fileName);

    if (!publicUrl) {
        throw new Error('이미지 업로드 후 공개 URL을 가져오지 못했습니다.');
    }

    return publicUrl;
};

// --- 연결 상태 확인 ---
export const testSupabaseConnection = async (): Promise<boolean> => {
    try {
        const { error } = await supabase.from('tf_strategic_plans').select('id').limit(1);
        return !error;
    } catch {
        return false;
    }
};

// --- 전략 계획 관련 함수 ---
export interface StrategicPlanData {
    id?: string;
    type: 'agenda' | 'plan' | 'execution' | 'approval' | 'departments' | 'activities';
    data: unknown;
    updated_at?: string;
    updated_by?: string;
}

export const saveStrategicPlan = async (planData: StrategicPlanData): Promise<{ ok: boolean; error?: string }> => {
    const key = `strategic_plan_${planData.type}`;
    localStorage.setItem(key, JSON.stringify({
        ...planData,
        updated_at: new Date().toISOString()
    }));

    try {
        const { error } = await supabase
            .from('tf_strategic_plans')
            .upsert({
                id: planData.type,
                type: planData.type,
                data: planData.data,
                updated_at: new Date().toISOString(),
                updated_by: planData.updated_by || 'unknown'
            }, { onConflict: 'id' });

        if (error) {
            console.error('DB 저장 실패:', error);
            const raw = error.message || String(error);
            let hint = '';
            if (/row-level security|policy|permission|unauthorized/i.test(raw)) {
                hint = '\n\n[원인 추정] tf_strategic_plans 테이블의 RLS 정책이 anon 역할의 INSERT/UPDATE를 차단하고 있습니다.';
            } else if (/relation.*does not exist|table.*not found/i.test(raw)) {
                hint = '\n\n[원인 추정] tf_strategic_plans 테이블이 존재하지 않습니다. Supabase에서 테이블을 생성하세요.';
            }
            return { ok: false, error: `${raw}${hint}` };
        }
        return { ok: true };
    } catch (e) {
        console.error('전략 계획 저장 실패:', e);
        const message = e instanceof Error ? e.message : '알 수 없는 오류';
        return { ok: false, error: message };
    }
};

export const fetchStrategicPlan = async (type: string): Promise<unknown> => {
    const key = `strategic_plan_${type}`;
    const localData = localStorage.getItem(key);

    try {
        const { data, error } = await supabase
            .from('tf_strategic_plans')
            .select('*')
            .eq('type', type)
            .maybeSingle();

        if (error || !data) {
            return localData ? JSON.parse(localData) : null;
        }
        return data;
    } catch (e) {
        return localData ? JSON.parse(localData) : null;
    }
};

export const fetchAllStrategicPlans = async (): Promise<Record<string, unknown>> => {
    const types = ['agenda', 'plan', 'execution', 'approval', 'departments'];
    const results = await Promise.all(types.map(type => fetchStrategicPlan(type)));
    return types.reduce<Record<string, unknown>>((acc, type, i) => {
        const data = results[i];
        if (data !== null && typeof data === 'object' && 'data' in data) {
            acc[type] = (data as { data: unknown }).data;
        }
        return acc;
    }, {});
};
