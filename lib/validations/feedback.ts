import { z } from "zod";

const vietnamesePhonePattern = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên."),
  email: z.string().trim().email("Vui lòng nhập email hợp lệ."),
  content: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập nội dung góp ý.")
    .min(21, "Nội dung phải trên 20 ký tự."),
  phone: z
    .string()
    .trim()
    .regex(vietnamesePhonePattern, "Vui lòng nhập số điện thoại Việt Nam hợp lệ."),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
