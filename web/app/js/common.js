var baseURL = "http://127.0.0.1:9090/api/v1";

/**
 * 当前用户信息
 */
var globalUser = getLoginUser();


/**
 * 获取当前登陆用户信息
 */


function getLoginUser(){
    var user = {};
    $.ajax({
        type: "GET",
        url: baseURL + '/employments/' + userId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async:false,
        success: function (data) {
            if (data.code == 1000) {
                user = data.data;
            }
            console.log(data);
        },
        error: function (msg) {

        }
    });
    return user;
}






