
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
                                <span className="font-bold text-blue-600 flex-shrink-0">[구성 개편]</span>
                                <span>
                                    <span className="font-semibold">해외(상단)</span>는 AI·로봇·건설·스마트안전·하이테크 박람회 전부, <span className="font-semibold">국내(하단)</span>는 핵심 Top 5로 구성
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-green-600 flex-shrink-0">[국내 1순위]</span>
                                <span>
                                    <span className="font-semibold text-green-700 underline decoration-double decoration-green-500">한국건설·안전박람회 2026:</span> 10월 14~16일, 킨텍스 제1전시장 (서원토건 핵심 참관)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-green-600 flex-shrink-0">[국외 1순위]</span>
                                <span>
                                    <span className="font-semibold text-green-700 underline decoration-double decoration-green-500">bauma CHINA 2026:</span> 11월 24~27일, 상하이 (전 세계 건설기계의 정점, 2년 주기)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-blue-600 flex-shrink-0">[신규 추가]</span>
                                <span>
                                    <span className="font-semibold">대한민국 안전산업박람회(K-Safety Expo):</span> 9월 2~4일, 부산 벡스코 (행정안전부 주최)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-blue-600 flex-shrink-0">[정정]</span>
                                <span>
                                    <span className="font-semibold">일본 로봇전:</span> iREX는 격년제로 2026 미개최(다음 2027 도쿄) → 2026 연말 일본 로봇전은 <span className="font-semibold">RoboDEX 나고야 (11/25~27)</span>로 편성
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-gray-600 flex-shrink-0">[종료 이동]</span>
                                <span>
                                    상반기(1~6월) 종료 박람회는 하단 <span className="font-semibold">VOID</span> 영역으로 이동
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
