var inBannedTab = false;
chrome.tabs.onActivated.addListener(async () => {
    
    var tab = await getCurrentTab();
    console.log(tab.url)
    var bannedURLs = await getBannedURLs();
    var cnt = 0;
    for(var i = 0; i < bannedURLs.length; i++) {
        if(tab.url.includes(bannedURLs[i])) {
            cnt++;
            inBannedTab = true
        }
    }
    if(cnt == 0) {
        inBannedTab = false
    }
});
chrome.tabs.onActivated.addListener(function(tab, tabID) {
    
    var bannedURLs = new Array();
    chrome.storage.local.get(["bannedList"]).then((result) => {
            if(!(result.bannedList === undefined)) {
                bannedURLs = result.bannedList;
            }
            
    });
    setTimeout(function() {
    // for(var i = 0; i < bannedURLs.length; i++) {
    //     console.log(bannedURLs[i])
    // } 
    console.log("UPDATED")
    //console.log(bannedURLs)
    if(tabID != null) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        
        console.log(tabs[0].url);
        var cnt = 0
        for(var i = 0; i < bannedURLs.length; i++) {
            if(tabs[0].url.includes(bannedURLs[i])) {
                cnt++;
                inBannedTab = true
                chrome.scripting
                .executeScript({
                    target : {tabId : tabID},
                    files : [ "background.js" ],
                })
                .then(() => console.log("script injected"));
                console.log(tabs[0].url);
            }
        }
        if(cnt == 0) {
            inBannedTab = false
        }
     
    });
    }

    
    }, 500);
});

chrome.tabs.onHighlighted.addListener(function(tab, tabID) {
    
    var bannedURLs = new Array();
    chrome.storage.local.get(["bannedList"]).then((result) => {
            if(!(result.bannedList === undefined)) {
                bannedURLs = result.bannedList;
            }
            
    });
    setTimeout(function() {
    // for(var i = 0; i < bannedURLs.length; i++) {
    //     console.log(bannedURLs[i])
    // } 
    console.log("UPDATED")
    //console.log(bannedURLs)
    if(tabID != null) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        
        console.log(tabs[0].url);
        var cnt = 0
        for(var i = 0; i < bannedURLs.length; i++) {
            if(tabs[0].url.includes(bannedURLs[i])) {
                cnt++;
                inBannedTab = true
                chrome.scripting
                .executeScript({
                    target : {tabId : tabID},
                    files : [ "background.js" ],
                })
                .then(() => console.log("script injected"));
                console.log(tabs[0].url);
            }
        }
        if(cnt == 0) {
            inBannedTab = false
        }
       
    });
    }

    
    }, 500);
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
    var bannedURLs = new Array();
    //(async () => {
    console.log("UPDATED")
   
    chrome.storage.local.get(["bannedList"]).then((result) => {
        if(!(result.bannedList === undefined)) {
            bannedURLs = result.bannedList;
        }
        
    });
    setTimeout(function() {
        
    // for(var i = 0; i < bannedURLs.length; i++) {
    //     console.log(bannedURLs[i])
    // } 
    if(tabID != null) {
        //console.log(bannedURLs)
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        if(tabs.length != 0) {
        console.log(tabs[0].url)
        var cnt = 0
        for(var i = 0; i < bannedURLs.length; i++) {
            if(tabs[0].url.includes(bannedURLs[i])) {
                cnt++;
                inBannedTab = true
                chrome.scripting
                .executeScript({
                    target : {tabId : tabID},
                    files : [ "background.js" ],
                })
                .then(() => console.log("script injected"));
                console.log(tabs[0].url);
            }
        }
        if(cnt == 0) {
            inBannedTab = false
        }
    } 
    });
    }
    }, 500);
    
});
(async function main() { 
  
    var prevDate = await getPrevDate();
    var time = await getTime(prevDate);
    // setInterval(async function() {
    //     var prevDate2 = await getPrevDateNoReset();
        

        
        
    // }, 5000)
    setInterval(async function() {
        if(inBannedTab){
            prevDate = await getPrevDate();
            time = await getTime(prevDate);
            time -= 1000;
            //time = 60 * 60 * 1000
            console.log(time)
            chrome.storage.local.set({"time": time }).then(() => {
                //console.log(time);
            });
        }
        else {
            console.log(time)
        }
   
        
    }, 1000)


})();
async function getBannedURLs() {
    var bannedURLs = new Array();
    const result = await chrome.storage.local.get(["bannedList"])
        if(!(result.bannedList === undefined)) {
            bannedURLs = result.bannedList;
        }
        
   
    return bannedURLs
}
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  async function getTime(prevDate) {
    var time;
    const date = new Date(Date.now());
    
    if(prevDate == date.getDay()) {
        const result = await chrome.storage.local.get(["time"]);
            if(!(result.time === "undefined")) {
            
                time = parseInt(result.time)
                if(time < 0) {
                    time = 0
                }
            //console.log(time);
            }
            else {
                time = 0
            }
        
    }
    else {
        
        const result = await chrome.storage.local.get(["baseTime"]);
            if(!(result.baseTime === "undefined")) {
            
                time = parseInt(result.baseTime)
                if(time < 0) {
                    time = 0
                }
            //console.log(time);
            }
            else {
                time = 0
            }
           
    }
    await chrome.storage.local.set({"time": time });
    
    return time
}
async function getPrevDate() {
    var prevDate;
    const date = new Date(Date.now());
            const result = await chrome.storage.local.get(["day"])
                if(!(result.day === undefined)) {
                    prevDate = parseInt(result.day);
                    console.log(prevDate);
                }
                
    chrome.storage.local.set({"day": date.getDay() })        
    return prevDate
}
async function getPrevDateNoReset() {
    var prevDate;
    const date = new Date(Date.now());
            const result = await chrome.storage.local.get(["day"])
                if(!(result.day === undefined)) {
                    prevDate = parseInt(result.day);
                    console.log(prevDate);
                }
                
       
    return prevDate
}
// chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//     console.log(tabs[0].url);
// });