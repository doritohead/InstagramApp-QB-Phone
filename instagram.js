// Functions
function ConfirmationFrame() {
    $('.spinner-input-frame').css("display", "flex");
    setTimeout(function () {
        $('.spinner-input-frame').css("display", "none");
        $('.checkmark-input-frame').css("display", "flex");
        setTimeout(function () {
            $('.checkmark-input-frame').css("display", "none");
        }, 2000)
    }, 1000)
}

QB.Phone.Functions.LoadInstagram = function() {
    $(".instagram-app-loaded").css({"display":"none", "padding-left":"30vh"});
    $(".instagram-home").css({"left":"30vh"});
    $(".instagram-logo-loading").css({"left": "9vh"});
    $(".instagram-app-loading").css({
        "display":"block",
        "left":"9vh",
    });
    setTimeout(function(){
        setTimeout(function(){
            $(".instagram-app-loaded").css({"display":"block"}).animate({"padding-left":"0"}, 300);
            $(".instagram-home").animate({left:0+"vh"}, 300);
            $(".instagram-app-loading").animate({
                left: -30+"vh"
            },300, function(){
                $(".instagram-app-loading").css({"display":"none"});
            });
        }, 1500)
    }, 500)
}

QB.Phone.Functions.LoadPosts = function(Posts) {
    Posts = Posts.reverse();

    if (Posts !== null && Posts !== undefined && Posts !== "" && Posts.length > 0) {
        $(".instagram-home-tab").html("");
        $.each(Posts, function(i, Post){
            
            var TimeAgo = moment(Post.date).format('MM/DD/YYYY hh:mm');
            var InstaHandle = Post.firstName + ' ' + Post.lastName
            if (Post.message == "") {
                var IGMessage = Post.message
            } else {
                let captionName = InstaHandle.bold()
                var IGMessage = captionName.replace(" ", "_") + ' ' + Post.message
            }
            if (Post.citizenid === QB.Phone.Data.PlayerData.citizenid){
                var PostElement = '<div class="instagram-post" data-igcid="'+Post.citizenid+'" data-igid ="'+Post.postId+'" data-ighandler="'+InstaHandle.replace(" ", "_") + '" data-type ="'+Post.type+'">'+
                        '<div class="instagram-poster-picture"><i class="fas fa-user"></i></div>' +
                        '<div class="insta-poster">' + ' &nbsp;<span>'+InstaHandle.replace(" ", "_")+ '</span></div>'+ // Title
                        '<div class="insta-post-options"><i class="fas fa-ellipsis-v"></i></div>' +
                        '<img class="insta-image" src= ' + Post.url + ' style = " display: block; width: 100%; z-index: 1; left:-8px; height: auto;">' +
                        '<div class="insta-post-footer">' +
                            '<div class="insta-like"><i class="far fa-heart"></i></div>' +
                            '<div class="insta-comment"><i class="far fa-comment"></i></div>' +
                            '<div class="insta-delete"><i class="fas fa-trash"></i></div>' +
                            '<div class="insta-caption">' + IGMessage + '</div>' +
                            '<div class="insta-time">' + TimeAgo + '</div>' +
                        '</div>' +
                    '</div>';
                $(".instagram-home-tab").append(PostElement);
            }else{
                var PostElement = '<div class="instagram-post" data-igcid="'+Post.citizenid+'" data-igid ="'+Post.postId+'" data-ighandler="'+InstaHandle.replace(" ", "_") + '" data-type ="'+Post.type+'">'+
                    '<div class="instagram-poster-picture"><i class="fas fa-user"></i></div>' +
                    '<div class="insta-poster">' + ' &nbsp;<span>'+InstaHandle.replace(" ", "_")+ '</span></div>'+ // Title
                    '<div class="insta-post-options"><i class="fas fa-ellipsis-v"></i></div>' +
                    '<img class="insta-image" src= ' + Post.url + ' style = " display: block; width: 100%; z-index: 1; left:-8px; height: auto;">' +
                    '<div class="insta-post-footer">' +
                        '<div class="insta-like"><i class="far fa-heart"></i></div>' +
                        '<div class="insta-comment"><i class=far fa-comment"></i></div>' +
                        '<div class="insta-caption">' + IGMessage + '</div>' +
                        '<div class="insta-time">' + TimeAgo + '</div>' +
                    '</div>' +
                '</div>';
            $(".instagram-home-tab").append(PostElement);
            }
        });
    }
}

// Clicks

$(document).on('click', '.instagram-new-post', function(e){ // Post Tweet Button
    e.preventDefault();
    ClearInputNew()
    $('#ig-box-textt').fadeIn(350);
});

$(document).on('click', '#instagram-camera', function (e) {
    e.preventDefault();
    $.post('https://qb-phone/TakePhoto', JSON.stringify({}),function(url){
        if(url){
            $('.ig-box-image-input').val(url.replace(/["]/g, ''))
        }
    })
    QB.Phone.Functions.Close();
})

$(document).on('click', '#instagram-send', function(e){ // Submit Button For Twitter Message
    e.preventDefault();

    var PostMessage = $(".ig-box-textt-input").val();
    var imageURL = $('.ig-box-image-input').val();
    if (imageURL !== "") {
        var CurrentDate = new Date();
        if (imageURL != ""){
            setTimeout(function(){
                ConfirmationFrame()
            }, 150);
        }
        $.post('https://qb-phone/PostNewPost', JSON.stringify({
            Message: PostMessage,
            Date: CurrentDate,
            url: imageURL,
            type: 'post',
        }), function(){
            QB.Phone.Notifications.Add("fab fa-instagram", "Instagram", "New post uploaded!", "#1DA1F2", 2500);
            ClearInputNew();
            $('#ig-box-textt').fadeOut(350);
            $('.ig-box-image-input').val("");
        });
    } else if (imageURL == "" && PostMessage !== "") {
        QB.Phone.Notifications.Add("fab fa-instagram", "Instagram", "Need a photo to post!", "#1DA1F2", 2500);
    } else {
        QB.Phone.Notifications.Add("fab fa-instagram", "Instagram", "Need a photo to post!", "#1DA1F2", 2500);
    };
});

//$(document).on('click', '.insta-comment', function(Post){

//});

$(document).on('click','.insta-flag',function(Post){
    Post.preventDefault();
    var IGName = $(this).parent().parent().data('ighandler');
    var IGMessage = $(this).parent().data('igmessage');
    $.post('https://qb-phone/FlagPost', JSON.stringify({
        name: IGName,
        message: IGMessage,
    }))
});
    
$(document).on('click','.insta-delete',function(Post){
    Post.preventDefault();
    var source = $(this).parent().parent().data('igid');
    $.post('https://qb-phone/DeletePost', JSON.stringify({id: source}))
})
