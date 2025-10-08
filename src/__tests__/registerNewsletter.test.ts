import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { registerNewsletter } from "@/services/rest/bitisContact.service";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("registerNewsletter()", () => {
  beforeEach(() => vi.clearAllMocks());

  it("✅ returns success when HTML response detected", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: "<html>".padEnd(150, "x"),
    });

    const result = await registerNewsletter("user@example.com");

    expect(result).toEqual({
      success: true,
      message: "Đăng ký thành công!",
    });
  });

  it("✅ returns success when JSON with success=true", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { success: true, message: "Đăng ký thành công!" },
    });

    const result = await registerNewsletter("test@example.com");

    expect(result.success).toBe(true);
    expect(result.message).toContain("Đăng ký");
  });

  it("⚠️ returns invalid when unknown data type", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: 123 });

    const result = await registerNewsletter("user@example.com");

    expect(result).toEqual({
      success: false,
      message: "Phản hồi không hợp lệ.",
    });
  });

  it("❌ returns error when axios throws", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network fail"));

    const result = await registerNewsletter("user@example.com");

    expect(result).toEqual({
      success: false,
      message: "Không thể gửi đăng ký.",
    });
  });
});
