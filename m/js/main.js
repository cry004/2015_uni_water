// console.log
// common elements
var $window = $(window),
	$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
	$wrapper = $(".wrapper"),
	$loading = $(".loading");

// loading animate
$loading.find(".pic").animateSprite({
    fps:30,
    loop:true
});
var App = App || {};
App.common = App.common || function(){
	// hashchange
	// App.common.loadPage(window.location.hash);
	// $(window).hashchange(function(e){
	// 	App.config.loadPage(window.location.hash);
	// });
	
	// GAUtil.accountId = "";
	// GAUtil.domainURL = "auto";
	// GAUtil.debug     = true;
	// GAUtil.init();

	$("a").bind("click", function(){
		var _ca  = $(this).attr("ga-ca");
		var _btn = $(this).attr("ga-btn");
		if (_ca != undefined && _btn != undefined) {
			GAUtil.evt(_ca, _btn);
		}
	});

	$(".site-header .btn-open").bind("click", function(){
		var _open = $(this).hasClass("active");
		if (_open)$(this).removeClass('active');
		else $(this).addClass('active');
		TweenLite.to(".site-nav", .7, {
			left:_open ? "150%" : "50%",
			ease:Expo.easeInOut
		})
		return false;
	});
	
	return {
		loadPage:function(pPage){
			pPage = pPage.substr(2, pPage.length);
			if (pPage==App.config.currentPage)return;
			App.config.currentPage = pPage;
			var _section = "#"+pPage;

			$loading.fadeIn(700, function(){
				$(".targetPage").load(App.config.currentPage + ".html " + _section, function(pData, pStatus){
					if (pStatus=="error"){
						// _loadPage("#/intro");
						return;
					}

					$(".currentPage").addClass("currentPageTmp");
					$(".targetPage").addClass("targetPageTmp");
					$(".currentPageTmp").removeClass("currentPage").addClass("targetPage").removeClass("currentPageTmp").css("z-index", 10).css("display", "block");
					$(".targetPageTmp").removeClass("targetPage").addClass("currentPage").removeClass("targetPageTmp").css("z-index", 20).css("display", "block");
					$(".targetPage").children("div:first").remove()

					// switch(App.config.currentPage){
					// 	case "intro":
					// 		Intro.startup();
					// 		break;
					// 	case "home":
					// 		Home.startup();
					// 		break;
					// 	case "event":
					// 		Event.startup();
					// 		break;
					// 	case "rules":
					// 		Rules.startup();
					// 		break;
					// }
					pngFix();
				});
			});
		},
		startLoading:function(pElemId, pCallback){
			var imgLoad  = imagesLoaded( pElemId );
			var _total   = imgLoad.images.length;
			var _current = 0;
			imgLoad.on( 'progress', function( instance, image ) {
				_current++;
				var _percentage = Math.floor((_current/_total)*100);
				$loading.find(".percent").text(Math.floor(_percentage)+"%");
			});
			imgLoad.on( 'always', function( instance, image ) {
				if (typeof pCallback === "function")pCallback();
			});
		},
		pngfix:function(){
			if ($.browser.msie){
				if ($.browser.version=="7.0" || $.browser.version=="8.0"){
					for (i in document.images) {
					    if (document.images[i].src) {
					        var imgSrc = document.images[i].src;
					        if (imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG') {
					            document.images[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='crop',src='" + imgSrc + "')";
					        }
					    }
					}		
				}
			}	
		}
	}
}();
