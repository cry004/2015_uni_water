var i_pd_a, base64, cStep = -1,
    clickw;

function initial() {
    $('.menu').load('nav.html');
    this.init = function() {
        $('.menu').hover(function() {
            $('.cover_all').stop().fadeIn();
        }, function() {
            $('.cover_all').stop().fadeOut();
        })
        if (page == 'index') {
            var _index = new index();
            setTimeout(function() {
                _index.introAni();
            }, 1000)
            $('.nav1 .navpic').css('background-position', -35 + 'px ' + 0);
            $('.nav1 span').css('color', '#19a4c9');
        }
        if (page == 'upload') {
            _upload = new upload();
            _upload.init();
            $('.nav2 .navpic').css('background-position', -35 + 'px ' + 0);
            $('.nav2 span').css('color', '#a84f55');
        }
        if (page == 'list') {
            _list = new list();
            // _list.init('');
            $('.nav3 .navpic').css('background-position', -35 + 'px ' + 0);
            $('.nav3 span').css('color', '#ef858c');
        }
        if (page == 'rule') {
            $('.nav4 .navpic').css('background-position', -35 + 'px ' + 0);
            $('.nav4 span').css('color', '#77c7c4');
        }
        $('.fans_close').on('click', function() {
            $(this).parent().hide();
            if (page == 'upload') {
                $('.info').fadeIn();
            } else {
                ui_post2(clickw.attr('merge'), clickw.find('.vote_info .v_name').html());
            }

        });

    }
}

function index() {
    this.introAni = function() {
        $('.index_pd').animate({
            'top': $.Body.width() * -0.08
        }, 200, function() {
            i_pd_a = 1;
            var bc = [];
            for (var i = 0; i < $('.content div').length; i++) {
                bc.push(i);
            }
            bc.sort(function() { //bc自己有被排
                return Math.random() > .5 ? -1 : 1;
            });
            var count = 0;
            for (var i in bc) {
                $('.content div').eq(bc[i]).delay(i * 100 + 400).fadeIn(200, function() {
                    count++;
                    if (count == bc.length) {
                        $('.h1').delay(300).fadeIn(700).find('img').animate({
                            'margin-top': 0 + '%'
                        }, 600, function() {
                            $('.h2').fadeIn(700).find('img').animate({
                                'margin-left': 0 + '%'
                            }, 600, function() {
                                $('.h3').fadeIn(700).find('img').animate({
                                    'margin-left': 0 + '%'
                                }, 600, function() {
                                    $('.btn_start').fadeIn(700).find('img').animate({
                                        'margin-top': 0 + '%'
                                    }, 600, function() {
                                        $(this).parent().addClass('animate');
                                    });
                                    $('.btn_rule').fadeIn(700);
                                    $('.menu').addClass('show');
                                    hoverF();
                                });
                            });
                        });

                    }
                });
                brhoverAni(i * 1 + 1);
            }
            $('.bg1cover1').animate({
                'width': 0
            }, 1000, function() {
                $(this).fadeOut(300);
            });
            $('.bg2').delay(800).fadeIn(2000);
            $('.bg1cover2').animate({
                'width': 0
            }, 1000, function() {
                $(this).fadeOut(300);
            });
        });
    }

    function brhoverAni(i) {
        $('.bc' + i + ' img:nth-child(2)').hover(function() {
            $(this).hide().siblings().show();
        }, function() {

        });
        $('.bc' + i + ' img:nth-child(1)').hover(function() {

        }, function() {
            $(this).hide().siblings().show();

        });
    }

    function hoverF() {
        $('.btn_start').hover(function() {
            $(this).removeClass('animate');
        }, function() {
            $(this).addClass('animate');
        });
    }
}

