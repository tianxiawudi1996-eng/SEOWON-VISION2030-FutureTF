
import React from 'react';

export default function ExhibitionUpdates() {
    return (
        <section className="bg-yellow-50 border-b border-yellow-200 py-4 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="container-minimal">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">📢</span>
                    <div>
                        <h3 className="text-lg font-bold text-yellow-900 mb-2">
                            2026년 박람회 일정 주요 변경 사항
                        </h3>
                        <ul className="space-y-1 text-yellow-800 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-red-600">[취소]</span>
                                <span>
                                    <span className="font-semibold">World of Concrete (미국):</span> 1월 일정으로 참석 불가 (추천 제외)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-gray-600">[조정]</span>
                                <span>
                                    <span className="font-semibold">Canton Fair (중국):</span> 우선순위 하향 조정 (추천 리스트 제외)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-blue-600 flex-shrink-0">[우선순위 변경]</span>
                                <span>
                                    <span className="font-semibold">상반기 2순위:</span> <span className="underline decoration-wavy decoration-red-500">CIOSH 2026 (상하이)</span> - 4월 7일~9일 (순위 조정)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-gray-600 flex-shrink-0">[조정]</span>
                                <span>
                                    <span className="font-semibold">상반기 확정:</span> 광저우 통합 박람회 (CIHIE + WCME) - 맨 첫 번째 일정으로 확정 (5월 8일~10일)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-gray-600 flex-shrink-0">[조정]</span>
                                <span>
                                    <span className="font-semibold">4순위 변경:</span> DigitalBAU 2026 (뮌헨) - 일정상 참석 어려움으로 순위 하향
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-green-600 flex-shrink-0">[신규]</span>
                                <span>
                                    <span className="font-semibold">하반기 확정(최우선):</span> <span className="underline decoration-wavy decoration-emerald-500">CHTF 2026 (선전)</span> - 11월 15일~19일 (일정 확정)
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
