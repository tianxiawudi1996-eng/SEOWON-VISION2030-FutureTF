import Head from 'next/head';
import ExhibitionCard from '../components/ExhibitionCard';
import ExhibitionDetailModal from '../components/ExhibitionDetailModal';
import ExhibitionUpdates from '../components/ExhibitionUpdates';
import { exhibitionsData } from '../data/exhibitions';
import { useState, useEffect } from 'react';
import { Exhibition } from '../interfaces/Exhibition';
import { useDeviceMode } from '../contexts/DeviceModeContext';

export default function Exhibitions() {
    const { isMobileMode } = useDeviceMode();
    const [filter, setFilter] = useState<string>('전체');
    const [countryFilter, setCountryFilter] = useState<string>('전체');
    const [seasonFilter, setSeasonFilter] = useState<'ALL' | 'H1' | 'H2'>('ALL');
    const [exhibitions, setExhibitions] = useState<Exhibition[]>(exhibitionsData);
    const [showRecommendPopup, setShowRecommendPopup] = useState(false);
    const [recommendedExhibition, setRecommendedExhibition] = useState<Exhibition | null>(null);
    const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showVoid, setShowVoid] = useState(false);

    const categories = ['전체', ...Array.from(new Set(exhibitions.map(ex => ex.category)))];
    const countries = ['전체', '한국', '미국', '독일', '중국', '일본'];

    useEffect(() => {
        setExhibitions(prev => [...prev].sort((a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        ));
    }, []);

    const filteredExhibitions = exhibitions.filter(ex => {
        const matchCategory = filter === '전체' || ex.category === filter;
        const matchCountry = countryFilter === '전체' || ex.country === countryFilter;
        const matchSeason = seasonFilter === 'ALL' || ex.season === seasonFilter;
        return matchCategory && matchCountry && matchSeason;
    });

    // 하반기 추천 (최상단)
    const h2RecommendedExhibitions = filteredExhibitions
        .filter(ex => ex.isRecommended === true && ex.season === 'H2' && !ex.isVoid)
        .sort((a, b) => (a.priority || 999) - (b.priority || 999));

    // 남은 상반기 추천 (VOID 제외)
    const h1RecommendedExhibitions = filteredExhibitions
        .filter(ex => ex.isRecommended === true && ex.season === 'H1' && !ex.isVoid)
        .sort((a, b) => (a.priority || 999) - (b.priority || 999));

    // 일반 (추천 아님, VOID 아님)
    const otherExhibitions = filteredExhibitions.filter(ex =>
        ex.isRecommended !== true && !ex.isVoid
    );

    // VOID (이미 지나간 박람회)
    const voidExhibitions = filteredExhibitions.filter(ex => ex.isVoid === true);

    return (
        <>
            <Head>
                <title>글로벌 박람회 | 서원토건</title>
                <meta name="description" content="2026년 글로벌 스마트건설 및 AI 로봇 박람회 정보" />
            </Head>

            <div className="bg-white">
                {/* Hero */}
                <section className="section-spacing bg-gray-50 animate-fade-in">
                    <div className="container-minimal text-center">
                        <h1 className="text-6xl font-bold mb-6 text-black">
                            글로벌 박람회
                        </h1>
                        <p className="text-xl text-gray-600">
                            2026년 스마트건설 & AI 로봇 박람회 일정
                        </p>
                    </div>
                </section>

                {/* Updates Notice */}
                <ExhibitionUpdates />

                {/* Filters */}
                <section className="py-12 border-y border-gray-200">
                    <div className="container-minimal">
                        <div className="flex flex-col gap-6">
                            {/* Season Filter */}
                            <div className="flex flex-wrap gap-3 items-center justify-center">
                                <span className="text-sm font-medium text-gray-500 mr-2">기간:</span>
                                <button
                                    onClick={() => setSeasonFilter('ALL')}
                                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${seasonFilter === 'ALL'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    전체
                                </button>
                                <button
                                    onClick={() => setSeasonFilter('H1')}
                                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${seasonFilter === 'H1'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                        }`}
                                >
                                    📅 상반기 (1-6월)
                                </button>
                                <button
                                    onClick={() => setSeasonFilter('H2')}
                                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${seasonFilter === 'H2'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                                        }`}
                                >
                                    📅 하반기 (7-12월)
                                </button>
                            </div>

                            {/* Category & Country Filters */}
                            {/* Category & Country Filters - Flattened for single line flow */}
                            <div className="flex flex-wrap items-center gap-2">
                                {/* 분야 필터 */}
                                <span className="text-sm font-medium text-gray-500 mr-2 whitespace-nowrap">분야:</span>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setFilter(category)}
                                        className={`filter-btn text-sm ${filter === category ? 'active' : ''}`}
                                    >
                                        {category}
                                    </button>
                                ))}

                                {/* 모바일/PC 간격 조정용 스페이서 */}
                                <span className="w-4 md:w-8 block"></span>

                                {/* 국가 필터 */}
                                <span className="text-sm font-medium text-gray-500 mr-2 whitespace-nowrap">국가:</span>
                                {countries.map((country) => (
                                    <button
                                        key={country}
                                        onClick={() => setCountryFilter(country)}
                                        className={`filter-btn text-sm ${countryFilter === country ? 'active' : ''}`}
                                    >
                                        {country}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ① 하반기 추천 (최상단) */}
                {seasonFilter !== 'H1' && h2RecommendedExhibitions.length > 0 && (
                    <section className="py-12 bg-gradient-to-br from-green-50 to-white animate-slide-up">
                        <div className="container-minimal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-bold">
                                    ⭐ 하반기 추천 일정 (7-12월)
                                </div>
                                <h2 className="text-2xl font-bold text-black">서원토건 우선순위</h2>
                            </div>
                            <div className={isMobileMode ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                                {h2RecommendedExhibitions.map((exhibition, index) => (
                                    <div key={exhibition.id} className="relative">
                                        <div className="absolute -top-3 -right-3 z-10 bg-green-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            {index === 0 ? '하반기 확정' : `하반기 ${index + 1}순위`}
                                        </div>
                                        <ExhibitionCard
                                            exhibition={exhibition}
                                            onDetailClick={(ex) => { setSelectedExhibition(ex); setShowDetailModal(true); }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ② 남은 상반기 추천 */}
                {seasonFilter !== 'H2' && h1RecommendedExhibitions.length > 0 && (
                    <section className="py-12 bg-gradient-to-br from-blue-50 to-white animate-slide-up">
                        <div className="container-minimal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">
                                    📅 남은 상반기 일정 (6월)
                                </div>
                                <h2 className="text-2xl font-bold text-black">서원토건 우선순위</h2>
                            </div>
                            <div className={isMobileMode ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                                {h1RecommendedExhibitions.map((exhibition, index) => (
                                    <div key={exhibition.id} className="relative">
                                        <div className="absolute -top-3 -right-3 z-10 bg-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            {index + 1}순위
                                        </div>
                                        <ExhibitionCard
                                            exhibition={exhibition}
                                            onDetailClick={(ex) => { setSelectedExhibition(ex); setShowDetailModal(true); }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ③ 기타 박람회 */}
                {otherExhibitions.length > 0 && (
                    <section className="section-spacing">
                        <div className="container-minimal">
                            <h2 className="text-3xl font-bold mb-6 text-black">글로벌 박람회</h2>
                            <div className={isMobileMode ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                                {otherExhibitions.map((exhibition, index) => (
                                    <div key={exhibition.id} className={`animate-scale-in stagger-${(index % 3) + 1}`}>
                                        <ExhibitionCard
                                            exhibition={exhibition}
                                            onDetailClick={(ex) => { setSelectedExhibition(ex); setShowDetailModal(true); }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ④ VOID — 이미 지나간 박람회 (기본 숨김) */}
                {voidExhibitions.length > 0 && (
                    <section className="py-8 bg-gray-50">
                        <div className="container-minimal">
                            <button
                                onClick={() => setShowVoid(prev => !prev)}
                                className="flex items-center gap-3 w-full text-left hover:opacity-70 transition-opacity"
                            >
                                <div className="px-4 py-2 bg-gray-400 text-white rounded-full text-sm font-bold">
                                    VOID — 종료된 박람회
                                </div>
                                <span className="text-sm text-gray-500">{voidExhibitions.length}개</span>
                                <span className="text-sm text-gray-400 ml-auto">{showVoid ? '▲ 접기' : '▼ 펼치기'}</span>
                            </button>
                            {showVoid && (
                                <div className={`mt-6 ${isMobileMode ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}`}>
                                    {voidExhibitions.map((exhibition) => (
                                        <div key={exhibition.id} className="relative opacity-50 grayscale">
                                            <div className="absolute top-3 left-3 z-10 bg-gray-700 text-white px-3 py-1 rounded text-xs font-bold tracking-widest">
                                                VOID
                                            </div>
                                            <ExhibitionCard
                                                exhibition={exhibition}
                                                onDetailClick={(ex) => { setSelectedExhibition(ex); setShowDetailModal(true); }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {filteredExhibitions.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">해당 조건의 박람회가 없습니다.</p>
                    </div>
                )}
            </div>

            {/* Recommendation Popup */}
            {showRecommendPopup && recommendedExhibition && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-scale-in shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">
                                ⭐ 상반기 최우선 추천 박람회
                            </div>
                            <h2 className="text-3xl font-bold text-black mb-2">
                                {recommendedExhibition.name}
                            </h2>
                            <p className="text-gray-600">
                                {recommendedExhibition.location}, {recommendedExhibition.country}
                            </p>
                        </div>

                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-700 leading-relaxed text-sm">
                                {recommendedExhibition.description}
                            </p>
                        </div>

                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-500 mb-2">개최 기간</p>
                            <p className="text-lg font-semibold text-black">
                                {new Date(recommendedExhibition.startDate).toLocaleDateString('ko-KR')} -
                                {new Date(recommendedExhibition.endDate).toLocaleDateString('ko-KR')}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {recommendedExhibition.website && (
                                <a
                                    href={recommendedExhibition.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 btn-minimal-primary text-center"
                                >
                                    웹사이트 방문
                                </a>
                            )}
                            <button
                                onClick={() => setShowRecommendPopup(false)}
                                className="flex-1 btn-minimal-secondary"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Exhibition Detail Modal */}
            <ExhibitionDetailModal
                exhibition={selectedExhibition}
                isOpen={showDetailModal}
                onClose={() => {
                    setShowDetailModal(false);
                    setSelectedExhibition(null);
                }}
            />
        </>
    );
}
