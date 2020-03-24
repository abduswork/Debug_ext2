'use strict';
// var result;
let apistatus = {};
var arrEvents = [];


var tag = false;
var file = null;
var event1 = null;

var currentabid;

console.log("jkjbskvbkbvksfbvkbsdkfv kdf kv kdf");
alert('alert');


let events = {
    forceplay: { status: false, isVerified: false },
    pageview: { status: false, isVerified: false },
    initVdo: { status: false, isVerified: false },
    video_loaded: { status: false, isVerified: false }
}

let files = {
    "vdo.ai.js": { status: false, isVerified: false },
    "vdo.min.css": { status: false, isVerified: false },
    "adframe.js": { status: false, isVerified: false },
    "vdo.min.js": { status: false, isVerified: false }
}

// chrome.tabs.query({currentWindow: true, active: true} , function callback (tab) {
//     console.log("current tab", tab);
//     currentabid = tab[0].id;
//     chrome.storage.sync.set({[currentabid.toString()]: {} });
//   });

function getQueryParams(params, headers) {

    let href = headers.url;
    //this expression is to get the query strings
    let reg = new RegExp('[?&]' + params + '=([^&#]*)', 'i');
    let queryString = reg.exec(href);
    // arrEvents.push(queryString[1]);
    // return arrEvents.length;
    console.log([queryString[1]], events);
    if (events[queryString[1]]) {
        events[queryString[1]].isVerified = true;
        events[queryString[1]].status = headers.statusCode;
    }
    let obj = Object.values(events).reduce((acc, val) => {
        return acc && val.isVerified;
    }, true);

    if (true) {
        // chrome.webRequest.onCompleted.removeListener(intercept);
        chrome.runtime.sendMessage(
            null, // PUT YOUR EXTENSION ID HERE
            {
                data: events,
                type: 'EVENTS'
            }
        );
        console.log('finished list', events);
    }
};

chrome.runtime.onMessage.addListener(function (msg) {
    console.log('all data to be shown coming here', msg);
    if (msg.type === 'TAG' && msg.data !== 0) {
      tag = msg.data;
      console.log('Tag recieved', tag);
      // localStorage.setItem(`${currentabid}-tag`, JSON.stringify(tag));
      // document.getElementById('tag').innerText = 'Tag Placed'+ tag;
    }
    if (msg.type === 'FILES' && msg.data !== 0) {
      file = msg.data;
      console.log('Files recieved', file);
      // document.getElementById('file').innerText = 'Files Recieved' + file;
    }
    if (msg.type === 'EVENTS' && msg.data !== 0) {
      event1 = msg.data;
      console.log('Events received', event1);
      // document.getElementById('event').innerText = 'Events Occurred' + event;  
    }
    // chrome.storage.sync.get([currentabid.toString()], function (res) {
    //   console.log('Result currently is ', JSON.stringify(res[currentabid]));
    //   console.log(currentabid.toString());
      chrome.tabs.query({currentWindow: true, active: true} , function callback (tab) {
        console.log("current tab", tab);
        currentabid = tab[0].id;
        // chrome.storage.sync.set({[currentabid.toString()]: {} });
        if (res[currentabid]) {
            let obj = {};
            if (event1) {
              obj.event1 = event1;
            } else {
              obj.event1 = res[currentabid].event1;
            }
            if (file) {
              obj.file = file;
            } else {
              obj.file = res[currentabid].file;
            }
            if (tag) {
              obj.tag = tag;
            } else {
              obj.tag = res[currentabid].tag;
            }
          }
        chrome.storage.sync.set({[currentabid.toString()]: {event1, file, tag} });
      });
      
    });
  
//   });

  
// chrome.tabs.onRemoved.addListener(function(tabId, info) {
// chrome.tabs.get(tabId, function(tab) {
// chrome.storage.sync.remove(tabId.toString() , function callback () {
// console.log("removed", tabId);
// });     
// });
// });


function showHeaders(headers) {
    // var flag = false;
    if (headers) {
        //   console.log("%cVDO.AI API Calls For Respective Publisher", "color:red; font-size:20px", headers);
        var r = headers.url.split('/');
        console.log("hi", r.includes(`track.vdo.ai`));
        
        if (r.includes(`track.vdo.ai`) && headers.statusCode === 200) {
            getQueryParams('event', headers);
        }
        if (r.includes(`a.vdo.ai`) && headers.statusCode === 200) {
            // console.log("%cStatus Of Files is Success ", "color:green; font-size:23px", headers.statusCode);
            let key = headers.url.split("/");
            key = key[key.length - 1];
            apistatus[key] = headers.statusCode;

            if (files[key]) {
                // console.log("files keyyyyyyyyy",files[key]);  
                files[key].isVerified = true;
                files[key].status = headers.statusCode;
            }
            let obj = Object.values(files).reduce((acc, val) => {
                return acc && val.isVerified;
            }, true);

            if (true) {
                chrome.runtime.sendMessage(
                   null, // null, // EXTENSION ID
                    {
                        type: 'FILES',
                        data: files
                    }
                );
                // chrome.storage.sync.set({[`${currentabid}-files`]: files});
                console.log("whole object of files", files);
            }
        }
    }
    else {
        console.log("Files Not Loaded for Further Checking", headers.statusCode);
    }

    // here send data after checking in array to popup.js that files are loaded = true !!

}

function intercept(details) {
    if (details) {
        showHeaders(details);
        // arrEvents = [];
    }
    return true;
}
chrome.webRequest.onCompleted.addListener(
    intercept,
    // filters
    { urls: ['*://a.vdo.ai/core/*', '*://track.vdo.ai/*'] },
    // extraInfoSpec
    ['responseHeaders', 'extraHeaders']);
