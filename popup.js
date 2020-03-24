'use strict';
var result;
var apistatus2;

var tag = false;
var event1 = null;
var file = null;

var newtag;
var newevent1 = {};
var newfile = {};

// let apistatus = {};

var currentabid;
var myinterval;


chrome.tabs.query({currentWindow: true, active:true} , function callback (tab) {
  console.log("current tab", tab);
  currentabid = tab[0].id;
  // myinterval = setInterval(recall, 2000);
  myinterval = setInterval(() => { 
      chrome.storage.sync.get(null , function (res) {
      console.log('Result currently is ',currentabid, JSON.stringify(res));
      console.log(currentabid.toString());
      if (res[currentabid].tag && Object.keys(res[currentabid].file) && Object.keys(res[currentabid].event1)) {
        // myinterval.clearInterval();
      }
      if(res[currentabid]) {
        updatePopup(res[currentabid].event1, res[currentabid].file, res[currentabid].tag);
      }
    });

    }, 2000); 

});

function updatePopup(event, files, tags) {

  // Tag will be checked here
  if (tags && tags === true && document.getElementById('tag')) {
    document.getElementById('tag').innerText = 'Tag Placed Successfuly';
  }
  else {
    document.getElementById('tag').style.display = 'block';
  }

  // Files Loading will be checked here
  if (files) {
    if (files['vdo.ai.js'] && files['vdo.ai.js'].isVerified === true && files['vdo.ai.js'].status === 200) {
      // console.log(files['vdo.ai.js'].isVerified === true && files['vdo.ai.js'].status === 200);
      document.getElementById('vdoaijs').innerText = 'Success';
    }
    if (files['vdo.min.js'] && files['vdo.min.js'].isVerified === true && files['vdo.min.js'].status === 200) {

      document.getElementById('vdominjs').innerText = 'Success';
    }
    if (files['adframe.js'] && files['adframe.js'].isVerified === true && files['adframe.js'].status === 200) {

      document.getElementById('adframejs').innerText = 'Success';
    }
    if (files['vdo.min.css'] && files['vdo.min.css'].isVerified === true && files['vdo.min.css'].status === 200) {

      document.getElementById('vdomincss').innerText = 'Success';
    }
  }


  // Events will be checked here
  if (event && Object.keys(event).length > 0) {
    if (event['initVdo'].isVerified === true && event['initVdo'].status === 200) {
      document.getElementById('init').innerText = 'Success';
    }
    if (event['forceplay'].isVerified === true && event['forceplay'].status === 200) {
      document.getElementById('forcep').innerText = 'Success';
    }
    if (event['pageview'].isVerified === true && event['pageview'].status === 200) {
      document.getElementById('pagev').innerText = 'Success';
    }
    if (event['video_loaded'].isVerified === true && event['video_loaded'].status === 200) {
      document.getElementById('videoload').innerText = 'Success';
    }
  }

}












  // chrome.storage.sync.clear(() => {
  //   console.log("Data is dumped here");
  //  });

  //   chrome.storage.sync.get(['tagstatus', 'files', 'events'], function (res) {
  //   console.log('Result currently is ', JSON.stringify(res.tagstatus));
  //   console.log('Result currently is ', JSON.stringify(res.files));
  //   console.log('Result currently is ', JSON.stringify(res.events));
  //   newtag = res.tagstatus;
  //   newfile = res.files;
  //   newevent1 = res.events;

  // });

// chrome.runtime.onMessage.addListener(function (msg) {
//   console.log('all data to be shown coming here', msg);
//   if (msg.type === 'TAG' && msg.data !== 0) {
//     tag = msg.data;
//     console.log('Tag recieved', tag);
//     // chrome.storage.sync.set({ tagstatus: tag}, function () {
//     //   // console.log('Tag is set to: ' + tag );
//     // });
//     // localStorage.setItem(`${currentabid}-tag`, JSON.stringify(tag));
//     // document.getElementById('tag').innerText = 'Tag Placed'+ tag;
//   }
//   if (msg.type === 'FILES' && msg.data !== 0) {
//     file = msg.data;
//     console.log('Files recieved', file);
//     // chrome.storage.sync.set({ files: file }, function () {
//     //   // console.log('Files is set to: ' + file);
//     // });
//     // document.getElementById('file').innerText = 'Files Recieved' + file;
//   }
//   if (msg.type === 'EVENTS' && msg.data !== 0) {
//     event1 = msg.data;
//     console.log('Events received', event1);
//     // chrome.storage.sync.set({ events: event1 }, function () {
//     //   // console.log('Event is set to: ' + event );
//     // });
//     // document.getElementById('event').innerText = 'Events Occurred' + event;  
//   }
//   updatePopup(event1, file, tag);
//   chrome.storage.sync.get([currentabid.toString()], function (res) {
//     console.log('Result currently is ', JSON.stringify(res[currentabid]));
//     console.log(currentabid.toString());
//     // updatePopup(res[currentabid].event1, res[currentabid].file, res[currentabid].tag);
// if (res[currentabid]) {
//   let obj = {};
//   if (event1) {
//     obj.event1 = event1;
//   } else {
//     obj.event1 = res[currentabid].event1;
//   }
//   if (file) {
//     obj.file = file;
//   } else {
//     obj.file = res[currentabid].file;
//   }
//   if (tag) {
//     obj.tag = tag;
//   } else {
//     obj.tag = res[currentabid].tag;
//   }
// }
//     chrome.storage.sync.set({[currentabid.toString()]: {event1, file, tag} });
//   });

// });

// chrome.storage.sync.get(['tagstatus', 'files', 'events'], function (res) {
//   console.log('Result currently is ', JSON.stringify(res.tagstatus));
//   console.log('Result currently is ', JSON.stringify(res.files));
//   console.log('Result currently is ', JSON.stringify(res.events));
//   newtag = res.tagstatus;
//   newfile = res.files;
//   newevent1 = res.events;
//   // if (newtag && newfile && newevent1) {
//     updatePopup();
//   // }
// });

// code to check tab is switched to erase current data
// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   chrome.tabs.get(activeInfo.tabId, function (tab) {
//     // alert(tab.url);
//     chrome.storage.sync.clear();
//     newtag = false;
//     newevent1 = null;
//     newfile = null;
//     if (document.getElementById('result') && !newtag) {
//       document.getElementById('tag').style.display = 'block';
//     }
//   });
// });




// chrome.tabs.onActivated.addListener(function(activeInfo) {
//   chrome.tabs.get(activeInfo.tabId, function(tab){
//    currentabid = tab.id;
//    console.log("Current Tab Info", currentabid);
//   });
//  });
// chrome.browserAction.onClicked.addListener(() => {
//   console.log('extesnion clicked');
  
//   chrome.tabs.query({active:true} , function callback (tab) {
//     console.log("current tab", tab);
//     currentabid = tab[0].id;
//     // myinterval = setInterval(recall, 2000);
//       chrome.storage.sync.get([currentabid.toString()], function (res) {
//       console.log('Result currently is ', JSON.stringify(res[currentabid]));
//       console.log(currentabid.toString());
//       updatePopup(res[currentabid].event1, res[currentabid].file, res[currentabid].tag);

//     });
//   });
// });