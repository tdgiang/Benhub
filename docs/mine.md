# Nội dung Landing Page — Hệ thống Quản lý Mỏ MineCore

> **Ghi chú cho người làm trang**
> - "MineCore" là tên tạm lấy theo tên dự án. Đổi sang tên thương mại chính thức nếu đã có.
> - Mọi phần trong `[ngoặc vuông]` là chỗ trống: số liệu thật, logo khách hàng, liên hệ, ảnh chụp màn hình. **Không đưa số liệu chưa kiểm chứng lên trang.**
> - Tính năng mô tả dưới đây đều đã có trong hệ thống (theo API backend hiện tại, 36 phân hệ).
> - Mỗi section có gợi ý bố cục/hình ảnh ở dòng *Gợi ý thiết kế*.

---

## 1. Hero

**Tiêu đề chính (H1):**
# Quản lý mỏ khai thác trên một nền tảng duy nhất

**Tiêu đề phụ:**
Từ giấy phép, kế hoạch khai thác, sản lượng, phiếu cân xe ra vào đến nhân sự, chấm công, tiền lương và công nợ. Tất cả số liệu của mỏ nằm chung một hệ thống, cập nhật theo thời gian thực, xem được trên web và điện thoại.

**Nút kêu gọi hành động:**
- Nút chính: **Đăng ký dùng thử**
- Nút phụ: **Xem demo**

**Dòng tin cậy (dưới nút):**
Dành cho doanh nghiệp khai thác khoáng sản, đá, cát và vật liệu xây dựng · Chạy trên web và ứng dụng di động · Phân quyền đến từng thao tác

*Gợi ý thiết kế:* ảnh nền mỏ lộ thiên (tông đất/cam), bên phải là mockup laptop hiển thị Dashboard và điện thoại hiển thị app tài xế.

---

## 2. Vấn đề thường gặp

**Tiêu đề:** Vận hành mỏ bằng sổ sách và Excel thì luôn chậm một nhịp

- **Số liệu rời rạc.** Sản lượng nằm ở tổ khai thác, phiếu cân ở trạm cân, hợp đồng ở phòng kinh doanh, bảng lương ở kế toán. Muốn có báo cáo tổng thì phải gom tay.
- **Khó kiểm soát xe ra vào.** Phiếu cân giấy dễ sai, dễ thất lạc, khó đối chiếu với khách hàng và tài xế.
- **Kế hoạch và thực tế lệch nhau mà không ai biết sớm.** Khi phát hiện thì đã cuối tháng.
- **Giấy phép, trữ lượng, bảo hiểm sắp hết hạn** mà không có ai nhắc.
- **Chấm công, phân ca, tính lương thủ công** với hàng trăm công nhân, tài xế làm ca sáng, ca chiều, ca gãy.
- **Công nợ khách hàng và nhà cung cấp** theo dõi bằng nhiều file, đối soát mất nhiều ngày.

*Gợi ý thiết kế:* lưới 3×2 thẻ, mỗi thẻ một icon và một dòng mô tả ngắn.

---

## 3. Giải pháp

**Tiêu đề:** MineCore — số hóa toàn bộ chuỗi vận hành mỏ

MineCore kết nối mọi khâu từ **mỏ → khai thác → kho bãi → vận chuyển → bán hàng → thu tiền**, cùng toàn bộ quy trình **nhân sự → chấm công → tính lương**. Mỗi bộ phận làm đúng phần việc của mình, ban lãnh đạo xem bức tranh tổng ngay trên Dashboard.

**3 điểm chính:**
1. **Một nguồn dữ liệu duy nhất.** Không còn nhập lại, không còn lệch số giữa các phòng ban.
2. **Quy trình có duyệt.** Kế hoạch, hợp đồng, phiếu cân, đơn nghỉ phép, bảng lương đều đi theo luồng tạo, duyệt hoặc từ chối, có lưu lịch sử.
3. **Làm việc ngay tại hiện trường.** Tài xế và công nhân dùng ứng dụng di động để nhận phiếu, check-in/check-out, chấm công, xin nghỉ phép và nhận thông báo đẩy.

