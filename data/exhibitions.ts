import { Exhibition } from '../interfaces/Exhibition';

// 2026년 날짜순 정렬 (빠른 일정 순)
export const exhibitionsData: Exhibition[] = [
    // ===== [국내 코엑스 박람회 - 서울 강남구] =====

    // [1순위] STK 2026 스마트테크코리아 (AI+빅데이터+로봇 통합)
    {
        id: 'stk-2026',
        name: 'STK 2026 (스마트테크코리아)',
        nameEn: 'Smart Tech Korea 2026',
        category: 'AI & 로봇',
        location: '코엑스 전관',
        country: '한국',
        startDate: '2026-06-10',
        endDate: '2026-06-12',
        description: '★★★★★ [국내 1순위] AI·빅데이터쇼, 로보테크쇼, AI팩토리엑스포, 시큐테크쇼 7개 전시 통합. 피지컬AI·협동로봇·산업지능화 총집결',
        website: 'https://smarttechkorea.com/',
        isRecommended: false,
        priority: 1,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '한국 최대 첨단기술 복합 전시회로, AI&빅데이터쇼·AI팩토리엑스포·로보테크쇼·디지털 유통·물류대전·시큐테크쇼·스마트테크쇼·대한민국 가상융합산업대전 7개 분야가 코엑스 전관에서 동시 개최됩니다. 글로벌 휴머노이드 로봇 총집결, 피지컬AI, 협동로봇, 산업지능화, AI 안전 시스템 등 서원토건 미래전략TF 핵심 관심사 전분야 커버.',
            keyHighlights: [
                '피지컬AI·휴머노이드 로봇 총집결 (로보테크쇼)',
                'AI 팩토리·스마트 제조 자동화 (AI팩토리엑스포)',
                '산업 AI 에이전트·LLM 비즈니스 적용 (AI&빅데이터쇼)',
                '디지털 보안·양자컴퓨팅·AI 거버넌스 (시큐테크쇼)',
                '물류 자동화·AGV/AMR 시스템 (디지털 유통·물류대전)'
            ],
            targetAudience: '스마트건설팀, AI기술팀, 안전관리팀, 자동화 담당자',
            expectedVisitors: '10만명+',
            exhibitorCount: '500개사+'
        }
    },

    // [2순위] AW 2026 스마트공장·자동화산업전
    {
        id: 'aw-2026',
        name: 'AW 2026 (스마트공장·자동화산업전)',
        nameEn: 'Automation World 2026',
        category: 'AI & 로봇',
        location: '코엑스 전관 (A·B·C·D홀)',
        country: '한국',
        startDate: '2026-03-04',
        endDate: '2026-03-06',
        description: '★★★★★ [국내 2순위] Physical AI·로보틱스·AI팩토리·자율제조 중심. 500개사 2,200부스 8만명 참관. 한국 최대 제조 AX 전시회',
        website: 'https://www.automationworld.co.kr/',
        isRecommended: true,
        priority: 2,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: 'Physical AI, 로보틱스, AI 팩토리, 자율제조를 중심으로 한 한국 최대 제조 자동화 전시회입니다. 스마트공장엑스포, 국제공장자동화전(aimex), 한국머신비전산업전, 스마트물류관, AI팩토리 특별관으로 구성되며, AI 제조 혁신 포럼·머신비전 기술 세미나 등 200여개 컨퍼런스 세션도 병행 개최.',
            keyHighlights: [
                'Physical AI·자율제조 최신 기술 (AI팩토리 특별관)',
                '산업용 로봇·협동로봇·AGV 종합 전시',
                '머신비전·AI 검사 시스템',
                '스마트 물류 자동화 솔루션',
                '산업지능화 컨퍼런스 200여개 세션'
            ],
            targetAudience: '스마트건설팀, 자동화 담당자, 제조혁신팀, 로봇 도입 검토팀',
            expectedVisitors: '8만명+',
            exhibitorCount: '500개사 / 2,200부스'
        }
    },

    // [3순위] AI EXPO KOREA 2026 국제인공지능대전
    {
        id: 'ai-expo-korea-2026',
        name: 'AI EXPO KOREA 2026 (국제인공지능대전)',
        nameEn: 'AI EXPO KOREA 2026',
        category: '첨단기술 & AI',
        location: '코엑스 A홀',
        country: '한국',
        startDate: '2026-05-06',
        endDate: '2026-05-08',
        description: '★★★★☆ [국내 3순위] 아시아 최대 AI 전시회. AI 에이전트·LLM·피지컬 AI 한자리. 350개사 600부스. 건설 AI 안전·스마트 현장 적용 사례 다수',
        website: 'https://www.aiexpo.co.kr/',
        isRecommended: true,
        priority: 3,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '아시아 최대 규모 인공지능 전문 전시회로 제9회를 맞이하여 역대 최대 규모로 개최되었습니다. 20개국 350개사 600부스 규모로, AI 에이전트, LLM, 피지컬 AI, 로보틱스 컴퓨팅, AI 비전 안전관리 등 건설·안전 분야 AI 적용 솔루션 다수 출품. 코리아AI협회 주최.',
            keyHighlights: [
                'AI 에이전트·LLM 기업 솔루션 총집결',
                '피지컬 AI·로보틱스 전용 컴퓨팅 기술',
                'AI 비전 기반 현장 안전관리 시스템',
                'AI 건설 적용 사례 컨퍼런스',
                '20개국 해외 AI 기업 참가'
            ],
            targetAudience: 'AI기술팀, 스마트건설 기획팀, 안전관리팀, 경영진',
            expectedVisitors: '5만명+',
            exhibitorCount: '350개사 / 600부스'
        }
    },

    // [4순위] 월드IT쇼 2026
    {
        id: 'wis-2026',
        name: '월드IT쇼 2026 (WIS 2026)',
        nameEn: 'World IT Show 2026',
        category: '첨단기술 & AI',
        location: '코엑스',
        country: '한국',
        startDate: '2026-04-22',
        endDate: '2026-04-24',
        description: '★★★★☆ [국내 4순위] 한국 최대 ICT 박람회. AI/AX·디지털트윈·메타버스·로보틱스·스마트리빙 전시. 삼성·LG 등 주요 기업 870㎡ 대형 홀 참가. 5만명+ 참관',
        website: 'https://www.worlditshow.co.kr/',
        isRecommended: true,
        priority: 4,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '과학기술정보통신부 주최 한국 최대 ICT 박람회. AI/AX, 디지털 트윈·메타버스, 스마트 리빙·헬스케어, 로보틱스, 인텔리전트 모빌리티, 블록체인·보안, 양자정보기술 7개 카테고리. 삼성·LG전자 각 870㎡ 대형 홀 참가. 건설 디지털트윈, 스마트 안전관리, 드론 모니터링 관련 기술 확인 가능.',
            keyHighlights: [
                'AI/AX 전환 기술 및 기업 솔루션',
                '디지털 트윈·메타버스 건설 적용 기술',
                '로보틱스·인텔리전트 모빌리티',
                '스마트 리빙·헬스케어',
                '삼성·LG전자 차세대 혁신 기술 공개'
            ],
            targetAudience: '디지털혁신팀, BIM 담당자, 스마트건설 기획팀, 경영진',
            expectedVisitors: '5만명+',
            exhibitorCount: '300개사+'
        }
    },

    // [5순위] AI Summit Seoul & Expo 2026
    {
        id: 'ai-summit-seoul-2026',
        name: 'AI Summit Seoul & Expo 2026',
        nameEn: 'AI Summit Seoul & Expo 2026',
        category: '첨단기술 & AI',
        location: '코엑스 그랜드볼룸 & B홀',
        country: '한국',
        startDate: '2026-08-19',
        endDate: '2026-08-21',
        description: '★★★★☆ 글로벌 AI 리더 총집결 컨퍼런스+EXPO. AI 에이전트·생성형AI·AI 거버넌스·산업 적용 사례. KITA·코엑스 공동주최',
        website: 'https://www.aisummit.co.kr/',
        isRecommended: true,
        priority: 5,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '글로벌 AI 리더 및 혁신 기업이 집결하는 AI 전문 컨퍼런스+전시회. 컨퍼런스(8/19-20) 및 EXPO(8/19-21)로 구성. AI 에이전트, 생성형 AI, AI 거버넌스, 산업 AI 적용 사례 등 최신 트렌드 파악. 코엑스·DMK글로벌·한국무역협회(KITA) 공동 주최.',
            keyHighlights: [
                'AI 에이전트·생성형AI 산업 적용 전략',
                'AI 거버넌스·보안·컴플라이언스',
                '건설·제조 분야 AI 혁신 사례',
                '글로벌 AI 기업 네트워킹',
                'KITA 글로벌 바이어 연계 기회'
            ],
            targetAudience: 'AI전략팀, 경영진, 스마트건설 기획팀, 디지털혁신팀',
            expectedVisitors: '3만명+',
            exhibitorCount: '200개사+'
        }
    },

    // [참고] 코리아빌드위크 2026 (스마트건설 특별전 NextCon 포함)
    {
        id: 'korea-build-week-coex-2026',
        name: '코리아빌드위크 2026 (코엑스)',
        nameEn: 'Korea Build Week COEX 2026',
        category: '스마트건설',
        location: '코엑스',
        country: '한국',
        startDate: '2026-08-05',
        endDate: '2026-08-08',
        description: '★★★☆☆ 대한민국 대표 건설·건축 전시. NextCon 2026 스마트건설 특별전 동시 개최. BIM·3D스캐닝·로보틱스·디지털 건설기술. K-스마트건설관 운영',
        website: 'https://koreabuild.co.kr/coex/',
        isRecommended: true,
        priority: 6,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '대한민국 최대 건설·건축·인테리어 종합 전시회. NextCon 2026(스마트건설 특별전)이 동시 개최되어 AI와 스마트건설 기술의 현장 적용 사례 전시 및 컨퍼런스 진행. BIM, 3D 스캐닝, 로보틱스, 디지털 트윈 등 혁신 디지털 건설 기술 집중 조명. K-스마트건설관 별도 운영.',
            keyHighlights: [
                'NextCon 2026 스마트건설 특별전 동시 개최',
                'BIM·3D스캐닝·디지털트윈 건설 적용',
                'K-스마트건설관 (국토교통부 지원)',
                '건설 로보틱스·자동화 기술 전시',
                'AI 건설 안전·현장관리 솔루션'
            ],
            targetAudience: '스마트건설팀, BIM 담당자, 현장소장, 안전관리팀',
            expectedVisitors: '7만명+',
            exhibitorCount: '600개사+'
        }
    },

    // [참고] AWS Summit Seoul 2026
    {
        id: 'aws-summit-seoul-2026',
        name: 'AWS Summit Seoul 2026',
        nameEn: 'AWS Summit Seoul 2026',
        category: '첨단기술 & AI',
        location: '코엑스 컨벤션센터',
        country: '한국',
        startDate: '2026-05-20',
        endDate: '2026-05-21',
        description: '★★★☆☆ AWS 클라우드·에이전틱AI 트렌드. Industry Day + AI Day 구성. 건설 데이터 클라우드·AI 인프라 동향 파악',
        website: 'https://aws.amazon.com/ko/events/summits/seoul/',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: 'Amazon Web Services 주최 클라우드·AI 컨퍼런스. Industry Day(제조·헬스케어·금융 등 9개 트랙) + AI Day(AI 에이전트·LLM·AI 인프라 등 9개 트랙) 구성. 에이전틱 AI(Agentic AI) 미래 비전 발표. 건설 데이터 클라우드 마이그레이션, AI 인프라 구축 전략 정보 수집 가능.',
            keyHighlights: [
                '에이전틱 AI(Agentic AI) 전략 세션',
                'Physical AI·제조 트랙 (Industry Day)',
                'AI 모델 개발·인프라·보안 세션 (AI Day)',
                '클라우드 기반 데이터 플랫폼 구축',
                '무료 참가 (사전 등록)'
            ],
            targetAudience: 'IT인프라팀, 클라우드담당자, AI기술팀',
            expectedVisitors: '3만명+',
            exhibitorCount: '200개사+'
        }
    },

    // [참고] 자율제조AI 월드쇼 2026 (AMWS 2026)
    {
        id: 'amws-2026',
        name: '자율제조AI 월드쇼 2026 (AMWS)',
        nameEn: 'Autonomous Manufacturing AI World Show 2026',
        category: 'AI & 로봇',
        location: '코엑스 그랜드볼룸',
        country: '한국',
        startDate: '2026-04-27',
        endDate: '2026-04-27',
        description: '★★★☆☆ 1일 집중형 자율제조 컨퍼런스+전시. Physical AI·디지털트윈·산업용 로봇 30개사. 제조/생산 담당자 3,000명 참관',
        website: 'https://www.amws.co.kr/',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '자율제조, AI, 로봇, 디지털트윈 최신 스마트제조 기술을 하루에 집중적으로 소개하는 컨퍼런스+전시 복합 행사. 하루 20여개 강좌, 국내외 선도 30여개 기업 참가. 제조·생산설비 담당자 3,000명+ 참관.',
            keyHighlights: [
                'Physical AI·디지털트윈 자율제조 기술',
                '산업용 로봇 현장 적용 사례',
                '스마트제조 솔루션 30개 선도 기업',
                '20여개 강좌 (하루 집중형)',
                '건설 시공 자동화 벤치마킹 기회'
            ],
            targetAudience: '제조혁신팀, 스마트건설 기획팀, 자동화 담당자',
            expectedVisitors: '3,000명+',
            exhibitorCount: '30개사'
        }
    },

    // ===== [국내 킨텍스 박람회 - 경기도 고양시] =====

    // [킨텍스 1순위] 한국건설·안전박람회 2026
    {
        id: 'k-consafety-expo-2026',
        name: '한국건설·안전박람회 2026',
        nameEn: 'Korea Construction & Safety Expo 2026',
        category: '스마트건설',
        location: '킨텍스 (KINTEX) 2전시장',
        country: '한국',
        startDate: '2026-10-14',
        endDate: '2026-10-16',
        description: '★★★★★ 국내 최대 건설·안전 전문 박람회. AI 기반 스마트안전, 건설로봇, 스마트현장, 안전관리 솔루션 총집결. 서원토건 핵심 참관 대상',
        website: 'https://www.k-consafetyexpo.com/',
        isRecommended: true,
        priority: 1,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '국내 최대 건설·안전 분야 전문 전시회. AI 기반 스마트 안전관리, 건설 로봇·자동화, 스마트 현장관리, 안전 ICT 솔루션, 드론 모니터링, 웨어러블 안전장비 등 서원토건 미래전략TF 핵심 관심 분야를 총망라. 국토교통부·고용노동부 후원.',
            keyHighlights: [
                'AI 기반 스마트 안전관리 시스템',
                '건설 로봇·자동화 장비 전시',
                '드론·UAM 현장 모니터링 기술',
                '웨어러블 안전장비·IoT 센서',
                '스마트 건설현장 관리 솔루션'
            ],
            targetAudience: '스마트건설팀, 안전관리팀, 현장소장, 경영진',
            expectedVisitors: '5만명+',
            exhibitorCount: '400개사+'
        }
    },

    // [킨텍스 2순위] KISS 2026 국제안전보건전시회
    {
        id: 'kiss-2026',
        name: 'KISS 2026 (국제안전보건전시회)',
        nameEn: 'Korea International Safety & Health Show 2026',
        category: '안전 & 스마트건설',
        location: '킨텍스 (KINTEX) 제2전시장',
        country: '한국',
        startDate: '2026-07-06',
        endDate: '2026-07-09',
        description: '★★★★☆ 아시아 최대 산업안전보건 전시회. AI 안전, IoT 센서, 드론 모니터링, 스마트 안전장비. 건설현장 안전관리 솔루션 핵심 행사',
        website: 'https://www.safetyshow.co.kr/',
        isRecommended: true,
        priority: 4,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '아시아 최대 규모 산업안전보건 전문 전시회. AI 스마트 안전관리, IoT 센서 네트워크, 드론 현장 모니터링, 웨어러블 안전장비, 유해물질 감지 솔루션 등 건설현장 안전관리에 직접 적용 가능한 기술 집결. 안전보건공단(KOSHA) 주최.',
            keyHighlights: [
                'AI 스마트 안전관리 시스템 (건설 적용)',
                'IoT 기반 위험감지 센서 솔루션',
                '드론 현장 안전 모니터링',
                '웨어러블 안전장비·보호구',
                '산업안전 법규·규정 컨퍼런스'
            ],
            targetAudience: '안전관리팀, 현장소장, 스마트건설 기획팀',
            expectedVisitors: '6만명+',
            exhibitorCount: '500개사+'
        }
    },

    // [킨텍스 2순위-b] 스마트건설·안전·AI 엑스포 2026
    {
        id: 'smart-con-safety-ai-2026',
        name: '스마트건설·안전·AI 엑스포 2026',
        nameEn: 'Smart Construction Safety AI Expo 2026',
        category: '스마트건설',
        location: '킨텍스 (KINTEX)',
        country: '한국',
        startDate: '2026-11-18',
        endDate: '2026-11-20',
        description: '★★★★☆ 건설·안전·AI 특화 전시. 스마트건설 AI 솔루션, 건설로봇, 안전관리 ICT 집중 전시. 서원토건 직결 행사',
        website: 'https://smartconexpo.com/',
        isRecommended: true,
        priority: 3,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '건설, 안전, AI 세 분야를 통합하여 다루는 국내 유일 특화 전시회. AI 기반 건설현장 안전관리, 건설 로봇·드론, BIM·디지털트윈, 스마트 안전장비 등 서원토건 미래전략TF 핵심 관심사 직결.',
            keyHighlights: [
                'AI 건설현장 안전관리 솔루션',
                '건설 자동화 로봇·드론 기술',
                'BIM·디지털트윈 현장 적용',
                '스마트 안전 ICT 장비',
                '건설 AI 도입 컨퍼런스'
            ],
            targetAudience: '스마트건설팀, 안전관리팀, 현장소장, 경영진',
            expectedVisitors: '3만명+',
            exhibitorCount: '200개사+'
        }
    },

    // [킨텍스 3순위] 로보월드 2026
    {
        id: 'robotworld-2026',
        name: '로보월드 2026 (국제로봇산업대전)',
        nameEn: 'Robot World 2026',
        category: 'AI & 로봇',
        location: '킨텍스 (KINTEX) 1전시장',
        country: '한국',
        startDate: '2026-11-04',
        endDate: '2026-11-07',
        description: '★★★★☆ 아시아 최대 로봇 전시회. 협동로봇·건설로봇·서비스로봇·드론·AI 로봇. 500개사 2,000부스. 건설 로봇 기술 파악 필수 행사',
        website: 'https://www.robotworld.or.kr/',
        isRecommended: true,
        priority: 2,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '아시아 최대 로봇 산업 전시회. 산업용 로봇, 협동로봇, 서비스 로봇, 건설 로봇, 드론, AI 로봇 등 전 분야 망라. 건설 현장 자동화·로봇 도입 검토를 위한 핵심 참관 행사. 한국로봇산업협회 주최.',
            keyHighlights: [
                '건설·인프라 특화 로봇 전시관',
                '협동로봇·AMR·AGV 현장 실연',
                '드론·UAM 기술 전시',
                'AI 로봇·휴머노이드 기술',
                '로봇 도입 비용·ROI 컨퍼런스'
            ],
            targetAudience: '스마트건설팀, 자동화 담당자, 현장소장',
            expectedVisitors: '15만명+',
            exhibitorCount: '500개사 / 2,000부스'
        }
    },

    // [킨텍스 3순위-b] 드론·UAM 박람회 2026
    {
        id: 'goyang-drone-uam-2026',
        name: '드론·UAM 박람회 2026 (고양)',
        nameEn: 'Korea Drone & UAM Expo 2026',
        category: 'AI & 로봇',
        location: '킨텍스 (KINTEX)',
        country: '한국',
        startDate: '2026-11-04',
        endDate: '2026-11-06',
        description: '★★★☆☆ 국내 최대 드론·UAM 특화 전시. 건설현장 드론 모니터링·측량·안전점검 기술. 드론 실비행 시연장 운영',
        website: 'https://www.goyangdue.kr/',
        isRecommended: true,
        priority: 8,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '드론과 도심항공교통(UAM)에 특화된 국내 최대 전문 전시회. 건설현장 드론 측량·모니터링, AI 기반 드론 안전점검, 자율비행 드론 솔루션 등 현장 적용 기술 중심. 실내외 드론 비행 시연장 별도 운영.',
            keyHighlights: [
                '건설현장 드론 측량·모니터링 기술',
                'AI 기반 드론 안전점검 솔루션',
                '자율비행 드론 현장 실연',
                'UAM 인프라·법규 컨퍼런스',
                '드론 서비스 기업 B2B 상담'
            ],
            targetAudience: '스마트건설팀, 안전관리팀, 현장소장',
            expectedVisitors: '5만명+',
            exhibitorCount: '300개사+'
        }
    },

    // [킨텍스 3순위-c] 월드 시티테크 엑스포 2026
    {
        id: 'citytech-2026',
        name: '월드 시티테크 엑스포 2026',
        nameEn: 'World CityTech Expo 2026',
        category: '스마트건설',
        location: '킨텍스 (KINTEX)',
        country: '한국',
        startDate: '2026-09-23',
        endDate: '2026-09-25',
        description: '★★★☆☆ 스마트시티·도시재생·건설기술 통합 전시. 디지털트윈 도시, 스마트 인프라, 건설 ICT. 국토교통부 주관',
        website: 'https://worldcitytechexpo.com/',
        isRecommended: true,
        priority: 9,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '스마트시티, 도시재생, 미래 건설기술을 통합 전시하는 행사. 디지털트윈 도시계획, 스마트 인프라 관리, 건설 ICT 융합기술, AI 도시안전 시스템 등 도시·인프라 분야 혁신기술 집중. 국토교통부 주관으로 정부 정책 방향 파악에 유리.',
            keyHighlights: [
                '디지털트윈 스마트시티 구현 기술',
                '스마트 인프라·교통 관리 시스템',
                'AI 기반 도시안전·재난대응',
                '건설 ICT·BIM 정책 방향',
                '국토교통부 정책 세션 참가'
            ],
            targetAudience: '스마트건설팀, BIM 담당자, 경영진',
            expectedVisitors: '4만명+',
            exhibitorCount: '300개사+'
        }
    },

    // [부산 벡스코] 대한민국 안전산업박람회 2026 (K-Safety Expo)
    {
        id: 'k-safety-expo-2026',
        name: '2026 대한민국 안전산업박람회 (K-Safety Expo)',
        nameEn: 'K-Safety Expo 2026',
        category: '안전 & 스마트건설',
        location: '부산 벡스코 (BEXCO) 제1전시장',
        country: '한국',
        startDate: '2026-09-02',
        endDate: '2026-09-04',
        description: '★★★★☆ 국내 최대 재난·산업안전 종합 박람회. AI 재난안전, 산업안전, 스마트 안전관리 솔루션 집결. 행정안전부 주최',
        website: 'https://k-safetyexpo.kr/',
        isRecommended: true,
        priority: 7,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '행정안전부가 주최하는 국내 최대 규모의 재난·산업안전 종합 박람회입니다. 침수·산사태·지진 등 자연재난, 생활안전, 산업안전, 화재, 교통·해양안전 등 재난안전 전 분야를 아우르며, AI 기반 재난 예측·스마트 안전관리 솔루션이 집중 전시됩니다.',
            keyHighlights: [
                'AI 기반 재난 예측·대응 시스템',
                '건설현장 산업안전 ICT 솔루션',
                '스마트 안전장비·웨어러블 기기',
                '해외바이어 수출상담회·구매상담회'
            ],
            targetAudience: '안전관리팀, 현장소장, 스마트건설 기획팀, 경영진',
            expectedVisitors: '3만명+',
            exhibitorCount: '300개사+'
        }
    },

    // [킨텍스 - VOID] 스마트건설안전산업전 2026 (종료)
    {
        id: 'smart-con-safety-korea-2026',
        name: '스마트건설안전산업전 2026',
        nameEn: 'Smart Construction Safety Industry Exhibition 2026',
        category: '스마트건설',
        location: '킨텍스 (KINTEX)',
        country: '한국',
        startDate: '2026-02-04',
        endDate: '2026-02-07',
        description: '건설 스마트안전·AI 건설기술 전문 전시회. AI 안전관리, 스마트건설 솔루션 집중 전시. (종료)',
        website: 'https://www.smartconsafety.co.kr/',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
    },

    // [킨텍스 - VOID] 코리아빌드위크 킨텍스 2026 (종료)
    {
        id: 'korea-build-week-kintex-2026',
        name: '코리아빌드위크 2026 (킨텍스)',
        nameEn: 'Korea Build Week KINTEX 2026',
        category: '스마트건설',
        location: '킨텍스 (KINTEX)',
        country: '한국',
        startDate: '2026-02-04',
        endDate: '2026-02-07',
        description: '건설·건축·인테리어 종합 전시. 스마트건설 기술, 건자재, 건설장비 집중 전시. (종료)',
        website: 'https://koreabuild.co.kr/kintex/',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
    },

    // [킨텍스 - VOID] SIMTOS 2026 서울국제생산제조기술전 (종료)
    {
        id: 'simtos-2026',
        name: 'SIMTOS 2026 (서울국제생산제조기술전)',
        nameEn: 'Seoul International Manufacturing Technology Show 2026',
        category: 'AI & 로봇',
        location: '킨텍스 (KINTEX) 전관',
        country: '한국',
        startDate: '2026-04-13',
        endDate: '2026-04-17',
        description: '아시아 3대 제조기술 전시회. CNC·로봇·자동화·스마트팩토리. 2,000개사 6,000부스. (종료)',
        website: 'https://www.simtos.or.kr/',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
    },

    // [킨텍스 - VOID] SECON 2026 세계보안엑스포 (종료)
    {
        id: 'secon-2026',
        name: 'SECON 2026 (세계보안엑스포)',
        nameEn: 'SECON 2026 (World Security Expo)',
        category: '안전 & 스마트건설',
        location: '킨텍스 (KINTEX) 1전시장',
        country: '한국',
        startDate: '2026-03-18',
        endDate: '2026-03-20',
        description: '아시아 최대 보안·AI 안전 전시회. 영상분석 AI, 스마트 안전관리, 출입통제 시스템. (종료)',
        website: 'https://www.seconexpo.com/',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
    },

    // ===== [글로벌 추천 박람회] =====

    // [미국] World of Concrete - 1월이라 참석 불가, 추천 X
    {
        id: 'world-of-concrete-2026',
        name: 'World of Concrete',
        category: '스마트건설',
        location: '라스베이거스',
        country: '미국',
        startDate: '2026-01-19',
        endDate: '2026-01-22',
        description: '콘크리트 및 골조 전문가 행사 (1월 일정으로 참석 불가)',
        website: 'https://www.worldofconcrete.com/',
        isRecommended: false,
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '북미 최대 콘크리트 및 골조 전문 박람회입니다. 콘크리트 펌프, 타설 장비, 철근 가공 기계, 비계 시스템 등 골조 공사에 특화된 장비와 자재가 전시됩니다.',
            keyHighlights: [
                '콘크리트 펌프 및 타설 자동화 장비',
                '철근 가공 및 배근 로봇',
                '비계 및 거푸집 시스템',
                '골조 시공 안전 장비'
            ],
            targetAudience: '골조팀, 콘크리트 시공 전문가, 장비 구매담당자',
            expectedVisitors: '5만명+',
            exhibitorCount: '1,500개사'
        }
    },
    {
        id: 'ces-2026',
        name: 'CES 2026',
        category: '첨단기술 & AI',
        location: '라스베이거스',
        country: '미국',
        startDate: '2026-01-06',
        endDate: '2026-01-10',
        description: '세계에서 가장 영향력 있는 기술 행사',
        website: 'https://www.ces.tech/',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '세계 최대 규모의 첨단 기술 박람회로, AI, 로봇, IoT, 자율주행, 스마트홈 등 모든 신기술이 공개됩니다. 건설 분야에서는 AI 비전 시스템, 드론, 로봇 기술 등을 확인할 수 있습니다.',
            keyHighlights: [
                'AI 및 머신러닝 최신 기술',
                '산업용 드론 및 자율주행 장비',
                'IoT 센서 및 스마트 디바이스',
                '첨단 로봇 및 자동화 솔루션'
            ],
            targetAudience: '기술 트렌드 모니터링팀, 신기술 연구소, 디지털 혁신팀',
            expectedVisitors: '17만명+',
            exhibitorCount: '4,000개사'
        }
    },
    // [독일] DigitalBAU & Hannover Messe
    {
        id: 'digitalbau-2026',
        name: 'DigitalBAU 2026',
        category: '스마트건설',
        location: '뮌헨',
        country: '독일',
        startDate: '2026-03-24',
        endDate: '2026-03-26',
        description: '★★★☆☆ [4순위] 건설 산업의 디지털 솔루션 박람회 (일정상 참석 어려움)',
        website: 'https://digital-bau.com/',
        isRecommended: true,
        priority: 4,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '독일 최대 건설 디지털화 전문 박람회입니다. BIM, 디지털 트윈, AI 기반 현장 관리, 스마트 센서 등 건설 산업의 전 과정을 디지털화하는 솔루션이 전시됩니다.',
            keyHighlights: [
                'BIM 및 디지털 트윈 기술',
                'AI 기반 현장 모니터링 시스템',
                '스마트 센서 및 IoT 플랫폼',
                '클라우드 기반 협업 솔루션'
            ],
            targetAudience: '디지털 혁신팀, BIM 담당자, 스마트건설 기획팀',
            expectedVisitors: '2만명+',
            exhibitorCount: '150개사'
        }
    },

    // ===== [상반기 추천 일정] =====

    // [2순위] 5월 광저우 통합 박람회 (CIHIE + WCME)
    {
        id: 'china-may-route-2026',
        name: '광저우 통합 박람회 (CIHIE + WCME)',
        category: '스마트건설',
        location: '광저우 (Pazhou Complex)',
        country: '중국',
        startDate: '2026-05-08',
        endDate: '2026-05-10',
        description: '★★★★☆ CIHIE (주택산업전) + WCME 2026 (세계 콘크리트 박람회) 동시 개최. 골조 및 콘크리트 분야 집중 공략',
        website: 'http://www.cihie.net',
        secondaryWebsite: 'http://ykhw.gihaexpo.com/',
        secondaryWebsiteLabel: 'WCME 2026 방문',
        isRecommended: true,
        priority: 1,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '광저우에서 CIHIE(국제 주택산업 박람회)와 WCME 2026(세계 콘크리트 박람회)가 동시에 개최됩니다. PC공법, 모듈러 건축과 더불어 콘크리트 타설, 믹싱, 유지보수 등 골조 공사의 모든 과정을 한자리에서 확인할 수 있는 최적의 통합 일정입니다.',
            keyHighlights: [
                'CIHIE: PC공법 및 모듈러 건축 최신 기술',
                'WCME 2026: 콘크리트 믹싱, 타설, 펌핑 장비',
                '골조 공사 자동화 및 친환경 콘크리트 솔루션',
                '두 개의 대형 박람회를 한 장소에서 동시 관람'
            ],
            targetAudience: '골조팀, 콘크리트 시공 담당자, 기술연구소, 자재구매팀',
            expectedVisitors: '15만명+',
            exhibitorCount: '1,200개사'
        }
    },

    // [2순위] 3월 선전 2개 박람회 동시 개최 (통합 카드)
    {
        id: 'shenzhen-march-dual-2026',
        name: '선전 2개 박람회 동시 개최 (3월)',
        category: 'AI & 로봇',
        location: '선전 (World Expo)',
        country: '중국',
        startDate: '2026-03-31',
        endDate: '2026-04-03',
        description: '★★★☆☆ [3순위] ITES (로봇 팔·AGV) + SIMM (기계전) 같은 장소 동시 개최. 1회 방문으로 2개 박람회 관람',
        website: 'https://www.iteschina.com',
        isRecommended: true,
        priority: 3,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: 'ITES와 SIMM은 선전 세계박람관에서 동시에 개최되는 아시아 최대 산업 자동화 및 로봇 전시회입니다. ITES는 산업용 로봇, AGV, 협동로봇에 특화되어 있으며, SIMM은 정밀 기계 및 자동화 설비를 다룹니다. 같은 장소 인접 전시관에서 열려 1회 방문으로 두 박람회를 모두 관람할 수 있습니다.',
            keyHighlights: [
                '산업용 로봇 팔, AGV(무인운반차) 최신 기술',
                '협동로봇(Cobot)의 건설 현장 적용 사례',
                '정밀 기계 가공 및 자동화 설비 종합 전시',
                '1회 방문으로 ITES + SIMM 2개 박람회 동시 관람',
                '중국 제조업 허브 선전의 최신 기술 트렌드 파악'
            ],
            targetAudience: '로봇 도입 검토팀, 자동화 담당자, 스마트 팩토리 기획팀',
            expectedVisitors: '15만명+',
            exhibitorCount: '1,200개사'
        }
    },

    // [신규 추가] CIOSH 상하이 안전보건 박람회
    {
        id: 'ciosh-shanghai-2026',
        name: 'CIOSH 2026 (중국 국제 안전보건용품 박람회)',
        category: '스마트건설',
        location: '상하이 (SNIEC)',
        country: '중국',
        startDate: '2026-04-07',
        endDate: '2026-04-09',
        description: '★★★★☆ [2순위] 아시아 최대 안전보건전, 스마트 PPE 및 추락방지 솔루션',
        website: 'https://www.ciosh.com/en/',
        isRecommended: true,
        priority: 2,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '아시아 최대 규모의 안전 및 보건 전문 박람회입니다. 스마트 안전모, 웨어러블 에어백, 추락 방지 시스템 등 건설 현장 안전을 위한 모든 최신 장비와 솔루션이 전시됩니다.',
            keyHighlights: [
                '스마트 PPE (IoT 안전모, 웨어러블 기기)',
                '추락 방지 및 고소 작업 안전 장비',
                '호흡기 보호 및 방진 시스템',
                '건설 현장 안전 관리 솔루션'
            ],
            targetAudience: '안전관리팀, 현장소장, 보건관리자, 구매팀',
            expectedVisitors: '3만명+',
            exhibitorCount: '1,500개사'
        }
    },

    // 기존 개별 데이터는 유지 (필터/검색용)
    {
        id: 'cihie-2026',
        name: 'CIHIE 2026 (광저우 국제 주택산업 박람회)',
        category: '스마트건설',
        location: '광저우',
        country: '중국',
        startDate: '2026-05-08',
        endDate: '2026-05-10',
        description: 'PC공법, 모듈러 건축, 스마트건설 기술 전문 박람회',
        website: 'http://www.cihie.net',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '중국 최대 규모의 프리캐스트(PC) 콘크리트 공법 및 주택 산업화 전문 박람회입니다. 철근 자동 가공, 콘크리트 타설 로봇, 모듈러 건축 시스템 등 골조 공사 자동화에 특화된 기술이 집중 전시됩니다.',
            keyHighlights: [
                'PC부재 제작 자동화 라인',
                '철근 가공 로봇 및 자동 배근 시스템',
                '친환경 건자재 및 모듈러 건축 솔루션',
                '스마트 건설 관리 플랫폼 및 BIM 기술'
            ],
            targetAudience: '골조팀, PC공법 연구자, 건축자재 구매팀',
            expectedVisitors: '10만명+',
            exhibitorCount: '800개사'
        }
    },
    {
        id: 'shenzhen-visit-may-2026',
        name: '선전 AI 안전기업 방문 (KOTRA 선전무역관)',
        category: 'AI & 로봇',
        location: '선전 (개별 기업 방문)',
        country: '중국',
        startDate: '2026-05-11',
        endDate: '2026-05-13',
        description: 'CIHIE 직후 선전 이동 (광저우-선전 연속 동선 포함)',
        website: 'https://www.kotra.or.kr',
        isRecommended: false,
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '선전 지역의 AI 안전관리 기업 및 스타트업 방문 일정입니다. 건설 현장 AI 비전 시스템, 작업자 안전 모니터링, 위험 구역 감지 등 최신 AI 안전 기술을 보유한 기업들과 직접 교류할 수 있습니다.',
            keyHighlights: [
                'AI 비전 기반 안전모 착용 감지',
                '작업자 동선 추적 및 위험 구역 알림',
                '중장비 충돌 방지 시스템',
                '현장 스타트업과의 직접 기술 교류'
            ],
            targetAudience: '안전관리팀, AI 기술팀, 스마트건설 연구소'
        }
    },
    {
        id: 'ites-shenzhen-2026',
        name: 'ITES Shenzhen 2026 (산업 자동화 로봇전)',
        category: 'AI & 로봇',
        location: '선전 (World Expo)',
        country: '중국',
        startDate: '2026-03-31',
        endDate: '2026-04-03',
        description: '산업용 로봇, AGV, 협동로봇 전문 박람회',
        website: 'https://www.iteschina.com',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '아시아 최대 산업 자동화 및 로봇 전시회입니다. 6축 로봇 팔, AGV(무인운반차), 협동로봇(Cobot) 등 건설 현장 자동화에 적용 가능한 최신 로봇 기술이 대거 전시됩니다.',
            keyHighlights: [
                '산업용 로봇 팔 및 그리퍼 기술',
                'AGV/AMR 자율주행 물류 시스템',
                '협동로봇의 건설 현장 적용 사례',
                'AI 기반 로봇 제어 및 비전 시스템'
            ],
            targetAudience: '로봇 도입 검토팀, 자동화 담당자, 스마트 팩토리 기획팀',
            expectedVisitors: '12만명+',
            exhibitorCount: '900개사'
        }
    },
    {
        id: 'simm-shenzhen-2026',
        name: 'SIMM 2026 (선전 기계전)',
        category: '스마트건설',
        location: '선전 (Shenzhen World Expo)',
        country: '중국',
        startDate: '2026-03-31',
        endDate: '2026-04-03',
        description: '기계·자동화 (선전 2개 박람회 포함)',
        website: 'https://www.simmtime.com',
        isRecommended: false,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: 'ITES와 함께 개최되는 중국 최대 정밀 기계 및 제조 장비 박람회입니다. CNC 가공기, 3D 프린팅, 레이저 절단기 등 건설 부재 제작에 활용 가능한 첨단 가공 장비가 대거 전시됩니다.',
            keyHighlights: [
                'CNC 기계 및 정밀 가공 설비',
                '3D 프린팅 및 적층 제조 기술',
                '레이저 절단/용접 자동화 장비',
                '스마트 제조 실행 시스템(MES)'
            ],
            targetAudience: '제조팀, 부재 생산 담당자, 기계 구매팀',
            expectedVisitors: '11만명+',
            exhibitorCount: '850개사'
        }
    },

    // [3순위] 4월 Canton Fair
    // [중국] 3순위로 축소 - Canton Fair 제거
    {
        id: 'canton-fair-139-phase1',
        name: 'Canton Fair 139th (Phase 1)',
        category: '스마트건설',
        location: '광저우 (Canton Fair Complex)',
        country: '중국',
        startDate: '2026-04-15',
        endDate: '2026-04-19',
        description: '건자재/중장비 섹션, 알루미늄 거푸집 등 직수입 라인',
        website: 'https://www.cantonfair.org.cn',
        isRecommended: false,
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '중국 최대 종합 무역 박람회로, 건자재, 중장비, 알루미늄 거푸집 등 건설 관련 섹션이 포함되어 있습니다. 직수입 라인 발굴 및 중국 제조사와의 직접 거래 기회를 제공합니다.',
            keyHighlights: [
                '건자재 및 중장비 전문 섹션',
                '알루미늄 거푸집 등 시스템 거푸집',
                '중국 제조사와 직접 거래 기회',
                '대량 구매 및 직수입 라인 발굴'
            ],
            targetAudience: '자재 구매팀, 해외 소싱 담당자, 중장비 구매팀',
            expectedVisitors: '18만명+',
            exhibitorCount: '2만개사'
        }
    },
    // ===== [하반기 추천 일정] =====

    {
        id: 'are-shenzhen-2026',
        name: 'ARE Shenzhen (로봇·자동화 국제전)',
        category: 'AI & 로봇',
        location: '선전 (Shenzhen Convention Center)',
        country: '중국',
        startDate: '2026-08-26',
        endDate: '2026-08-28',
        description: '★★★★☆ AI 안전 시스템, 스마트 팩토리 솔루션, 산업용 로봇',
        website: 'https://www.are-expo.com/en/',
        isRecommended: true,
        priority: 3,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '선전 로봇 및 자동화 국제전시회입니다. 산업용 로봇, AI 안전 시스템, 스마트 팩토리 솔루션 등이 전시되며, 건설 현장 자동화에 적용 가능한 최신 기술을 확인할 수 있습니다.',
            keyHighlights: [
                '산업용 로봇 및 자동화 라인',
                'AI 안전 시스템 및 모니터링',
                '스마트 팩토리 총합 솔루션',
                'AGV 및 물류 자동화'
            ],
            targetAudience: '자동화 담당자, 로봇 기술팀, 스마트 팩토리 기획팀',
            expectedVisitors: '8만명+',
            exhibitorCount: '500개사'
        }
    },
    {
        id: 's-factory-2026',
        name: 'Shenzhen Smart Factory & Automation',
        category: '스마트건설',
        location: '선전 (Shenzhen World Expo)',
        country: '중국',
        startDate: '2026-10-27',
        endDate: '2026-10-29',
        description: '★★★★☆ 스마트 시공 로봇, 디지털 트윈 현장 관리',
        website: 'https://www.s-factoryexpo.com/',
        isRecommended: true,
        priority: 6,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '선전 스마트 팩토리 및 자동화 전시회입니다. 건설 현장에 적용 가능한 스마트 시공 로봇, 디지털 트윈 현장 관리 시스템, IoT 센서 등이 전시됩니다.',
            keyHighlights: [
                '스마트 시공 로봇 및 자동화 장비',
                '디지털 트윈 기반 현장 관리',
                'IoT 센서 및 실시간 모니터링',
                '제조 실행 시스템(MES) 솔루션'
            ],
            targetAudience: '스마트건설 팀, 디지털 혁신팀, 현장관리자',
            expectedVisitors: '6만명+',
            exhibitorCount: '400개사'
        }
    },
    {
        id: 'chtf-2026',
        name: 'China Hi-Tech Fair (CHTF)',
        category: '첨단기술 & AI',
        location: '선전 (Convention Center)',
        country: '중국',
        startDate: '2026-11-26',
        endDate: '2026-11-28',
        description: '★★★★★ 종합 AI, 드론 현장 감시, 스마트 도시 기술 (중국 최대)',
        website: 'https://www.chtf.com',
        isRecommended: true,
        priority: 2,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '중국 최대 첨단 기술 종합 박람회입니다. AI, 드론, 로봇, 스마트 도시 기술 등 모든 첨단 기술이 한자리에 모입니다. 건설 분야에서는 드론 현장 감시, AI 안전 관리, 스마트 시티 솔루션 등을 확인할 수 있습니다.',
            keyHighlights: [
                '종합 AI 기술 및 솔루션',
                '드론 기반 현장 감시 시스템',
                '스마트 도시 인프라 기술',
                '중국 첨단 기술 총집합'
            ],
            targetAudience: 'AI 기술팀, 스마트시티 연구팀, 드론 운영팀',
            expectedVisitors: '50만명+',
            exhibitorCount: '3,000개사'
        }
    },

    // [광저우 기타 박람회]
    {
        id: 'gebt-2026',
        name: 'Guangzhou Electrical Building Tech (GEBT)',
        category: '스마트건설',
        location: '광저우 (China Import & Export Fair)',
        country: '중국',
        startDate: '2026-06-09',
        endDate: '2026-06-12',
        description: '스마트 빌딩 솔루션, AI 안전 진단 시스템',
        website: 'https://gebt.hk.messefrankfurt.com',
        isRecommended: false,
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '광저우 전기 및 빌딩 기술 박람회입니다. 스마트 빌딩 솔루션, 전기 설비, AI 기반 안전 진단 시스템, 빌딩 자동화 등이 전시됩니다.',
            keyHighlights: [
                '스마트 빌딩 통합 관리 시스템',
                '전기 설비 및 자동화',
                'AI 기반 설비 안전 진단',
                '빌딩 에너지 관리 솔루션'
            ],
            targetAudience: '전기설비팀, 스마트빌딩 담당자, 설비관리팀',
            expectedVisitors: '3만명+',
            exhibitorCount: '300개사'
        }
    },

    // [3순위] 상하이 (Shanghai) - 세계적 규모
    {
        id: 'waic-2026',
        name: 'World Artificial Intelligence Conference (WAIC)',
        category: 'AI & 로봇',
        location: '상하이',
        country: '중국',
        startDate: '2026-07-17',
        endDate: '2026-07-20',
        description: 'AI 건설 응용 핵심 플랫폼 (상하이 개최)',
        website: 'http://www.worldaic.com.cn',
        isRecommended: true,
        priority: 8,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '세계 인공지능 컨퍼런스로 중국 최대 AI 전문 행사입니다. AI 건설 응용 플랫폼, 머신러닝, 컴퓨터 비전 등 AI 핵심 기술과 건설 산업 적용 사례를 확인할 수 있습니다.',
            keyHighlights: [
                'AI 건설 응용 플랫폼 및 솔루션',
                '머신러닝 및 딥러닝 기술',
                '컴퓨터 비전 및 이미지 인식',
                'AI 스타트업 네트워킹'
            ],
            targetAudience: 'AI 연구팀, 데이터 사이언스팀, 디지털 혁신팀',
            expectedVisitors: '30만명+',
            exhibitorCount: '1,000개사'
        }
    },
    {
        id: 'woc-asia-2026',
        name: 'World of Concrete Asia',
        category: '스마트건설',
        location: '상하이 (SNIEC)',
        country: '중국',
        startDate: '2026-08-12',
        endDate: '2026-08-14',
        description: '콘크리트 시공, 철근 가공, 바닥재 로봇 (아시아 최대 콘크리트 행사)',
        website: 'https://en.wocasia.cn',
        isRecommended: true,
        priority: 9,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '아시아 최대 콘크리트 박람회입니다. 콘크리트 시공 기술, 철근 가공 자동화, 바닥재 로봇, PC 부재 제작 등 콘크리트 관련 모든 기술을 한번에 확인할 수 있습니다.',
            keyHighlights: [
                '콘크리트 타설 및 마감 자동화',
                '철근 가공 및 배근 로봇',
                '바닥재 시공 로봇 및 모바일 장비',
                'PC 부재 제작 자동화'
            ],
            targetAudience: '콘크리트팀, 골조팀, 기술연구소',
            expectedVisitors: '6만명+',
            exhibitorCount: '400개사'
        }
    },
    {
        id: 'bauma-china-2026',
        name: 'bauma CHINA 2026',
        category: '스마트건설',
        location: '상하이 (SNIEC)',
        country: '중국',
        startDate: '2026-11-24',
        endDate: '2026-11-27',
        description: '★★★★★ 전 세계 건설 기술의 정점, 스마트 굴착기 (2년 주기 대형 전시)',
        website: 'https://www.bauma-china.com',
        isRecommended: true,
        priority: 1,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '세계 최대 건설 기계 박람회인 bauma의 중국 버전입니다. 스마트 굴삭기, 건설 중장비, 철근 가공 로봇, 콘크리트 장비 등 건설 장비의 모든 것이 전시되는 2년 주기 대형 행사입니다.',
            keyHighlights: [
                '스마트 굴삭기 및 중장비 종합 전시',
                '철근 가공 로봇 및 자동화 라인',
                '콘크리트 타설 및 펌프 장비',
                '건설 기술의 정점, 2년 주기 대형 행사'
            ],
            targetAudience: '중장비팀, 골조팀, 기술연구소, 장비구매팀',
            expectedVisitors: '20만명+',
            exhibitorCount: '3,000개사'
        }
    },

    // [독일] Hannover Messe - 상반기 추천
    {
        id: 'hannover-messe-2026',
        name: 'Hannover Messe',
        category: '첨단기술 & AI',
        location: '하노버',
        country: '독일',
        startDate: '2026-04-20',
        endDate: '2026-04-24',
        description: '★★★★☆ 세계를 선도하는 산업 기술 박람회',
        website: 'https://www.hannovermesse.de/',
        isRecommended: true,
        priority: 3,
        season: 'H1',
        isVoid: true,
        detailedInfo: {
            exhibitionDetails: '세계 최대 산업 기술 박람회로, 자동화, 로봇, AI, 디지털 트윈, 에너지 기술 등 모든 산업 분야의 첨단 기술이 공개됩니다. Industry 4.0 및 스마트 팩토리 솔루션의 메카입니다.',
            keyHighlights: [
                '산업용 로봇 및 자동화 시스템',
                'AI 기반 제조 실행 시스템',
                '디지털 트윤 및 IoT 플랫폼',
                '에너지 효율 및 지속가능성 기술'
            ],
            targetAudience: '제조업 혁신팀, 자동화 전문가, Industry 4.0 연구자',
            expectedVisitors: '20만명+',
            exhibitorCount: '4,000개사'
        }
    },
    {
        id: 'automate-2026',
        name: 'Automate 2026',
        category: 'AI & 로봇',
        location: '시카고 (McCormick Place)',
        country: '미국',
        startDate: '2026-06-22',
        endDate: '2026-06-25',
        description: '북미 최대 로봇·자동화 쇼케이스 (휴머노이드 로봇 포럼 포함)',
        website: 'https://www.automateshow.com/',
        isRecommended: true,
        priority: 5,
        season: 'H1',
        detailedInfo: {
            exhibitionDetails: '북미 최대 자동화 박람회입니다. 산업용 로봇, 비전 시스템, AGV, 협동로봇 등 모든 종류의 자동화 솔루션이 전시되며, 북미 시장 트렌드를 파악할 수 있습니다.',
            keyHighlights: [
                '산업용 로봇 및 협동로봇',
                '비전 시스템 및 AI 응용',
                'AGV 및 물류 자동화',
                '북미 자동화 시장 트렌드'
            ],
            targetAudience: '자동화 담당자, 로봇 기술팀, 북미 시장 조사팀',
            expectedVisitors: '2.5만명+',
            exhibitorCount: '550개사'
        }
    },

    // 일본 박람회
    {
        id: 'japan-build-tokyo-2026',
        name: 'JAPAN BUILD TOKYO 2026 (도쿄 건설산업전)',
        category: '스마트건설',
        location: '도쿄 (Tokyo Big Sight)',
        country: '일본',
        startDate: '2026-12-02',
        endDate: '2026-12-04',
        description: '일본 최대 건설 종합 박람회, 스마트하우스 및 시공 기술',
        website: 'https://www.japan-build.jp/tokyo/',
        isRecommended: true,
        priority: 10,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '일본 최대 건설 종합 박람회입니다. 스마트하우스, 시공 기술, 건자재, 내장재 등 건설의 모든 분야가 한번에 전시되는 종합 행사입니다.',
            keyHighlights: [
                '스마트하우스 기술 및 솔루션',
                '일본식 시공 기술 및 장비',
                '고품질 건자재 및 내장재',
                '건설 종합 전시회'
            ],
            targetAudience: '건축팀, 시공팀, 자재구매팀, 일본 기술 연구자',
            expectedVisitors: '3만명+',
            exhibitorCount: '400개사'
        }
    },
    // [일본] iREX 2026은 미개최 (격년제, 직전 2025.12 / 다음 2027.11 도쿄). 2026 연말 일본 로봇전은 RoboDEX 나고야로 편성
    {
        id: 'robodex-nagoya-2026',
        name: 'RoboDEX 나고야 2026 (로봇개발·응용전)',
        nameEn: 'RoboDEX Nagoya 2026',
        category: 'AI & 로봇',
        location: '아이치 스카이엑스포 (나고야)',
        country: '일본',
        startDate: '2026-11-25',
        endDate: '2026-11-27',
        description: '★★★★☆ 일본 대표 로봇 전문 전시회. 산업·서비스·휴머노이드 로봇, AGV, AI 자동화. Factory Innovation Week 내 동시 개최',
        website: 'https://www.fiweek.jp/nagoya/',
        isRecommended: true,
        priority: 4,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: 'RX Japan이 주최하는 일본 대표 로봇 전문 전시회로, Factory Innovation Week 나고야의 핵심 전시입니다. 산업용 로봇, 서비스·휴머노이드 로봇, AGV/AMR, 로봇 개발 기술, AI 자동화 솔루션이 집결하며 스마트팩토리·그린팩토리 등 5개 전시와 동시 개최됩니다.',
            keyHighlights: [
                '산업용·서비스·휴머노이드 로봇 총집결',
                'AGV/AMR 자율주행 물류 로봇',
                '건설 현장 적용 가능한 로봇 자동화 기술',
                'Factory Innovation Week 5개 전시 동시 관람'
            ],
            targetAudience: '로봇 기술팀, 자동화 담당자, 스마트건설 연구소',
            expectedVisitors: '4만명+',
            exhibitorCount: '300개사+'
        }
    },
    {
        id: 'ai-expo-tokyo-2026',
        name: 'AI EXPO TOKYO Autumn 2026',
        category: '첨단기술 & AI',
        location: '마쿠하리 멧세 (치바)',
        country: '일본',
        startDate: '2026-11-11',
        endDate: '2026-11-13',
        description: '일본 최대 AI 기술 전시회, 비전 AI, 기계 학습 (NexTech Week)',
        website: 'https://www.ai-expo.jp/tokyo/',
        isRecommended: true,
        priority: 7,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '일본 최대 AI 기술 전시회입니다. 비전 AI, 기계 학습, 딕러닝 등 AI 핵심 기술과 건설 산업 적용 사례를 확인할 수 있으며, 일본의 정밀 AI 기술을 경험할 수 있습니다.',
            keyHighlights: [
                '비전 AI 및 이미지 인식 기술',
                '기계 학습 및 딕러닝 플랫폼',
                'AI 산업 응용 사례',
                '일본 정밀 AI 기술'
            ],
            targetAudience: 'AI 연구팀, 머신러닝 엔지니어, 디지털 혁신팀',
            expectedVisitors: '4만명+',
            exhibitorCount: '250개사'
        }
    }
];
