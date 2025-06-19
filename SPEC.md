1. 先前往 https://www.post.gov.tw/post/internet/Insurance_Appointment/aon_map.jsp 網頁
2. 撈取 id 為 maptype 底下的所有 a 標籤，格式如下：
```html
<a href="aon_map_main.jsp?search_type=000000&amp;search_text=%E9%80%A3%E6%B1%9F%E7%B8%A3&amp;topage=1&amp;ID=1301" target="_self" alt="連江縣">連江縣</a>
```
3. 依序點擊每個 a 標籤，進入該縣市的郵遞區號頁面
4. 撈取 name 為 cityarea2 的 select 標籤，格式如下：
```html
<select name="cityarea2" id="null" <!--onchange="" --="">&gt;

	<option value="%">全部</option>

	<option value="南竿鄉" selected="">南竿鄉</option><option value="北竿鄉">北竿鄉</option><option value="莒光鄉">莒光鄉</option><option value="東引鄉">東引鄉</option>
</select>
```
5. 排除「全部」的選項，依序點擊每個 option 標籤，點擊查詢按鈕，會跳轉到郵遞區號頁面
```html
<input type="submit" value="查詢">
```
6. 撈取第一個 id 為 postarea 的 td 標籤，取得文字
```html
<td align="center" id="postarea">20941</td>
```
7. 將縣市名稱、區域名稱、郵遞區號組成一個字典，格式如下：
```json
{
    "county": "連江縣",
    "district": "南竿鄉",
    "zipcode": "20941"
}
```
8. 將所有縣市的郵遞區號字典組成一個列表，格式如下：
```json
[
    {
        "county": "連江縣",
        "district": "南竿鄉",
        "zipcode": "20941"
    },
    {
        "county": "連江縣",
        "district": "北竿鄉",
        "zipcode": "20942"
    },
    ...
]
```
9. 將列表轉換為 JSON 格式，並輸出到 `zipcode.json` 檔案中。