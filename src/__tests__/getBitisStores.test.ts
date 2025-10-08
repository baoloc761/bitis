import { describe, it, expect, vi, beforeEach } from "vitest";
import { getBitisStores } from "@/services/graphql/bitisStores.service";
import { bitisClient } from "@/services/graphql/apollo.client";

vi.mock("@/services/graphql/apollo.client", () => ({
  bitisClient: {
    query: vi.fn(),
  },
}));

describe("getBitisStores()", () => {
  const mockQuery = vi.mocked(bitisClient.query);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("✅ trả về danh sách stores khi có data", async () => {
    const fakeStores = [
      {
        name: "Biti's Nguyễn Trãi",
        province: "Hồ Chí Minh",
        address: "123 Nguyễn Trãi",
      },
      { name: "Biti's Hà Nội", province: "Hà Nội", address: "456 Tràng Tiền" },
    ];

    mockQuery.mockResolvedValueOnce({ data: { stores: fakeStores } });

    const result = await getBitisStores();

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith({
      query: expect.anything(),
      fetchPolicy: "no-cache",
    });
    expect(result).toEqual(fakeStores);
  });

  it("⚠️ trả về mảng rỗng khi data.stores không tồn tại", async () => {
    mockQuery.mockResolvedValueOnce({ data: {} });

    const result = await getBitisStores();

    expect(result).toEqual([]);
  });

  it("❌ ném lỗi khi query thất bại", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Network error"));

    await expect(getBitisStores()).rejects.toThrow("Network error");
  });
});