function list() {
    this.init = function(para) {
        $('.list_content').html('');
        loaddata(1, para);
    }
    $('.by_vote').click(function() {
        $('.list_content').html('');
        para = '&sort=vote';
        loadtime = 1;
        loaddata(loadtime, para);
    });
    $('.by_date').click(function() {
        $('.list_content').html('');
        para = '';
        loadtime = 1;
        loaddata(loadtime, para);
    });
    $('.vote_b').click(function() {
        // fb_login('vote');

    });
    $('.by_color ul li').click(function() {
        $(this).find('div').css('box-shadow', 'rgb(0, 0, 0) 0px 0px 0px 3px inset').parent().siblings().find('div').removeAttr('style');
        $('.list_content').html('');
        loadtime = 1;
        para = '&category=' + $(this).attr('color');
        loaddata(loadtime, para);

    });
    $('.searchbtn').click(function() {
        $('.list_content').html('');
        loadtime = 1;
        para = '&keyword=' + $('.updater').val();
        loaddata(loadtime, para);
    });
    $('.vote_close').click(function() {
        $('.vote_cover').fadeOut();
    });
    var loadtime = 0;
    var para = '';
    var tpages = 2;
    $.Window.scroll(function() {
        if ($(this).scrollTop() > $('.wrapper').height() - $.Window.height() - 100 && !$('.work').eq(loadtime).hasClass('loadtime')) {
            //console.log(loadtime);
            $('.work').eq(loadtime).addClass('loadtime');
            loadtime++;
            loaddata(loadtime, para);
        }
        //console.log($(this).scrollTop(),$('.wrapper').height()-$.Window.height());
    }).trigger('scroll');

    function loaddata(page, para) {
        if (page <= tpages) {
            $.ajax({
                url: '//uni-water.campaigns.com.tw/api/work_list?page=' + page + para,
                type: 'GET',
                dataType: "json",
                success: function(Jdata) {
                    tpages = Jdata.total_pages;
                    if (Jdata.state == 1) {
                        var bc;
                        for (d in Jdata.data) {
                            switch (Jdata.data[d].category) {
                                case 'r':
                                    bc = 'a84f55';
                                    break;
                                case 'g':
                                    bc = 'a3aa83';
                                    break;
                                case 'y':
                                    bc = 'e8bb5a';
                                    break;
                                case 'p':
                                    bc = 'd0a1ba';
                                    break;
                                case '':
                                    bc = '';
                                    break;
                            }
                            $('.list_content').append('<div class="work" wid="' + Jdata.data[d].id + '" merge="' + Jdata.data[d].merge_img_name + '"><div class="workbg" style="background:url(../img/p' + bc + '.png)"><div class="workpic"><img src="//uni-water.campaigns.com.tw/uploads/' + Jdata.data[d].img_name + '"></div><div class="vote_info"><div class="v_name">' + Jdata.data[d].is_name + '</div><div class="v_tit">' + Jdata.data[d].work_name + '</div><div class="v_count">' + Jdata.data[d].vote + '</div><div class="vote_btn"></div></div></div></div>');

                            // if(Jdata.data[d].category ==){
                            //     //../img/pd0a1ba.png
                            // }
                        }
                    } else {
                        alert("忙碌中。請稍後再試 (error)");
                    }

                }
            }).done(function() {
                $('.work').each(function() {
                    var _self = $(this);
                    _self.find('.workbg').click(function() {
                        clickw = _self;
                        //console.log(_self.attr('wid'));
                        $.ajax({
                            url: ' //uni-water.campaigns.com.tw/api/work_info?wid=' + _self.attr('wid'),
                            type: 'GET',
                            dataType: "json",
                            success: function(Jdata) {
                                if (Jdata.state == 1) {
                                    $('.vote_cover .vote_pic img').attr('src', '//uni-water.campaigns.com.tw/uploads/' + Jdata.img_name);
                                    $('.vote_cover .vote_name').html(Jdata.is_name);
                                    $('.vote_cover .vote_work').html(Jdata.work_name);
                                    $('.vote_cover .vote_des').html(Jdata.work_describe);
                                    $('.vote_cover .vote_rate').html(Jdata.vote);
                                } else {
                                    alert("忙碌中。請稍後再試 (error)");
                                }

                            }
                        });
                        $('.vote_cover').fadeIn();
                    });
                });

            });
        }
    }
}

