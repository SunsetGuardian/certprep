CREATE TABLE IF NOT EXISTS question_reports (
  report_id TEXT PRIMARY KEY,
  submitted_at TEXT NOT NULL,
  question_id TEXT NOT NULL,
  test_id TEXT NOT NULL,
  exam_version TEXT NOT NULL,
  question_version INTEGER,
  data_version TEXT NOT NULL,
  report_category TEXT NOT NULL CHECK (
    report_category IN (
      'possible_typo',
      'correct_answer_may_be_wrong',
      'explanation_unclear',
      'question_outdated',
      'duplicate_question',
      'other'
    )
  ),
  note TEXT,
  question_position INTEGER NOT NULL,
  displayed_answer_ids_json TEXT NOT NULL,
  selected_answer_ids_json TEXT NOT NULL,
  page_url TEXT,
  review_status TEXT NOT NULL DEFAULT 'new' CHECK (
    review_status IN ('new', 'reviewing', 'resolved', 'dismissed')
  ),
  reviewed_at TEXT,
  review_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_question_reports_status_date
  ON question_reports (review_status, submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_question_reports_question
  ON question_reports (question_id, submitted_at DESC);
