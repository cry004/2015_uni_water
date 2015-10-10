// function FB_APP(){
  var PARAM_SCOPE ='public_profile';
  var FB_STATE='out'
  var FB_ID = '0',FB_NAME='0';
  var scr , scr2 , photos_status = 'ready';
  var msg;
  var purl;
  var WEB_SITE = "uni-water.campaigns.com.tw/";
  var sdid,select_FB_url;

////END  CALLBACK ASSET////////////////

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '673481249451912',
      xfbml      : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


  /***like box**/
  function checkLoginState(mod) {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response,mod);
    });
  }
   
  function get_FBInfo(mod) {
   // console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {    
      FB_ID = response["id"];
      FB_NAME= response["name"];
      if(mod == 'draw'){
        sendData();
      }else if(mod == 'local'){
         $("#pic_form input[name= 'fb_id']").val(FB_ID);
          sendData2();
      }else if(mod == 'vote'){
       
        $.ajax({
            url:' //uni-water.campaigns.com.tw/uni_water/api/vote',
            type: 'POST',
            dataType: "json",
            data: {
                vote_id: FB_ID,
                work_id: clickw.attr('wid')
            },
            success: function(Jdata){
                if(Jdata.state == 1){
                    ui_post2(clickw.attr('merge'),clickw.find('.box h1:first-child span').html());
                  // $('.fans_bg').css({'top':clickw.offset().top});
                  // $('.fans_cover').fadeIn();
                }else if(Jdata.state == 2){
                    alert("一個人一天只能投同件作品一次喔！");
                }else{
                    alert("忙碌中。請稍後再試 (error)");
                }
                 
            }
        }).done(function(){
           
        });
      }else{  }
     });
  }
  ////CALLBACK ASSET////////////////

  function fb_login(mod){   
     FB.login(function(response) {
          checkLoginState(mod);
      }, {scope: PARAM_SCOPE});
  }
  ///////
  //
  ///////
  function statusChangeCallback(response,mod) {
    if (response.status === 'connected') {
       ///登入
    FB_STATE = 'in';
   // console.log(response);
    get_FBInfo(mod);
    //ui_post();
    } else if (response.status === 'not_authorized') {
     FB_STATE = 'outa';
      alert('您尚未登入FB')
      $('.upload_step1').fadeIn(); 
      $('.upload_draw').fadeOut();   
    } else {
     FB_STATE = 'out';
      alert('您尚未登入FB')
      $('.upload_step1').fadeIn(); 
      $('.upload_draw').fadeOut();
    }
  }
  function ui_post(merge_img){
    console.log(WEB_SITE+'uploads/'+merge_img);
     //GT("index" , "index","fb_post");
    FB.ui(
      {
       method: 'feed',
       name: "2015 UNI water秋季四色瓶標設計大賽",
       caption:'創作新秀'+FB_NAME+'首度揮灑，UNI water秋季瓶標就是他的時尚發表秀！', 
       description:'2015 UNI water秋季四色瓶標設計大賽，快來揮灑你的設計魂，各色優勝者，將有機會登上秋季正式瓶標，還有獎金兩萬元！快去參加呀！',
       link: WEB_SITE,
       picture: WEB_SITE+'uni_water/uploads/'+merge_img
      },
      function(response) {
        if (response && response.post_id) {
          GT('fb_share_m','clk',a+'_userfs');
        } else {
          GT('fb_share_m','clk',a+'_userfc');
        }
        location.href="list.html";
      }
    );
  }
  function ui_post2(merge_img,wname){
    //console.log(merge_img);
     //GT("index" , "index","fb_post");
    FB.ui({
       method: 'feed',
       name: "2015 UNI water秋季四色瓶標設計大賽",
       caption:'創作新秀'+wname+'首度揮灑，UNI water秋季瓶標就是他的時尚發表秀！', 
       description:'2015 UNI water秋季四色瓶標設計大賽，快來揮灑你的設計魂，各色優勝者，將有機會登上秋季正式瓶標，還有獎金兩萬元！快去投票阿！',
       link: WEB_SITE,
       picture: WEB_SITE+'uni_water/uploads/'+merge_img
      },
      function(response) {
        if (response && response.post_id) {
          GT('fb_share_m','clk',a+'_userfs');
        } else {
          GT('fb_share_m','clk',a+'_userfc');
        }
         location.reload();
      }
    );
  }
  ////////////////////
  //抓相簿 ID  NAME COVER
  ///////////////////
  var alb_ids=[]
  var alb_names=[]
  var alb_covers=[];
  var target_albid;
  function get_albums()
 {
    FB.api('/me/albums', function(response) {
    if(response){
      var obj =response["data"]; 
      for( var index in obj){
        var _album = obj[index]
        alb_ids.push(_album["id"]);
        alb_names.push(_album["name"]) ;
        
        if(_album["cover_photo"])
        alb_covers.push(_album["cover_photo"]);
        else
        alb_covers.push("0");
      }
        create_albs_nodes();
         
         // get_photos(alb_ids[0] , false);
         // target_albid = alb_ids[0];
    }
    else{/////未取得權限  偵測後可通知

    }
    });
   return true;
}
////////////////////////////////////////////
///產生某相簿的所有照片ID
////////////////////////////////////////////

