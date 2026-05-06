-- ============================================================
-- Supabase RLS 정책 수정 SQL
-- ============================================================
-- 이 사이트는 자체 localStorage 인증을 쓰고 Supabase Auth는 사용하지 않으므로,
-- 모든 요청이 anon 역할로 들어옵니다. 따라서 anon에 INSERT/UPDATE를 허용해야 합니다.
--
-- 적용 방법:
--   1. Supabase 대시보드 → 프로젝트 (gupftsskcmtkzpjqrlpc) → SQL Editor 열기
--   2. 아래 SQL 전체를 붙여넣고 Run
--   3. 적용 후 사이트에서 마일스톤 저장 / 이미지 업로드 재시도
--
-- 보안 주의:
--   anon 역할의 INSERT/UPDATE/DELETE를 무제한 허용하면 키만 알면 누구나
--   쓰기가 가능합니다. 본 사이트는 internal-only 운영이므로 일단 허용하되,
--   장기적으로는 Supabase Auth 도입을 권장합니다.
-- ============================================================


-- ===== 1) tf_strategic_plans 테이블 정책 =====
-- 마일스톤(activities), 전략계획(plan), 의제(agenda) 등 모든 type 데이터 저장처

-- RLS 활성화 (이미 켜져있으면 무시됨)
ALTER TABLE public.tf_strategic_plans ENABLE ROW LEVEL SECURITY;

-- 기존 정책 제거 (재실행 안전성)
DROP POLICY IF EXISTS "anon_select_strategic_plans" ON public.tf_strategic_plans;
DROP POLICY IF EXISTS "anon_insert_strategic_plans" ON public.tf_strategic_plans;
DROP POLICY IF EXISTS "anon_update_strategic_plans" ON public.tf_strategic_plans;
DROP POLICY IF EXISTS "anon_delete_strategic_plans" ON public.tf_strategic_plans;

-- SELECT (조회) 허용
CREATE POLICY "anon_select_strategic_plans"
ON public.tf_strategic_plans
FOR SELECT
TO anon, authenticated
USING (true);

-- INSERT (신규 저장) 허용
CREATE POLICY "anon_insert_strategic_plans"
ON public.tf_strategic_plans
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- UPDATE (수정) 허용 — upsert 시 필요
CREATE POLICY "anon_update_strategic_plans"
ON public.tf_strategic_plans
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- DELETE 는 사이트에서 사용하지 않으므로 명시적으로 허용하지 않음


-- ===== 2) tf_tasks 테이블 정책 (보너스) =====
-- 업무 동기화(syncTask)도 같은 anon 역할 패턴

ALTER TABLE public.tf_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_tf_tasks" ON public.tf_tasks;
DROP POLICY IF EXISTS "anon_insert_tf_tasks" ON public.tf_tasks;
DROP POLICY IF EXISTS "anon_update_tf_tasks" ON public.tf_tasks;
DROP POLICY IF EXISTS "anon_delete_tf_tasks" ON public.tf_tasks;

CREATE POLICY "anon_select_tf_tasks"
ON public.tf_tasks FOR SELECT
TO anon, authenticated USING (true);

CREATE POLICY "anon_insert_tf_tasks"
ON public.tf_tasks FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE POLICY "anon_update_tf_tasks"
ON public.tf_tasks FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_delete_tf_tasks"
ON public.tf_tasks FOR DELETE
TO anon, authenticated USING (true);


-- ===== 3) Storage 버킷 (tf_files) 정책 =====
-- 이미지 업로드용. storage.objects 테이블에 정책을 만듭니다.

-- 기존 정책 제거
DROP POLICY IF EXISTS "anon_select_tf_files" ON storage.objects;
DROP POLICY IF EXISTS "anon_insert_tf_files" ON storage.objects;
DROP POLICY IF EXISTS "anon_update_tf_files" ON storage.objects;

-- SELECT (다운로드 / public URL 접근) 허용
CREATE POLICY "anon_select_tf_files"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'tf_files');

-- INSERT (업로드) 허용
CREATE POLICY "anon_insert_tf_files"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'tf_files');

-- UPDATE (덮어쓰기) — uploadFile은 upsert:false 이므로 일반적으론 불필요하지만,
-- 향후 메타데이터 업데이트 등을 위해 허용
CREATE POLICY "anon_update_tf_files"
ON storage.objects
FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'tf_files')
WITH CHECK (bucket_id = 'tf_files');


-- ===== 4) tf_files 버킷이 public 인지 확인 =====
-- 업로드 후 getPublicUrl()로 받는 URL이 외부에서 보이려면 버킷이 public 이어야 합니다.
-- 아래 쿼리로 현재 상태 확인:
--
-- SELECT id, name, public FROM storage.buckets WHERE id = 'tf_files';
--
-- public 이 false 이면 다음 쿼리로 변경:
-- UPDATE storage.buckets SET public = true WHERE id = 'tf_files';


-- ===== 검증 쿼리 =====
-- 적용 후 다음 쿼리로 정책이 잘 들어갔는지 확인할 수 있습니다.
--
-- SELECT schemaname, tablename, policyname, roles, cmd
-- FROM pg_policies
-- WHERE tablename IN ('tf_strategic_plans', 'tf_tasks')
--    OR (schemaname = 'storage' AND tablename = 'objects' AND policyname LIKE '%tf_files%');
