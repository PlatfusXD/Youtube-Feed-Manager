function block(info, tab){
	chrome.tabs.sendMessage(tab.id, "getClickedEl", function() {
    });
	
}


chrome.contextMenus.create({
      title: "Block Channel",
      contexts: ["image", "video"],
      onclick: block
});