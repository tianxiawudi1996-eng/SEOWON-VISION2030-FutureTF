import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gupftsskcmtkzpjqrlpc.supabase.co';
const supabaseKey = 'sb_secret_0P25C2WXctsUmxxVLA6vkA_Q-0SX5tu'; // 보내주신 Secret Key 반영

export const supabase = createClient(supabaseUrl, supabaseKey);

// 비밀번호 동기화를 위한 헬퍼 함수
export const syncPassword = async (userId: string, newPassword: string) => {
    if (!supabase) {
        console.warn('Supabase DB가 연결되지 않았습니다. 로컬 저장소만 사용합니다.');
        return false;
    }

    try {
        const { error } = await supabase
            .from('password_changes')
            .upsert({
                user_id: userId,
                new_password: newPassword,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });

        if (error) throw error;
        return true;
    } catch (e) {
        console.error('DB 동기화 실패:', e);
        return false;
    }
};

export const getRemotePassword = async (userId: string) => {
    if (!supabase) return null;

    try {
        const { data, error } = await supabase
            .from('password_changes')
            .select('new_password')
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data?.new_password || null;
    } catch (e) {
        console.error('DB 조회 실패:', e);
        return null;
    }
};
