import { describe, it, expect, vi, beforeEach } from "vitest";
import { getBitisProducts } from "@/services/graphql/bitisProducts.service";
import { bitisClient } from "@/services/graphql/apollo.client";

vi.mock("@/services/graphql/apollo.client", () => ({
  bitisClient: { query: vi.fn() },
}));

describe("getBitisProducts()", () => {
  const mockQuery = vi.mocked(bitisClient.query);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("✅ trả về danh sách sản phẩm khi query thành công", async () => {
    const fakeProducts = [
      { id: 1, title: "Hunter Nam", handle: "hunter-nam", variants: [] },
      { id: 2, title: "Hunter Nữ", handle: "hunter-nu", variants: [] },
    ];

    mockQuery.mockResolvedValueOnce({ data: { products: fakeProducts } });

    const result = await getBitisProducts("hunter-nam", 1, 12);

    expect(mockQuery).toHaveBeenCalledWith({
      query: expect.anything(),
      variables: { collection: "hunter-nam", page: 1, limit: 12 },
      fetchPolicy: "no-cache",
    });
    expect(result).toEqual(fakeProducts);
  });

  it("⚠️ trả về mảng rỗng khi không có data.products", async () => {
    mockQuery.mockResolvedValueOnce({ data: {} });

    const result = await getBitisProducts("san-pham-moi");

    expect(result).toEqual([]);
  });

  it("❌ trả về mảng rỗng khi query ném lỗi", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Network error"));

    const result = await getBitisProducts("hunter-nam");

    expect(result).toEqual([]);
  });
});
