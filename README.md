
---

## 🧩 Mô tả cấu trúc dự án

- **components/** → UI component tái sử dụng
- **containers/** → component lớn, có logic
- **services/** → chứa toàn bộ logic gọi API, chia thành `graphql` và `rest`
- **constants/** → các giá trị cố định dùng trong toàn dự án
- **utils/** → hàm helper chung, không phụ thuộc framework
- **__tests__/** → toàn bộ unit test viết bằng Vitest
- **pages/** → cấu trúc routing tự động của Nuxt
- **plugins/** → đăng ký plugin toàn cục (Apollo, Ant Design,...)
- **types/** → định nghĩa type / interface TypeScript dùng chung

---

## 🧪 Testing
- Sử dụng **Vitest** để test logic của services (`src/__tests__/`).
- Chạy test:
  ```bash
  npm run test

---
TẠO FILE .env ở cấp gốc link là: NUXT_PUBLIC_BITIS_API_BASE=https://bitis.com.vn
---

## 🧪 run
- Chạy source:
  ```bash
  npm i
  npm run build
  npm run start