document.addEventListener('DOMContentLoaded', function() {
	const link = document.getElementById('sbmt');
	const add = document.getElementById('a-ch');
	const hid = document.getElementById('h-f');
	const cat = document.getElementById('h-c');
	const trend = document.getElementById('h-t-t');
	const yt = document.getElementById('h-y');
	const pop = document.getElementById('h-p');

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

function ShowBlocked() {
	try {
		chrome.storage.sync.get("feedHide", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			document.getElementById('hide-feed').checked = obj.feedHide;
		});
	}
	catch {
		chrome.storage.sync.set({"feedHide": false});
	}

	try {
		chrome.storage.sync.get("cat", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			document.getElementById('hide-categories').checked = obj.cat;
		});
	}
	catch {
		chrome.storage.sync.set({"cat": false});
	}

	try {
		chrome.storage.sync.get("trend", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			document.getElementById('hide-trends').checked = obj.trend;
		});
	}
	catch {
		chrome.storage.sync.set({"trend": false});
	}

	try {
		chrome.storage.sync.get("trend", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			const pgs = obj.trend;
			document.getElementById('hide-trends').checked = pgs;
		});
	}
	catch {
		chrome.storage.sync.set({"trend": false});
	}

	try {
		chrome.storage.sync.get("ytHide", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			document.getElementById('hide-youtube').checked = obj.ytHide;
		});
	}
	catch {
		chrome.storage.sync.set({"ytHide": false});
	}

	try {
		chrome.storage.sync.get("popUpHide", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			const pgs = obj.popUpHide;
			document.getElementById('hide-popup').checked = pgs;
		});
	}
	catch {
		chrome.storage.sync.set({"popUpHide": false});
	}

	chrome.storage.sync.get("block",
		function(data) {
				const obj = JSON.parse(JSON.stringify(data));
				const pgs = obj.block;
				for(let i = 0; i < pgs.length; ++i){
					const channel = document.createElement("div");
					channel.className = "channel";
					channels.appendChild(channel);

					const span = document.createElement("span");
					span.className = "channel-name";
					const textNode = document.createTextNode(pgs[i]);
					span.appendChild(textNode);
					channel.appendChild(span);

					const restore = document.createElement("div");
					restore.className = "restore";
					restore.setAttribute("title",i);
					restore.onclick = (function(){
						const curI = i;
						return function(){
						restoreChannel(curI);
						}
					})();
					channel.appendChild(restore);

					const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
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

					const path = document.createElementNS('http://www.w3.org/2000/svg', "path");
					path.setAttribute("fill","currentColor");
					path.setAttribute("d","M 432 32 H 312 l -9.4 -18.7 A 24 24 0 0 0 281.1 0 H 166.8 a 23.72 23.72 0 0 0 -21.4 13.3 L 136 32 H 16 A 16 16 0 0 0 0 48 v 32 a 16 16 0 0 0 16 16 h 416 a 16 16 0 0 0 16 -16 V 48 a 16 16 0 0 0 -16 -16 Z M 53.2 467 a 48 48 0 0 0 47.9 45 h 245.8 a 48 48 0 0 0 47.9 -45 L 416 128 H 32 Z");
					svg.appendChild(path);

					const span2 = document.createElement("span");
					const textNode2 = document.createTextNode("restore");
					restore.appendChild(span2);
					span2.appendChild(textNode2);
				}
		});
}

function TrendChange() {
	const hide = document.getElementById('hide-trends').checked;
	chrome.storage.sync.set({"trend": hide});
}

function CatChange() {
	const hide = document.getElementById('hide-categories').checked;
	chrome.storage.sync.set({"cat": hide});
}

function addChannel() {
	modal.style.visibility = "visible";
	modal.style.opacity = "1";
}

function hideFeed() {
	const hide = document.getElementById('hide-feed').checked;
	chrome.storage.sync.set({"feedHide": hide});
}

function hideYt() {
	const hide = document.getElementById('hide-youtube').checked;
	chrome.storage.sync.set({"ytHide": hide});
}

function hidePopUp() {
	const hide = document.getElementById('hide-popup').checked;
	chrome.storage.sync.set({"popUpHide": hide});
}

function restoreChannel(name) {
	chrome.storage.sync.get("block",
	function(data) {
		const obj = JSON.parse(JSON.stringify(data));
		const pgs = obj.block;
		pgs.splice(name,1);
		chrome.storage.sync.set({"block":pgs});
		channels.innerHTML = "";
		ShowBlocked();
	});
}

function submitChannel() {
	const ChannelName = document.getElementById("texthold").value;
	chrome.storage.sync.get("block",
	function(data){
		const objs = JSON.parse(JSON.stringify(data));
		const pages = objs.block;
		if(!pages.includes(ChannelName)) pages.push(ChannelName);
		chrome.storage.sync.set({"block":pages});
		ShowBlocked();
		document.getElementById("texthold").value = "";
	});
}
		
		
		
