import axios from "axios";

export async function registerNewsletter(email: string) {
  console.log("[Newsletter] START register", { email });
  try {
    const { data } = await axios.post("/api/register-newsletter", { email });

    if (typeof data === "string") {
      console.log("[Newsletter] Response HTML detected");
      return { success: data.length > 100, message: "Đăng ký thành công!" };
    }

    if (typeof data === "object" && "success" in data) {
      console.log("[Newsletter] Response JSON OK");
      return data;
    }
    console.warn("[Newsletter] Unexpected data", data);
    return { success: false, message: "Phản hồi không hợp lệ." };
  } catch (error: any) {
    return { success: false, message: "Không thể gửi đăng ký." };
  }
}
