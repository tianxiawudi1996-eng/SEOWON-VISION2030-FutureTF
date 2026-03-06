import { TFActivity } from '../interfaces/TFActivity';

export const tfActivities: TFActivity[] = [
    {
        id: 'tf-20260305-1',
        date: '2026-03-05',
        dayOfWeek: 'Thu',
        category: '현장출장',
        title: '부산 범일동 현장 정밀 안전 점검',
        summary: '서원토건의 핵심 기술인 SAFE-LINK의 현장 적용성 평가 및 부산 사업지 상세 답사',
        details: '부산 범일동 현장 컨디션 확인\nSAFE-LINK 모바일 앱 테스트 및 데이터 정합성 검증\n현장 관리자와의 인터뷰를 통한 UI/UX 개선안 수집\n특이사항: 해안가 인근 건설 환경에 맞는 통신 환경 체크',
        location: '부산 범일동 현장',
        participants: ['김진호 상무', '최영철 팀장', '성균관대 고문단'],
        images: ['/busan_site_visit_1_1772782116783.png'],
        isMilestone: true
    },
    {
        id: 'tf-20260303-1',
        date: '2026-03-03',
        dayOfWeek: 'Tue',
        category: '회의 및 업무 협의',
        title: '미래전략TF SAFE-LINK 고도화 전략 회의',
        summary: '전사 안전 관리 플랫폼 "SAFE-LINK"의 2차 기능 명세 확정 및 개발 로드맵 수립',
        details: '실시간 위험 요소 감지 알고리즘 도입 논의\n웹 대시보드 인터페이스(BIM 연동) 디자인 확정\n향후 3개월간의 개발 일정 재산정 및 리소스 배분',
        location: '본사 대회의실',
        participants: ['임석원 대표', '미래전략TF 전원'],
        images: ['/tf_meeting_office_1772782131454.png'],
        isMilestone: false
    },
    {
        id: 'tf-20260226-1',
        date: '2026-02-26',
        dayOfWeek: 'Thu',
        category: '현장출장',
        title: '본사 SAFE-LINK 성과 보고 및 시연',
        summary: '경영진 대상 디지털 현장 안전 관리 솔루션 실시간 시연 및 비용 절감 효과 보고',
        details: '과천G타운 현장 데이터 연동 시연\n기존 수동 안전 점검 대비 공기 단축 및 비용 효율성 25% 향상 리포트\n경영진 대상 최종 피드백 및 GS건설 등 협력사 공유 방안 수립',
        location: '본사 10층 프리젠테이션룸',
        participants: ['임석원 대표', '전 임직원'],
        images: ['/safelink_presentation_1772782147620.png'],
        isMilestone: true
    },
    {
        id: 'tf-20260224-1',
        date: '2026-02-24',
        dayOfWeek: 'Tue',
        category: '현장출장',
        title: '성대 김한선박사팀과 현장 답사',
        summary: '과천G타운 현장 기반 디지털 트윈 구축을 위한 LiDAR 스캐닝 및 기초 데이터 수집',
        details: '과천G타운 주요 구역 정밀 스캐닝\n이동형 고해상도 카메라 설치 위치 선정\n현장 공무팀과 API 연동을 위한 인프라 점검',
        location: '과천G타운',
        participants: ['김한선 박사', 'TF 개발팀'],
        isMilestone: false
    },
    {
        id: 'tf-20260126-1',
        date: '2026-01-26',
        dayOfWeek: 'Mon',
        category: '현장출장',
        title: 'SAFE-LINK Vision 2030 선포',
        summary: '미래전략TF의 핵심 가치 통합 및 글로벌 안전 플랫폼 도약을 위한 비전 공유',
        details: '청주에서 새벽 4:30분 출발\n미래전략TF 활성화 방안(SAFE-LINK 제작) 최종 발표',
        location: '본사',
        isMilestone: true
    },
    {
        id: 'tf-20260114-2',
        date: '2026-01-14',
        dayOfWeek: 'Wed',
        category: '회의 및 업무 협의',
        title: '성균관대학교와 산학협력 MOU 체결',
        details: '스마트 안전 시공 기술 공동 개발을 위한 협약 진행\n박승희 교수팀과의 기술 자문 체계 구축',
        isMilestone: true
    },
    {
        id: 'tf-20260102-1',
        date: '2026-01-02',
        dayOfWeek: 'Fri',
        category: '미래전략TF 기획',
        title: '미래전략TF 전용 페이지 및 대시보드 기획',
        details: '내부 소통 창구 일원화 및 활동 기록의 투명한 공개를 위한 시스템 기획',
        isMilestone: true
    }
];
