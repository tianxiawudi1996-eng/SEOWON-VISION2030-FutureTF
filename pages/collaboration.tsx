import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { initialProjects, researchAreas, Project } from '../data/collaboration';
import { useDeviceMode } from '../contexts/DeviceModeContext';

export default function Collaboration() {
    const { isMobileMode } = useDeviceMode();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

    useEffect(() => {
        const savedProjects = localStorage.getItem('skku-projects');
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        } else {
            setProjects(initialProjects);
        }
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
            localStorage.setItem('skku-projects', JSON.stringify(projects));
        }
    }, [projects]);

    const handleAddProject = () => {
        setCurrentProject({
            status: 'planning',
            progress: 0,
            researchers: ['박승희교수 연구팀']
        });
        setIsEditing(true);
    };

    const handleSaveProject = () => {
        if (!currentProject.title) return;

        if (currentProject.id) {
            setProjects(projects.map(p => p.id === currentProject.id ? { ...p, ...currentProject } as Project : p));
        } else {
            const newProject: Project = {
                ...currentProject,
                id: `proj-${Date.now()}`,
                startDate: currentProject.startDate || new Date().toISOString().split('T')[0],
                endDate: currentProject.endDate || new Date().toISOString().split('T')[0],
                researchers: currentProject.researchers || ['박승희교수 연구팀']
            } as Project;
            setProjects([...projects, newProject]);
        }
        setIsEditing(false);
        setCurrentProject({});
    };

    const handleDeleteProject = (id: string) => {
        if (window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleEditProject = (project: Project) => {
        setCurrentProject(project);
        setIsEditing(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-50 text-green-700 border-green-200';
            case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'planning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return '완료됨';
            case 'in-progress': return '진행중';
            case 'planning': return '계획중';
            default: return status;
        }
    };

    return (
        <>
            <Head>
                <title>산학협력 | 서원토건 x 성균관대학교</title>
                <meta name="description" content="성균관대학교 건설환경공학부 박승희 교수 연구팀과의 산학협력 현황입니다." />
            </Head>

            <div className="bg-white">
                {/* Hero Section with SKKU Logo */}
                <section className="section-spacing bg-white">
                    <div className="container-minimal max-w-4xl">
                        <div className="text-center mb-8">
                            <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">
                                SKKU Partnership
                            </span>
                        </div>

                        {/* Logo and Title */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-8">
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                                <img
                                    src="/images/skku_logo.jpg"
                                    alt="성균관대학교"
                                    className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                />
                                <div className="hidden md:block w-px h-20 bg-gray-300"></div>
                                <div>
                                    <h1 className="text-3xl md:text-5xl font-bold text-black mb-1 md:mb-2">
                                        산학협력 센터
                                    </h1>
                                    <p className="text-base md:text-lg text-gray-500 font-medium">
                                        Industry-Academia Collaboration
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 산학협력 상징 이미지 */}
                        <div className="relative w-full max-w-lg mx-auto mb-6 md:mb-8 rounded-xl overflow-hidden shadow-xl animate-fade-in-up">
                            <Image
                                src="/images/skku-collaboration.jpg"
                                alt="SKKU & SEOWON Collaboration"
                                width={1200}
                                height={675}
                                className="object-cover w-full h-auto"
                                priority
                            />
                        </div>

                        <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-normal md:leading-relaxed text-center max-w-4xl mx-auto px-4 tracking-tight drop-shadow-sm animate-fade-in py-2">
                            성균관대학교 건설환경공학부<br />
                            박승희 교수 연구팀과 함께<br />
                            건설 산업의 디지털 혁신과<br />
                            스마트 안전 기술을 선도합니다
                        </p>
                    </div>
                </section>

                {/* Research Areas */}
                <section className="section-spacing bg-gray-50">
                    <div className="container-minimal">
                        <h2 className="text-3xl font-bold text-black mb-12 text-center">연구 분야</h2>
                        <div className={isMobileMode ? "grid grid-cols-1 gap-6 max-w-6xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"}>
                            {researchAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-300"
                                >
                                    <div className="mb-4">
                                        <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                                            RESEARCH {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-3">{area.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{area.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="section-spacing bg-white">
                    <div className="container-minimal">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-black">진행 프로젝트</h2>
                                <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">현재 {projects.length}개의 프로젝트가 진행 중입니다</p>
                            </div>
                            <button
                                onClick={handleAddProject}
                                className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm md:text-base"
                            >
                                + 새 프로젝트
                            </button>
                        </div>

                        <div className={isMobileMode ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-black transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-black">{project.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                            {getStatusText(project.status)}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600">진행률</span>
                                            <span className="text-sm font-semibold text-black">{project.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-black h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Dates & Researchers */}
                                    <div className="border-t border-gray-200 pt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">기간</span>
                                            <span className="text-gray-700">{project.startDate} ~ {project.endDate}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">연구진</span>
                                            <span className="text-gray-700">{project.researchers.join(', ')}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-6">
                                        <button
                                            onClick={() => handleEditProject(project)}
                                            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-black transition-colors"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="flex-1 py-2 px-4 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-3xl font-bold mb-6 text-black">
                            {currentProject.id ? '프로젝트 수정' : '새 프로젝트 추가'}
                        </h2>

                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">프로젝트명</label>
                                <input
                                    type="text"
                                    value={currentProject.title || ''}
                                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                    placeholder="프로젝트 이름을 입력하세요"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                                <textarea
                                    value={currentProject.description || ''}
                                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                    rows={4}
                                    placeholder="프로젝트 설명을 입력하세요"
                                />
                            </div>

                            {/* Status & Progress */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                                    <select
                                        value={currentProject.status || 'planning'}
                                        onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value as any })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                    >
                                        <option value="planning">계획중</option>
                                        <option value="in-progress">진행중</option>
                                        <option value="completed">완료됨</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">진행률 (%)</label>
                                    <input
                                        type="number"
                                        value={currentProject.progress || 0}
                                        onChange={(e) => setCurrentProject({ ...currentProject, progress: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                                    <input
                                        type="date"
                                        value={currentProject.startDate || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, startDate: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                                    <input
                                        type="date"
                                        value={currentProject.endDate || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, endDate: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => { setIsEditing(false); setCurrentProject({}); }}
                                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleSaveProject}
                                    className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
