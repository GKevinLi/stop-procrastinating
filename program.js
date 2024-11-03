
const regex = new RegExp('https:\/\/.*');
var div=document.createElement("p"); 
var div2=document.createElement("p"); 
var div3=document.createElement("p"); 
var div4=document.createElement("p"); 
var div5 = document.createElement("ul"); 
div.setAttribute("id", "timer");
div3.setAttribute("id", "failure");
div4.setAttribute("id", "nextTime");
div5.setAttribute("id", "bannedList");
var button = document.getElementById("mybutton");
document.getElementById("title").appendChild(div); 
document.getElementById("newtext").appendChild(div4); 
document.getElementById("URLInputForm").appendChild(div5); 
document.body.appendChild(div2);
document.body.appendChild(div5);  
document.getElementById("URLInputForm").appendChild(div3);

var temp;
chrome.storage.local.get(["time"]).then((result) => {
    if(!(result.time === undefined)) {
        temp = result.time;
    }
    
});

div.innerText='Loading... ';
//div2.innerText='Loading... ';
div4.innerText='Time set tommorrow: Loading....';
var bannedURLs = new Array();
var bannedURLsIDs = new Array();
chrome.storage.local.get(["bannedList"]).then((result) => {
    if(!(result.bannedList === undefined)) {
        bannedURLs = result.bannedList;
    }
    
    upat();
});
chrome.storage.local.get(["baseTime"]).then((result) => {
    if(!(result.baseTime === undefined)) {
        if(parseInt(result.baseTime) < 1000 * 60 * 60) {
            div4.innerText=parseInt(result.baseTime) / 60000 + ' Minutes';
        }
        else {
            div4.innerText=Math.floor(parseInt(result.baseTime) / 3600000) + ' Hours ' + Math.floor((parseInt(result.baseTime) % 3600000) / 60000) + ' Minutes ';
        }
    }
    
});
document.getElementById('mybutton2').onclick = function() {
    var f = document.getElementById('input2').value;
    var g = document.getElementById('options').value;
    if(g != null) {
        if(g.includes("Minutes")) {
            
            chrome.storage.local.set({"baseTime": parseInt(f) * 1000 * 60 }).then(() => {
                
            });
            chrome.storage.local.get(["baseTime"]).then((result) => {
                if(!(result.baseTime === undefined)) {
                    if(parseInt(result.baseTime) < 1000 * 60 * 60) {
                        div4.innerText=parseInt(result.baseTime) / 60000 + ' Minutes';
                    }
                    else {
                        div4.innerText=Math.floor(parseInt(result.baseTime) / 3600000) + ' Hours ' + Math.floor((parseInt(result.baseTime) % 3600000) / 60000) + ' Minutes ';
                    }
                }
                
            });
        }
        if(g.includes("Hours")) {
            
            chrome.storage.local.set({"baseTime": parseInt(f) * 1000 * 60 * 60 }).then(() => {
                //console.log(time);
            });
            chrome.storage.local.get(["baseTime"]).then((result) => {
                if(!(result.baseTime === undefined)) {
                    if(parseInt(result.baseTime) < 1000 * 60 * 60) {
                        div4.innerText=parseInt(result.baseTime) / 60000 + ' Minutes';
                    }
                    else {
                        div4.innerText=Math.floor(parseInt(result.baseTime) / 3600000) + ' Hours ' + Math.floor((parseInt(result.baseTime) % 3600000) / 60000) + ' Minutes ';
                    }
                }
                
            });
        }
        document.getElementById('input2').value = "";
    }
    
}

document.getElementById('mybutton').onclick = function() {
if(regex.test(document.getElementById('input').value)) {
    var e = document.getElementById('input').value;
    if(bannedURLs.includes(e)) {
        div3.setAttribute("id", "failure");
        div3.innerText = "URL Already Entered.";
    }
    else {
    bannedURLs.push(e);
    //bannedURLs = new Array();
    chrome.storage.local.set({"bannedList": bannedURLs }).then(() => {
        //console.log(time);
    });
    // chrome.storage.local.get(["bannedList"]).then((result) => {
    //     if(!(result.bannedList === undefined)) {
    //         div2.innerText = result.bannedList[0];
    //     }
        
    // });

    document.getElementById('input').value = "";
    div3.setAttribute("id", "success");
    for(var i = 0; i < bannedURLs.length - 1; i++) {
        bannedURLsIDs[i].remove();


    }
    bannedURLsIDs = new Array();
    upat();
    //div3.innerText = "URL Successfully Entered.";

    // var temp = document.createElement("p"); 
    // temp.innerText = "";
    // temp.setAttribute("id", e);
    // document.getElementById("URLInputForm").appendChild(temp); 
    // temp.innerText = e;
    // bannedURLsIDs.push(temp);
    // temp.style.fontFamily = 'Inter, sans-serif';
    // temp.style.fontSize = '1em';
    // temp.style.fontVariant = 'normal';

    // var button = document.createElement("button"); 
    //     button.setAttribute("id", bannedURLs.length - 1 + "");
    //     bannedURLsIDs[bannedURLs.length - 1].appendChild(button);
    //     var temp = document.getElementById(e);
    //     button.style.transform = 'translateX(5px)';
    //     button.style.backgroundColor = 'gainsboro';
    //     button.style.fontFamily = 'Inter, sans-serif';
    //     button.style.fontSize = '1em';
    //     button.style.fontVariant = 'normal';
    //     button.addEventListener('mouseover', () => {
    //         button.style.backgroundColor = 'rgb(235, 234, 234)';
    //     });
    //     button.appendChild(document.createTextNode('Delete'));
    //     button.onclick = function () {
    //         button.style.backgroundColor = 'rgb(162, 161, 161)';
    //         button.style.transform = 'translateY(1px), translateX(5px)';
    //         var thing = this.id;
    //         //alert(thing);
    //         //alert(thing);
    //         //temp.remove();
    //         bannedURLsIDs[parseInt(thing)].remove();
    //         bannedURLs.splice(parseInt(thing),1);
    //         chrome.storage.local.set({"bannedList": bannedURLs }).then(() => {
                
    //         });
    //         //this.remove();
    //     };

    }
}
else {
    div3.setAttribute("id", "failure");
    div3.innerText = "That was not an URL. Please try again.";
}
    
    
};


