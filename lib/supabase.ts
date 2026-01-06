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
