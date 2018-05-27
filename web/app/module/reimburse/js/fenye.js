var app = angular.module('device-app', ['ngResource']);
//var baseurl = "http://10.10.32.135:8080/iot/"
var baseurl = getConfigValue('microservice.iot.url') + "/iot/";
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.controller('device-controller', function($scope, $http, $location, $resource){

    deviceREST = $resource('',{},{
        queryDevices: {
            method: "GET",
            url: baseurl + "devices?userName=:userName&deviceName=:deviceName&pageNo=:pageNo&pageSize=:pageSize",
        },
        saveDevice: {
            method: "POST",
            url: baseurl + "devices/:userName",
        },
        updateDevice: {
            method : "PUT",
            url: baseurl + "devices/:userName",
        },
        deleteDevice: {
            method : "DELETE",
            url: baseurl + "devices/:id/:deviceId",
        },
        deleteDevices: {
            method : "POST",
            url: baseurl + "devices/delete",
        },
        queryProducts: {
            method : "GET",
            url: baseurl + "products/NoPage?userName=:userName",
        },
        saveFileData: {
            method : "POST",
            url: baseurl + "devices/saveupload",
            params: {
                'userName':'@userName',
                'fileName':'@fileName'
            }
        },
        validateDeviceIdUnique: {
            method : "GET",
            url: baseurl + "devices/:deviceId/validate",
        },
        updateShadow: {
            method : "POST",
            url: baseurl + "shadow",
        },
    });

    var user = getLoginUser();
    $scope.userName = user.account;
//	$scope.userName="nfdwcmp";

    // 作用域表单数据
    $scope.pageData = {'pageNo':1, 'pages':1, 'pageSize':10};
    //作用域表单数据
    $scope.data = {};
    $scope.edit = {};
    $scope.productData = {};
    $scope.productList = {};
    $scope.selectedAll = false;

    $scope.getDeviceList = function(flag){
        if (flag == 1) {
            $scope.pageData.pageNo = 1;
        }
        var deviceName = $('#deviceName').val();
        deviceREST.queryDevices({"userName":$scope.userName,"deviceName":deviceName,"pageNo":$scope.pageData.pageNo,"pageSize":$scope.pageData.pageSize},function(result){
            if (result.data == null){
                $scope.dataList = null;
                $scope.pageData = {'pageNo':1, 'pages':1, 'pageSize':10};
            } else {
                $scope.dataList = result.data.dataSet;
                $scope.pageData.pages = result.data.pages;
            }
            //判断是否是最后一页
            var pageTemp = parseInt(result.data.recordCount/10) + 1;
            if ($scope.pageData.pageNo != 1 && $scope.pageData.pageNo == pageTemp && result.data.dataSet.length == 0) {
                $scope.pageData.pageNo = $scope.pageData.pageNo - 1;
                $scope.getDeviceList();
            }
            // 分页
            layui.use(['laypage'], function(){
                var laypage = layui.laypage;
                laypage({
                    cont: 'page',               // 指定div的id，将分页组件渲染到<div id="page"></div>标签内
                    curr: $scope.pageData.pageNo,
                    pages: $scope.pageData.pages,   // 总页数
                    skip: true,                 // 是否开启跳转到指定页的功能
                    jump: function(obj, first){
                        if(!first){
                            $scope.pageData.pageNo = obj.curr;	// 获取被点击的页码
                            $scope.getDeviceList();
                        }
                    }
                });
            });

        },function(error){
            layer.msg('查找失败', {icon: 2});
        });
    }
    $scope.getDeviceList();

    //获得所有产品信息
    $scope.queryProducts = function(){
        deviceREST.queryProducts({'userName':$scope.userName},function(result){
            $scope.productList = result.data.dataSet;
            angular.forEach(result.data.dataSet, function(item, index){
                $scope.productData[item.name] = item.id;
            });
        });
    }
    $scope.queryProducts();

    //注册设备
    $scope.registryDeviceWindow = function() {
        $scope.data={};
        layer.open({
            type: 1,
            area: ['800px','510px'],
            content: $('#device-add-from'),
            end: function(){
                $('#device-add-from').hide();
            }
        });
        $('.layui-layer-title').text('注册设备');
    }

    $scope.registryDevice = function(event){
        //验证
        var checkPass = checkIfPass($(event.target) );
        if(!checkPass){
            return;
        }
        angular.forEach($scope.productList, function(item, index){
            if ($scope.data.productId == item.id){
                $scope.data.productKey = item.productKey;
            }
        });
        deviceREST.validateDeviceIdUnique({"deviceId":$scope.data.deviceId},function(result){
            if (result.data == false){
                layer.msg('设备ID已存在', {icon: 2});
                return;
            }else{
                $scope.data.userName = $scope.userName;
                var formData = $scope.data;
                deviceREST.saveDevice({'userName':$scope.userName},formData,function(){
                    layer.msg('注册设备成功', {icon: 1});
                    closeLayer();
                    $scope.getDeviceList();
                },function(error){
                    layer.msg('注册设备失败', {icon: 2});
                    closeLayer();
                });
            }
        });
    }

    //修改设备
    var deviceIdOld;
    $scope.editDeviceWindow = function(deviceMember) {
        $scope.edit=angular.copy(deviceMember);
        deviceIdOld = $scope.edit.deviceId;
        layer.open({
            type: 1,
            area: ['800px','510px'],
            content: $('#device-edit-from'),
            end: function(){
                $('#device-edit-from').hide();
            }
        });
        $('.layui-layer-title').text('修改设备');
    }

    $scope.editDevice = function() {
        //验证
        var checkPass = checkIfPass($(event.target) );
        if(!checkPass){
            return;
        }
        angular.forEach($scope.productList, function(item, index){
            if ($scope.edit.productId == item.id){
                $scope.edit.productKey = item.productKey;
            }
        });
        var formData = $scope.edit;
        if (deviceIdOld != $scope.edit.deviceId){
            deviceREST.validateDeviceIdUnique({"deviceId":$scope.edit.deviceId},function(result){
                if (result.data == false){
                    layer.msg('设备ID已存在', {icon: 2});
                    return;
                }else{
                    deviceREST.updateDevice({'userName':$scope.userName},formData,function(){
                        layer.msg('修改设备成功', {icon: 1});
                        closeLayer();
                        $scope.getDeviceList();
                    },function(error){
                        layer.msg('修改设备失败', {icon: 2});
                    });
                }
            });
        } else {
            deviceREST.updateDevice({'userName':$scope.userName},formData,function(){
                layer.msg('修改设备成功', {icon: 1});
                closeLayer();
                $scope.getDeviceList();
            },function(error){
                layer.msg('修改设备失败', {icon: 2});
            });
        }
    }

    // 删除设备
    $scope.deleteDevice = function(id,deviceId) {
        layer.confirm('删除后不可恢复，确定要继续吗？',{
            btn: ['确定','取消']
        }, function(){
            deviceREST.deleteDevice({"id":id,"deviceId":deviceId},function(){
                layer.msg('删除设备成功', {icon: 1});
                closeLayer();
                $scope.getDeviceList();
            },function(error){
                layer.msg('删除设备失败', {icon: 2});
            });
        });
    }

    //批量删除
    $scope.delDevices = function(){
        var selected = [];
        var deviceIds = [];

        angular.forEach($scope.dataList, function(item, index){
            if (item.selected) {
                selected.push( item.id );
                deviceIds.push( item.deviceId );
            }
        });
        var delParam = {"ids":selected,"deviceIds":deviceIds};
        if(selected.length == 0){
            layer.alert('请先选择要删除的数据');
            return false;
        }

        layer.confirm('删除后不可恢复，确定要继续吗？',{
            btn: ['确定','取消']
        }, function(){
            deviceREST.deleteDevices(delParam,function(){
                layer.msg('删除设备成功', {icon: 1});
                closeLayer();
                $scope.getDeviceList();
            },function(error){
                layer.msg('删除设备失败', {icon: 2});
            });
        });

    }

    // 全选
    $scope.selectAll = function () {
        var selected = $scope.selectedAll = !$scope.selectedAll;
        angular.forEach($scope.dataList, function(item, index){
            item.selected = selected;
        });
    };

    $scope.select = function(device) {
        device.selected = !device.selected;
        if (device.selected) {
            var all = true;
            angular.forEach($scope.dataList, function(item, index){
                all = all && item.selected;
            });
            $scope.selectedAll = all;
        } else {
            $scope.selectedAll = false;
        }
    }

    $scope.gotoDeviceDetail = function(id) {
        window.location = 'detail.html?deviceId=' + id;
    }

    //上传excel文件
    $scope.openUploadWindow=function(){
        layer.open({
            type: 1,
            area: ['600px','410px'],
            content: $('#uploadFileForm'),
            end: function(){
                $('#uploadFileForm').hide();
            }
        });
        $('.layui-layer-title').text('批量注册设备');
    }


    /**
     * 上传文件
     */
    $scope.newFileName = "";
    $scope.uploadFile=function($event, value) {
        var location=$("#excelfile").val();
        var point = location.lastIndexOf(".");
        var type = location.substr(point);
        if( type != ".xlsx" && type != ".xls"){
            layer.msg("上传的文件必须是excel文件", {icon: 2});
            return ;
        }
        var f = document.getElementById("excelfile").files;
        if (f[0].size > 1024*1024*2){
            layer.msg("文件最大2M", {icon: 2});
            return ;
        }
        var formData = new FormData($("#uploadFileForm")[0]);
        console.log("formData", formData);
        $('#uploadProgress').show();
        $.ajax({
            url: baseurl + "devices/upload",
            timeout : 1000*60*5, //超时时间设置，单位毫秒
            type: "post",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $scope.newFileName = result.data;
                $("#import-btn").removeAttr('disabled');
                layer.msg("文件上传成功", {icon: 1});
            },
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                xhr.upload.onload = function (){
                    console.log("finish downloading");
                }
                xhr.upload.onprogress = function (ev) {
                    if(ev.lengthComputable) {
                        var percent = parseInt(100 * ev.loaded/ev.total);
                        var element = layui.element();
                        element.progress('uploadProgress', percent+'%')
                    }
                }
                return xhr;
            },
            error: function (e) {
                $($event.target).removeAttr('disabled');
                $('#uploadProgress').hide();
                layer.msg("上传文件出现了错误，请重试。", {icon: 2});
            }
        });
    }

