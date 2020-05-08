const config = { attributes: false, childList: true, subtree: false };
const config2 = { attributes: true, childList: true, subtree: false };

var flag1 = false;

document.onload = myMain();

const Dlt = function(){
	
	try{
		var conts = document.querySelector('.grid[page-subtype="home"]').querySelector("#contents").querySelectorAll("ytd-rich-item-renderer");
		chrome.storage.sync.get("feedHide",function(data2){
			var obj2 = JSON.parse(JSON.stringify(data2));
			var pgs2 = obj2.feedHide;
			if(pgs2 && window.location.href.indexOf("channel")==-1){
				document.querySelector('.grid[page-subtype="home"]').querySelector("#primary").style.display = "none";
				//alert("Here!");
			}else{
				chrome.storage.sync.get("enbl",function(data3){
				var objs = JSON.parse(JSON.stringify(data3));
				var value = objs.enbl;
				if(value){
					//alert("hey");
					chrome.storage.sync.get("block",
					function(data){
						var obj = JSON.parse(JSON.stringify(data));
						var pgs = obj.block;
						//console.log(pgs);
						var n = 0;
						for(i = 0; i < conts.length; ++i){
							try{
							var txt = conts[i].querySelector("#channel-name").querySelector("a").textContent;
							//console.log(conts[i].querySelector("#avatar-link").getAttribute("title"));
							if(conts[i].querySelector("#avatar-link").getAttribute("title")=="undefined"){
								// Here for Check weather	
							}
							for(j = 0; j < pgs.length; j++){
								if(txt==pgs[j]){
									conts[i].style.display = "none";
									//alert(pgs[j]);
								}
								n=n+1;
							}
							}
							catch{
								//alert("Sth not correct. Go further");
							}
							
						}
						//alert("done: " + n + " <br> predict: " + pgs.length*conts.length);
					});
				}
				});
			}
		});	
		
	}
	catch(e){
		//alert("some sort of error: " + e );
	}
	
};

const rt = function(){
	//alert("Ya");
	if(!flag1){
		SetPageObserve();
	}
	
	try{
	chrome.storage.sync.get("trend",function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.trend;
				if(pgs){
					document.querySelector("#endpoint[title='Trending']").style.display = "none";
					document.querySelector("ytd-mini-guide-renderer").style.display = "none";
					var docs = document.querySelectorAll("ytd-browse");
					var i=0;
					while(i<docs.length){
						if(!docs[i].hasAttribute("page-subtype")){
							docs[i].style.display = "none";
							alert("Hello");
							break;
						}
						i++;
					}
					
				}
			});
	}
	catch{
	}
	
	Dlt();
};

function SetPageObserve(){
		flag1 = true;
	try{
	const Contents = document.querySelector('.grid[page-subtype="home"]').querySelector("#contents");
	const observer = new MutationObserver(Dlt);
	observer.observe(Contents, config);
	}
	catch{
		flag1 = false;
	}
	try{
	chrome.storage.sync.get("cat",function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.cat;
				if(pgs){
				document.getElementById("chips-below").style.display = "none";
				}
			});
	}
	catch{
		
	}
	
	
	
}

function myMain (evt) {
    var jsInitChecktimer = setInterval (checkForJS_Finish, 100);

    function checkForJS_Finish () {
        if (    document.querySelector("ytd-page-manager") != null)
			{
            clearInterval (jsInitChecktimer);
            Start();
        }
    }
}

function Start(){
if (window.location.href.indexOf("youtube") > -1) 
	{
		
		// Get All contents
		SetPageObserve();
		const ytd = document.querySelector("ytd-page-manager");
		//alert(ytd);
		const observer2 = new MutationObserver(rt);
		observer2.observe(ytd, config2);
		//chrome.storage.sync.set({"block":[]});
		rt();
		
		var clickedEl = null;

		document.addEventListener("mousedown", function(event){
		//right click
		if(event.button == 2) { 
			clickedEl = event.target;
			//alert(clickedEl);
		}
	}, true);

		
		
		
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(request == "getClickedEl") {
			var ChannelName = clickedEl.closest('#dismissable').querySelector("#channel-name").querySelector("a").textContent;
			sendResponse({value: clickedEl.value});
			chrome.storage.sync.get("block",
				function(data){
					var objs = JSON.parse(JSON.stringify(data));
					var pages = objs.block;
					if(typeof pages !== 'undefined'){
						if(!pages.includes(ChannelName)){
							pages.push(ChannelName);
						}
					}else{
						pages = [];
						pages.push(data);
					}
					//alert(pages);
					chrome.storage.sync.set({"block":pages});
					
					Dlt();
				});
			
			// Go Back
			
		}
		
	});
}else{
	// Nothing Really Happens
}
}
	





