import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, validateUser } from '../data/users';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
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

    const login = (username: string, password: string): boolean => {
        const validatedUser = validateUser(username, password);
        if (validatedUser) {
            setUser(validatedUser);
            // 비밀번호는 저장하지 않음
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
