$(document).on('change', '#upload_img', function(event){
    if (!$("#pic_form input[name= 'upload_img']").val())return;
        fb_login('local');
    });
function fileclick(){
	//KK ====================================================
	$('#q-text3  input[name = "upload_way"]').val("file");
	//KK ====================================================
    $("#pic_form").ajaxForm({
        type:"post",
        url:"//uni-water.campaigns.com.tw/uni_water/api/image_file_upload", 
        dataType:"json",
        success:function(pResponse){
            if (pResponse.state==1) {
                _upload.local();
                $('.upload_step1').fadeOut();
                $('.upload_l').fadeIn();
                $('.upload_l .preview_img img').attr('src','//uni-water.campaigns.com.tw/uni_water/uploads/'+pResponse.img_name);
                $('.preview_canvas img').attr('src','//uni-water.campaigns.com.tw/uni_water/uploads/'+pResponse.img_name);
                $('#q-text2  input[name = "img_name"]').val(pResponse.img_name);
				//KK ====================================================
                $('#q-text3  input[name = "img_name"]').val(pResponse.img_name);
				//KK ====================================================
            }else if(pResponse.state==3){
                alert('圖片大小超出限制了');
            }else if(pResponse.state==4){
                alert('檔案超過2M了~><');
            }else if(pResponse.state==5){
                alert('圖檔格式不對喔！');
            }else{
                alert("忙碌中。請稍後再試！(error)");
                $('.updatepicPloading').fadeOut();
            }

        },
        error:function(pResponse){
            window.alert("伺服器忙碌中。請稍後再試 (error)");
           }
    }).submit();
    
}
function checkStep1form() {
    online_draw = upload('mod');
    work_name = $("#q-text input[name= 'work_name']");
    work_dis = $("#q-text textarea[name= 'work_dis']");
    if(cStep<=0){
        alert("你還沒開始畫呢><");
        return false;
    } else if (work_name.val() == ""){
        alert("請寫下你的作品名稱喔");
        work_name.focus();
        return false;
    } else if ( work_dis.val() == ""){
        alert("請寫下你的創作理念喔");
        work_dis.focus();
        return false;
    }
    if($('.upload_draw .color').attr('color') == 'a84f55'){
        cc = 'r';
    }
    if($('.upload_draw .color').attr('color') == 'a3aa83'){
        cc = 'g';
    }
    if($('.upload_draw .color').attr('color') == 'e8bb5a'){
        cc = 'y';
    }
    if($('.upload_draw .color').attr('color') == 'd0a1ba'){
        cc = 'p';
    }

    sendData();
    //showAlert();
    return true;
}
function sendData() {
    GT('upload','clk','h_done');
     $.ajax({
        url:'//uni-water.campaigns.com.tw/uni_water/api/image_base64_upload',
        type: 'POST',
        data: {
            online_draw: base64,
            fb_id: FB_ID,
            category: cc,
            work_name: work_name.val(),
            work_describe: work_dis.val(),
        },
        dataType: "json",
            success: function(Jdata){
                if(Jdata.state == 1){
                    alert('上傳成功');
                     $('.info').show();
                    // $('.fans').show();
                     $('.fans_cover').fadeIn();
                    // GT('fans_like','clk',a+'_ufs');
                    $('#q-text3  input[name = "img_name"]').val(Jdata.img_name);
                    $('#q-text3  input[name = "work_describe"]').val(Jdata.work_describe);
                    $('#q-text3  input[name = "work_name"]').val(Jdata.work_name);
                }else{
                    alert("忙碌中。請稍後再試 (error)");
                }
                 clearForm();
            }
        }).done(function() {
           
        });
    }
//     ui_post();

