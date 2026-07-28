export interface Feedback {
  id: string;
  name: string;
  email: string | null;
  rating: number;
  category:
    | "suggestion"
    | "bug_report"
    | "feature_request"
    | "general_feedback"
    | "other";
  message: string | null;
  is_read: boolean;
  is_published: boolean;
  created_at: string;
}

export type FeedbackInput = Omit<
  Feedback,
  "id" | "created_at" | "is_read" | "is_published"
>;
export type FeedbackForEdit = Partial<
  Pick<Feedback, "is_read" | "is_published">
>;

export interface GetFeedbacksParams {
  filters?:
    | { field: string; value: string | number | boolean; method?: string }[]
    | null;
  sortBy?: { field: string; direction: "asc" | "desc" } | null;
  page?: number | null;
}

export const categoryColors: Record<Feedback["category"], string> = {
  suggestion: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  bug_report: "bg-red-500/10 text-red-500 border-red-500/20",
  feature_request: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  general_feedback: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  other: "bg-slate-500/10 text-slate-500 border-slate-500/20",
};

export const categoryLabels: Record<Feedback["category"], string> = {
  suggestion: "Suggestion",
  bug_report: "Bug",
  feature_request: "Feature",
  general_feedback: "General",
  other: "Other",
};