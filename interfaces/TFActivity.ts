export interface TFActivity {
    id: string;
    date: string;
    dayOfWeek: string;
    category: '현장출장' | '회의 및 업무 협의' | '미래전략TF 기획' | '기타 업무';
    title: string;
    details?: string;
    location?: string;
    isMilestone?: boolean;
}
