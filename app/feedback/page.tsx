import { FeedbackForm } from "@/components/FeedbackForm";

export default function FeedbackPage() {
  return (
    <main className="page-shell">
      <section className="intro-panel" aria-labelledby="page-title">
        <p className="eyebrow">Customer feedback</p>
        <h1 id="page-title">Ý kiến của bạn giúp chúng tôi tốt hơn</h1>
        <p>
          Hãy chia sẻ trải nghiệm của bạn. Mỗi góp ý đều được tiếp nhận để
          cải thiện chất lượng phục vụ.
        </p>
        <div className="requirement-note">
          <strong>Lưu ý khi gửi</strong>
          <span>Nội dung cần trên 20 ký tự và số điện thoại phải đúng định dạng Việt Nam.</span>
        </div>
      </section>
      <FeedbackForm />
    </main>
  );
}
