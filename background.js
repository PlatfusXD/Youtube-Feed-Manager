const config = { attributes: false, childList: true, subtree: false };
const config2 = { attributes: true, childList: true, subtree: false };

let flag1 = false;

document.onload = myMain();

const Dlt = function() {
	try {
		const conts = document.querySelector('.grid[page-subtype="home"]').querySelector("#contents").querySelectorAll("ytd-rich-item-renderer");
		chrome.storage.sync.get("feedHide", function(data2) {
			let obj2 = JSON.parse(JSON.stringify(data2));
			let pgs2 = obj2.feedHide;
			if(pgs2 && window.location.href.indexOf("channel") === -1){
				document.querySelector('.grid[page-subtype="home"]').querySelector("#primary").style.display = "none";
				return;
			}
			chrome.storage.sync.get("enbl", function(data3) {
			const objs = JSON.parse(JSON.stringify(data3));
			const value = objs.enbl;
			if(value) {
				chrome.storage.sync.get("block",
				function(data) {
					const obj = JSON.parse(JSON.stringify(data));
					const pgs = obj.block;
					let n = 0;
					for(let i = 0; i < conts.length; ++i) {
						try {
							const txt = conts[i].querySelector("#channel-name").querySelector("a").textContent;
							if(conts[i].querySelector("#avatar-link").getAttribute("title") === "undefined") {
								// Here for Check weather
							}
							for(let j = 0; j < pgs.length; j++) {
								if(txt === pgs[j]) {
									conts[i].style.display = "none";
								}
								n++;
							}
						}
						catch {}
					}
				});
				}
			});
		});
	}
	catch(e) {}
};

const rt = function() {
	if(!flag1) SetPageObserve();
	try {
		chrome.storage.sync.get("trend", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			const pgs = obj.trend;
			if(pgs) {
			document.querySelector("#endpoint[title='Trending']").style.display = "none";
			document.querySelector("ytd-mini-guide-renderer").style.display = "none";
				const docs = document.querySelectorAll("ytd-browse");
				let i = 0;
				while(i<docs.length){
				if(!docs[i].hasAttribute("page-subtype")){
					docs[i].style.display = "none";
					break;
				}
				i++;
			}
		}
		});
	}
	catch {}
	Dlt();
};

function SetPageObserve() {
	flag1 = true;
	try {
		const Contents = document.querySelector('.grid[page-subtype="home"]').querySelector("#contents");
		const observer = new MutationObserver(Dlt);
		observer.observe(Contents, config);
	}
	catch {
		flag1 = false;
	}

	try {
		chrome.storage.sync.get("cat", function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			const pgs = obj.cat;
			if(pgs) document.getElementById("chips-below").style.display = "none";
		});
	}
	catch {}
}

function myMain (evt) {
	const jsInitChecktimer = setInterval(checkForJS_Finish, 100);

	function checkForJS_Finish () {
        if (document.querySelector("ytd-page-manager") != null) {
            clearInterval(jsInitChecktimer);
            Start();
        }
    }
}

function Start() {
	if (window.location.href.indexOf("youtube") <= -1) return;
	// Get All contents
	SetPageObserve();

	const ytd = document.querySelector("ytd-page-manager");
	const observer2 = new MutationObserver(rt);
	observer2.observe(ytd, config2);
	rt();

	let clickedEl = null;

	chrome.storage.sync.get("ytHide", function(data) {
		const obj = JSON.parse(JSON.stringify(data));
		const pgs = obj.ytHide;
		if(pgs){
			document.querySelectorAll("ytd-app")[0].style.display = "none";
		}
	});

	document.addEventListener("mousedown", function(event) {
		if(event.button === 2) {
			clickedEl = event.target;
		}
	}, true);

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(request === "getClickedEl") {
			const ChannelName = clickedEl.closest('#dismissable').querySelector("#channel-name").querySelector("a").textContent;
			sendResponse({value: clickedEl.value});
			chrome.storage.sync.get("block",
			function(data) {
				const objs = JSON.parse(JSON.stringify(data));
				let pages = objs.block;
				if(typeof pages !== 'undefined') {
					if(!pages.includes(ChannelName)) {
						pages.push(ChannelName);
					}
				}
				else {
					pages = [];
					pages.push(data);
				}
			chrome.storage.sync.set({"block": pages});
				Dlt();
			});
		}
	});
}
	





