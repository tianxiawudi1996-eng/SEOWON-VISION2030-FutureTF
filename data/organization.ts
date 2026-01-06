import { Track, TeamMember } from '../interfaces/Organization';

export const tracksData: Track[] = [
    {
        id: 'management',
        name: '기획/총괄',
        color: '#6366f1',
        members: [
            {
                id: 'kim-mu-bin',
                name: '김무빈',
                position: '팀장',
                track: 'management',
                email: 'kmb@seowon.co.kr',
                responsibilities: ['TF 총괄 관리', '임원 지침 이행', '트랙 간 조율']
            }
        ],
        mainResponsibilities: [
            '미래전략TF 실무 총괄 및 프로젝트 일정 관리',
            '임원 지침 구체화 및 박승희교수 연구팀 기술 협력 조율',
            '이슈 해결 및 트랙 간 협업 조율'
        ]
    },
    {
        id: 'construction',
        name: '시공 트랙',
        color: '#1a56db',
        members: [
            {
                id: 'yoo-byung-ki',
                name: '예병기',
                position: '이사',
                track: 'construction',
                email: 'ybk@seowon.co.kr',
                responsibilities: ['시공 계획 총괄', '현장 관리 감독', '품질 확보']
            },
            {
                id: 'song-kyu-nam',
                name: '송규남',
                position: '차장',
                track: 'construction',
                email: 'skn@seowon.co.kr',
                responsibilities: ['현장 인력 관리', '공정 관리', '안전 규정 이행']
            }
        ],
        mainResponsibilities: [
            '시공 계획 수립 및 현장 인력/장비 관리',
            '공정 준수 및 시공 품질 확보',
            '관련 법규 및 안전 규정 이행',
            '현장에서 발생하는 문제 해결 및 조율'
        ]
    },
    {
        id: 'cost',
        name: '원가 트랙',
        color: '#0e7490',
        members: [
            {
                id: 'hwang-se-won',
                name: '황세원',
                position: '차장',
                track: 'cost',
                email: 'hsw@seowon.co.kr',
                responsibilities: ['예산 수립 및 관리', '원가 분석', '비용 통제']
            },
            {
                id: 'um-tae-hyun',
                name: '엄태현',
                position: '과장',
                track: 'cost',
                email: 'uth@seowon.co.kr',
                responsibilities: ['비용 예측', '재무 위험 관리', '원가 절감']
            },
            {
                id: 'sim-wan-su',
                name: '심완수',
                position: '과장',
                track: 'cost',
                email: 'sws@seowon.co.kr',
                responsibilities: ['변경 비용 분석', '예산 조정', '원가 보고']
            }
        ],
        mainResponsibilities: [
            '예산 수립, 관리, 비용 예측 및 분석',
            '원가 절감 기회 식별 및 재무 위험 관리',
            '변경 사항 발생 시 비용 영향 분석 및 조정'
        ]
    },
    {
        id: 'safety',
        name: '안전 트랙',
        color: '#dc2626',
        members: [
            {
                id: 'lim-sung-yoon',
                name: '임성윤',
                position: '차장',
                track: 'safety',
                email: 'lsy@seowon.co.kr',
                responsibilities: ['안전 정책 수립', '현장 안전 점검', '사고 예방']
            },
            {
                id: 'lee-sang-hun',
                name: '이상헌',
                position: '대리',
                track: 'safety',
                email: 'lsh@seowon.co.kr',
                responsibilities: ['안전 교육', '비상 대응', '안전 감사']
            }
        ],
        mainResponsibilities: [
            '안전 정책 및 절차 개발과 이행',
            '현장 안전 점검/감사 및 안전 교육/훈련 제공',
            '사고 예방 및 비상 대응 계획 수립',
            '사고 발생 시 원인 조사 및 재발 방지 대책 수립'
        ]
    },
    {
        id: 'quality',
        name: '품질 트랙',
        color: '#16a34a',
        members: [
            {
                id: 'jung-hee-joong',
                name: '정희중',
                position: '부장',
                track: 'quality',
                email: 'jhj@seowon.co.kr',
                responsibilities: ['품질 관리 총괄', '품질 검사', '표준 준수']
            }
        ],
        mainResponsibilities: [
            '품질 관리 계획 수립 및 실행',
            '자재 및 작업 결과물에 대한 품질 검사 및 테스트',
            '품질 부적합 사항 문서화 및 시정 조치 요구',
            '관련 표준 및 규정 준수 여부 확인'
        ]
    },
    {
        id: 'procurement',
        name: '구매 트랙',
        color: '#f59e0b',
        members: [
            {
                id: 'kim-ga-yoon',
                name: '김가윤',
                position: '과장',
                track: 'procurement',
                email: 'kgy@seowon.co.kr',
                responsibilities: ['조달 전략', '공급업체 선정', '계약 관리']
            }
        ],
        mainResponsibilities: [
            '조달 전략 수립, 실행 및 공급망 관리',
            '공급업체 선정 및 계약 협상',
            '자재/서비스의 품질 및 비용 효율성 평가',
            '적시 납품 관리, 계약 및 변경 주문 관리'
        ]
    },
    {
        id: 'it-data',
        name: '전산/데이터 트랙',
        color: '#8b5cf6',
        members: [
            {
                id: 'chun-ji-yeon',
                name: '천지연',
                position: '대리',
                track: 'it-data',
                email: 'cjy@seowon.co.kr',
                responsibilities: ['데이터 관리', 'IT 인프라', '시스템 구현']
            }
        ],
        mainResponsibilities: [
            '데이터 관리 역할 및 프로세스 확립',
            '건설 데이터 수집, 저장, 조직화',
            '클라우드 기반 플랫폼/시스템 구현',
            '데이터 정확성/적시성 확보, 통합 및 분석',
            '데이터 보안 조치 및 규정 준수'
        ]
    }
];

// 모든 팀원 목록
export const allMembers: TeamMember[] = tracksData.flatMap(track => track.members);
