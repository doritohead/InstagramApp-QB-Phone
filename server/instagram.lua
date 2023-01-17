local QBCore = exports['qb-core']:GetCoreObject()

Posts = {}

-- Events

CreateThread(function()
    local instasSelected = MySQL.query.await('SELECT * FROM phone_instagram WHERE `date` > NOW() - INTERVAL ? hour', {Config.PostDuration})
    Posts = instasSelected
end)

RegisterNetEvent('qb-phone:server:DeletePost', function(postId)
    local src = source
    local CID = QBCore.Functions.GetPlayer(src).PlayerData.citizenid
    local delete = false
    for i = 1, #Posts do
        if Posts[i].postId == postId and Posts[i].citizenid == CID then
            table.remove(Posts, i)
            MySQL.query.await('DELETE FROM phone_instagram where postId = ?', {postId})
            delete = true
            break
        end
    end
    if not delete then return end
    print(postId)
    TriggerClientEvent('qb-phone:client:UpdatePosts', -1, src, Posts, true)
end)

RegisterNetEvent('qb-phone:server:UpdatePosts', function(PostData)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    
    print(json.encode(PostData.url))
    MySQL.insert('INSERT INTO phone_instagram (citizenid, firstName, lastName, message, url, postid, type) VALUES (?, ?, ?, ?, ?, ?, ?)', {
        PostData.citizenid,
        PostData.firstName:gsub("[%<>\"()\'$]",""),
        PostData.lastName:gsub("[%<>\"()\'$]",""),
        PostData.message:gsub("[%<>\"()\'$]",""),
        PostData.url,
        PostData.postId,
        PostData.type,
    }, function(id)
        if id then
            Posts[#Posts+1] = {
                id = id,
                citizenid = PostData.citizenid,
                firstName = PostData.firstName:gsub("[%<>\"()\'$]",""),
                lastName = PostData.lastName:gsub("[%<>\"()\'$]",""),
                message = PostData.message:gsub("[%<>\"()\'$]",""),
                url = PostData.url,
                postId =PostData.postId,
                type = PostData.type,
                date = os.date('%Y-%m-%d %H:%M:%S')
            }

            TriggerClientEvent('qb-phone:client:UpdatePosts', -1, src, Posts, false)
        end
    end)
end)