//信箱格式判斷
function checkEmail(email) {
    EmailCheck = new RegExp(/^([a-zA-Z0-9]+)([\.\-\_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9\_\-]+)+$/)
    if (EmailCheck.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

function ValidEmail(emailtoCheck) {
    // 規則: 1.只有一個 "@"
    //       2.網址中, 至少要有一個".", 且不能連續出現
    //       3.不能有空白和,

    var regExp = /^[^@^\s^,]+@[^\.@^\s^,]+(\.[^\.@^\s^,]+)+$/;
    if (emailtoCheck.match(regExp))
        return true;
    else
        return false;
}
function clearForm() {
   $("#q-text input[name= 'work_name']").val('');
   $("#q-text textarea[name= 'work_dis']").val('');
}
function checkStep1form2() {
    work_name = $("#q-text2 input[name= 'work_name']");
    work_dis = $("#q-text2 textarea[name= 'work_dis']");
    if ($('.upload_l .color').attr('color') == undefined){
        alert("請選擇你的瓶身");
        work_name.focus();
        return false;
    }else if (work_name.val() == ""){
        alert("請寫下你的作品名稱喔");
        work_name.focus();
        return false;
    } else if ( work_dis.val() == ""){
        alert("請寫下你的創作理念喔");
        work_dis.focus();
        return false;
    }
    if($('.upload_l .color').attr('color') == 'a84f55'){
        cc = 'r';
    }
    if($('.upload_l .color').attr('color') == 'a3aa83'){
        cc = 'g';
    }
    if($('.upload_l .color').attr('color') == 'e8bb5a'){
        cc = 'y';
    }
    if($('.upload_l .color').attr('color') == 'd0a1ba'){
        cc = 'p';
    }
    sendData2();
    //showAlert();
    return true;
}
function sendData2() {
    GT('upload','clk','u_done');
    //console.log($('#q-text2  input[name = "img_name"]').val(),FB_ID,cc,work_name.val(),work_dis.val());
	//KK ====================================================
	upload_way = $('#q-text3  input[name = "upload_way"]').val();
	if(upload_way == "file")
	{
		// $('.fans').show();
        $('.info').show();
		$('.fans_cover').fadeIn();
		$('#q-text3  input[name = "work_describe"]').val($('#q-text2  textarea[name = "work_dis"]').val());
		$('#q-text3  input[name = "work_name"]').val($('#q-text2  input[name = "work_name"]').val());
		clearForm2();
	}
	else
	{
		$.ajax({
			url:' //uni-water.campaigns.com.tw/uni_water/api/image_base64_upload',
			type: 'POST',
			data: {
				online_draw: $('#q-text2  input[name = "img_name"]').val(),
				fb_id: FB_ID,
				category: cc,
				work_name: work_name.val(),
				work_describe: work_dis.val(),
			},
			dataType: "json",
				success: function(Jdata){
					if(Jdata.state == 1){
						alert('上傳成功');
						 $('.info').show();
                        //$('.fans').show();
						$('.fans_cover').fadeIn();
						$('#q-text3  input[name = "img_name"]').val(Jdata.img_name);
						$('#q-text3  input[name = "work_describe"]').val(Jdata.work_describe);
						$('#q-text3  input[name = "work_name"]').val(Jdata.work_name);
					}else{
						alert("忙碌中。請稍後再試 (error)");
					}
					 clearForm2();

				}
			}).done(function() {
			   
			});		
	}
	//KK ====================================================
    }
function clearForm2() {
    $("#q-text2 input[name= 'work_name']").val('');
    $("#q-text2 textarea[name= 'work_dis']").val('');
}
function checkStep1form3() {
    pname = $("#q-text3 input[name= 'name']");
    ptel = $("#q-text3 input[name= 'tel']");
    pemail = $("#q-text3 input[name= 'email']");
    var cellphone = /^09[0-9]{8}$/;

    if (pname.val() == ""){
        alert("請填入名字!");
        pname.focus();
        return false;
    } else if (ptel.val() == "" ){
        alert("請填入手機!");
        ptel.focus();
        return false;
    } else if (!cellphone.test(ptel.val())) {
        alert("請填入正確的手機!");
        ptel.focus();
        return false;
    } else if (pemail.val() == "") {
        alert("請填入E-mail!");
        pemail.focus();
        return false;
    } else if (!checkEmail( pemail.val())) {
        alert(" 請填入正確的E-mail!");
        pemail.focus();
        return false;
    } else if (!document.getElementById("readRule").checked) {
        alert("請勾選 閱讀並同意 個資法條款 與 活動辦法");
        document.getElementById("readRule").focus();
        return false;
    }
    if($('.upload_draw .color').attr('color') == 'a84f55'){
        cc = 'r';
    }
    if($('.upload_draw .color').attr('color') == 'a3aa83'){
        cc = 'g';
    }
    if($('.upload_draw .color').attr('color') == 'e8bb5a'){
        cc = 'y';
    }
    if($('.upload_draw .color').attr('color') == 'd0a1ba'){
        cc = 'p';
    }

    if($('.upload_l .color').attr('color') == 'a84f55'){
        cc = 'r';
    }
    if($('.upload_l .color').attr('color') == 'a3aa83'){
        cc = 'g';
    }
    if($('.upload_l .color').attr('color') == 'e8bb5a'){
        cc = 'y';
    }
    if($('.upload_l .color').attr('color') == 'd0a1ba'){
        cc = 'p';
    }

    sendData3();
    //showAlert();
    return true;
}

//102
function sendData3(cuId,arrayc) {
    GT('upload','clk',a+'_info');
      $.ajax({
        url:' //uni-water.campaigns.com.tw/uni_water/api/work_upload',
        type: 'POST',
        data: {
            fb_id: FB_ID,
            category: cc,
            work_name: $('#q-text3  input[name = "work_name"]').val(),
            work_describe: $('#q-text3  input[name = "work_describe"]').val(),
            img_name: $('#q-text3  input[name = "img_name"]').val(),
            is_name: pname.val(),
            is_email: pemail.val(),
            is_tel: ptel.val()
        },
        dataType: "json",
            success: function(Jdata){
                if(Jdata.state == 1){
                    alert('上傳成功');
                    $('.fans_cover').fadeIn();
                    ui_post(Jdata.merge_img_name);
                }else{
                    alert("忙碌中。請稍後再試 (error)");
                }
                 clearForm3();
            }
        }).done(function() {
           
        });
    }
function clearForm3() {
    $('.openbottom input[name= "score"]:checked').removeAttr('checked');
    $("#q-text3 input[name= 'name']").val('');
    $("#q-text3 input[name= 'tel']").val('');
    $("#q-text3 input[name= 'email']").val('');
}

