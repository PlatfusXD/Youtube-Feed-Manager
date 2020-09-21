document.addEventListener('DOMContentLoaded', function() {
	const link = document.getElementById('hide-channel');
	const check = document.getElementById('feed-checkbox');
	const cat = document.getElementById('cat-checkbox');
	const enbl = document.getElementById('ext-enabler');
	const trend = document.getElementById('trend-checkbox');
	const yt = document.getElementById('yt-checkbox');

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
	try {
		chrome.storage.sync.get("enbl", function(data) {
			const objs = JSON.parse(JSON.stringify(data));
			let enabled = objs.enbl;
			enabled = !enabled;
			const btt = document.getElementById("ext-enabler");

			if(enabled) {
				btt.classList.replace('not-active', 'active');
				btt.textContent = "Enabled";
			}
			else {
				btt.classList.replace('active', 'not-active');
				btt.textContent = "Disabled";
			}
			chrome.storage.sync.set({"enbl": enabled});
		});
	}
	catch {
		chrome.storage.sync.set({"enbl": true});
	}
}

function catChange() {
	const hide = document.getElementById('cat-checkbox').checked;
	chrome.storage.sync.set({"cat": hide});
}

function trendChange() {
	const hide = document.getElementById('trend-checkbox').checked;
	chrome.storage.sync.set({"trend": hide});
}

function hideChannel() {
	const ChannelName = document.getElementById("channel-name").value;
	chrome.storage.sync.get("block",
		function(data) {
			const objs = JSON.parse(JSON.stringify(data));
			const pages = objs.block;
			if(!pages.includes(ChannelName) && ChannelName.trim() !== "") {
				pages.push(ChannelName);
			}

			chrome.storage.sync.set({"block": pages});
			document.getElementById("channel-name").value = "";
		});
}

function CheckCheck() {
	const hide = document.getElementById('feed-checkbox').checked;
	chrome.storage.sync.set({"feedHide": hide});
}

function HideYt() {
	let hide = document.getElementById('yt-checkbox').checked;
	console.log(hide);
	chrome.storage.sync.set({"ytHide": hide});
}

function Set() {
	try {
		chrome.storage.sync.get("popUpHide", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			const pgs = obj.popUpHide;
			if(pgs) document.querySelector("body").style.display = "none";
		});
	}
	catch {
		chrome.storage.sync.set({"popUpHide": false});
	}

	try {
		chrome.storage.sync.get("feedHide", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			document.getElementById('feed-checkbox').checked = obj.feedHide;
		});
	}
	catch {
		chrome.storage.sync.set({"feedHide": false});
	}

	try {
		chrome.storage.sync.get("enbl", function(data) {
			const objs = JSON.parse(JSON.stringify(data));
			const enabled = objs.enbl;
			const btt = document.getElementById("ext-enabler");

			if(enabled) {
				btt.classList.replace('not-active', 'active');
				btt.textContent = "Enabled";
			}
			else {
				btt.classList.replace('active', 'not-active');
				btt.textContent = "Disabled";
			}
		});
	}
	catch {
		chrome.storage.sync.set({"enbl": true});
	}

	try {
		chrome.storage.sync.get("cat", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			document.getElementById('cat-checkbox').checked = obj.cat;
		});
	}
	catch {
		chrome.storage.sync.set({"cat": false});
	}
	
	try {
		chrome.storage.sync.get("trend", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			document.getElementById('trend-checkbox').checked = obj.trend;
		});
	}
	catch {
		chrome.storage.sync.set({"trend": false});
	}

	try {
		chrome.storage.sync.get("ytHide", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			document.getElementById('yt-checkbox').checked = obj.ytHide;
		});
	}
	catch {
		chrome.storage.sync.set({"ytHide": false});
	}
}

