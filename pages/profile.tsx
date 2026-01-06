import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { authorizedUsers } from '../data/users';

export default function Profile() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    if (!user) {
        router.push('/login');
        return null;
    }

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // 유효성 검사
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        if (newPassword.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        // 현재 비밀번호 확인 (localStorage에서)
        const savedUser = localStorage.getItem('seowon_tf_user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);

            // authorizedUsers에서 실제 기본 비밀번호 찾기
            const actualUser = authorizedUsers.find(u => u.id === userData.id);
            if (!actualUser) {
                setError('사용자 정보를 찾을 수 없습니다.');
                return;
            }

            // 비밀번호 변경 기록 확인
            const passwordChanges = JSON.parse(localStorage.getItem('password_changes') || '{}');
            const actualPassword = passwordChanges[userData.id]?.newPassword || actualUser.password;

            if (currentPassword !== actualPassword) {
                setError('현재 비밀번호가 일치하지 않습니다.');
                return;
            }

            // 비밀번호 변경 저장
            passwordChanges[userData.id] = {
                newPassword: newPassword,
                changedBy: user.name,
                changedAt: new Date().toISOString(),
                changedBySelf: true
            };
            localStorage.setItem('password_changes', JSON.stringify(passwordChanges));

            setMessage('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // 3초 후 로그아웃
            setTimeout(() => {
                logout();
                router.push('/login');
            }, 3000);
        }
    };

    return (
        <>
            <Head>
                <title>내 정보 | 서원토건 미래전략TF</title>
                <meta name="description" content="사용자 프로필 및 비밀번호 변경" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
                <div className="container mx-auto px-4 max-w-2xl">
                    {/* 헤더 */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">내 정보</h1>
                        <p className="text-gray-400">프로필 및 비밀번호 관리</p>
                    </div>

                    {/* 사용자 정보 카드 */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-6">
                        <h2 className="text-2xl font-bold text-white mb-6">프로필 정보</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">이름</span>
                                <span className="text-white font-semibold">{user.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">직책</span>
                                <span className="text-white font-semibold">{user.position}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">아이디</span>
                                <span className="text-blue-400 font-mono">{user.username}</span>
                            </div>
                            {user.track && (
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-white font-semibold">{user.track}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center py-3">
                                <span className="text-gray-400">역할</span>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${user.role === 'ceo' ? 'bg-purple-500/20 text-purple-300' :
                                    user.role === 'executive' ? 'bg-indigo-500/20 text-indigo-300' :
                                        user.role === 'leader' ? 'bg-blue-500/20 text-blue-300' :
                                            'bg-gray-500/20 text-gray-300'
                                    }`}>
                                    {user.role === 'ceo' ? 'CEO' :
                                        user.role === 'executive' ? '책임임원' :
                                            user.role === 'leader' ? '리더' : '멤버'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 비밀번호 변경 카드 */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">비밀번호 변경</h2>

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    현재 비밀번호
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="현재 비밀번호 입력"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    새 비밀번호
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="새 비밀번호 입력 (최소 6자)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    새 비밀번호 확인
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="새 비밀번호 재입력"
                                />
                            </div>

                            {/* 에러 메시지 */}
                            {error && (
                                <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {/* 성공 메시지 */}
                            {message && (
                                <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-sm">
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                            >
                                비밀번호 변경
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-xs text-gray-400">
                                💡 비밀번호를 변경하면 자동으로 로그아웃됩니다. 새 비밀번호로 다시 로그인해주세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
