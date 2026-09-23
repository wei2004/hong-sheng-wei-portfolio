# 洪聖崴｜個人履歷與作品集

> **已選定 C 版。之後只維護 `hong-sheng-wei-portfolio` 這一份。** 這是可獨立使用的 GitHub 專案，不需要外層的 MASTER、交接包或舊網站資料夾。

這版直接修改 [Ken Chui 的 React 網站](https://github.com/a96020183/ken-chui)，保留首頁、代表作卡片、作品頁與履歷的原始視覺。內容改成洪聖崴的三項競賽、研究、大學專題、實務與科技法律修課。

原始碼：[wei2004/hong-sheng-wei-portfolio](https://github.com/wei2004/hong-sheng-wei-portfolio)。網站部署位置：[洪聖崴個人履歷與作品集](https://wei2004.github.io/hong-sheng-wei-portfolio/)。最新部署是否完成，請查看儲存庫的 Actions → **Publish website (manual)**。

之後只維護這個專案；不需要另存「新版」「最終版」資料夾。GitHub 會保留每次提交的版本紀錄。

## 平常只要改這兩處

| 要改什麼 | 檔案 |
|---|---|
| 姓名、簡介、經歷、修課、Email、照片 | [`content/site.json`](content/site.json) |
| 檜山坊 | [`content/projects/brand.json`](content/projects/brand.json) |
| TapAble 黑客松 | [`content/projects/buildmode.json`](content/projects/buildmode.json) |
| 保包巴士 | [`content/projects/cardif.json`](content/projects/cardif.json) |
| 大學專題 | [`content/projects/consumer-research.json`](content/projects/consumer-research.json) |
| 漂綠研究 | [`content/projects/esg-research.json`](content/projects/esg-research.json) |

這些都是純文字 JSON。修改不需要 ChatGPT、Pro、AI API 或付費後台。React 負責排版，日常改字不必碰它。

## 第一次在電腦開啟

1. 從 [Node.js 官方網站](https://nodejs.org/) 安裝 Node.js 22 或更新的相容版本。
2. 進入 `hong-sheng-wei-portfolio` 資料夾（若使用 ZIP，先完整解壓）。
3. 空白處按右鍵 →「在終端機中開啟」。
4. 輸入下列指令。如果 PowerShell 擋住 `npm.ps1`，照範例使用 `npm.cmd` 即可，不必修改系統安全設定。

```powershell
npm.cmd ci
npm.cmd run dev
```

開啟 **http://127.0.0.1:8001/**。保留終端機視窗；改 JSON 存檔後網頁會自動更新。關掉終端機或重開電腦後，要再執行 `npm.cmd run dev`。本機連結只供這台電腦使用。

已安裝依賴後，也可以雙擊 [`preview.cmd`](preview.cmd)。

## 修改流程

1. 用文字編輯器開啟上述 JSON。
2. 只改雙引號內的文字，保留逗號與括號，存成 **UTF-8**。
3. 看本機預覽。
4. 執行正式建置檢查：

```powershell
npm.cmd run build
```

成功後會出現 `Content OK`、`Render OK`，網站產物在 `dist/`。建置會檢查中文問號損壞、素材、個人資料混入與所有頁面是否能產生。不要直接改 `dist/`，下次建置會覆蓋。

## 詳細教學

- [改字、照片、Email、競賽與段落](docs/EDITING.md)
- [放上 GitHub、下載預覽、手動發布與復原](docs/GITHUB.md)
- [原始版型與素材來源](docs/SOURCES.md)

## 檔案結構

```text
content/                 ← 日常內容，優先改這裡
public/assets/           ← 公開照片、證書、作品截圖
src/pages/Home.jsx       ← 學長首頁版型，已換成你的資料
src/pages/Project.jsx    ← 共用作品頁；檜山坊也用這份
src/pages/CV.jsx         ← 履歷排版
src/components/          ← 共用導覽、頁尾、圖片放大
src/data/profile.js      ← JSON 與版型之間的轉換
src/index.css            ← 共用外觀與列印樣式
tailwind.config.js       ← 學長原始配色
scripts/                 ← 中文、素材與頁面建置檢查
.github/workflows/       ← GitHub 檢查及手動發布
```

`node_modules/` 是自動下載的工具；`dist/` 是自動產生的網站；`.qa/` 是建置檢查用的頁面。三者都不用上傳 GitHub。

## 目前內容範圍

- 三項競賽：檜山坊、TapAble、保包巴士；團隊成果與個人參與分開。
- 科技法律學程為「修習中」。
- 沒有公開 Email 時隱藏按鈕；沒有個人照片時顯示姓名字樣。
- 研究資料只使用可公開的敘述。母檔、私人研究附件與內部討論未加入專案。
- Demo 和影片是團隊原有公開連結，沒有搬成獨立開發的個人成果。

頁面使用 `#/projects/brand` 這類網址，讓 GitHub Pages 不需要額外伺服器設定，重新整理作品頁也不會因路由失敗。

## 常見狀況

- **連不上 8001**：先執行 `npm.cmd run dev`；這不是外部網站。
- **8001 被占用**：關閉舊的預覽視窗；或 `npm.cmd run dev -- --port 8002`，再開 8002。
- **看到問號**：建置會指出問題檔案。從備份或 GitHub History 還原正確文字，存成 UTF-8；單純換字型無法還原已變成問號的資料。
- **出現 JSON 錯誤**：通常是少逗號、使用中文引號、或最後一項多逗號。
- **圖片破圖**：確認檔案放在 `public/assets/`，路徑大小寫與 JSON 一致。
- **只看舊內容**：確認正在開新版 8001；按 `Ctrl+F5`，並確認自己修改的是 `hong-sheng-wei-portfolio/content/`。

列印履歷：開啟網站「履歷」→「列印 / 存成 PDF」。列印有白底樣式；實際頁數仍依瀏覽器與印表機設定調整。
