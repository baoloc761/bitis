// /server/api/register-newsletter.post.ts
import { defineEventHandler, readBody } from "h3";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const { email } = await readBody<{ email: string }>(event);

  if (!email) {
    return { success: false, message: "Email không hợp lệ" };
  }

  const body = new URLSearchParams({
    form_type: "customer",
    utf8: "✓",
    "contact[tags]": "Đăng ký nhận tin",
    "contact[email]": email,
  });

  try {
    const res = await axios.post("https://bitis.com.vn/account/contact", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      // Cho chắc, disable auto follow redirect (Shopify redirect về HTML)
      maxRedirects: 0,
      validateStatus: (status) => status < 400,
    });

    // Nếu response là HTML → vẫn xem là success
    if (typeof res.data === "string" && res.data.includes("<html")) {
      return { success: true, message: "Đăng ký thành công!" };
    }

    // Nếu response JSON (hiếm)
    if (res.data?.success !== undefined) {
      return { success: res.data.success, message: res.data.message };
    }

    // Mặc định
    return { success: true, message: "Đăng ký thành công!" };
  } catch (err: any) {
    console.error("❌ Proxy error:", err.message);
    return { success: false, message: "Không thể gửi đăng ký." };
  }
});