---

## 4. Các phân hệ chức năng

**Tiêu đề:** Đầy đủ nghiệp vụ cho doanh nghiệp khai thác mỏ

*Gợi ý thiết kế:* dạng tab hoặc lưới thẻ, mỗi nhóm một màu. Mỗi thẻ có icon, tên phân hệ và 3–4 gạch đầu dòng. Có thể kèm ảnh chụp màn hình thật.

### 4.1. Quản lý mỏ và tài nguyên
- **Hồ sơ mỏ:** thông tin mỏ, doanh nghiệp sở hữu, giấy phép khai thác.
- **Khu vực, điểm khai thác, điểm đổ thải:** quản lý sơ đồ vận hành của từng mỏ.
- **Giấy phép nổ mìn:** lưu trữ, theo dõi hiệu lực giấy phép.
- **Trữ lượng còn lại:** theo dõi trữ lượng khoáng sản còn lại theo từng mỏ.

### 4.2. Kế hoạch và sản lượng
- **Kế hoạch khai thác:** lập kế hoạch theo kỳ và khu vực, có luồng duyệt/từ chối.
- **Sản lượng thực tế:** ghi nhận khối lượng khai thác thực tế.
- **So sánh kế hoạch với thực hiện** bằng biểu đồ theo khu vực, phát hiện chênh lệch sớm.
- **Tồn kho khoáng sản:** tồn kho theo loại khoáng sản và từng điểm đổ, xem biến động và nhật ký vận chuyển.

### 4.3. Chất lượng (KCS)
- **Phiếu lấy mẫu và phân tích chất lượng:** tạo phiếu, nhập kết quả phân tích theo từng chỉ tiêu.
- Lưu lịch sử chất lượng theo lô, theo loại khoáng sản.

### 4.4. Phiếu cân điện tử E-Ticket và vận chuyển
- **Phiếu cân điện tử** thay phiếu giấy, có luồng duyệt nội bộ và xác nhận phía khách hàng.
- **App tài xế:** nhận hoặc từ chối chuyến, check-in/check-out tại mỏ, báo cáo sự cố khẩn cấp, gửi khiếu nại phiếu.
- **Khách hàng xác nhận hoặc khiếu nại phiếu**, doanh nghiệp xử lý khiếu nại ngay trên hệ thống.
- **Thống kê theo khách hàng**, xuất Excel phiếu nội bộ và phiếu khách hàng.

### 4.5. Phương tiện, thiết bị và tài sản
- **Phương tiện:** biển số, loại xe, tải trọng, tài xế phụ trách, xe của doanh nghiệp hay xe thuê ngoài.
- **Thiết bị:** quản lý máy móc, thiết bị khai thác.
- **Tài sản và đồ bảo hộ:** cấp phát, thu hồi, theo dõi tài sản từng nhân viên đang giữ, KPI tổng hợp tài sản.

### 4.6. Kinh doanh: khách hàng, đấu thầu, hợp đồng
- **Khách hàng:** hồ sơ, phân loại khách hàng.
- **Đấu thầu:** theo dõi gói thầu, hồ sơ dự thầu và kết quả.
- **Hợp đồng:** tạo hợp đồng, duyệt, theo dõi trạng thái, xuất danh sách.

### 4.7. Công nợ
- **Công nợ phải thu:** tổng quan công nợ, chi tiết theo khách hàng và theo kỳ hợp đồng.
- **Tự động sinh chứng từ công nợ định kỳ** từ các phiếu cân đã hoàn thành.
- **Gửi email đề nghị thanh toán** cho khách hàng (có xem trước), ghi nhận thanh toán.
- **Công nợ phải trả:** đối soát theo hợp đồng, gửi duyệt đối soát, ghi nhận thanh toán.

### 4.8. Nhân sự và vận hành ca
- **Hồ sơ nhân viên:** thông tin, chức vụ, giấy phép lái xe (cảnh báo khi hết hạn), xuất danh sách.
- **Bảo hiểm nhân viên:** theo dõi hồ sơ bảo hiểm.
- **Phân công ca làm việc:** ca sáng, ca chiều, ca gãy theo từng khu vực.
- **Nhật ký ca làm:** xem lại lịch sử từng ca và danh sách nhân viên có mặt.

