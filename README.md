# 複習小島｜115 學年度六上

給國小六年級學生使用的靜態複習網站。直接由 GitHub Pages 提供，不需安裝、登入或後端服務。每個孩子的答題紀錄只存在自己瀏覽器的 localStorage；不會上傳至 GitHub。進度頁提供 JSON 備份及匯入。

## 課程範圍

- 南一國語六上第 1–6 課：在天晴了的時候、珍珠鳥、客至、贏得喝采的輸家、哇！原來如此、登月先鋒。
- 康軒自然六上第 1–2 單元：探索天氣的變化、水溶液。
- 南一社會六上第 1–2 單元：日治時期臺灣的發展與變遷、邁向民主的社會。

國語第 2、6 課於 115 學年度有內容調整；重點採原創文字概述，不重製課本全文。使用時以學生手上的課本、學校授課進度為準。社會課名以南一出版社 115 上課本目錄核對。

## 內容來源與範圍提醒

- 南一國語 115 上課本：[南一官方教材搜尋](https://shop.nani1953.com.tw/search?q=6%E4%B8%8A%E5%9C%8B%E8%AA%9E)
- 南一社會 115 上課本及目錄：[南一官方教材頁](https://shop.nani1953.com.tw/products/6%E4%B8%8A%E7%A4%BE%E6%9C%83%E4%B8%83%E8%AA%B2%E6%9C%AC115%E4%B8%8A%E9%81%A9%E7%94%A8)
- 康軒自然六上公開課程目錄：[學習吧](https://www.learnmode.net/course/592080/content)
- 公開段考試卷入口：[米蘭老師教育資訊室](https://melances.com/grade6/)。分類有南一國語、康軒自然、南一社會及不同年度的學校試卷。題庫連結只作練習參考，舊卷不保證與 115 學年度單元或臺南學校進度完全相同。

網站內互動題均為自行編寫的概念複習題，並非歷屆考題。外部試卷及答案屬原提供者或相關權利人所有，網站只提供連結。

## GitHub Pages

Repository → Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/(root)`。

首頁是 `index.html`，無 build step、框架或第三方 runtime dependency。樣式及字型設有系統字型 fallback。
