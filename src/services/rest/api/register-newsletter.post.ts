import { defineEventHandler, readBody } from "h3";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const { email } = await readBody<{ email: string }>(event);

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
    });

    return res.data;
  } catch (err: any) {
    console.error("❌ Proxy error:", err.message);
    return { success: false, message: "Không thể gửi đăng ký." };
  }
});
