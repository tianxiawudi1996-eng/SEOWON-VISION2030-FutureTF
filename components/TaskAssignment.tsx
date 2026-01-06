import { useState, useEffect } from 'react';
import { tracksData, allMembers } from '../data/organization';
import { Task } from '../interfaces/Organization';
import { fetchRemoteTasks, syncTask, deleteRemoteTask } from '../lib/supabase';

export default function TaskAssignment() {
    const [directive, setDirective] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTrack, setSelectedTrack] = useState<string>('all');
    const [selectedMember, setSelectedMember] = useState<string>('');
    const [manualTask, setManualTask] = useState({
        title: '',
        description: '',
        priority: 'medium' as 'high' | 'medium' | 'low',
        dueDate: ''
    });

    // 데이터 로드 (Remote DB 우선)
    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            const remoteTasks = await fetchRemoteTasks();
            if (remoteTasks.length > 0) {
                setTasks(remoteTasks);
            } else {
                const savedTasks = localStorage.getItem('tf_tasks');
                if (savedTasks) {
                    try {
                        setTasks(JSON.parse(savedTasks));
                    } catch (e) {
                        console.error('Failed to parse saved tasks', e);
                    }
                }
            }

            const savedDirective = localStorage.getItem('tf_directive');
            if (savedDirective) {
                setDirective(savedDirective);
            }
            setIsLoading(false);
        };
        loadInitialData();
    }, []);

    // 지침 변경 시 로컬 저장
    useEffect(() => {
        localStorage.setItem('tf_directive', directive);
    }, [directive]);

    // AI 기반 자동 업무 할당
    const handleAutoAssign = async () => {
        if (!directive.trim()) return;

        setIsGenerating(true);

        // 시뮬레이션: 실제로는 AI API 호출
        setTimeout(async () => {
            const autoTasks: Task[] = [];
            const timestamp = Date.now();

            // 시공 트랙
            autoTasks.push({
                id: `task-${timestamp}-1`,
                title: '스마트 시공 기술 도입 계획 수립',
                description: '디지털 트윈 및 BIM 기반 시공 관리 시스템 도입 로드맵 작성',
                assignedTo: 'yoo-byung-ki',
                trackId: 'construction',
                status: 'pending',
                priority: 'high',
                dueDate: '2026-01-15',
                createdAt: new Date().toISOString()
            });

            // 원가 트랙
            autoTasks.push({
                id: `task-${timestamp}-2`,
                title: 'AI 기반 원가 절감 방안 분석',
                description: '프리캐스트 콘크리트 적용 시 원가 절감 효과 분석 및 보고서 작성',
                assignedTo: 'hwang-se-won',
                trackId: 'cost',
                status: 'pending',
                priority: 'high',
                dueDate: '2026-01-20',
                createdAt: new Date().toISOString()
            });

            // 안전 트랙
            autoTasks.push({
                id: `task-${timestamp}-3`,
                title: 'AI 안전 관리 시스템 도입 검토',
                description: '실시간 위험 예측 및 예방 시스템 벤치마킹 및 도입 방안 수립',
                assignedTo: 'lim-sung-yoon',
                trackId: 'safety',
                status: 'pending',
                priority: 'high',
                dueDate: '2026-01-18',
                createdAt: new Date().toISOString()
            });

            // DB에 순차적으로 저장
            for (const task of autoTasks) {
                await syncTask(task);
            }

            setTasks(prev => [...prev, ...autoTasks]);
            setIsGenerating(false);
        }, 2000);
    };

    // 수동 업무 추가
    const handleManualAssign = async () => {
        if (!manualTask.title || !selectedMember) return;

        const member = allMembers.find(m => m.id === selectedMember);
        if (!member) return;

        const newTask: Task = {
            id: `task-${Date.now()}`,
            title: manualTask.title,
            description: manualTask.description,
            assignedTo: selectedMember,
            trackId: member.track,
            status: 'pending',
            priority: manualTask.priority,
            dueDate: manualTask.dueDate,
            createdAt: new Date().toISOString()
        };

        const success = await syncTask(newTask);
        if (success) {
            setTasks(prev => [newTask, ...prev]);
            setManualTask({ title: '', description: '', priority: 'medium', dueDate: '' });
            setSelectedMember('');
        } else {
            alert('DB 동기화에 실패했습니다. 네트워크를 확인해주세요.');
        }
    };

    // 업무 상태 변경
    const updateTaskStatus = async (taskId: string, status: Task['status']) => {
        const taskToUpdate = tasks.find(t => t.id === taskId);
        if (!taskToUpdate) return;

        const updatedTask = { ...taskToUpdate, status };
        const success = await syncTask(updatedTask);

        if (success) {
            setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
        }
    };

    // 업무 삭제
    const deleteTask = async (taskId: string) => {
        const success = await deleteRemoteTask(taskId);
        if (success) {
            setTasks(tasks.filter(t => t.id !== taskId));
        }
    };

    const filteredTasks = selectedTrack === 'all'
        ? tasks
        : tasks.filter(task => task.trackId === selectedTrack);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500';
            case 'in-progress': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* 임원 지침 입력 & AI 자동 할당 */}
            <div className="card-glass p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">👔</span>
                    이강범 전무님 지침
                </h3>

                <textarea
                    value={directive}
                    onChange={(e) => setDirective(e.target.value)}
                    placeholder="이강범 전무님의 지침을 입력하세요. AI가 자동으로 각 트랙과 팀원에게 적합한 업무를 할당합니다..."
                    className="w-full h-32 bg-slate-800 text-white rounded-lg p-4 border border-white/10 focus:border-primary focus:outline-none resize-none"
                />

                <button
                    onClick={handleAutoAssign}
                    disabled={isGenerating || !directive.trim()}
                    className="mt-4 w-full py-3 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                    {isGenerating ? '🤖 AI 업무 할당 중...' : '🤖 AI 자동 업무 할당'}
                </button>
            </div>

            {/* 수동 업무 추가 */}
            <div className="card-glass p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">✍️</span>
                    수동 업무 할당
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">담당자 선택</label>
                        <select
                            value={selectedMember}
                            onChange={(e) => setSelectedMember(e.target.value)}
                            className="w-full bg-slate-800 text-white rounded-lg p-3 border border-white/10 focus:border-primary focus:outline-none"
                        >
                            <option value="">담당자를 선택하세요</option>
                            {tracksData.map(track => (
                                <optgroup key={track.id} label={track.name}>
                                    {track.members.map(member => (
                                        <option key={member.id} value={member.id}>
                                            {member.name} ({member.position})
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">업무 제목</label>
                        <input
                            type="text"
                            value={manualTask.title}
                            onChange={(e) => setManualTask({ ...manualTask, title: e.target.value })}
                            placeholder="업무 제목을 입력하세요"
                            className="w-full bg-slate-800 text-white rounded-lg p-3 border border-white/10"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">업무 내용</label>
                        <textarea
                            value={manualTask.description}
                            onChange={(e) => setManualTask({ ...manualTask, description: e.target.value })}
                            className="w-full h-24 bg-slate-800 text-white rounded-lg p-3 border border-white/10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">우선순위</label>
                            <select
                                value={manualTask.priority}
                                onChange={(e) => setManualTask({ ...manualTask, priority: e.target.value as any })}
                                className="w-full bg-slate-800 text-white rounded-lg p-3 border border-white/10"
                            >
                                <option value="low">낮음</option>
                                <option value="medium">중간</option>
                                <option value="high">높음</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">마감일</label>
                            <input
                                type="date"
                                value={manualTask.dueDate}
                                onChange={(e) => setManualTask({ ...manualTask, dueDate: e.target.value })}
                                className="w-full bg-slate-800 text-white rounded-lg p-3 border border-white/10"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleManualAssign}
                        disabled={!manualTask.title || !selectedMember}
                        className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-accent to-orange-600 text-white disabled:opacity-50"
                    >
                        업무 추가
                    </button>
                </div>
            </div>

            {/* 업무 목록 */}
            <div className="card-glass p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <span className="mr-2">📋</span>
                        업무 현황 ({isLoading ? '...' : filteredTasks.length})
                    </h3>
                    <select
                        value={selectedTrack}
                        onChange={(e) => setSelectedTrack(e.target.value)}
                        className="bg-slate-800 text-white rounded-lg px-4 py-2 border border-white/10"
                    >
                        <option value="all">전체 트랙</option>
                        {tracksData.map(track => (
                            <option key={track.id} value={track.id}>{track.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center py-10 text-gray-400 animate-pulse">데이터를 불러오는 중...</div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">할당된 업무가 없습니다</div>
                    ) : (
                        filteredTasks.map(task => {
                            const member = allMembers.find(m => m.id === task.assignedTo);
                            const track = tracksData.find(t => t.id === task.trackId);
                            return (
                                <div key={task.id} className="bg-white/5 p-5 rounded-lg border border-white/10 transition-all">
                                    <h4 className="text-lg font-bold text-white mb-2">{task.title}</h4>
                                    <p className="text-gray-300 text-sm mb-3">{task.description}</p>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="px-3 py-1 rounded-full text-white" style={{ backgroundColor: track?.color }}>{track?.name}</span>
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300">👤 {member?.name}</span>
                                        <span className={`px-3 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={task.status}
                                                onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
                                                className="bg-slate-800 text-white text-xs rounded px-2 py-1"
                                            >
                                                <option value="pending">대기</option>
                                                <option value="in-progress">진행중</option>
                                                <option value="completed">완료</option>
                                            </select>
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
                                        </div>
                                        <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-300 text-sm">🗑️ 삭제</button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
