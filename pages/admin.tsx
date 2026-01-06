import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { authorizedUsers, User } from '../data/users';
import { syncPassword } from '../lib/supabase';

export default function AdminPanel() {
    const router = useRouter();
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
    const [passwordChanges, setPasswordChanges] = useState<Record<string, any>>({});

    // 데이터 로드 함수
    const loadData = () => {
        if (typeof window !== 'undefined') {
            const changes = JSON.parse(localStorage.getItem('password_changes') || '{}');
            setPasswordChanges(changes);
            setUsers([...authorizedUsers]);
        }
    };

    useEffect(() => {
        // 김무빈 팀장만 접근 가능
        if (!user || user.id !== 'kim-mu-bin') {
            router.push('/');
            return;
        }

        loadData();

        // 저장소 변경 감지
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'password_changes') {
                loadData();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [user, router]);

    // 실제 표시할 비밀번호 계산
    const getDisplayPassword = (u: User) => {
        const changed = passwordChanges[u.id]?.newPassword;
        return changed || u.password;
    };

    // 개별 비밀번호 토글
    const toggleVisibility = (userId: string) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const handleResetPassword = (targetUser: User) => {
        setSelectedUser(targetUser);
        setNewPassword('');
    };

    const confirmPasswordReset = async () => {
        if (!selectedUser || !newPassword) {
            alert('새 비밀번호를 입력하세요.');
            return;
        }

        const currentChanges = JSON.parse(localStorage.getItem('password_changes') || '{}');
        const updatedChanges = { ...currentChanges };

        updatedChanges[selectedUser.id] = {
            newPassword: newPassword,
            changedBy: user?.name,
            changedAt: new Date().toISOString()
        };

        localStorage.setItem('password_changes', JSON.stringify(updatedChanges));

        // 원격 DB 동기화
        await syncPassword(selectedUser.id, newPassword);

        setPasswordChanges(updatedChanges);

        alert(`${selectedUser.name}님의 비밀번호가 [${newPassword}](으)로 재설정되었습니다.`);
        setSelectedUser(null);
        setNewPassword('');
    };

    if (!user || user.id !== 'kim-mu-bin') return null;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-12">
            <Head>
                <title>관리자 패널 | 서원토건</title>
            </Head>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">관리 시스템</h1>
                        <p className="text-slate-400">인가 사용자 13명 계정 관리</p>
                    </div>
                    <button
                        onClick={loadData}
                        className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700 flex items-center gap-2"
                    >
                        🔄 데이터 새로고침
                    </button>
                </div>

                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden backdrop-blur-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-800 border-b border-slate-700">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">이름</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">아이디</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">비밀번호</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">역할</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{u.name}</div>
                                        <div className="text-xs text-slate-500">{u.position}</div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-blue-400">{u.username}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-slate-300 min-w-[120px]">
                                                {visiblePasswords[u.id] ? getDisplayPassword(u) : '••••••••'}
                                            </span>
                                            <button
                                                onClick={() => toggleVisibility(u.id)}
                                                className="text-slate-500 hover:text-white transition-colors"
                                            >
                                                {visiblePasswords[u.id] ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${u.role === 'ceo' ? 'bg-purple-500/20 text-purple-400' :
                                            u.role === 'leader' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleResetPassword(u)}
                                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-red-500/20"
                                        >
                                            비밀번호 재설정
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 재설정 모달 */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 max-w-sm w-full shadow-2xl animate-scale-in">
                            <h3 className="text-xl font-bold mb-2">{selectedUser.name} - 비밀번호 변경</h3>
                            <p className="text-slate-400 text-sm mb-6">새로운 비밀번호를 입력해 주세요.</p>
                            <input
                                type="text"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="새 비밀번호"
                            />
                            <div className="flex gap-3">
                                <button onClick={confirmPasswordReset} className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-colors">변경 적용</button>
                                <button onClick={() => setSelectedUser(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition-colors">취소</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
