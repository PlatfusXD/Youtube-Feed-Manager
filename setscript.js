document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('sbmt');
    var add = document.getElementById('a-ch');
    var hid = document.getElementById('h-f');
    var cat = document.getElementById('h-c');
    var trend = document.getElementById('h-t-t');
    var yt = document.getElementById('h-y');
    var pop = document.getElementById('h-p');
    // onClick's logic below:
    link.addEventListener('click', function() {
        submitChannel();
    });
	add.addEventListener('click',function(){
		addChannel();
	});
	hid.addEventListener('change',function(){
		hideFeed();
	});
	cat.addEventListener('change',function(){
		CatChange();
	});
	trend.addEventListener('change',function(){
		TrendChange();
	});
	yt.addEventListener('change', function(){
		hideYt();
	});
	pop.addEventListener('change', function(){
		hidePopUp();
	});
});

		const modal = document.getElementById("modal");
        const span = document.getElementsByClassName("close")[0];
		const channels = document.getElementsByClassName("channels")[0];
		
		window.onload = ShowBlocked();

        span.onclick = function() {
            modal.style.visibility = "hidden";
            modal.style.opacity = "0";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.visibility = "hidden";
                modal.style.opacity = "0";
            }
        }
		
		function ShowBlocked(){
			try{
			chrome.storage.sync.get("feedHide",function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.feedHide;
				document.getElementById('hide-feed').checked = pgs;
			});
			}catch{
				chrome.storage.sync.set({"feedHide": false});
			}
			
			try{
			chrome.storage.sync.get("cat",function(data){
					var obj = JSON.parse(JSON.stringify(data));
					var pgs = obj.cat;
					document.getElementById('hide-categories').checked = pgs;
				});
			}catch{
				chrome.storage.sync.set({"cat": false});
			}
			
			try{
			chrome.storage.sync.get("trend",function(data){
					var obj = JSON.parse(JSON.stringify(data));
					var pgs = obj.trend;
					document.getElementById('hide-trends').checked = pgs;
				});
			}catch{
				chrome.storage.sync.set({"trend": false});
			}
			try{
			chrome.storage.sync.get("trend",function(data){
					var obj = JSON.parse(JSON.stringify(data));
					var pgs = obj.trend;
					document.getElementById('hide-trends').checked = pgs;
				});
			}catch{
				chrome.storage.sync.set({"trend": false});
			}
			try{
				chrome.storage.sync.get("ytHide",function(data){
					var obj = JSON.parse(JSON.stringify(data));
					var pgs = obj.ytHide;
					document.getElementById('hide-youtube').checked = pgs;
				});
			}catch{
				chrome.storage.sync.set({"ytHide": false});
			}
			try{
				chrome.storage.sync.get("popUpHide",function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.popUpHide;
				document.getElementById('hide-popup').checked = pgs;
				});
			}catch{
				chrome.storage.sync.set({"popUpHide": false});
			}
			
			chrome.storage.sync.get("block",
			function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.block;
				//console.log(pgs);
				for(i = 0; i < pgs.length; ++i){
					var channel = document.createElement("div");
					channel.className = "channel";
					channels.appendChild(channel);
					
					var span = document.createElement("span");
					span.className = "channel-name";
					
					var textNode = document.createTextNode(pgs[i]);
					span.appendChild(textNode);
					
					channel.appendChild(span);
					
					var restore = document.createElement("div");
					restore.className = "restore";
					restore.setAttribute("title",i);
					restore.onclick = (function(){
						var curI = i;
						return function(){
						restoreChannel(curI);
						}
					})();
					
					channel.appendChild(restore);
					
					var svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
					svg.setAttribute("class", "svg-inline--fa fa-trash fa-w-14");
					svg.setAttribute("aria-hidden","true");
					svg.setAttribute("focusable","false");
					svg.setAttribute("data-prefix","fas");
					svg.setAttribute("data-icon","trash");
					svg.setAttribute("role","img");
					svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
					svg.setAttribute("viewBox","0 0 448 512");
					svg.setAttribute("data-fa-i2svg","");
					
					restore.appendChild(svg);
					
					var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
					path.setAttribute("fill","currentColor");
					path.setAttribute("d","M 432 32 H 312 l -9.4 -18.7 A 24 24 0 0 0 281.1 0 H 166.8 a 23.72 23.72 0 0 0 -21.4 13.3 L 136 32 H 16 A 16 16 0 0 0 0 48 v 32 a 16 16 0 0 0 16 16 h 416 a 16 16 0 0 0 16 -16 V 48 a 16 16 0 0 0 -16 -16 Z M 53.2 467 a 48 48 0 0 0 47.9 45 h 245.8 a 48 48 0 0 0 47.9 -45 L 416 128 H 32 Z");
					
					svg.appendChild(path);
					
					var span2 = document.createElement("span");
					var textNode2 = document.createTextNode("restore");
					
					restore.appendChild(span2);
					
					span2.appendChild(textNode2);
					
				}
		});
		}
		
		function TrendChange(){
			var hide = document.getElementById('hide-trends').checked;
			chrome.storage.sync.set({"trend": hide});
		}
		
		function CatChange(){
			var hide = document.getElementById('hide-categories').checked;
			chrome.storage.sync.set({"cat": hide});
		}

        function addChannel() {
            modal.style.visibility = "visible";
            modal.style.opacity = "1";
        }
        
        function hideFeed() {
			var hide = document.getElementById('hide-feed').checked;
			chrome.storage.sync.set({"feedHide": hide});
        }
        
        function hideYt(){
        	var hide = document.getElementById('hide-youtube').checked;
			chrome.storage.sync.set({"ytHide": hide});
        }
		
		function hidePopUp(){
			var hide = document.getElementById('hide-popup').checked;
			chrome.storage.sync.set({"popUpHide": hide});
		}
        
        function restoreChannel(name) {
			chrome.storage.sync.get("block",
			function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.block;
				pgs.splice(name,1);
				chrome.storage.sync.set({"block":pgs});
				channels.innerHTML = "";
				ShowBlocked();
			});
        }

        function submitChannel() {
			var ChannelName = document.getElementById("texthold").value;
			chrome.storage.sync.get("block",
			function(data){
				var objs = JSON.parse(JSON.stringify(data));
				var pages = objs.block;
				//alert(pages)
				if(!pages.includes(ChannelName)){
					pages.push(ChannelName);
				}
				//alert(pages);
				chrome.storage.sync.set({"block":pages});
				ShowBlocked();
				document.getElementById("texthold").value = "";
			});
        }
		
		
		
