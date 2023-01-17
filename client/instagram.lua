local QBCore = exports['qb-core']:GetCoreObject()

-- Functions

local function escape_str(s)
	return s
end

local function GeneratePostId()
    local postId = "INSTA-"..math.random(11111111, 99999999)
    return postId
end

-- NUI Callback

RegisterNUICallback('GetPosts', function(_, cb)

    cb({
        PostData = PhoneData.Posts,
    })
end)

RegisterNUICallback('PostNewPost', function(data, cb)

    local URL

    if data.url ~= "" and string.match(data.url, '[a-z]*://[^ >,;]*') then
        URL = data.url
    else
        URL = ""
    end

    local PostMessage = {
        firstName = PhoneData.PlayerData.charinfo.firstname,
        lastName = PhoneData.PlayerData.charinfo.lastname,
        citizenid = PhoneData.PlayerData.citizenid,
        message = escape_str(data.Message):gsub("[%<>\"()\'$]",""),
        time = data.Date,
        postId = GeneratePostId(),
        type = data.type,
        url = URL
    }

    TriggerServerEvent('qb-phone:server:UpdatePosts', PostMessage)
    cb("ok")
end)

RegisterNUICallback('DeletePost',function(data)
    print(data.id)
    TriggerServerEvent('qb-phone:server:DeletePost', data.id)
end)

RegisterNUICallback('FlagPost',function(data, cb)
    SendNUIMessage({
        action = "PhoneNotification",
        PhoneNotify = {
            title = "Instagram",
            text = data.name.."'s Post has been reported",
            icon = "fab fa-instagram",
            color = "#1DA1F2",
            timeout = 2500,
        },
    })
    cb('ok')
end)

-- Events

RegisterNetEvent('qb-phone:client:UpdatePosts', function(src, Posts, delete)
    if not PhoneData or not FullyLoaded then return end
    PhoneData.Posts = Posts
    local MyPlayerId = PlayerData.source or -1


    if delete and src == MyPlayerId then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Instagram",
                text = "Post deleted!",
                icon = "fab fa-instagram",
                color = "#1DA1F2",
                timeout = 2500,
            },
        })
    end

    SendNUIMessage({
        action = "UpdatePosts",
        Posts = PhoneData.Posts,
    })

    if delete then return end

    local NewPostData = Posts[#Posts]
    local newFirst, newLast = NewPostData.firstName:gsub("[%<>\"()\'$]",""), NewPostData.lastName:gsub("[%<>\"()\' $]","")


    if not delete and src == MyPlayerId then return end

    if not delete then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "@"..newFirst.." "..newLast,
                text = NewPostData.message:gsub("[%<>\"()\'$]",""),
                icon = "fab fa-instagram",
                color = "#1DA1F2",
            },
        })
    end
end)