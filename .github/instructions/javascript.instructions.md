---
applyTo: '**.js,**.vue'
---

# JavaScript 程式碼風格指令

## 基本語法規範
- 使用 **2 個空格** 縮排，絕對不使用 Tab
- 使用 **camelCase** 命名變數和函數
- 使用 **PascalCase** 命名類別和構造函數

## 變數宣告規範
- 優先使用 `const`，需要重新賦值時使用 `let`
- **絕對避免使用 `var`**
- 每個變數都要有明確的宣告
- 使用具有描述性的變數名稱

## 函數撰寫規範
- 優先使用箭頭函數 `() => {}` 除非需要 `this` 綁定
- 函數名稱要清楚表達功能：`getUserData()`, `calculateTotal()`
- 單一職責原則：每個函數只做一件事
- 函數長度不超過 20 行

## ES6+ 現代語法要求
- 使用**解構賦值**提取物件和陣列元素
- 使用**樣板字面值**進行字串插值
- 使用**展開運算子**處理陣列和物件
- 使用 `async/await` 而非 Promise.then()

## 錯誤處理
- 所有 async 函數都要使用 try-catch
- 提供有意義的錯誤訊息
- 避免靜默忽略錯誤
- 使用適當的錯誤類型

## 程式碼組織
- 相關功能要放在同一個模組
- 使用 ES6 模組語法 import/export
- 避免全域變數

## JSDOC
- 所有函數都要有 JSDoc 註解
- 所有函式、類別與方法皆需使用一致格式的 JSDoc 註解
- 使用 @param、@returns、@throws、@example 標籤完整記錄函式行為
- 若未使用 TypeScript，請使用 @typedef 撰寫複雜物件結構說明
- 將文件產生流程整合至建置流程中，以確保文件時常更新
- 複雜邏輯需要行內註解說明
- 使用繁體中文撰寫註解
- 註解要解釋「為什麼」而不只是「做什麼」

## Vue 程式碼風格標準（VUE_CODING_STANDARDS）
- 優先使用 Composition API 以提升型別推斷與程式碼重用性
- 使用 defineProps 與 defineEmits 宏來實現具型別安全的 props 與事件
- 使用 defineOptions 來設定其他元件選項
- 對於原始值使用 ref 而非 reactive，以避免非預期的值展開
- 在渲染大量列表時，使用 v-memo 提升效能
- 對於不需要深層響應的大型物件，使用 shallowRef 優化效能

## Tailwind CSS 指引（TAILWIND）
- 使用 @layer 指令依據 base、components、utilities 分層整理樣式
- 啟用 Just-in-Time（JIT）模式以提升開發效率並減少 CSS 體積
- 使用中括號（如：`w-[123px]`）自定義精確尺寸
- 使用 @apply 指令在元件中重用常用的 utility 組合
- 使用 Tailwind 設定檔自訂主題、外掛與變化項
- 抽離常用樣式為元件，避免重複撰寫 utility 類別
- 在 CSS 中使用 theme() 函式存取 Tailwind 主題值
- 使用響應式變體（如：sm:、md:、lg:）實作自適應設計
- 使用狀態變體（如：hover:、focus:、active:）設計互動效果

## SCSS 指引（SCSS）
- 使用 ThemeProvider 提供一致性的主題支援
- 使用 css helper 在元件間共用樣式
- 使用 props 在樣板字串中實作條件樣式
- 使用 createGlobalStyle 定義全域樣式
- 使用 attrs 方法將 HTML 屬性傳遞至 DOM 元素
- 使用 as 屬性動態指定元件渲染型態
- 使用 styled(Component) 語法擴展現有元件
- 使用 css prop 實作一次性樣式設定
- 使用 & 字元進行選擇器巢狀撰寫
- 使用 keyframes helper 建立動畫效果
