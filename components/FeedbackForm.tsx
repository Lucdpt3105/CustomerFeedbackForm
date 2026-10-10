"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { submitFeedbackAction } from "@/app/actions/feedback";
import type { FeedbackActionState } from "@/lib/types/forms";
import type { FeedbackInput } from "@/lib/validations/feedback";

const initialState: FeedbackActionState = { status: "idle" };

export function FeedbackForm() {
  const [values, setValues] = useState<FeedbackInput>({
    name: "",
    email: "",
    content: "",
    phone: "",
  });
  const [state, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue(field: keyof FeedbackInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setState(initialState);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const result = await submitFeedbackAction(formData);
    setState(result);
    if (result.status === "success") {
      setValues({ name: "", email: "", content: "", phone: "" });
    }
    setIsSubmitting(false);
  }

  const nameError = state.fieldErrors?.name?.[0];
  const emailError = state.fieldErrors?.email?.[0];
  const contentError = state.fieldErrors?.content?.[0];
  const phoneError = state.fieldErrors?.phone?.[0];

  return (
    <section className="form-card" aria-labelledby="form-title">
      <div className="form-heading">
        <p className="eyebrow">Gửi phản hồi</p>
        <h2 id="form-title">Bạn muốn chia sẻ điều gì?</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        {state.formSuccess && <p className="form-message success-message" role="status">{state.formSuccess}</p>}
        <div className="field-group">
          <label htmlFor="name">Họ và tên</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            aria-invalid={Boolean(nameError)}
            aria-describedby="name-error"
            placeholder="Nguyễn Văn A"
          />
          {nameError && <p id="name-error" className="field-error" role="alert">{nameError}</p>}
        </div>
        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            aria-invalid={Boolean(emailError)}
            aria-describedby="email-error"
            placeholder="nguyenvana@example.com"
          />
          {emailError && <p id="email-error" className="field-error" role="alert">{emailError}</p>}
        </div>
        <div className="field-group">
          <label htmlFor="content">Nội dung góp ý</label>
          <textarea
            id="content"
            name="content"
            rows={6}
            value={values.content}
            onChange={(event) => updateValue("content", event.target.value)}
            aria-invalid={Boolean(contentError)}
            aria-describedby="content-hint content-error"
            placeholder="Ví dụ: Tôi rất hài lòng với..."
          />
          <p id="content-hint" className="field-hint">Tối thiểu 21 ký tự.</p>
          {contentError && <p id="content-error" className="field-error" role="alert">{contentError}</p>}
        </div>
        <div className="field-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            aria-invalid={Boolean(phoneError)}
            aria-describedby="phone-hint phone-error"
            placeholder="0912345678"
          />
          <p id="phone-hint" className="field-hint">Ví dụ: 0912345678 hoặc +84912345678.</p>
          {phoneError && <p id="phone-error" className="field-error" role="alert">{phoneError}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi..." : "Gửi góp ý"}
        </button>
      </form>
    </section>
  );
}
