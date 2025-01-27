const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// 設定靜態資源目錄
app.use(express.static("public"));

// 設定圖片存儲位置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 圖片將存到 uploads 資料夾
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 確保檔名唯一
  },
});

const upload = multer({ storage });

// 處理圖片上傳路由
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("沒有檔案被上傳！");
  }

  // 回傳圖片的路徑給前端
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// 提供靜態資源
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 啟動伺服器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在執行於 http://localhost:${PORT}`);
});
