import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authorizedUsers } from '../data/users';
import { getRemotePassword } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // 페이지 로드 시 세션 복원
    useEffect(() => {
        const savedUser = localStorage.getItem('seowon_tf_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('seowon_tf_user');
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        // 1. 공통 검증 함수 호출 (중복 로직 제거)
        const { validateUser } = await import('../data/users');
        const validatedUser = await validateUser(username, password);

        if (validatedUser) {
            // 2. 로그인 성공 처리
            setUser(validatedUser);
            // 비밀번호 제외하고 저장
            const { password: _, ...userWithoutPassword } = validatedUser;
            localStorage.setItem('seowon_tf_user', JSON.stringify(userWithoutPassword));
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('seowon_tf_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
