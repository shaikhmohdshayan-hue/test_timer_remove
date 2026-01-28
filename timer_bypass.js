var socket;
var serverToken;
function create_hs(appl_no,authType) {
var smartDiv = document.getElementById('smartLock');
var faceAuth = document.getElementById('faceAuthReq');
var proctorReq = document.getElementById('proctorReq');
    
    if(authType==='Anugyna')
    {
        socket = new WebSocket('ws://localhost:8000/');
        smartLogout.style.display = "block";
    }
    if(authType==="faceAuthReq")
    {
        faceAuthReq.style.display = "block";
        smartLogout.style.display = "none";
    }
    else if(authType!='Anugyna')
    {
        if(authType==="NoExam")
        {
            smartNoExam.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="completeFlow")
        {
            smartcompleteFlow.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="scheduleDate")
        {
            scheduleDate.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="NOfaceAuthReq")
        {
            NoFaceAuthReq.style.display = "block";
        }
        else if(authType==="bioAuth")
        {
            NoFaceAuthReq.style.display = "block";
        }
        else if(authType==="attemptMaxtimes")
        {
            faceauthmaxtimeallowed.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="attemptMaxtimeDL")
        {
            smartfaceauthmaxtimeallowedDL.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="attemptMaxtimeslot")
        {
            faceauthmaxtimeallowedslot.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="alreadyCompleted")
        {
            alreadyCompleted.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="expiredApplication")
        {
            expiredApplication.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="photoUpload")
        {
            smartphotoUpload.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="capturePhoto")
        {
            capturePhoto.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        if(authType==="maxLogins")
        {
            maxLogins.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        if(authType==="quotaFlag")
        {
            quotaFlag.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }

        photoUpload.style.display = "none";
        completeFlow.style.display = "none";
        NoExam.style.display = "none";
        faceauthmaxtimeallowedDL.style.display = "none";
        faceauthmaxtimeallowedslot.style.display = "none";
        faceAuthReq.style.display = "none";
        proctorReq.style.display = "none";	
        smartLogout.style.display = "block";
    }
    
    socket.addEventListener('open', function (ev) {
    if(authType==='Anugyna' && appl_no!=null)
    {

        var reqOb = new Object();
        reqOb.type = "Authentication";
        reqOb.token = '1234';

    serverToken = "12345";
        reqOb.userid = appl_no;
        var request = JSON.stringify(reqOb);
        socket.send(request);
        smartDiv.style.display = "none";
        sessionStorage.setItem('authType', 'Anugyna');
    }
    
});


var data;
socket.addEventListener('message', function (event) {
    var res = JSON.parse(event.data);
    if (res['type'] == 'Authentication') {
    if (SHA256(serverToken ) == res['token_hash']) {
        data = { status: "success" }
        console.log(data,"allSet");
    } else {
        data = { status: "failed" }
        
    }
    }

});
socket.addEventListener("close", function (event) {
    sessionStorage.clear();
    data = { status: "close" };
    console.log("disconnected!");
    if(authType==='Anugyna' && appl_no==='12345')
    {
        var pname = window.location.pathname.split('/');
        var newurl = window.location.origin+"/"+pname[1]+"/403.jsp";
    }
    else
    { 
        smartDiv.style.display = "block";
        faceAuth.style.display = "none";
        proctorReq.style.display = "none";
        smartLogout.style.display = "block";
        NoFaceAuthReq.style.display = "none";
        maxLogins.style.display = "none";
        capturePhoto.style.display = "none";
        photoUpload.style.display = "none";
        alreadyCompleted.style.display = "none";
        expiredApplication.style.display = "none";
        faceauthmaxtimeallowedslot.style.display = "none";
        faceauthmaxtimeallowedDL.style.display = "none";
        faceauthmaxtimeallowed.style.display = "none";
        scheduleDate.style.display = "none";
        completeFlow.style.display = "none";
        NoExam.style.display = "none";
        smartphotoUpload.style.display = "none";
        smartcompleteFlow.style.display = "none";
        smartNoExam.style.display = "none";
        smartfaceauthmaxtimeallowedDL.style.display = "none";
        smartfaceauthmaxtimeallowedslot.style.display = "none";
        faceAuthReq.style.display = "none";
    }
});

socket.addEventListener("error", function (event) {
    sessionStorage.clear();
    if(authType==='Anugyna' && appl_no==='12345')
    {
        data = { status: "error" };
        var pname = window.location.pathname.split('/');
        var newurl = window.location.origin+"/"+pname[1]+"/403.jsp";
    }
    else
    { 
        smartDiv.style.display = "block";
        faceAuth.style.display = "none";
        proctorReq.style.display = "none";
        smartLogout.style.display = "block";
        NoFaceAuthReq.style.display = "none";
        maxLogins.style.display = "none";
        capturePhoto.style.display = "none";
        photoUpload.style.display = "none";
        alreadyCompleted.style.display = "none";
        expiredApplication.style.display = "none";
        faceauthmaxtimeallowedslot.style.display = "none";
        faceauthmaxtimeallowedDL.style.display = "none";
        faceauthmaxtimeallowed.style.display = "none";
        scheduleDate.style.display = "none";
        completeFlow.style.display = "none";
        NoExam.style.display = "none";
        smartphotoUpload.style.display = "none";
        smartcompleteFlow.style.display = "none";
        smartNoExam.style.display = "none";
        smartfaceauthmaxtimeallowedDL.style.display = "none";
        smartfaceauthmaxtimeallowedslot.style.display = "none";
        faceAuthReq.style.display = "none";
    }
    console.log("some error occurred!");
});
}
function applStatus(url) {
    var appl_no = document.forms["authentication"]["llappln"].value;
    var newobj = new Object();
    newobj.type = 'GenerateLicence';
    newobj.userid = appl_no;
    newobj.url = location.origin+location.pathname.slice(0, window.location.pathname.lastIndexOf('/')+1)+url;
    var newrequest = JSON.stringify(newobj);


setTimeout(() => {
    socket.send(newrequest);
}, 0)
}
function applStatus(url,slot,appl_no) {

    var newobj = new Object();
    newobj.type = 'GenerateLicence';
    newobj.userid = appl_no;
    if(slot=="slots")
    {
        newobj.url = location.origin+"//"+url;
    } else {
        newobj.url = location.origin+location.pathname.slice(0, window.location.pathname.lastIndexOf('/')+1)+url;
    }
    var newrequest = JSON.stringify(newobj);

setTimeout(() => {
    socket.send(newrequest);
}, 1000)
}
function logout() {
setTimeout(() => {
    socket.send('{"type":"LOGOUT"}');
}, 1000)
}var socket;
var serverToken;
function create_hs(appl_no,authType) {
var smartDiv = document.getElementById('smartLock');
var faceAuth = document.getElementById('faceAuthReq');
var proctorReq = document.getElementById('proctorReq');
    
    if(authType==='Anugyna')
    {
        socket = new WebSocket('ws://localhost:8000/');
        smartLogout.style.display = "block";
    }
    if(authType==="faceAuthReq")
    {
        faceAuthReq.style.display = "block";
        smartLogout.style.display = "none";
    }
    else if(authType!='Anugyna')
    {
        if(authType==="NoExam")
        {
            smartNoExam.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="completeFlow")
        {
            smartcompleteFlow.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="scheduleDate")
        {
            scheduleDate.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="NOfaceAuthReq")
        {
            NoFaceAuthReq.style.display = "block";
        }
        else if(authType==="bioAuth")
        {
            NoFaceAuthReq.style.display = "block";
        }
        else if(authType==="attemptMaxtimes")
        {
            faceauthmaxtimeallowed.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="attemptMaxtimeDL")
        {
            smartfaceauthmaxtimeallowedDL.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="attemptMaxtimeslot")
        {
            faceauthmaxtimeallowedslot.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="alreadyCompleted")
        {
            alreadyCompleted.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="expiredApplication")
        {
            expiredApplication.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="photoUpload")
        {
            smartphotoUpload.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        else if(authType==="capturePhoto")
        {
            capturePhoto.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        if(authType==="maxLogins")
        {
            maxLogins.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }
        if(authType==="quotaFlag")
        {
            quotaFlag.style.display = "block";
            NoFaceAuthReq.style.display = "none";
        }

        photoUpload.style.display = "none";
        completeFlow.style.display = "none";
        NoExam.style.display = "none";
        faceauthmaxtimeallowedDL.style.display = "none";
        faceauthmaxtimeallowedslot.style.display = "none";
        faceAuthReq.style.display = "none";
        proctorReq.style.display = "none";	
        smartLogout.style.display = "block";
    }
    
    socket.addEventListener('open', function (ev) {
    if(authType==='Anugyna' && appl_no!=null)
    {

        var reqOb = new Object();
        reqOb.type = "Authentication";
        reqOb.token = '1234';

    serverToken = "12345";
        reqOb.userid = appl_no; 
        var request = JSON.stringify(reqOb);
        socket.send(request);
        smartDiv.style.display = "none";
        sessionStorage.setItem('authType', 'Anugyna');
    }
    
});

var data;
socket.addEventListener('message', function (event) {
    var res = JSON.parse(event.data);
    if (res['type'] == 'Authentication') {
    if (SHA256(serverToken ) == res['token_hash']) {
        data = { status: "success" }
        console.log(data,"allSet");
    } else {
        data = { status: "failed" }
        
    }
    }

});
socket.addEventListener("close", function (event) {
    sessionStorage.clear();
    data = { status: "close" };
    console.log("disconnected!");
    if(authType==='Anugyna' && appl_no==='12345')
    {
        var pname = window.location.pathname.split('/');
        var newurl = window.location.origin+"/"+pname[1]+"/403.jsp";
    }
    else
    { 
        smartDiv.style.display = "block";
        faceAuth.style.display = "none";
        proctorReq.style.display = "none";
        smartLogout.style.display = "block";
        NoFaceAuthReq.style.display = "none";
        maxLogins.style.display = "none";
        capturePhoto.style.display = "none";
        photoUpload.style.display = "none";
        alreadyCompleted.style.display = "none";
        expiredApplication.style.display = "none";
        faceauthmaxtimeallowedslot.style.display = "none";
        faceauthmaxtimeallowedDL.style.display = "none";
        faceauthmaxtimeallowed.style.display = "none";
        scheduleDate.style.display = "none";
        completeFlow.style.display = "none";
        NoExam.style.display = "none";
        smartphotoUpload.style.display = "none";
        smartcompleteFlow.style.display = "none";
        smartNoExam.style.display = "none";
        smartfaceauthmaxtimeallowedDL.style.display = "none";
        smartfaceauthmaxtimeallowedslot.style.display = "none";
        faceAuthReq.style.display = "none";
    }
});

socket.addEventListener("error", function (event) {
    sessionStorage.clear();
    if(authType==='Anugyna' && appl_no==='12345')
    {
        data = { status: "error" };
        var pname = window.location.pathname.split('/');
        var newurl = window.location.origin+"/"+pname[1]+"/403.jsp";
    }
    else
    { 
        smartDiv.style.display = "block";
        faceAuth.style.display = "none";
        proctorReq.style.display = "none";
        smartLogout.style.display = "block";
        NoFaceAuthReq.style.display = "none";
        maxLogins.style.display = "none";
        capturePhoto.style.display = "none";
        photoUpload.style.display = "none";
        alreadyCompleted.style.display = "none";
        expiredApplication.style.display = "none";
        faceauthmaxtimeallowedslot.style.display = "none";
        faceauthmaxtimeallowedDL.style.display = "none";
        faceauthmaxtimeallowed.style.display = "none";
        scheduleDate.style.display = "none";
        completeFlow.style.display = "none";
        NoExam.style.display = "none";
        smartphotoUpload.style.display = "none";
        smartcompleteFlow.style.display = "none";
        smartNoExam.style.display = "none";
        smartfaceauthmaxtimeallowedDL.style.display = "none";
        smartfaceauthmaxtimeallowedslot.style.display = "none";
        faceAuthReq.style.display = "none";
    }
    console.log("some error occurred!");
});
}
function applStatus(url) {
    var appl_no = document.forms["authentication"]["llappln"].value;
    var newobj = new Object();
    newobj.type = 'GenerateLicence';
    newobj.userid = appl_no;
    newobj.url = location.origin+location.pathname.slice(0, window.location.pathname.lastIndexOf('/')+1)+url;
    var newrequest = JSON.stringify(newobj);

setTimeout(() => {
    socket.send(newrequest);
}, 0)
}
function applStatus(url,slot,appl_no) {
    var newobj = new Object();
    newobj.type = 'GenerateLicence';
    newobj.userid = appl_no;
    if(slot=="slots")
    {
        newobj.url = location.origin+"//"+url;
    } else {
        newobj.url = location.origin+location.pathname.slice(0, window.location.pathname.lastIndexOf('/')+1)+url;
    }
    var newrequest = JSON.stringify(newobj);

setTimeout(() => {
    socket.send(newrequest);
}, 1000)
}
function logout() {
setTimeout(() => {
    socket.send('{"type":"LOGOUT"}');
}, 1000)
}

window.create_hs = create_hs;
window.applStatus = applStatus; 
window.logout = logout;
