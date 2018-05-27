//登录
var baseUrl = "http://127.0.0.1:9090/api/v1";
var login=function(){

    if($("#loginbtn").attr("disabled")){
        return;
    }
    var userName = $("#employmentName").val();
    var password = $("#employmentPassword").val();
    $.ajax({
        url: baseUrl + "/loginPost" ,
        type: 'POST',
        data:{'employmentName':userName,'password':password},
        async: false,
        success: function (data) {
            console.log(data);
            if (data.code == 1000 && data.data != 0) {
                window.location.href="reimburse.html?userId=" + data.data +  "#/main";
			} else {
				$("#errInfo").show();
                $('#loginbtn').attr('disabled',"true");//添加disabled属性
			}

        },
        error: function () {
            // $("#errInfo").show();
            $("#errsystem").show();
        }
    });
    //window.location.href="index.html#/main";
}

$('body').on('keyup', '.wlx-login', function() {
    $("#errInfo").hide();
    $("#errsystem").hide();
    $('#loginbtn').removeAttr("disabled"); //移除disabled属性
});

