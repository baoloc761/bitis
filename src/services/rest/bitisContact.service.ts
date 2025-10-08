import axios from "axios";

export async function registerNewsletter(email: string) {
  try {
    const { data } = await axios.post("/api/register-newsletter", { email });

    if (typeof data === "string") {
      return { success: data.length > 100, message: "Đăng ký thành công!" };
    }

    if (typeof data === "object" && "success" in data) {
      return data;
    }

    return { success: false, message: "Phản hồi không hợp lệ." };
  } catch (error: any) {
    return { success: false, message: "Không thể gửi đăng ký." };
  }
}
