# Kho Ảnh & Lấy Link Trực Tiếp - Thanh Lý Công Nghiệp & Bể Hải Sản Cũ

Hệ thống web tĩnh tải ảnh nhanh, nén ảnh tự động, đóng dấu bản quyền và lấy link CDN Google Drive trực tiếp (hỗ trợ cả nhúng web `<img src="...">`, Markdown, copy 1-click).

---

## 📁 Cấu Trúc Dự Án
* `index.html`: Giao diện web chạy trên trình duyệt (hỗ trợ PC & Mobile).
* `Code.gs`: Mã nguồn Google Apps Script nhận ảnh và lưu vào Google Drive.
* Drive Folder ID: `1Up9rwR973YM8LCwhvpm1U3Znjx8SsSD9`

---

## 🚀 Hướng Dẫn Triển Khai (5 Phút)

### Bước 1: Triển khai Google Apps Script (Nhận ảnh vào Drive)
1. Truy cập: [script.new](https://script.new) (hoặc vào Google Drive tạo dự án Apps Script mới).
2. Xóa hết code mặc định, copy toàn bộ nội dung trong file [Code.gs](Code.gs) dán vào.
3. Bấm **Deploy** (Triển khai) góc trên bên phải -> Chọn **New deployment** (Triển khai mới).
4. Chọn loại: **Web app** (Ứng dụng web).
   * **Execute as** (Thực thi dưới dạng): `Me` (Tôi / Tài khoản của bạn).
   * **Who has access** (Ai có quyền truy cập): `Anyone` (Bất kỳ ai).
5. Bấm **Deploy**, cấp quyền truy cập tài khoản Google khi được hỏi.
6. Copy lại đường link **Web App URL** (có dạng `https://script.google.com/macros/s/.../exec`).

### Bước 2: Đưa lên GitHub & Kích hoạt GitHub Pages
1. Tạo một repository mới trên GitHub (ví dụ đặt tên: `gui-anh-thanhly`).
2. Mở PowerShell tại thư mục dự án và đẩy code lên:
   ```bash
   cd D:\Dev\Projects\Github\gui-anh-thanhly
   git init
   git add .
   git commit -m "feat: kho anh thanh ly cong nghiep va be hai san"
   git branch -M main
   git remote add origin https://github.com/dinhkhanhtung/gui-anh-thanhly.git
   git push -u origin main
   ```
3. Trên trang GitHub của repo vừa tạo:
   * Vào **Settings** -> Mục bên trái chọn **Pages**.
   * Tại phần **Branch**, chọn `main` và thư mục `/(root)`.
   * Bấm **Save**.
   * Sau 1-2 phút, trang web sẽ online tại: `https://dinhkhanhtung.github.io/gui-anh-thanhly/`

### Bước 3: Cấu hình URL trên Web
* Mở trang web vừa chạy lên, bấm vào biểu tượng **Bánh Răng (⚙️ Cài đặt)** ở góc phải.
* Dán link Web App URL từ Bước 1 vào ô cấu hình và bấm **Lưu Cấu Hình**.
* Xong! Bạn có thể lưu trang này ra màn hình chính điện thoại hoặc bookmark để chụp/chọn ảnh và lấy link mọi lúc.