//    code:10005
//    data:false
//    message:"请求成功"
    $scope.saveFileData = function(event){
        deviceREST.saveFileData({"userName":$scope.userName,"fileName":$scope.newFileName},function(result){
            if (result.code == 10005){
                layer.msg('文件内容校验失败', {icon: 2});
            } else if(result.code == 10000){
                layer.msg('设备导入成功', {icon: 1});
            } else if(result.code == 10007){
                layer.msg('设备ID重复', {icon: 2});
            }else if(result.code == 10008){
                layer.msg('产品ID或产品KEY不存在', {icon: 2});
            }else if(result.code == 10009){
                layer.msg('必填字段缺少输入', {icon: 2});
            }else{
                layer.msg('设备导入失败', {icon: 2});
            }
            $scope.getDeviceList();
            $("#import-btn").attr('disabled', "true");
        },function(error){
            layer.msg('设备导入失败', {icon: 2});
        });
    }

    //下载模板
    $scope.downloadFile = function(){
        window.location.href = baseurl + "devices/downloadTemplate";
    }

    //设备影子
    $scope.message = {};
    $scope.openshadowWindow=function(deviceId,productKey){
        $scope.message.deviceId = deviceId;
        $scope.message.topic = "/shadow/update/" + productKey + "/" + deviceId;
        layer.open({
            type: 1,
            area: ['600px','500px'],
            content: $('#shadowForm'),
            end: function(){
                $('#shadowForm').hide();
            }
        });
        $('.layui-layer-title').text('设备影子');
    }

    $scope.updateShadow = function(){
        console.log($scope.message.content);
        deviceREST.updateShadow($scope.message,function(result){
            if (result.data.result == "error") {
                layer.msg(result.data.message, {icon: 2});
            }else{
                layer.msg(result.data.message, {icon: 1});
            }
        },function(error){
            layer.msg('同步消息到设备影子失败', {icon: 2});
        });
    }
});

$('body').on('click','#excelfile',function(){
    element.progress('uploadProgress', '0%');
});