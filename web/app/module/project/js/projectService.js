var typeServiceModule = angular.module("projectServiceModule",['ngResource'])
typeServiceModule.service('projectService',function ($resource) {
    // var baseURL = "http://127.0.0.1:8080/api/v1"
    var API = {
        types: $resource('',{},{
            getSmallTypes: {
                method: 'GET',
                url: baseURL + '/projects',
            },
            saveSmallTypes: {
                method: "POST",
                url: baseURL + '/projects'
            },
            updateSmallTypes: {
                method: "PUT",
                url: baseURL + '/projects'
            },
            deleteSmallTypes: {
                method: "DELETE",
                url: baseURL + '/projects/:id'
            },

        })
    };

    commonHandler = function (result,handler) {
        if(result.code == 1000){
            if (handler != null) {
                handler(result.data);
            }
        } else {
            var msg = result.data.code + '：' +result.data.message;
            console.log('出现已知异常：' , msg);
            // layer.msg(msg, {icon : 2});
        }
    }


    this.getSmallTypes = function (handler,errorCallback) {
        API.types.getSmallTypes(function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.saveSmallTypes = function (data,handler,errorCallback) {
        API.types.saveSmallTypes(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.updateSmallTypes = function (data,handler,errorCallback) {
        API.types.updateSmallTypes(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.deleteSmallTypes = function (id,handler,errorCallback) {
        API.types.deleteSmallTypes({'id':id},function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    // 通用错误回调
    commonErrorCallBack2 = function(error, status){
        //layer.closeAll();
        //layer.msg('未知错误', {icon : 2});
        console.log('出现未知异常：' , { status: status, message: error});
    };
});