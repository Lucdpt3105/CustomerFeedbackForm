"use server";

import type { FeedbackActionState } from "@/lib/types/forms";
import { feedbackSchema } from "@/lib/validations/feedback";

export async function submitFeedbackAction(formData: FormData): Promise<FeedbackActionState> {
  const parsed = feedbackSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    content: formData.get("content"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    status: "success",
    formSuccess: "Cảm ơn bạn! Góp ý đã được ghi nhận.",
  };
}
