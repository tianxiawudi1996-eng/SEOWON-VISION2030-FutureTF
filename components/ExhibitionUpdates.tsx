
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
                                    박람회를 <span className="font-semibold">국내 · 국외</span>로 분리하고 건설·로봇·하이테크 중심 <span className="font-semibold">우선순위(1순위→)</span>로 재정렬
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
                                <span className="font-bold text-red-600 flex-shrink-0">[삭제]</span>
                                <span>
                                    <span className="font-semibold">iREX (일본):</span> 격년제로 2026년 미개최(다음 2027년 도쿄) 확인 → 목록에서 제외
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
