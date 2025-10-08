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
      maxRedirects: 0,
      validateStatus: (status) => status < 400,
    });

    if (typeof res.data === "string" && res.data.includes("<html")) {
      return { success: true, message: "Đăng ký thành công!" };
    }

    if (res.data?.success !== undefined) {
      return { success: res.data.success, message: res.data.message };
    }

    return { success: true, message: "Đăng ký thành công!" };
  } catch (err: any) {
    console.error("❌ Proxy error:", err.message);
    return { success: false, message: "Không thể gửi đăng ký." };
  }
});