function upload() {
    var mousePressed = false;
    var lastX, lastY;
    var _self = this;
    var ctx, start_draw = false;
    $('.preview_close').on('click', function() {
        $(this).parent().hide();
    });
    this.init = function() {
        $('.draw_start').click(function() {
            $('.upload_step1').fadeOut();
            $('.upload_draw').fadeIn();
            _upload.drawing();
            //fb_login('draw');
            //_upload.drawing()   
        })
    }
    this.local = function() {
        $('.upload_l .preview').on('click', function() {
            $('.preview_cover').show();
        });
        $('.upload_l .color .cc').click(function() {
            $('.preview_pd .aa').attr('src', 'img/p' + $('.upload_l .color').attr('color') + '.png');
            $(this).find('span').css({
                    'border-bottom': 3 + 'px solid #' + $(this).attr('color')
                })
                // $(this).find('span').css({'color':'#'+$(this).attr('color')});
            $(this).siblings().find('span').removeAttr('style');
            $(this).parent().attr('color', $(this).attr('color'));
            $('.u_logo img').attr('src', 'img/' + $(this).attr('color') + '.png');
        });
    }
    this.drawing = function() {
        ctx = document.getElementById('myCanvas').getContext("2d");
        $('#myCanvas').mousedown(function(e) {
            if (start_draw) {
                mousePressed = true;
                $('.upload_draw .preview').removeAttr('style');
                Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
            } else {
                alert('請選擇一個筆刷顏色唷！');
            }
        });
        $('#myCanvas').mousemove(function(e) {
            if (mousePressed) {
                Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
            }
        });
        $('#myCanvas').mouseup(function(e) {
            if (mousePressed) {
                mousePressed = false;
                cPush();
            }
        });
        $('#myCanvas').mouseleave(function(e) {
            if (mousePressed) {
                mousePressed = false;
                cPush();
            }
        });

        drawImage();
        $('.upload_draw .strokes input').on('input', function() {
            t = $('#thickness').val();
            ctx.lineWidth = t;
            $('.upload_draw .strokes span').html(t);
        });
        $('.upload_draw .strokes input').on('change', function() {
            t = $('#thickness').val();
            ctx.lineWidth = t;
            $('.upload_draw .strokes span').html(t);
        });

        $('.upload_draw .color .cc').click(function() {
            if (start_draw && cStep > 0) {
                var r = confirm("顏色如改選，目前瓶標將重新設計喔！");
                if (r == true) {
                    drawImage();
                } else {
                    return false;
                }
            }
            start_draw = true;
            $(this).find('span').css({
                    'border-bottom': 3 + 'px solid #' + $(this).attr('color')
                })
                // $(this).find('span').css({'color':'#'+$(this).attr('color')});
            $(this).siblings().find('span').removeAttr('style');
            $(this).parent().attr('color', $(this).attr('color'));
            $('.u_logo img').attr('src', 'img/' + $(this).attr('color') + '.png');
        });
        $('.upload_draw .nextstep').on('click', cRedo);
        $('.upload_draw .prestep').on('click', cUndo);
        $('.upload_draw .restart').on('click', drawImage);
        $('.upload_draw .preview').on('click', function() {
            if (cStep > 0) {
                $('.preview_pd img').attr('src', 'img/p' + $('.upload_draw .color').attr('color') + '.png');
                $('.preview_canvas img').attr('src', _self.uploadi('prev'));
                $('.preview_cover').show();
            }
        });
    }

    function drawImage() {
        cPushArray.length = 0;
        cStep = -1;
        $('.upload_draw .color div div').removeAttr('style');
        $('.upload_draw .prestep').css('opacity', 0.5);
        $('.upload_draw .nextstep').css('opacity', 0.5);
        ctx.rect(0, 0, 230, 449);
        ctx.fillStyle = "white";
        ctx.fill();
        cPush();
    }

    function Draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = '#' + $('.upload_draw .color').attr('color');
            ctx.lineWidth = $('#thickness').val();
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        lastX = x;
        lastY = y;
    }
    var cPushArray = new Array();

    function cPush() {
        cStep++;
        if (cStep < cPushArray.length) {
            cPushArray.length = cStep;
        }
        if (cStep == cPushArray.length) {
            $('.upload_draw .nextstep').css('opacity', 0.5);
        }
        if (cStep > 0) {
            $('.upload_draw .prestep').removeAttr('style');
        }
        cPushArray.push(document.getElementById('myCanvas').toDataURL());

    }

    function cUndo() {
        if (cStep > 0) {
            cStep--;
            var canvasPic = new Image();
            $('.upload_draw .nextstep').removeAttr('style');
            canvasPic.src = cPushArray[cStep];
            canvasPic.onload = function() {
                ctx.drawImage(canvasPic, 0, 0);
            }
            if (cStep <= 0) {
                $('.upload_draw .prestep').css('opacity', 0.5);
                $('.upload_draw .preview').css('opacity', 0.5);
            }
        }
    }

    function cRedo() {
        if (cStep < cPushArray.length - 1) {
            cStep++;
            var canvasPic = new Image();
            canvasPic.src = cPushArray[cStep];
            canvasPic.onload = function() {
                ctx.drawImage(canvasPic, 0, 0);
            }
            $('.upload_draw .prestep,.upload_draw .preview').removeAttr('style');
            if (cStep == cPushArray.length - 1) {
                $('.upload_draw .nextstep').css('opacity', 0.5);
            }
        }
    }
    this.uploadi = function(mod) {
        var type = "image/jpeg";
        var dataurl = document.getElementById("myCanvas").toDataURL(type, 1.0);
        //去掉 dataurl 開頭的 data:image/png;base64,
        var regex = new RegExp('^data:' + type + ';base64,');
        // var base64 = dataurl.replace(regex,'');
        switch (mod) {
            case 'prev':
                return dataurl;
                break;
            case 'upl':
                base64 = dataurl.replace(regex, '');
                break;
        }
    }

}