### 4.9. Chấm công và nghỉ phép
- **Chấm công trên điện thoại** tại các địa điểm chấm công đã đăng ký.
- **Tổng hợp chấm công theo ngày.**
- **Đơn nghỉ phép:** nhân viên tự gửi đơn trên app, quản lý duyệt, từ chối hoặc góp ý.

### 4.10. Tiền lương
- **Chính sách lương** theo chức vụ, **danh mục khoản lương** (phụ cấp, khấu trừ…) áp dụng theo chức vụ hoặc từng nhân viên.
- **Bảng lương tự động** từ dữ liệu chấm công, cho phép điều chỉnh từng dòng, tính lại và chốt bảng lương.
- **Theo dõi trạng thái chi trả**, xuất bảng lương ra Excel.

### 4.11. Quản trị hệ thống
- **Người dùng và phân quyền theo vai trò**, chi tiết đến từng thao tác (xem, thêm, sửa, xóa, duyệt).
- **Danh mục dùng chung:** ca làm, chức vụ, loại khoáng sản, loại vật liệu, loại phương tiện/thiết bị, loại đồ bảo hộ, nhóm khách hàng.
- **Thông báo trong hệ thống và thông báo đẩy** trên điện thoại.
- **Giao diện song ngữ** Việt và Anh.

---

## 5. Dashboard điều hành

**Tiêu đề:** Toàn cảnh mỏ trên một màn hình

Ban giám đốc chọn mỏ và xem ngay các chỉ số tổng hợp: sản lượng, kế hoạch so với thực hiện, tồn kho, phiếu cân trong ngày, công nợ, nhân sự đang trong ca. Không cần chờ báo cáo cuối tháng.

*Gợi ý thiết kế:* ảnh chụp màn hình Dashboard lớn, có callout chỉ vào từng khối số liệu. `[Chèn ảnh chụp Dashboard thật]`

---

## 6. Ứng dụng di động

**Tiêu đề:** Hiện trường kết nối với văn phòng

| Dành cho | Làm được gì |
| --- | --- |
| **Tài xế** | Nhận chuyến, check-in/check-out tại mỏ, xem phiếu cân của mình, báo sự cố khẩn cấp, khiếu nại phiếu |
| **Công nhân, nhân viên** | Chấm công tại địa điểm quy định, xin nghỉ phép, xem thông báo |
| **Quản lý** | Nhận thông báo đẩy khi có việc cần duyệt, theo dõi tình hình mỏ |

*Gợi ý thiết kế:* 2–3 mockup điện thoại đặt cạnh nhau. Nút tải app iOS/Android `[link store nếu có]`.

---

## 7. Lợi ích theo vai trò

**Tiêu đề:** Mỗi vị trí đều có công cụ phù hợp

- **Ban giám đốc:** nắm sản lượng, doanh thu, công nợ theo thời gian thực, ra quyết định dựa trên số liệu.
- **Quản lý mỏ:** lập và theo dõi kế hoạch khai thác, điều phối ca, kiểm soát tồn kho và chất lượng.
- **Phòng kinh doanh:** quản lý khách hàng, đấu thầu, hợp đồng, theo dõi xe xuất hàng theo hợp đồng.
- **Kế toán:** công nợ tự sinh từ phiếu cân, gửi đề nghị thanh toán qua email, bảng lương tự động.
- **Nhân sự:** hồ sơ nhân viên, bảo hiểm, chấm công, nghỉ phép, tài sản cấp phát nằm chung một nơi.
- **KCS:** phiếu lấy mẫu và kết quả phân tích được số hóa, tra cứu nhanh.

---

## 8. Quy trình triển khai

**Tiêu đề:** Bắt đầu nhanh, không gián đoạn sản xuất

