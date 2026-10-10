export type FeedbackActionState = {
  status: "idle" | "error" | "success";
  fieldErrors?: {
    name?: string[];
    email?: string[];
    content?: string[];
    phone?: string[];
  };
  formError?: string;
  formSuccess?: string;
};