function resizeit() {
    var bw, bh, bwr, bhr, tem_ratio, ratio = 1920 / 1080;
    this.resitfun = function() {
        bw = $.Body.width(),
            bh = $.Body.height(),
            bwr = bw / 1920,
            bhr = bh / 1080,
            tem_ratio = bw / bh;
        $('.bg1cover1, .bg1cover2').css({
            'height': bh,
            'top': -0.8 * bh
        });
        $('.h1').css({
            'top': -0.055 * bw
        });
        $('.h2').css({
            'top': 0.01 * bw
        });
        $('.h3').css({
            'top': -0.025 * bw
        });
        $('.btn_start').css({
            'top': 0.005 * bw
        });
        $('.upload_draw,.upload_l').css({
            'top': -300000 / bw
        });
        if (i_pd_a == 1) {
            $('.index_pd').css({
                'top': bw * -0.08
            });
        }
        if (tem_ratio >= ratio) {
            $.Content.css({
                'width': bh * ratio,
                'height': bh,
                'left': 0.5 * (bw - (bh * ratio)),
                'top': 0
            });
            $('.bg2').css({
                'width': bw,
                'margin-top': -2 + '%',
                'margin-left': bw / -2
            });
            $('.footer').css({
                'height': 0.07 * bh
            });
            $('.footer_pic').css({
                'width': bw * 0.474
            });
        } else {
            $.Content.css({
                'width': bw,
                'height': bw / ratio,
                'left': 0,
                'top': 0.5 * (bh - (bw / ratio))
            });
            $('.bg2').css({
                'width': bw * 1.3,
                'margin-top': 0.3 * (bh - (bw / ratio)),
                'margin-left': bw * -1.3 / 2
            });
            $('.footer').css({
                'height': bh * 0.07
            });
            $('.footer_pic').css({
                'width': bh
            });
        }
        if (bw > 1500) {
            $('.list_content').css({
                'width': 1680,
                'margin-left': 10 + '%'
            })
        } else {
            $('.list_content').css({
                'width': 1120,
                'margin-left': 10 + '%'
            })
        }

    }

}

(function($) {
    //*****�� png��� 暺��*****
    $.fn.PngFix = function() {
        var _self = $(this)
        _self.find('img[src$=".png"],img[src$=".gif"]').each(function() {
            this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='" + this.src + "')";
        });
    }

})(jQuery);

var _initial = new initial();
var _resize = new resizeit();
var _upload, _list;

$(function() {
    $.Body = $('body');
    $.Window = $(window);
    $.Wrapper = $.Body.find('div.wrapper');
    $.Loading = $.Body.find('div.loading');
    $.bg = $('.bg');
    $.Content = $('.content');
    $.navbg = $('.navbg');
    var imagesN = $("body img").length;
    var c = 0;
    jQuery.support.cors = true;
    var $imgs = $('body img'),
        count = 0;
    $imgs.imagesLoaded().progress(function(instance, image) {
        count++;
        percent = Math.round(count / $imgs.length * 100);
        $('.loading .percent').html(percent + '%');
        $('.loading_bar').css({
            'width': percent * 0.18 + '%'
        });
        if (count == $imgs.length) {
            $.Body.PngFix();
            $.Loading.fadeOut();
            $.Window.resize(_resize.resitfun).trigger('resize');
            _initial.init();
        }

    });

});