function create_albs_nodes(){
  // for(var i=0;i<alb_ids.length ; i++){
  for(var i=0;i<10 ; i++){
    var cne = alb_names[i];
    var cvr = alb_covers[i];
    var albid = alb_ids[i];
   if(cvr =='0'){ //沒封面 
      $('.albums').append('<div class="album"><div class="apic" onclick="album_clk('+i+')" style="background:#fff"></div><div class="aname">'+cne+'</div><div id="albid" style="display:none;">'+albid+'</div></div>');
    }else{
      $('.albums').append('<div class="album"><div class="apic" onclick="album_clk('+i+')"></div><div class="aname">'+cne+'</div><div id="albid" style="display:none;">'+albid+'</div></div>');
     coverPhoto(cvr);
   }
  }
}

function coverPhoto(id){
   FB.api('/'+id+'?fields=picture&type=small',function(responseIn){
      var ind = alb_covers.indexOf(id);
      var arrs = $('.apic');
      $(arrs[ind]).css('background-image' , 'url('+responseIn["picture"]+')');
    });
}

function album_clk(ind){
    var arr = $('.album')
    var obj = $(arr[ind])
    target_albid = obj.children("#albid").text();
    $('.fbphoto').fadeIn();
    $( '.photo').remove();
    get_photos(target_albid);
    
}
var counter = 0;
$('.photos').scroll(function(){
  if($('.photoBox').position().top < ($('.photoBox').height()-$('.photos').height())*-1+5){
      get_photos(target_albid , nn);
   }
});
var nn;
var next_count=0;
var MAX_PAGING = 6;
function get_photos(alb_id , next){/////相簿ID 
  
  if(!next){  
    next_count =0;
    photos_status = 'load';

    FB.api('/'+alb_id+'/photos?pretty=0&limit=20', function(response){
     
     var obj =response["data"];  
      for( var index in obj) ////obj 所有照片物件
     {
      var photo = obj[index]  ///某一個物件
      //console.log(photo["id"])
      var imgs = photo["images"]   /////物件裡的image
      var len = imgs.length   
      var imgb = imgs[len-1]           /////最後一個image  通常是200*x00
      var img_url= imgb["source"] /////第一個image裡的source  即真實url
          create_photos_fromAlbum(img_url);
     }
    
      var pg =response["paging"];
      var cur = pg["cursors"] 
      next = cur["after"];
      nn = next;
      photos_status = 'ready';
      // get_photos(target_albid , nn);
      });
  }
  else{
    next_count++;
    FB.api('/'+alb_id+'/photos?pretty=0&after='+next+'&limit=20', function(response){ 
      var pg =response["paging"];
      if(!pg || next_count>MAX_PAGING){
        //if(!scr2){
         return;
      }else{
        var obj =response["data"];
        photos_status = 'load';  
     for( var index in obj){
        var photo = obj[index]
        //console.log(photo["id"])
        var imgs = photo["images"]
        var imgb = imgs[0]
        var  img_url= imgb["source"]
        create_photos_fromAlbum(img_url)
      }
      var cur = pg["cursors"],
         next = cur["after"];
        nn = next;
         photos_status = 'ready';
      }
     });
  }
}

function create_photos_fromAlbum( _imgurl){
      var arr = $('.photo')
      var len = $(arr).length;
     $('.photoBox').append( '<div class="photo" onclick="photos_clk('+len+')" style="background-image:url('+_imgurl+')"></div>');
}

var preclick = -1;
function photos_clk(ind){
    var arr = $('.photo')
    var len = $(arr).length;
    var obj = $(arr[ind])
   
    var target_url = obj.css('background-image');
    select_FB_url = target_url.replace('url(','').replace(')','').replace('"','').replace('"','');
    select_FB_url = encodeURI(select_FB_url);
    // console.log(preclick);
  
    $(arr[preclick]).css('opacity' , 1);
    obj.css('opacity' , .7);
    preclick = ind;
}
function upload_editedX(_src){
  //////產生loading obj
         //var _ld = new add_loading('img/loading.gif');
         //_ld.addToDom();
          var formdata = new FormData();
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "capture.php");
      xhr.onreadystatechange = function () 
   {
      
        
      
      pic_nameX = 'upload/big/' + this.responseText;
      //console.log(pic_nameX);
       
        
         
    };

    var image = _src//.toDataURL("image/jpeg");
    var rnd =  new Date().getTime() + String ( parseInt (Math.random()*10000)  )
  
    formdata.append('imageData', image.split(",")[1]); 
    formdata.append('fne', rnd ); 
    //資料採用Base64編碼，絕對不會有逗號 所以 我們可以放心地抓第1筆資料
    //第0筆資料為 data/jpeg;base64
    xhr.send(formdata);
}
// }
// var _fbapp = new FB_APP();