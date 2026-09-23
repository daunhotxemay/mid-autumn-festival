/**
 * =========================================================================
 * GOOGLE APPS SCRIPT ĐỒNG BỘ DỮ LIỆU ĐĂNG KÝ TRUNG THU VÀO GOOGLE SHEETS
 * Dự án: Đêm Hội Trăng Rằm - Yamaha Town Nam Tiến
 * =========================================================================
 *
 * HƯỚNG DẪN CÀI ĐẶT NHANH (Chỉ mất 2 phút):
 * -------------------------------------------------------------------------
 * BƯỚC 1: Mở Google Sheets mới tại: https://sheets.new (đặt tên bảng tính tùy ý, ví dụ: "Đăng Ký Trung Thu 2026 - Nam Tiến").
 * BƯỚC 2: Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Apps Script.
 * BƯỚC 3: Xóa sạch code mặc định trong file Code.gs, dán toàn bộ nội dung file này vào.
 * BƯỚC 4: Nhấn nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * BƯỚC 5: 
 *    - Chọn loại (Select type): Bấm icon bánh răng ⚙️ -> Chọn "Ứng dụng web" (Web app).
 *    - Mô tả: "API nhận form đăng ký".
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me / tài khoản Google của bạn).
 *    - Ai có quyền truy cập (Who has access): Chọn "Bất kỳ ai" (Anyone) -> RẤT QUAN TRỌNG để form gửi được dữ liệu.
 * BƯỚC 6: Nhấn "Triển khai" (Deploy) -> Cấp quyền truy cập nếu Google yêu cầu -> Sao chép URL ứng dụng web (Web app URL có dạng https://script.google.com/macros/s/.../exec).
 * BƯỚC 7: Mở file `script.js` trong thư mục dự án landing page, dán URL vừa copy vào biến:
 *    const GOOGLE_SHEET_SCRIPT_URL = "URL_VỪA_COPY";
 * =========================================================================
 */

function doPost(e) {
  return handleResponse(e);
}

function doGet(e) {
  return handleResponse(e);
}

function handleResponse(e) {
  var lock = LockService.getScriptLock();
  // Đợi tối đa 10 giây nếu có nhiều người gửi cùng lúc để tránh trùng lặp dòng
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Tự động khởi tạo tiêu đề cột nếu trang tính còn mới tinh
    if (sheet.getLastRow() === 0) {
      var headerRow = [
        "Thời Gian Đăng Ký",
        "Họ Và Tên",
        "Số Điện Thoại",
        "Mã Nhận Quà",
        "Thiết Bị",
        "Ghi Chú"
      ];
      sheet.appendRow(headerRow);

      // Định dạng tiêu đề đẹp mắt
      var headerRange = sheet.getRange(1, 1, 1, headerRow.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#f1c40f"); // Màu vàng trung thu
      headerRange.setFontColor("#1a1a1a");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);

      sheet.setColumnWidth(1, 180); // Thời gian
      sheet.setColumnWidth(2, 220); // Họ tên
      sheet.setColumnWidth(3, 160); // SĐT
      sheet.setColumnWidth(4, 180); // Mã quà
      sheet.setColumnWidth(5, 200); // Thiết bị
      sheet.setColumnWidth(6, 250); // Ghi chú
    }

    // Trích xuất dữ liệu từ request (hỗ trợ cả JSON, FormData và URL Parameters)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var now = new Date();
    var timeFormatted = Utilities.formatDate(now, "GMT+7", "dd/MM/yyyy HH:mm:ss");
    var fullName = data.name || data.txtName || "Khách mời";
    var phone = data.phone || data.txtPhone || "";
    var giftCode = data.giftCode || "YAMAHA-TT-888";
    var device = data.device || "Mobile/Desktop Web";
    var note = data.note || "Đăng ký từ Landing Page Đêm Hội Trăng Rằm";

    // Thêm một dòng mới vào Google Sheet
    sheet.appendRow([
      timeFormatted,
      fullName,
      "'" + phone, // Dấu nháy đơn để Google Sheets giữ nguyên số 0 ở đầu SĐT
      giftCode,
      device,
      note
    ]);

    // Trả về JSON thành công cho trình duyệt
    return ContentService
      .createTextOutput(JSON.stringify({
        result: "success",
        message: "Đăng ký thành công!",
        row: sheet.getLastRow(),
        giftCode: giftCode
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        result: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
