import { createClient } from '@supabase/supabase-js';

// 최신 키값 유지
const supabaseUrl = 'https://gupftsskcmtkzpjqrlpc.supabase.co';
const supabaseKey = 'sb_secret_0P25C2WXctsUmxxVLA6vkA_Q-0SX5tu';

export const supabase = createClient(supabaseUrl, supabaseKey);

// 비밀번호 동기화를 위한 헬퍼 함수
export const syncPassword = async (userId: string, newPassword: string) => {
    if (!supabase) return false;

    try {
        // password_changes와 password_ghanges(오타) 둘 다 시도
        const tableNames = ['password_changes', 'password_ghanges'];
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
                console.log(`DB 저장 성공 (${tableName}):`, userId);
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
    if (!supabase) return null;

    try {
        const tableNames = ['password_changes', 'password_ghanges'];
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

export const getAllRemotePasswords = async () => {
    if (!supabase) return {};

    try {
        const tableNames = ['password_changes', 'password_ghanges'];
        for (const tableName of tableNames) {
            const { data, error } = await supabase
                .from(tableName)
                .select('user_id, new_password');

            if (!error && data) {
                const map: Record<string, any> = {};
                data.forEach((item: any) => {
                    map[item.user_id] = { newPassword: item.new_password };
                });
                return map;
            }
        }
        return {};
    } catch (e) {
        return {};
    }
};

// --- 업무 (Task) 관련 함수 ---
export const syncTask = async (task: any) => {
    if (!supabase) return false;
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
    if (!supabase) return [];
    try {
        const { data, error } = await supabase
            .from('tf_tasks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data.map((t: any) => ({
            id: t.id,
            assignedTo: t.user_id,
            title: t.title,
            description: t.content,
            priority: t.priority,
            status: t.status,
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
    if (!supabase) return false;
    try {
        const { error } = await supabase.from('tf_tasks').delete().eq('id', taskId);
        return !error;
    } catch (e) {
        console.error('업무 삭제 실패:', e);
        return false;
    }
};

// --- 파일 저장 (Storage) 관련 함수 ---
export const uploadFile = async (file: File) => {
    if (!supabase) return null;
    try {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from('tf_files')
            .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('tf_files')
            .getPublicUrl(fileName);

        return publicUrl;
    } catch (e) {
        console.error('파일 업로드 실패:', e);
        return null;
    }
};

