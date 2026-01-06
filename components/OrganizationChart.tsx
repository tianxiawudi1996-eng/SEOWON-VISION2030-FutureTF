import { tracksData } from '../data/organization';
import { useDeviceMode } from '../contexts/DeviceModeContext';

export default function OrganizationChart() {
    const { isMobileMode } = useDeviceMode();
    return (
        <div className="card-glass p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">미래전략TF 원팀 맵</h3>

            {/* Mermaid-style hierarchy visualization */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-white/10">
                {/* 총괄 책임임원 */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-10 py-5 rounded-xl shadow-2xl border-2 border-purple-400">
                        <div className="text-white font-bold text-xl">이강범 전무</div>
                        <div className="text-purple-100 text-sm mt-1">총괄 책임임원</div>
                    </div>
                </div>

                {/* Connection line */}
                <div className="flex justify-center mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-purple-600 to-primary"></div>
                </div>

                {/* 팀장 */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-xl shadow-lg">
                        <div className="text-white font-bold text-lg">김무빈 팀장</div>
                    </div>
                </div>

                {/* Connection line */}
                <div className="flex justify-center mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent"></div>
                </div>

                {/* Tracks grid */}
                <div className={isMobileMode ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"}>
                    {tracksData.filter(t => t.id !== 'management').map((track) => (
                        <div key={track.id} className="relative">
                            {/* Track header */}
                            <div
                                className="rounded-t-xl p-4 font-bold text-white text-center shadow-lg"
                                style={{ backgroundColor: track.color }}
                            >
                                <span className="whitespace-nowrap">{track.name}</span>
                            </div>

                            {/* Members */}
                            <div className="bg-white/5 rounded-b-xl p-4 border-x border-b border-white/10">
                                <div className="space-y-3">
                                    {track.members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="bg-slate-800/50 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-300 border border-white/5"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-white font-semibold">{member.name}</div>
                                                    <div className="text-gray-400 text-sm">{member.position}</div>
                                                </div>
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: track.color }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="text-center text-sm text-gray-400 mb-4">총 {tracksData.length}개 트랙 • {tracksData.reduce((sum, track) => sum + track.members.length, 0)}명</div>
                </div>
            </div>
        </div>
    );
}
