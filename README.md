# crawl-taiwan-zip-code

這是一個練習用的專案，主要目的是透過自動化工具（如 Playwright）來爬取台灣郵遞區號相關資訊，並將結果匯出為 JSON 檔案。

## 使用注意事項

- 本專案僅供學習與練習自動化爬蟲技術，請勿用於商業或非法用途。
- 執行前請先安裝相依套件：
  ```sh
  npm install
  ```
- 若需執行測試，請使用下列指令：
  ```sh
  npx playwright test
  ```
- 爬取過程可能會因網站結構變動而失敗，請適時檢查與調整爬蟲程式碼。
- 匯出的 JSON 檔案位於 `exports/tw-zipcode.json`。
- 測試報告會產生於 `playwright-report/` 目錄下，可用瀏覽器開啟 `index.html` 查看。

## 目錄結構簡介
- `exports/`：儲存爬取結果的資料夾。
- `tests/`：放置 Playwright 測試程式碼。
- `playwright-report/`：自動化測試報告。