(async function main() {

var blocked = false;
prevDate = await getPrevDate()
temp = await getTime(prevDate)
blocked = await getWebsiteBlocked()


if(blocked) {
    
setInterval(function() {
    //var temp = times.timeLeft;
    //div.innerText = ;
    div.innerText='Time left: '+ Math.floor(temp / 3600000) + ' Hours ' + Math.floor((temp % 3600000) / 60000) + ' Minutes ' + ((temp % 60000) / 1000) + ' Seconds';

    var tempURLs = bannedURLs;
    var str = "";
    for(var i = 0; i < tempURLs.length; i++) {
        str += tempURLs[i] + " ";
    } 
    //div2.innerText = str;
    temp-=1000;
}, 1000);
}
else {
    
    //var temp = times.timeLeft;
        //div.innerText = ;
    div.innerText='Time left: '+ Math.floor(temp / 3600000) + ' Hours ' + Math.floor((temp % 3600000) / 60000) + ' Minutes ' + ((temp % 60000) / 1000) + ' Seconds';
    if(temp <= 0) {
        temp = 0
    }
    setInterval(function() {
        
        var tempURLs = bannedURLs;
        var str = "";
        for(var i = 0; i < tempURLs.length; i++) {
            str += tempURLs[i] + " ";
        } 
        //div2.innerText = str;
    }, 250);    
}


})();

async function getTime() {
    temp = 0
    const result = await chrome.storage.local.get(["time"])
        if(!(result.time === undefined)) {
            temp = result.time;
        }
        
    
    return temp;
}
async function getWebsiteBlocked() {
    blocked = false
    const tabs = await chrome.tabs.query({currentWindow: true, active: true})
        //div3.innerText = tabs[0].url;
    for(var i = 0; i < bannedURLs.length; i++) {
        if(tabs[0].url.includes(bannedURLs[i])) {
            blocked = true;
        }
    }
    return blocked;
}
async function getTime(prevDate) {
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
    const date = new Date(Date.now());
            const result = await chrome.storage.local.get(["day"])
                if(!(result.day === undefined)) {
                    prevDate = parseInt(result.day);
                    console.log(prevDate);
                }
                
    chrome.storage.local.set({"day": date.getDay() })        
    return prevDate
}
function upat() {



    for(var i = 0; i < bannedURLs.length; i++) {
        var temp = document.createElement("p"); 
        temp.innerText = "";
        temp.setAttribute("id", bannedURLs[i]);
        document.getElementById("URLInputForm").appendChild(temp); 
        temp.innerText = bannedURLs[i];
        bannedURLsIDs.push(temp);
        temp.style.fontFamily = 'Inter, sans-serif';
        temp.style.fontSize = '1em';
        temp.style.fontVariant = 'normal';
        //alert(document.getElementById(bannedURLs[i]));
        
    }
    
    for(var i = 0; i < bannedURLs.length; i++) {
        
        var button = document.createElement("button"); 
        button.setAttribute("id", i + "");
        bannedURLsIDs[i].appendChild(button);
        var temp = document.getElementById(bannedURLs[i]);
        button.style.transform = 'translateX(5px)';
        button.style.backgroundColor = 'gainsboro';
        button.style.fontFamily = 'Inter, sans-serif';
        button.style.fontSize = '1em';
        button.style.fontVariant = 'normal';
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = 'rgb(235, 234, 234)';
        });
        button.appendChild(document.createTextNode('Delete'));
        button.onclick = function () {
            button.style.backgroundColor = 'rgb(162, 161, 161)';
            button.style.transform = 'translateY(1px), translateX(5px)';
            var thing = this.id;
            //alert(thing);
            //alert(thing);
            //temp.remove();
            bannedURLsIDs[parseInt(thing)].remove();
            bannedURLs.splice(parseInt(thing),1);
            chrome.storage.local.set({"bannedList": bannedURLs }).then(() => {
                
            });
            //this.remove();
        };
        
    }
}