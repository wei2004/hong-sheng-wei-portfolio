# 自己修改網站

## 1. JSON 最小規則

- 欄位名稱不要改；修改雙引號中的值。
- 使用英文半形 `"`、`,`、`:`、`[`、`]`。
- `null`、`true`、`false` 不加引號。
- 每一項用逗號隔開，但最後一項後面不要逗號。
- 檔案用 UTF-8 儲存。不要把包含中文的指令經過舊版 PowerShell 預設管線送到 Python，該管線可能把中文轉成問號。

## 2. 修改首頁與聯絡資料

開啟 `content/site.json`：

| 欄位 | 用途 |
|---|---|
| `name` | 姓名 |
| `intro` | 首頁大標下的介紹 |
| `about` | 關於我，每個字串是一段 |
| `focus` | 四個學習面向 |
| `experience` | 經歷；`description` 寫內容、`duration` 或 `period` 寫期間 |
| `education` | 學校、畢業年、法律學程與課程 |
| `course_highlights` | 精選課程與成績 |
| `certifications`、`language` | 證照與語言 |
| `resume_summary` | 履歷頁摘要 |
| `project_order` | 作品排序，依 slug 排列 |

原 Python 版留下的 `hero_title`、`headline`、`highlights`、`allow_indexing` 目前不驅動 React 首頁；首頁主標、成果統計在 `src/pages/Home.jsx`。搜尋引擎設定改 `index.html` 的 robots。

### Email

`contact.email` 原本是 `null`，改成願意公開的真實 Email 就會出現聯絡按鈕。範例僅展示格式，不要直接填假資料：

```json
"contact": {
  "email": "your-name@example.com",
  "phone": null,
  "github": null,
  "linkedin": null
}
```

`github` 也可以填自己的完整網址；不填就維持 `null`。電話填入後會顯示在履歷；LinkedIn 目前保留欄位，尚未放到版面。

### 個人照片

把照片放入 `public/assets/profile/portrait.jpg`，再把 `portrait` 改成：

```json
"portrait": {
  "path": "assets/profile/portrait.jpg",
  "alt": "洪聖崴個人照片",
  "caption": "洪聖崴"
}
```

不要在 path 前加 `public/`。沒有照片保持 `null` 即可，網站會顯示「崴」字。

## 3. 修改作品

每項作品位於 `content/projects/`。範例優先看 `brand.json`（檜山坊）或 `buildmode.json`（含 Demo）。

| 欄位 | 顯示在哪裡 |
|---|---|
| `slug` | 網址；必須和 JSON 檔名相同 |
| `category` | `competition` 是代表作卡片；`research` 是研究清單 |
| `visible` | `false` 隱藏卡片及頁面；不等於資料保密 |
| `title`、`short` | 詳細頁標題、短標題 |
| `event`、`date`、`award`、`team` | 活動、日期、團隊成果、團隊名稱 |
| `description` | 首頁卡片短介紹 |
| `intro` | 作品頁開頭 |
| `personal_contribution` | 你的個人參與；未知用 `null`，不要複製他人的分工 |
| `cover` | 卡片封面與詳細頁圖片 |
| `stats` | 詳細頁的重點數字或資訊 |
| `sections` | 依順序排列的正文段落 |
| `gallery` | 作品及活動圖片 |
| `evidence` | 證書圖片或 PDF |
| `actions` | 頁首 Demo、影片、原始碼按鈕（選填） |
| `links` | 頁尾相關連結 |

### 新增文字段落

在 `sections` 陣列加一個物件：

```json
{
  "title": "這次提案學到什麼",
  "paragraphs": ["第一段文字。", "第二段文字。"]
}
```

也可以加 `cards` 做成並排重點：

```json
{
  "title": "我的參與",
  "cards": [
    { "title": "工作項目", "text": "具體說明實際做過的事情。" }
  ]
}
```

`facts` 是「標籤＋內容」的資訊列，`note` 是補充說明。可以參考 `esg-research.json`。

### 新增圖片

放入 `public/assets/作品資料夾/` 後，在 `gallery` 或某一段的 `images` 加入：

```json
{
  "path": "assets/hinoki/final-presentation.png",
  "alt": "檜山坊競賽決賽簡報現場",
  "caption": "團隊說明提案成本與預期效益，數字為預估。"
}
```

`alt` 提供給螢幕閱讀器，`caption` 顯示在圖片下。`width`、`height` 可省略；填寫時需符合圖片的實際像素。手機會自動排成單欄，圖片可點擊放大。

### 新增證書 PDF

放入 `evidence`，範例如下：

```json
{
  "path": "assets/buildmode/participation-and-award.pdf",
  "alt": "ChatKTV 第二名獲獎證明",
  "caption": "ChatKTV 第二名獲獎證明",
  "page": 2,
  "preview": "assets/buildmode/certificate-preview.png"
}
```

`preview` 是另外存好的圖片，不會自動把 PDF 轉圖；沒有圖片就省略，網站仍會提供 PDF 連結。

## 4. 新增或暫時隱藏競賽

1. 複製最接近的作品 JSON，例如 `brand.json`，另存 `new-project.json`。
2. 把 `slug` 改成 `new-project`，依事實填入所有內容。
3. 沒有圖片可設 `cover: null`；`gallery`、`evidence`、`links` 可用空陣列 `[]`。
4. 在 `site.json` 的 `project_order` 加入 `"new-project"`。
5. `category: "competition"` 會自動加入競賽卡片，`category: "research"` 會加入研究清單。
6. 執行 `npm.cmd run build` 檢查。

暫時隱藏用 `"visible": false`。JSON 仍在儲存庫，建置工具也可能包含原始資料；**不能用這個開關藏私人資料**。內部備註及選校評估根本不要放進專案。

目前首頁標題「三項競賽作品」是文字。新增第 4 項時，也記得在 `src/pages/Home.jsx` 改這個標題；卡片和統計數量會自動更新。

## 5. 改配色與排版

- `tailwind.config.js`：`brand` 金色、`cyan` 青色、`ink` 背景。
- `src/pages/Home.jsx`：首頁布局。
- `src/pages/Project.jsx`：所有作品頁共用布局。
- `src/pages/CV.jsx`：履歷布局。
- `src/index.css`：全站效果與列印樣式。

一般內容更新不用改以上檔案。先改 JSON，再檢查本機預覽即可。
