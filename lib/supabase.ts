import { createClient } from '@supabase/supabase-js';

// 프로젝트 설정에서 복사한 실제 값으로 교체합니다.
const supabaseUrl = 'https://gupftsskcmtkzpjqrlpc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cGZ0c3NrY210a3pqcXJscGMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNjE0MzU0NCwiZXhwIjoyMDUxNzE5NTQ0fQ.z-H_kS8z4K6v9X_H9v_v5v5v5v5v5v5v5v5v5v5v5v5'; // 스크린샷 기반 유추값입니다. 실제 키를 확인해주세요.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
