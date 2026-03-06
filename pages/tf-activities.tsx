import { useState, useEffect } from 'react';
import Head from 'next/head';
import { tfActivities as initialActivities } from '../data/tfActivities';
import { useDeviceMode } from '../contexts/DeviceModeContext';
import { useAuth } from '../contexts/AuthContext';
import { TFActivity } from '../interfaces/TFActivity';

export default function TFActivities() {
    const { isMobileMode } = useDeviceMode();
    const { user, isAuthenticated } = useAuth();
    // 테스트 및 MVP 단계에서는 로컬에서 항상 수정을 허용하도록 설정 (또는 로그인한 경우에만 권한 체크)
    const isObserver = isAuthenticated ? user?.role === 'observer' : false;

    const [activities, setActivities] = useState<TFActivity[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [isEditing, setIsEditing] = useState(false);
    const [currentActivity, setCurrentActivity] = useState<Partial<TFActivity>>({});

    useEffect(() => {
        const saved = localStorage.getItem('tf_activities_v2'); // 버전 관리를 위해 키 변경
        if (saved) {
            setActivities(JSON.parse(saved));
        } else {
            setActivities(initialActivities);
        }
    }, []);

    useEffect(() => {
        if (activities.length > 0) {
            localStorage.setItem('tf_activities_v2', JSON.stringify(activities));
        }
    }, [activities]);

    const handleAdd = () => {
        setCurrentActivity({
            date: new Date().toISOString().split('T')[0],
            category: '회의 및 업무 협의',
            isMilestone: false,
            title: '',
            details: '',
            location: ''
        });
        setIsEditing(true);
    };

    const handleEdit = (activity: TFActivity) => {
        setCurrentActivity(activity);
        setIsEditing(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('이 활동 기록을 삭제하시겠습니까?')) {
            setActivities(activities.filter(a => a.id !== id));
        }
    };

    const handleSave = () => {
        const title = currentActivity.title?.trim();
        const date = currentActivity.date;

        if (!title || !date) {
            alert('날짜와 제목을 입력해주세요.');
            return;
        }

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeek = days[new Date(date).getDay()];

        if (currentActivity.id) {
            setActivities(activities.map(a => a.id === currentActivity.id
                ? { ...a, ...currentActivity, title, date, dayOfWeek } as TFActivity
                : a));
        } else {
            const newId = `tf-${Date.now()}`;
            setActivities([...activities, { ...currentActivity, id: newId, title, date, dayOfWeek } as TFActivity]);
        }
        setIsEditing(false);
        setCurrentActivity({});
    };

    const filteredActivities = filter === 'all'
        ? activities
        : activities.filter(a => a.category === filter);

    return (
        <div className="bg-white min-h-screen">
            <Head>
                <title>미래전략TF 활동기록 | 서원토건</title>
            </Head>

            {/* Header */}
            <section className="py-12 md:py-20 bg-gray-50 border-b border-gray-100">
                <div className="container-minimal text-center">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-600 mb-4 block">
                        Activity Log & Performance
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">
                        미래전략TF 활동 기록
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                        실질적인 성과 창출과 미래 비전 공유를 위해 TF팀의 모든 발자취를 투명하게 기록합니다.
                    </p>
                    {!isObserver && (
                        <button
                            onClick={handleAdd}
                            className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all text-sm shadow-lg hover:scale-105 active:scale-95"
                        >
                            + 새 활동 기록하기
                        </button>
                    )}
                </div>
            </section>

            {/* Filter */}
            <div className="container-minimal py-8 flex flex-wrap justify-center gap-2">
                {['all', '현장출장', '회의 및 업무 협의', '미래전략TF 기획'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border ${filter === cat
                                ? 'bg-black text-white border-black shadow-md'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                            }`}
                    >
                        {cat === 'all' ? '전체보기' : cat}
                    </button>
                ))}
            </div>

            {/* Timeline View */}
            <section className="py-12 container-minimal max-w-4xl">
                <div className="relative border-l-2 border-gray-100 ml-4 md:ml-0 md:left-1/2 md:translate-x-[-1px]">
                    {filteredActivities.sort((a, b) => b.date.localeCompare(a.date)).map((activity, index) => (
                        <div key={activity.id} className="mb-12 relative">
                            {/* Dot */}
                            <div className={`absolute left-[-9px] md:left-[-7px] top-0 w-4 h-4 rounded-full border-2 bg-white z-10 ${activity.isMilestone ? 'border-blue-600 h-5 w-5 left-[-11px] md:left-[-9px]' : 'border-gray-300'
                                }`}></div>

                            {/* Content Card */}
                            <div className={`ml-8 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto text-left' : 'md:ml-auto text-left md:pl-12'}`}>
                                <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all relative">
                                    {!isObserver && (
                                        <div className="absolute top-4 right-4 flex gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => handleEdit(activity)}
                                                className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-white rounded-xl border border-transparent hover:border-gray-100 transition-all"
                                                title="수정"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(activity.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-white rounded-xl border border-transparent hover:border-gray-100 transition-all"
                                                title="삭제"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2m3 3h.01" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                                            {activity.category}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {activity.date} ({activity.dayOfWeek})
                                        </span>
                                    </div>
                                    <h3 className={`text-lg font-bold text-black mb-2 ${activity.isMilestone ? 'text-blue-900 border-l-4 border-blue-600 pl-3' : ''}`}>
                                        {activity.title}
                                    </h3>
                                    {activity.details && (
                                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                            {activity.details}
                                        </p>
                                    )}
                                    {activity.location && (
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {activity.location}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <h2 className="text-xl font-bold text-black">활동 기록 편집</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-black">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-5 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">날짜</label>
                                    <input
                                        type="date"
                                        value={currentActivity.date}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, date: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">카테고리</label>
                                    <select
                                        value={currentActivity.category}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, category: e.target.value as any })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white transition-all appearance-none"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.2em 1.2em', backgroundRepeat: 'no-repeat' }}
                                    >
                                        <option value="현장출장">현장출장</option>
                                        <option value="회의 및 업무 협의">회의 및 업무 협의</option>
                                        <option value="미래전략TF 기획">미래전략TF 기획</option>
                                        <option value="기타 업무">기타 업무</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">활동 제목</label>
                                <input
                                    type="text"
                                    value={currentActivity.title || ''}
                                    onChange={(e) => setCurrentActivity({ ...currentActivity, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                                    placeholder="핵심 활동을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">상세 내용 (활동 항목)</label>
                                <textarea
                                    value={currentActivity.details || ''}
                                    onChange={(e) => setCurrentActivity({ ...currentActivity, details: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                                    rows={3}
                                    placeholder="항목별 상세 내용을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">장소 (Location)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={currentActivity.location || ''}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, location: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                                        placeholder="장소 정보를 입력하세요"
                                    />
                                    <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 py-1">
                                <input
                                    type="checkbox"
                                    id="milestone"
                                    checked={currentActivity.isMilestone}
                                    onChange={(e) => setCurrentActivity({ ...currentActivity, isMilestone: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <label htmlFor="milestone" className="text-sm font-bold text-gray-700 cursor-pointer">주요 마일스톤(성과)으로 설정</label>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex gap-3 shrink-0">
                            <button onClick={() => setIsEditing(false)} className="flex-1 px-4 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all">취소</button>
                            <button onClick={handleSave} className="flex-1 px-4 py-3.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">저장하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
