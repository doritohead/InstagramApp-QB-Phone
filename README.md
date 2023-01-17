Instagram App made and tested with https://github.com/Renewed-Scripts/qb-phone -- Renewed Qb-Phone

May still work with stock version of qb-phone https://github.com/qbcore-framework/qb-phone





INSTALL INSTRUCTIONS

1: Drag and drop each file to the correct folder inside qb-phone

2: Upload the sql file to save and store instagram posts

3: Inside the config.lua paste this ```Config.PostDuration = 48``` this will show all posts inside this period (can be changed to how you like)

4: Inside the index.html file paste ```<link rel="stylesheet" href="./css/instagram.css">``` at the top. Should look like this
![image](https://user-images.githubusercontent.com/81892751/212876472-a0d6a4fe-aea7-43f4-aa53-226308f03dbf.png)

Then at the bottom of the index.html paste this ```<script src="./js/instagram.js"></script>``` Should look like this
![image](https://user-images.githubusercontent.com/81892751/212876849-dd16bee2-a04d-47a4-9cf6-01147a762933.png)

5.a: Inside the app.js file search for ```if (PressedApplication == "twitter")``` Directly underneath that paste this ```
else if (PressedApplication == "instagram") {
  QB.Phone.Functions.LoadInstagram()
  $.post('https://qb-phone/GetPosts', JSON.stringify({}), function(Posts){
    QB.Phone.Functions.LoadPosts(Posts.PostData);
  });
}```
![image](https://user-images.githubusercontent.com/81892751/212877403-36f0617e-d79c-403d-975b-8d3d3b0ee6c5.png)

5.b: Inside app.js search for ```QB.Phone.Functions.Open = function(data)``` inside that function paste this ```QB.Phone.Functions.LoadPosts(data.Posts);```
Should look like this ![image](https://user-images.githubusercontent.com/81892751/212877958-e30dc033-429f-4935-814a-75ea7f3b89ca.png)

5.c: Inside app.js search for `````` and paste ```
case "UpdatePosts":
  if (QB.Phone.Data.currentApplication == "instagram") {
    QB.Phone.Functions.LoadPosts(event.data.Posts);
  }
break;```  directly below. Should look like this
![image](https://user-images.githubusercontent.com/81892751/212878780-db5fa451-e8b6-40fa-b0b8-a585707c5d48.png)

6.a: Inside client/main.lua inside the PhoneData at the top paste ```Posts = {}```
![image](https://user-images.githubusercontent.com/81892751/212879246-5f931a49-ea1f-40ac-b93b-4e3ff2a65526.png)

6.b: Inside client/main.lua search for ```local function LoadPhone()``` and paste this ```if pData.Posts and next(pData.Posts) then
  PhoneData.Posts = pData.Posts
end``` below Tweets like this
![image](https://user-images.githubusercontent.com/81892751/212880028-9082e239-5b67-496a-8a7a-28f05bd6d674.png)

6.c: Inside client/main.lua search for ```local function OpenPhone()``` and paste this ```Posts = PhoneData.Posts,``` below Tweets like this
![image](https://user-images.githubusercontent.com/81892751/212880357-e1fbee4a-cfc1-44df-8deb-2cc72fa8caeb.png)

6.d: Inside client/main.lua search for the event ```RegisterNetEvent('QBCore:Client:OnPlayerUnload', function()``` and paste this ``` Posts ={}``` inside like this
![image](https://user-images.githubusercontent.com/81892751/212880659-c55f860c-bf53-4c25-9f32-dbeb2351cb94.png)

7: Inside server/main.lua search for the callback ```QBCore.Functions.CreateCallback('qb-phone:server:GetPhoneData', function(source, cb)``` and inside paste this ```Posts = Posts,``` like this
![image](https://user-images.githubusercontent.com/81892751/212880945-d465905e-626b-4a92-b58c-368b2424186f.png)
