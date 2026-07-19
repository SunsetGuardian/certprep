import { handleQuestionReportRequest } from "../_lib/question-report.js";

export function onRequest(context) {
  return handleQuestionReportRequest(context);
}
