# 版型與共同作品來源

2026-09-17 依洪聖崴提供的作者授權，修改 [a96020183/ken-chui](https://github.com/a96020183/ken-chui) 原始 React 網站。

## 版型沿用

- `Home.jsx`：沿用首頁 Hero、代表作卡片、清單及關於我區塊，置換資料與不適用文案。
- `CV.jsx`、`Nav.jsx`、`Footer.jsx`：沿用原始布局，移除學長的個人資料，改接洪聖崴內容。
- `index.css`、`tailwind.config.js`：保留原有背景、金色／青色、漸層與卡片效果。
- `Project.jsx`：以原始 `ProjectTapAble.jsx`、`ProjectBNP.jsx` 的 Section、Card 和頁首布局為共用模板，新增檜山坊及研究頁。
- 依賴版本沿用原始 `package-lock.json`，本次建置使用 Node.js 22。

這是針對本次網站的作者授權紀錄，不等於整份素材都改成任意用途的開源授權。

## 內容來源

- 個人資料、團隊獎項、個人分工：洪聖崴的 MASTER、交接包及對話確認。
- 檜山坊：本人交接包中的照片與證書。原始學長專案沒有這個項目，本次以同款版型新增。
- TapAble：原始 `src/pages/ProjectTapAble.jsx`、`src/data/profile.js` 與 `public/tapable/` 下四張公開圖片；Demo、影片、原始碼連到團隊公開版本。
- 保包巴士：本人證書與照片；`business-model.png`、`economics.png` 來自學長 `public/bnp/`。畫面數字標示為團隊提案估算，並未作為已達績效。

TapAble 的 NFC 和機台互動為公開原型中的模擬流程；展示畫面不表示已接上真實機台。學長的隊長、95% 開發占比、其他競賽、職歷、電話及 Email 沒有移植成洪聖崴的個人資料。

## 中文修復

前版部分 JSON 經 Windows PowerShell 預設文字管線寫入，中文已變成 ASCII 問號。本版重寫損壞內容為 UTF-8，並於每次建置檢查連續問號、Unicode 替代字元與頁面中文字。不是更換字型來掩蓋問題。

## 檢查範圍

`npm run build` 驗證 5 項作品資料、素材路徑，並以 React 產生首頁、履歷和 5 項作品頁檢查。這能發現資料損壞與渲染錯誤，不能取代實際瀏覽器的手機排版、圖片放大與列印檢查。
