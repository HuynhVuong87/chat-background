// chrome.browserAction.onClicked.addListener(function (tab) {
//   chrome.tabs.create({url: 'https://www.facebook.com/huynhnhon198'})
// })
console.log("hello");
chrome.storage.local.get('tempBgChat', function (obj) {
    if (Object.keys(obj).length === 0) {
        chrome.storage.local.set({
            bgChat_HuynhNhon: []
        });
        chrome.storage.local.set({
            tempBgChat: {
                uid: "",
                bgUrl: ""
            }
        });
    }else{

    }
})
chrome.runtime.onConnect.addListener(function (externalPort) {
    externalPort.onDisconnect.addListener(function() {
        
        console.log("onDisconnect");
    });
})