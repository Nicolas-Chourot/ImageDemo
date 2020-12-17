/*
    Méthodes d'accès aux services Web API_Server/bookmarks
 */

const apiBaseURL= "http://localhost:5000";
//const apiBaseURL= "https://pushy-observant-case.glitch.me";

function tokenRequestURL() {
    return apiBaseURL + '/token';
}
function storeAccessToken(token) {
    localStorage.setItem('access_Token', token);
}
function eraseAccessToken() {
    localStorage.removeItem('access_Token');
}
function retrieveAccessToken() {
    return  localStorage.getItem('access_Token');
}
function getBearerAuthorizationToken() {
    return { 'Authorization': 'Bearer ' + retrieveAccessToken() };
}
function registerRequestURL() {
    return apiBaseURL + '/Accounts/register';
}
function storeLoggedUsername(username) {
    localStorage.setItem('username', username);
}
function retrieveLoggedUsername() {
    return localStorage.getItem('username');
}
function storeLoggedUserId(userid) {
    localStorage.setItem('userid', userid);
}
function retrieveLoggedUserId() {
    return parseInt(localStorage.getItem('userid'));
}
function storeLoggedUserEmail(email) {
    localStorage.setItem('useremail', email);
}
function retrieveLoggedUserEmail() {
    return localStorage.getItem('useremail');
}
function deConnect() {
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('useremail');
    eraseAccessToken();
}
function webAPI_Register(profil, successCallBack, errorCallBack){
    $.ajax({
        url: apiBaseURL + "/accounts/register",
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(profil),
        success: function () {
            successCallBack();
        },
        error: function(jqXHR) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_register - error");
        }
    })
}
function webAPI_ChangeProfil( profil , successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/accounts/change",
        type: 'PUT',
        headers: getBearerAuthorizationToken(),
        contentType:'application/json',
        data: JSON.stringify(profil),
        success: (data) => {
            storeLoggedUsername(profil.Name);
            storeLoggedUserEmail(profil.Email);
            successCallBack(); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_POST - error");
        }
    });
}
function webAPI_login( Email, Password, successCallBack, errorCallBack) {
    $.ajax({
        url: tokenRequestURL(),
        contentType:'application/json',
        type: 'POST',
        data: JSON.stringify({Email, Password}),
        success: function (response) {
            console.log(response);
            storeAccessToken(response.Access_token);
            storeLoggedUsername(response.Username);
            storeLoggedUserEmail(Email);
            storeLoggedUserId(response.UserId);
            successCallBack();
        },
        error: function(jqXHR, textStatus, errorThrown) {  
            errorCallBack(jqXHR.status);
            console.log("webAPI_login - error");
        }
    })
}
function webAPI_logout(userId, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/accounts/logout/" + userId,
        contentType:'application/json',
        type: 'POST',
        data: JSON.stringify({Id: userId}),
        headers: getBearerAuthorizationToken(),
        success:() => {
            deConnect();
            successCallBack(); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_logout - error");
        }
    });
}
function webAPI_HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/images",
        type: 'HEAD',
        contentType:'text/plain',
        complete: function(request) { 
            console.log(request.getResponseHeader('ETag'));
            successCallBack(request.getResponseHeader('ETag'));},
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_GET_ALL - error");
        }
    });
}
function webAPI_GET_ALL(queryString, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/images" + queryString,
        type: 'GET',
        contentType:'text/plain',
        data:{},
        success: data => { successCallBack(data);},
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_GET_ALL - error");
        }
    });
}
function webAPI_GET( id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/images" + "/" + id,
        type: 'GET',
        contentType:'text/plain',
        data:{},
        success: data  => { successCallBack(data);},
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_GET - error");
        }
    });
}
function webAPI_POST( data , successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/images",
        type: 'POST',
        headers: getBearerAuthorizationToken(),
        contentType:'application/json',
        data: JSON.stringify(data),
        success: (data) => {successCallBack(); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_POST - error");
        }
    });
}
function webAPI_PUT(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/images" + "/" + data.Id,
        type: 'PUT',
        headers: getBearerAuthorizationToken(),
        contentType:'application/json',
        data: JSON.stringify(data),
        success:(s) => {successCallBack();  },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_PUT - error");
        }
    });
}
function webAPI_DELETE( id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/images" + "/" + id,
        contentType:'text/plain',
        type: 'DELETE',
        headers: getBearerAuthorizationToken(),
        success:() => {successCallBack(); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_DELETE - error");
        }
    });
}
function webAPI_DELETE_Account( id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/accounts/remove/" + id,
        contentType:'text/plain',
        type: 'DELETE',
        headers: getBearerAuthorizationToken(),
        success:() => {successCallBack(); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_DELETE_Account - error");
        }
    });
}

