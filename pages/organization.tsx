import Head from 'next/head';
import { useState } from 'react';
import OrganizationChart from '../components/OrganizationChart';
import TaskAssignment from '../components/TaskAssignment';
import { tracksData } from '../data/organization';
import { useDeviceMode } from '../contexts/DeviceModeContext';

export default function Organization() {
    const { isMobileMode } = useDeviceMode();
    const [activeTab, setActiveTab] = useState<'org-chart' | 'tasks' | 'responsibilities'>('org-chart');

    return (
        <>
            <Head>
                <title>스마트 협업 | 미래전략TF</title>
                <meta name="description" content="미래전략TF 조직도 및 팀원 업무 관리" />
            </Head>

            <div className="bg-white">
                {/* Hero */}
                <section className="bg-gray-50 py-20 animate-fade-in">
                    <div className="container-minimal text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-black break-keep">
                            스마트 협업
                        </h1>
                        <p className="text-base md:text-xl text-gray-600 break-keep">
                            미래전략TF 조직 구조 및 업무 현황
                        </p>
                    </div>
                </section>

                {/* Tabs */}
                <section className="py-8 border-b border-gray-200">
                    <div className="container-minimal">
                        <div className={isMobileMode ? "flex flex-col justify-center space-y-2" : "flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4"}>
                            <button
                                onClick={() => setActiveTab('org-chart')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${activeTab === 'org-chart'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                원팀 맵
                            </button>
                            <button
                                onClick={() => setActiveTab('tasks')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${activeTab === 'tasks'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                업무 관리
                            </button>
                            <button
                                onClick={() => setActiveTab('responsibilities')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${activeTab === 'responsibilities'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                R&R
                            </button>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="section-spacing">
                    <div className="container-minimal">
                        {activeTab === 'org-chart' && (
                            <div className="animate-fade-in">
                                <OrganizationChart />
                            </div>
                        )}
                        {activeTab === 'tasks' && (
                            <div className="animate-fade-in">
                                <TaskAssignment />
                            </div>
                        )}
                        {activeTab === 'responsibilities' && (
                            <div className="animate-fade-in">
                                <div className="max-w-4xl mx-auto">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-black text-center md:text-left break-keep">역할 및 책임 (R&R)</h2>
                                    <div className={isMobileMode ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"}>
                                        {tracksData.map((track, index) => (
                                            <div key={index} className="card-minimal p-6 animate-scale-in">
                                                <h3 className="text-xl font-bold mb-4 text-black">{track.name}</h3>
                                                <ul className="space-y-2">
                                                    {track.members.map((member, idx) => (
                                                        <li key={idx} className="flex items-center text-gray-700">
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                                            <span className="font-medium">{member.name}</span>
                                                            <span className="ml-2 text-sm text-gray-500">({member.position})</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