1. **Khảo sát:** tìm hiểu quy trình vận hành thực tế của mỏ.
2. **Cấu hình:** khai báo mỏ, khu vực, danh mục, phân quyền theo cơ cấu doanh nghiệp.
3. **Chuyển dữ liệu:** nhập nhân sự, phương tiện, khách hàng, hợp đồng hiện có.
4. **Đào tạo và vận hành:** hướng dẫn từng bộ phận, đồng hành trong giai đoạn đầu.

`[Thời gian triển khai dự kiến: ... tuần]`

*Gợi ý thiết kế:* timeline ngang 4 bước.

---

## 9. Bảo mật và độ tin cậy

- **Phân quyền chi tiết:** mỗi người dùng chỉ thấy và thao tác đúng phần được giao.
- **Xác thực bằng token**, mật khẩu được mã hóa, hỗ trợ quên mật khẩu qua OTP.
- **Lưu vết thao tác:** ghi lại ai tạo, ai sửa, lúc nào. Dữ liệu xóa được lưu trữ an toàn, không mất vĩnh viễn.
- **Lịch sử duyệt:** mọi thay đổi trạng thái của phiếu, hợp đồng, kế hoạch đều được ghi lại.
- `[Hình thức triển khai: cloud / máy chủ riêng tại doanh nghiệp]`

---

## 10. Số liệu và khách hàng *(chỉ điền khi có số liệu thật)*

- `[Số mỏ đang sử dụng]` · `[Số phiếu cân đã xử lý]` · `[Số người dùng]`
- `[Logo khách hàng]`
- `[Trích dẫn cảm nhận khách hàng — tên, chức vụ, công ty]`

---

## 11. Câu hỏi thường gặp

**MineCore phù hợp với loại mỏ nào?**
Mỏ khai thác khoáng sản, đá, cát, sỏi và vật liệu xây dựng, đặc biệt các doanh nghiệp có nhiều xe vận chuyển và cần quản lý phiếu cân, công nợ khách hàng.

**Một doanh nghiệp quản lý nhiều mỏ được không?**
Được. Hệ thống quản lý nhiều mỏ, mỗi mỏ có khu vực, điểm khai thác, kế hoạch và tồn kho riêng. Dashboard cho phép chọn xem từng mỏ.

**Có dùng được trên điện thoại không?**
Có. Tài xế, công nhân và quản lý đều có ứng dụng di động. Bản web dùng cho văn phòng.

**Có xuất báo cáo ra Excel không?**
Có. Phiếu cân, hợp đồng, nhân viên, bảng lương… đều xuất được ra Excel.

**Có tùy chỉnh theo quy trình riêng của doanh nghiệp không?**
`[Điền chính sách tùy chỉnh / tích hợp của công ty]`

**Chi phí như thế nào?**
`[Điền mô hình giá: theo mỏ / theo người dùng / gói năm]`

---

## 12. Kêu gọi hành động cuối trang

**Tiêu đề:** Sẵn sàng số hóa mỏ của bạn?

Để lại thông tin, đội ngũ của chúng tôi sẽ liên hệ tư vấn và demo trực tiếp trên quy trình của doanh nghiệp bạn.

**Form đăng ký:** Họ tên · Tên doanh nghiệp · Số điện thoại · Email · Số mỏ đang quản lý · Nhu cầu chính (ô chọn nhiều)

**Nút:** **Nhận tư vấn miễn phí**

---

## 13. Footer

- `[Logo]` · `[Tên công ty]`
- Địa chỉ: `[...]` · Hotline: `[...]` · Email: `[...]`
- Liên kết: Tính năng · Ứng dụng di động · Bảng giá · Liên hệ · Chính sách bảo mật

---

## Phụ lục: Gợi ý SEO

- **Title:** MineCore — Phần mềm quản lý mỏ khai thác toàn diện
- **Meta description:** Phần mềm quản lý mỏ: kế hoạch khai thác, sản lượng, phiếu cân điện tử, tồn kho, hợp đồng, công nợ, chấm công và tiền lương trên một nền tảng web và di động.
- **Từ khóa:** phần mềm quản lý mỏ, quản lý khai thác khoáng sản, phiếu cân điện tử, quản lý mỏ đá, phần mềm mỏ vật liệu xây dựng, quản lý xe ra vào mỏ
