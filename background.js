
// chrome.tabs.onUpdated.addListener(
//     function (changeInfo)
//     { 
      //if ( changeInfo.status === "complete" )
      //{
        // if(typeof document !== 'undefined') {
        //     var p = document.createElement("eggs");
        //     const element = document.getElementById("body");
        //     p.innerText="SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs";
        //     element.appendChild(p);
            // chrome.storage.local.set({"time": 3 * 60 * 60 * 1000 }).then(() => {
            //      console.log(time);
            // });
            (async function main() {
            console.log(chrome.runtime.id)
            if ((chrome.runtime.id)) {
                    
            

            console.log(window.location.href);
            console.log(window.ALREADY_INJECTED_FLAG);
            if (!window.ALREADY_INJECTED_FLAG) {
                window.ALREADY_INJECTED_FLAG = true
                
                //init() // <- All side effects go here
            
            
            var time = 0;  
            //time = 3 * 60 * 60 * 1000;
            var prevDate = 0
            
            // //sleep(8500);
            //console.log(prevDate);
            var timeout;
            console.log(time);
            
            

            prevDate = await getPrevDate()
            console.log(prevDate)
            time = await getTime(prevDate)
            console.log(time)

            var times = {
                timeLeft : 0
            };
            console.log(time);
           
            //timeout = setTimeout(closeYT, time)
            
            //time = 3 * 60 * 60 * 1000;
            
            setInterval(function() {
                //console.log("periodic")
                if (document.hidden) {
                    console.log("HIDDENNNNN");
                }
                else {
                    
                temp = time;
                console.log('Time left: '+ Math.floor(temp / 3600000) + ' Hours ' + Math.floor((temp % 3600000) / 60000) + ' Minutes ' + (temp % 60000) / 1000 + ' Seconds');
                time -= 1000;
                if(time < 0) {
                    time = 0
                    window.location.replace("https://courses.cs.washington.edu/courses/cse163/20wi/files/lectures/L04/bee-movie.txt");
                }
                times = {
                    timeLeft : time
                };
               
                
                }
                
                
                // chrome.storage.sync.set({"myKey": time},function(){
                //     console.log("object stored");
                // })
                //  chrome.storage.sync.get("myKey",function(obj){
                //      console.log(obj.myKey);
                //  })
                //console.log(times.timeLeft);
                
            }, 1000);
            }
            else {
                console.log(window.ALREADY_INJECTED_FLAG);  
            }
        }
    })();
        //}     
      //};
//     }
//   );

function closeYT() {
    window.location.replace("https://courses.cs.washington.edu/courses/cse163/20wi/files/lectures/L04/bee-movie.txt");
    console.log(window.location.href)
    console.log("YOUVE BEEN TIMED");
    clearTimeout(timeout)
}
function getTimeLeft(timeout) {
    return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000);
}
function strcmp(a, b)
{   
    return (a<b?-1:(a>b?1:0));  
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
function timeout(duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
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
async function getTime(prevDate) {
    const date = new Date(Date.now());
    await timeout(1);
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
    
    
    return time
}
// const readLocalStorage = async (key) => {
//     return new Promise((resolve, reject) => {
//       chrome.storage.local.get([key], function (result) {
//         if (result[key] === undefined) {
//           reject();
//         } else {
//           resolve(result[key]);
//         }
//       });
//     });
//   };

// async function getData() {
//     var temp2 = await readLocalStorage("day");
//     temp2 = parseInt(temp2);
//     return temp2;
// }
//export { times }; 