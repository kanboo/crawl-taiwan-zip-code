const { test, expect } = require('@playwright/test');
const fs = require('fs');

// 1. 先前往目標網頁
const BASE_URL = 'https://www.post.gov.tw/post/internet/Insurance_Appointment/aon_map.jsp';

test('爬取台灣郵遞區號', async ({ page }) => {
  await page.goto(BASE_URL);

  // 2. 撈取 id 為 maptype 底下的所有 a 標籤（改用 page.locator）
  const countyLinksLocator = page.locator('#maptype a');
  const countyCount = await countyLinksLocator.count();
  const countyLinks = [];
  for (let i = 0; i < countyCount; i++) {
    const a = countyLinksLocator.nth(i);
    countyLinks.push({
      name: (await a.textContent()).trim(),
      href: await a.getAttribute('href')
    });
  }

  const result = [];

  for (const county of countyLinks) {
    // 3. 依序點擊每個 a 標籤，進入該縣市的郵遞區號頁面
    const countyUrl = new URL(county.href, BASE_URL).href;
    await page.goto(countyUrl);

    // 4. 撈取 name 為 cityarea2 的 select 標籤，排除「全部」（改用 page.locator）
    const areaOptionsLocator = page.locator('select[name="cityarea2"] option');
    const areaCount = await areaOptionsLocator.count();
    const areaOptions = [];
    for (let i = 0; i < areaCount; i++) {
      const option = areaOptionsLocator.nth(i);
      const value = await option.getAttribute('value');
      if (value !== '%') {
        areaOptions.push(value);
      }
    }

    for (const district of areaOptions) {
      // 5. 選擇區域，點擊查詢
      await page.selectOption('select[name="cityarea2"]', district);
      await page.click('input[type="submit"][value="查詢"]');

      await page.waitForLoadState('networkidle');

      // 6. 撈取所有 id 為 postarea 的 td 標籤，取第一個的前三碼，取不到給空字串
      const zipcodeTds = await page.locator('td#postarea');
      let zipcode = '';
      if (await zipcodeTds.count() > 0) {
        const text = (await zipcodeTds.nth(0).textContent())?.trim() || '';
        zipcode = text.substring(0, 3);
      }
      console.log('county:', county.name, 'district:', district, 'zipcode:', zipcode);

      // 7. 組成字典
      result.push({
        county: county.name,
        district,
        zipcode
      });

      // 8. 當 zipcode 為空字串時，回到上一頁
      if (zipcode === '') {
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    }
  }

  // 9. 輸出到 zipcode.json
  fs.writeFileSync('zipcode.json', JSON.stringify(result, null, 2), 'utf-8');
  expect(result.length).toBeGreaterThan(0);
});
