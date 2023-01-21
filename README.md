Instagram App made and tested with https://github.com/Renewed-Scripts/qb-phone -- Renewed Qb-Phone

May still work with stock version of qb-phone https://github.com/qbcore-framework/qb-phone

--------------------------------------------------------------------------------------------------

Features

• Take and upload real time photos (or post using url)

• Report posts to admin (setup your own feature depending on how you want admin to be alerted)

• Delete posts you have put up

• Saved to database and fetched on restarts (duration can be edited inside the config.lua

--------------------------------------------------------------------------------------------------

W.I.P

• Likes and comments on photos

• And anything anyone can think of adding

--------------------------------------------------------------------------------------------------

Preview - https://streamable.com/l396rd

--------------------------------------------------------------------------------------------------

INSTALL INSTRUCTIONS

1: Drag and drop each file to the correct folder inside qb-phone

2: Upload the sql file to save and store instagram posts

3.a: Inside the config.lua paste this ```Config.PostDuration = 48``` this will show all posts inside this period (can be changed to how you like)

3.b: Inside the config.lua paste this inside the applications ```
    ["instagram"] = {
        app = "instagram",
        color = "#d62976",
        color2 = "#fa7e1e",
        icon = "fab fa-instagram",
        tooltipText = "Instagram",
        tooltipPos = "top",
        style = "padding-right: .08vh; font-size: 3.3vh";
        job = false,
        blockedjobs = {},
        slot = 10, -- what number you like
        Alerts = 0,
    },```

4.a: Inside the index.html file paste ```<link rel="stylesheet" href="./css/instagram.css">``` at the top. Should look like this
![image](https://user-images.githubusercontent.com/81892751/212876472-a0d6a4fe-aea7-43f4-aa53-226308f03dbf.png)

Then at the bottom of the index.html paste this ```<script src="./js/instagram.js"></script>``` Should look like this
![image](https://user-images.githubusercontent.com/81892751/212876849-dd16bee2-a04d-47a4-9cf6-01147a762933.png)

4.b: Inside the index.html find the search for ```twitter-app``` and underneath that post this (MAKE SURE YOU PLACE BETWEEN TWITTER-APP AND BANK-APP)
```lua
<div class="instagram-app">
    <div class="instagram-app-loading">
        <img src="../html/img/instagram_logo2.png" class="instagram-logo-loading">
    </div>
    <div class="instagram-app-loaded">
        <div class="instagram-home">
            <div class="instagram-header">
                <img src="../html/img/instagram_logo.png" class="instagram-logo">
                <div class="instagram-new-post" data-toggle="tooltip" title="New Post"> <i class="far fa-plus-square"></i></div>
            </div>
        </div>
        <div class="instagram-home-tab"></div>
        <div class="phone-menu-body" id="ig-box-textt">
            <div class="phone-menu-main">
                <input class="phone-menu-text ig-box-textt-input" type="text" maxlength="200"><i class="fas fa-sticky-note" id="phone-menu-icon"></i><span class="phone-menu-title">Message</span>
                <input class="phone-menu-text ig-box-image-input" type="text"><i class="fas fa-image" id="phone-menu-icon"></i><span class="phone-menu-title">URL (JPG/PNG)</span>
                <p> </p>
                <div class="phone-menu-button phone-menu-cancel" id="box-new-cancel">Cancel</div>
                <div class="phone-menu-button phone-menu-accept" id="instagram-camera"> <i class="fas fa-camera"></i></div>
                <div class="phone-menu-button phone-menu-accept" id="instagram-send">Send</div>
            </div>
        </div>
    </div> 
</div>
```
should look like this | Make sure its between the twitter and bank app
![image](https://user-images.githubusercontent.com/81892751/212889529-21982dfc-044d-49ec-8a6b-32f5f2a426e8.png)

5.a: Inside the app.js file search for ```if (PressedApplication == "twitter")``` Directly underneath that paste this ```lua
else if (PressedApplication == "instagram") {
  QB.Phone.Functions.LoadInstagram()
  $.post('https://qb-phone/GetPosts', JSON.stringify({}), function(Posts){
    QB.Phone.Functions.LoadPosts(Posts.PostData);
  });
}```
![image](https://user-images.githubusercontent.com/81892751/212877403-36f0617e-d79c-403d-975b-8d3d3b0ee6c5.png)

5.b: Inside app.js search for ```QB.Phone.Functions.Open = function(data)``` inside that function paste this ```QB.Phone.Functions.LoadPosts(data.Posts);```
Should look like this ![image](https://user-images.githubusercontent.com/81892751/212877958-e30dc033-429f-4935-814a-75ea7f3b89ca.png)

5.c: Inside app.js search for ```case "UpdateTweets":``` and paste ```
case "UpdatePosts":
  if (QB.Phone.Data.currentApplication == "instagram") {
    QB.Phone.Functions.LoadPosts(event.data.Posts);
  }
break;```  directly below. Should look like this
![image](https://user-images.githubusercontent.com/81892751/212878780-db5fa451-e8b6-40fa-b0b8-a585707c5d48.png)

6.a: Inside client/main.lua inside the PhoneData at the top paste ```Posts = {},```
![image](https://user-images.githubusercontent.com/81892751/212879246-5f931a49-ea1f-40ac-b93b-4e3ff2a65526.png)

6.b: Inside client/main.lua search for ```local function LoadPhone()``` and paste this ```if pData.Posts and next(pData.Posts) then
  PhoneData.Posts = pData.Posts
end``` below Tweets like this
![image](https://user-images.githubusercontent.com/81892751/212880028-9082e239-5b67-496a-8a7a-28f05bd6d674.png)

6.c: Inside client/main.lua search for ```local function OpenPhone()``` and paste this ```Posts = PhoneData.Posts,``` below Tweets like this
![image](https://user-images.githubusercontent.com/81892751/212880357-e1fbee4a-cfc1-44df-8deb-2cc72fa8caeb.png)

6.d: Inside client/main.lua search for the event ```RegisterNetEvent('QBCore:Client:OnPlayerUnload', function()``` and paste this ``` Posts = {},``` inside like this
![image](https://user-images.githubusercontent.com/81892751/212880659-c55f860c-bf53-4c25-9f32-dbeb2351cb94.png)

7: Inside server/main.lua search for the callback ```QBCore.Functions.CreateCallback('qb-phone:server:GetPhoneData', function(source, cb)``` and inside paste this ```Posts = Posts,``` like this
![image](https://user-images.githubusercontent.com/81892751/212880945-d465905e-626b-4a92-b58c-368b2424186f.png)

8: To stop your buttons looking like this

![image](https://user-images.githubusercontent.com/81892751/213141328-4e7306b0-6908-4402-85de-f0f038fe2d4d.png)

Inside the phone.css find ```.phone-menu-cancel``` and ```.phone-menu-accept``` and replace the buttons with this
```
.phone-menu-cancel{
    background:#d46215;
    margin-left: 15%;
    padding: 4.0%;
}
.phone-menu-cancel:hover{
    background: #c27e47;
}
.phone-menu-accept{
    background:#90e278;
    margin-left: 5%;
    padding: 4.0%;
}
.phone-menu-accept:hover{
    background: #6cac59;
}
