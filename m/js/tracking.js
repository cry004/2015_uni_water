  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63227715-1', 'auto');
  ga('send', 'pageview');


function GT(category,action,label){
	// console.log(category+";"+action+";"+label)
  ga('send','event',category,action,label, 1);  
}//

// function trackEvent(category, label, event) {
// 	ga('send', 'event', category, 'click', label, 1);
// }


function outlink(id){
	//consle.log('c;k')
	switch(id){
	case "logo_l":
	    window.open('//www.uni-president.com.tw','_blank');	    
	break;	
	case "logo_r":
	    window.open('//www.pecos.com.tw','_blank');	    
	break;
	case "index":
	    location.href="index.html";	    
	break;	
	case "list":
	    location.href="list.html";	    
	break;	
	case "upload":
	    location.href="upload.html";	    
	break;	
	case "rule":
	    window.open('rules.html','_blank');	    
	break;	
	case "ai":
	    window.open('UNI_water_2015.zip','_blank');	    
	break;	


	}
    
}