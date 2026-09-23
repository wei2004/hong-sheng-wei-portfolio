# GitHub 維護與手動發布

本專案使用 [wei2004/hong-sheng-wei-portfolio](https://github.com/wei2004/hong-sheng-wei-portfolio)，網站部署至 https://wei2004.github.io/hong-sheng-wei-portfolio/ 。最新上線狀態請看 Actions → **Publish website (manual)**。GitHub 的介面名稱若調整，以網站當下顯示為準。

## 已經放上 GitHub 後，平常怎麼改

1. 開啟上方儲存庫，進入 `content/site.json` 或 `content/projects/` 的作品檔案。
2. 按鉛筆圖示，改雙引號裡面的文字；保留逗號、括號與英文雙引號。
3. 按 **Commit changes**，寫一句修改說明，例如「更新研究經歷」，再儲存。
4. 到 **Actions → Check and preview**，等這次提交顯示綠色。紅色時先修正錯誤，不要發布。
5. 確定要更新公開網站時，到 **Actions → Publish website (manual) → Run workflow**，選 `main`，勾選 `confirm_public`，按執行。
6. 等這次發布顯示綠色，再打開網站；若仍看到舊內容，按 `Ctrl+F5`。

**改完按 Commit 只會更新儲存庫；第 5 步才會更新網站。** 不需要 Pro 或 AI 訂閱。

要交給學長維護，可在儲存庫 **Settings → Collaborators → Add people** 邀請他的 GitHub 帳號；對方接受後可協作，不需要共用你的密碼或登入憑證。

要在另一台電腦開發，安裝 Git 和 Node.js 22，開啟終端機後執行：

```powershell
git clone https://github.com/wei2004/hong-sheng-wei-portfolio.git
cd hong-sheng-wei-portfolio
npm.cmd ci
npm.cmd run dev
```

下方建立儲存庫與第一次上傳的教學供重建專案時參考；日常維護不必再建立新的儲存庫。

## 1. 哪些東西可以上傳

上傳這個 `hong-sheng-wei-portfolio` 資料夾的**內容**：`content/`、`public/`、`src/`、`scripts/`、`docs/`、`.github/` 與根目錄設定檔。GitHub 儲存庫根目錄要直接看得到 `package.json`，不要再多包一層資料夾。

本次已選定 C 版，對應公開儲存庫 `wei2004/hong-sheng-wei-portfolio`。只上傳本專案內的公開來源檔案。

不要上傳外層工作資料夾，不要混入 MASTER、原始交接 ZIP、`private_reference`、私人研究文件，也不要上傳 `.tools`、`node_modules`、`dist`、`.qa`。

**Public 儲存庫的原始碼、JSON、照片、PDF 會立即公開，即使還沒有發布網站。** `.gitignore` 只幫 Git 排除檔案，不會替瀏覽器手動上傳的檔案保密，也不會移除歷史版本。

## 2. 建立儲存庫

在 GitHub 選 New repository，名稱使用 `hong-sheng-wei-portfolio`，擁有者為 `wei2004`。尚未準備好公開就選 Private；網站要用哪種發布方式與方案，等決定公開時再確認。不要把「倉庫公開」當成單純的預覽步驟。

### 方法 A：Git（較完整）

先安裝 [Git](https://git-scm.com/downloads)，在本專案資料夾執行：

```powershell
git init
git add .
git status
git commit -m "Create personal portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

先把 `YOUR_ACCOUNT`、`YOUR_REPOSITORY` 換成自己的帳號和倉庫名稱。`git status` 時確認沒有私人資料，再提交。認證由 GitHub 的正常登入流程處理，不要把密碼或 token 寫入程式碼。

### 方法 B：GitHub 網頁上傳

選 Add file → Upload files，把專案內檔案與資料夾拖入。若隱藏檔 `.github` 沒有成功上傳，可用 Add file → Create new file，照本機的路徑和內容補上：

- `.github/workflows/check.yml`
- `.github/workflows/deploy.yml`

不要只上傳 `dist/`，那樣會丟失容易修改的來源資料。

## 3. 不開電腦程式也能改字

1. 在 GitHub 開啟 `content/site.json` 或作品 JSON。
2. 按鉛筆 Edit，改雙引號裡的文字。
3. 按 Commit changes 儲存。
4. 到 Actions 看 **Check and preview**。
5. 綠色代表建置和中文等檢查通過；紅色打開失敗步驟看是哪個檔案錯誤。

這個流程不需要 Pro 或 AI。儲存內容不會自動發布網站。

## 4. 下載建置好的預覽

在成功的 **Check and preview** 執行紀錄底部，下載 `website-preview` artifact 並解壓。這是靜態網站產物。

不要直接雙擊 HTML 使用 `file://`，瀏覽器可能擋住 JavaScript 模組。若有 Python，可在解壓目錄執行：

```powershell
python -m http.server 8002 --bind 127.0.0.1
```

再開 `http://127.0.0.1:8002/`。或者使用本機原始專案的 `npm.cmd run dev` 預覽。

## 5. 看過以後才發布

1. 先確認 `content/` 和 `public/assets/` 的內容都願意公開。
2. 儲存庫 Settings → Pages → Source 選 **GitHub Actions**。
3. Actions → **Publish website (manual)** → Run workflow。
4. 選擇 `main`，勾選 `confirm_public`，再執行。
5. 成功後到部署紀錄開啟網站網址。

工作流程只有手動觸發，沒有 push 自動發布。之後每次修改仍要手動執行，網站才會更新。

`index.html` 目前有 `noindex, nofollow`，用來要求搜尋引擎不要收錄。它**不是存取保護**；公開網站照樣能被任何持有網址的人開啟。願意被搜尋到時再修改這個標籤。

網站採相對資源路徑和 HashRouter，可以部署在 `帳號.github.io/倉庫名稱/`；作品網址包含 `#/projects/brand`，無須另設路由轉址。

## 6. 改壞怎麼辦

- **尚未提交**：用編輯器 Undo。
- **已在 GitHub 提交**：開啟檔案 History，找到正常版本，複製正確內容回去，再提交。
- **已發布錯誤版本**：先復原來源，確認 Check and preview 通過，再手動發布一次。
- **檢查失敗**：停止發布，不必修伺服器；先修 JSON 或缺少的素材。

請保留 `package-lock.json`，它固定已測試過的相依套件版本。日常改字不需要升級套件。

官方說明：[編輯檔案](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)、[手動執行工作流程](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)、[Pages 自訂工作流程](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
