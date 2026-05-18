import { NextApiRequest, NextApiResponse } from 'next';

// [SECURITY FIX] 이 엔드포인트는 관리자 전용입니다.
// - GET: 비밀번호 전체 목록 노출 제거 (인증 없이 접근 가능했던 취약점 수정)
// - POST: 인증 없는 비밀번호 변경 차단, 응답에서 비밀번호 데이터 제거
// - 모든 실제 비밀번호 변경은 Supabase RLS 정책으로 보호된 syncPassword()를 사용해야 합니다.

// 인메모리 store는 재시작 시 초기화됩니다 (Vercel 서버리스 특성).
// 비밀번호 변경 로그만 보관하며, 실제 비밀번호는 절대 저장하지 않습니다.
let changeLog: Record<string, { changedBy: string; changedAt: string }> = {};

const ADMIN_USER_ID = 'kim-mu-bin';

function getSessionUserId(req: NextApiRequest): string | null {
    // Next.js Pages Router에서는 세션 쿠키 기반 검증이 필요합니다.
    // 현재 구조는 서버 사이드 세션이 없으므로 내부 서버 토큰으로 보호합니다.
    const internalToken = req.headers['x-internal-token'];
    const expectedToken = process.env.INTERNAL_API_TOKEN;

    if (!expectedToken) {
        // 환경변수 미설정 시 엔드포인트 전체 차단
        return null;
    }

    if (!internalToken || internalToken !== expectedToken) {
        return null;
    }

    // 요청 바디에서 요청자 ID 추출 (서버 내부 호출용)
    return req.body?.requesterId || null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // [SECURITY] GET은 완전히 차단 - 비밀번호 목록을 API로 노출하지 않음
    if (req.method === 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (req.method === 'POST') {
        // [SECURITY] 내부 서버 토큰으로 요청자 인증
        const requesterId = getSessionUserId(req);
        if (!requesterId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // [SECURITY] 관리자만 비밀번호 변경 가능
        if (requesterId !== ADMIN_USER_ID) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { userId, changedBy } = req.body;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ error: 'Missing or invalid userId' });
        }

        // [SECURITY] 실제 비밀번호는 저장하지 않음 - 변경 로그만 기록
        changeLog[userId] = {
            changedBy: typeof changedBy === 'string' ? changedBy : 'unknown',
            changedAt: new Date().toISOString()
        };

        // [SECURITY] 응답에 비밀번호 데이터를 절대 포함하지 않음
        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
