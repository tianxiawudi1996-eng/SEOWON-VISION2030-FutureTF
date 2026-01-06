import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { authorizedUsers, User } from '../data/users';

export default function AdminPanel() {
    const router = useRouter();
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // 김무빈 팀장만 접근 가능
        if (!user || user.id !== 'kim-mu-bin') {
            router.push('/');
            return;
        }

        // 사용자 목록 로드
        setUsers(authorizedUsers);
    }, [user, router]);

    const handleResetPassword = (targetUser: User) => {
        setSelectedUser(targetUser);
        setNewPassword('');
    };

    const confirmPasswordReset = () => {
        if (!selectedUser || !newPassword) {
            alert('새 비밀번호를 입력하세요.');
            return;
        }

        // 실제로는 백엔드 API를 통해 처리해야 하지만,
        // 여기서는 localStorage에 변경 기록을 저장
        const passwordChanges = JSON.parse(localStorage.getItem('password_changes') || '{}');
        passwordChanges[selectedUser.id] = {
            newPassword: newPassword,
            changedBy: user?.name,
            changedAt: new Date().toISOString()
        };
        localStorage.setItem('password_changes', JSON.stringify(passwordChanges));

        alert(`${selectedUser.name}님의 비밀번호가 재설정되었습니다.\n새 비밀번호: ${newPassword}`);
        setSelectedUser(null);
        setNewPassword('');
    };

    if (!user || user.id !== 'kim-mu-bin') {
        return null;
    }

    return (
        <>
            <Head>
                <title>관리자 패널 | 서원토건 미래전략TF</title>
                <meta name="description" content="사용자 관리 및 비밀번호 재설정" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* 헤더 */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">관리자 패널</h1>
                        <p className="text-gray-400">사용자 계정 관리 및 비밀번호 재설정</p>
                    </div>

                    {/* 경고 메시지 */}
                    <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-200 px-6 py-4 rounded-lg mb-8">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="font-semibold">마스터 권한</span>
                        </div>
                        <p className="text-sm mt-2">
                            이 페이지는 팀장(김무빈)만 접근 가능합니다. 모든 사용자의 계정 정보를 확인하고 비밀번호를 재설정할 수 있습니다.
                        </p>
                    </div>

                    {/* 사용자 목록 */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
                        <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">전체 사용자 ({users.length}명)</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">이름</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">직책</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">아이디</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">현재 비밀번호</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">역할</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">작업</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-white">{u.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-300">{u.position}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-mono text-blue-400">{u.username}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-mono text-gray-300">
                                                        {showPassword ? u.password : '••••••••'}
                                                    </span>
                                                    <button
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="text-gray-400 hover:text-white"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            {showPassword ? (
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                            ) : (
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            )}
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${u.role === 'ceo' ? 'bg-purple-500/20 text-purple-300' :
                                                        u.role === 'executive' ? 'bg-indigo-500/20 text-indigo-300' :
                                                            u.role === 'leader' ? 'bg-blue-500/20 text-blue-300' :
                                                                'bg-gray-500/20 text-gray-300'
                                                    }`}>
                                                    {u.role === 'ceo' ? 'CEO' :
                                                        u.role === 'executive' ? '책임임원' :
                                                            u.role === 'leader' ? '리더' : '멤버'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleResetPassword(u)}
                                                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                                                >
                                                    비밀번호 재설정
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 비밀번호 재설정 모달 */}
                    {selectedUser && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/20">
                                <h3 className="text-xl font-bold text-white mb-4">비밀번호 재설정</h3>
                                <p className="text-gray-300 mb-4">
                                    <span className="font-semibold">{selectedUser.name}</span>님의 새 비밀번호를 입력하세요
                                </p>
                                <input
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="새 비밀번호"
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white mb-4"
                                />
                                <div className="flex space-x-3">
                                    <button
                                        onClick={confirmPasswordReset}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        확인
                                    </button>
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
