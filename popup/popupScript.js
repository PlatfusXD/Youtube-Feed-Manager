document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('hide-channel');
    var check = document.getElementById('feed-checkbox');
    var cat = document.getElementById('cat-checkbox');
    var enbl = document.getElementById('ext-enabler');
    var trend = document.getElementById('trend-checkbox');
    var yt = document.getElementById('yt-checkbox');
	
    // onClick's logic below:
    link.addEventListener('click', function() {
        hideChannel();
    });
	check.addEventListener('change',function(){
		CheckCheck();
	});
	enbl.addEventListener('click',function(){
		extEnabler();
	});
	cat.addEventListener('click',function(){
		catChange();
	});
	trend.addEventListener('click',function(){
		trendChange();
	});
	yt.addEventListener('change', function(){
		HideYt();
	});
});

window.onload = Set();

function extEnabler() {
    //tu masz ładną klasę pod załączanie albo wyłączanie ext :)
	try{
	chrome.storage.sync.get("enbl",function(data){
		var objs = JSON.parse(JSON.stringify(data));
		var value = objs.enbl;
		var enabled = value;
		
		enabled = !enabled;
		
		var btt = document.getElementById("ext-enabler");
		
		if(enabled){
			btt.classList.replace('not-active', 'active');
			btt.textContent = "Enabled";
		}
		else{
			btt.classList.replace('active', 'not-active');
			btt.textContent = "Disabled";
		}
		
		chrome.storage.sync.set({"enbl": enabled});
		
	});
	}
	catch{
		chrome.storage.sync.set({"enbl": true});
	}
}

function catChange(){
	var hide = document.getElementById('cat-checkbox').checked;
	chrome.storage.sync.set({"cat": hide});
}

function trendChange(){
	var hide = document.getElementById('trend-checkbox').checked;
	chrome.storage.sync.set({"trend": hide});
}

function hideChannel() {
	var ChannelName = document.getElementById("channel-name").value;
			chrome.storage.sync.get("block",
			function(data){
				var objs = JSON.parse(JSON.stringify(data));
				var pages = objs.block;
				//alert(pages)
				if(!pages.includes(ChannelName) && ChannelName.trim()!=""){
					pages.push(ChannelName);
				}
				//alert(pages);
				chrome.storage.sync.set({"block":pages});
				document.getElementById("channel-name").value = "";
			});
}

function CheckCheck(){
	var hide = document.getElementById('feed-checkbox').checked;
	chrome.storage.sync.set({"feedHide": hide});
}

function HideYt(){
	let hide = document.getElementById('yt-checkbox').checked;
	console.log(hide);
	chrome.storage.sync.set({"ytHide": hide});
}

function Set(){
	try{
	chrome.storage.sync.get("feedHide",function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.feedHide;
				document.getElementById('feed-checkbox').checked = pgs;
			});
	}catch{
		chrome.storage.sync.set({"feedHide": false});
	}	
	try{	
	chrome.storage.sync.get("enbl",function(data){
		var objs = JSON.parse(JSON.stringify(data));
		var value = objs.enbl;
		var enabled = value;
		
		var btt = document.getElementById("ext-enabler");

		if(enabled){
			btt.classList.replace('not-active', 'active');
			btt.textContent = "Enabled";
		}
		else{
			btt.classList.replace('active', 'not-active');
			btt.textContent = "Disabled";
		}
	});
	}catch{
		chrome.storage.sync.set({"enbl": true});
	}
	try{
		chrome.storage.sync.get("cat",function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.cat;
				document.getElementById('cat-checkbox').checked = pgs;
			});
	}catch{
		chrome.storage.sync.set({"cat": false});
	}
	
	try{
		
		chrome.storage.sync.get("trend",function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.trend;
				document.getElementById('trend-checkbox').checked = pgs;
			});
			
	}catch{
		chrome.storage.sync.set({"trend": false});
	}
	try{
		chrome.storage.sync.get("ytHide",function(data){
				var obj = JSON.parse(JSON.stringify(data));
				var pgs = obj.ytHide;
				document.getElementById('yt-checkbox').checked = pgs;
			});
	}catch{
		chrome.storage.sync.set({"ytHide": false});
	}
					
}

