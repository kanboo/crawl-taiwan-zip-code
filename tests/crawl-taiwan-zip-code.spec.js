const { test, expect } = require('@playwright/test');
const fs = require('fs');

// 1. 先前往目標網頁
const BASE_URL = 'https://www.post.gov.tw/post/internet/Insurance_Appointment/aon_map.jsp';

test('爬取台灣郵遞區號', async ({ page }) => {
  await page.goto(BASE_URL);

  // 2. 撈取 id 為 maptype 底下的所有 a 標籤
  const countyLinks = await page.$$eval('#maptype a', as =>
    as.map(a => ({
      name: a.textContent.trim(),
      href: a.getAttribute('href')
    }))
  );

  const result = [];

  for (const county of countyLinks) {
    // 3. 依序點擊每個 a 標籤，進入該縣市的郵遞區號頁面
    const countyUrl = new URL(county.href, BASE_URL).href;
    await page.goto(countyUrl);

    // 4. 撈取 name 為 cityarea2 的 select 標籤，排除「全部」
    const areaOptions = await page.$$eval('select[name="cityarea2"] option', opts =>
      opts.filter(o => o.value !== '%').map(o => o.value)
    );

    for (const district of areaOptions) {
      // 5. 選擇區域，點擊查詢
      await page.selectOption('select[name="cityarea2"]', district);
      await Promise.all([
        page.waitForNavigation(),
        page.click('input[type="submit"][value="查詢"]')
      ]);

      // 6. 撈取第一個 id 為 postarea 的 td 標籤，取得文字
      const zipcode = await page.$eval('#postarea', el => el.textContent.trim());

      // 7. 組成字典
      result.push({
        county: county.name,
        district,
        zipcode
      });
    }
  }

  // 9. 輸出到 zipcode.json
  fs.writeFileSync('zipcode.json', JSON.stringify(result, null, 2), 'utf-8');
  expect(result.length).toBeGreaterThan(0);
});
