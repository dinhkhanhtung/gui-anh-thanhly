/**
 * Google Apps Script - Xử lý tải ảnh & lấy link cho Google Drive
 * Thư mục gốc: Thanh lý công nghiệp & Bể hải sản cũ
 * Folder ID: 1Up9rwR973YM8LCwhvpm1U3Znjx8SsSD9
 */

const ROOT_FOLDER_ID = "1Up9rwR973YM8LCwhvpm1U3Znjx8SsSD9";

// Xử lý upload ảnh (POST)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const base64Data = data.base64;
    const mimeType = data.type || "image/jpeg";
    const fileName = data.name || ("IMG_" + Date.now() + ".jpg");
    const category = data.category || "Chung";

    const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
    
    // Tự động tìm hoặc tạo thư mục con theo danh mục
    let targetFolder = rootFolder;
    if (category && category !== "Chung") {
      const subFolders = rootFolder.getFoldersByName(category);
      if (subFolders.hasNext()) {
        targetFolder = subFolders.next();
      } else {
        targetFolder = rootFolder.createFolder(category);
      }
    }

    // Giải mã Base64 thành Blob
    const decoded = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(decoded, mimeType, fileName);

    // Lưu file vào Google Drive
    const file = targetFolder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const fileId = file.getId();
    // CDN link trực tiếp chất lượng cao của Google (nhúng web, Facebook, blog không bị chặn)
    const directUrl = "https://lh3.googleusercontent.com/d/" + fileId;
    const driveUrl = file.getUrl();

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      id: fileId,
      url: directUrl,
      driveUrl: driveUrl,
      name: fileName,
      category: category
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Xử lý lấy danh sách ảnh đã có trong thư mục (GET)
function doGet(e) {
  try {
    const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const action = e?.parameter?.action || "list";
    const category = e?.parameter?.category;

    if (action === "list") {
      let targetFolder = rootFolder;
      if (category && category !== "all") {
        const subFolders = rootFolder.getFoldersByName(category);
        if (subFolders.hasNext()) {
          targetFolder = subFolders.next();
        }
      }

      const files = targetFolder.getFiles();
      const result = [];
      let count = 0;
      const maxResults = 60; // Tối đa 60 ảnh gần nhất để phản hồi nhanh

      while (files.hasNext() && count < maxResults) {
        const file = files.next();
        const mime = file.getMimeType();
        if (mime.indexOf("image/") !== -1) {
          const fileId = file.getId();
          result.push({
            id: fileId,
            name: file.getName(),
            url: "https://lh3.googleusercontent.com/d/" + fileId,
            thumb: "https://drive.google.com/thumbnail?id=" + fileId + "&sz=w400",
            createdTime: file.getDateCreated().toISOString(),
            size: Math.round(file.getSize() / 1024) + " KB"
          });
          count++;
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        count: result.length,
        files: result
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "API Google Apps Script hoạt động bình thường."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
