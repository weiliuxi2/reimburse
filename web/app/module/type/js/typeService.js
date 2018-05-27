var typeServiceModule = angular.module("typeServiceModule",['ngResource'])
typeServiceModule.service('typeService',function ($resource) {
   // var baseURL = "http://127.0.0.1:8080/api/v1"
    var API = {
        types: $resource('',{},{
            getBigTypes: {
                method: 'GET',
                url: baseURL + '/types/bigTypes',
            },
            saveBigTypes: {
                method: "POST",
                url: baseURL + '/types/bigTypes'
            },
            updateBigTypes: {
                method: "PUT",
                url: baseURL + '/types/bigTypes'
            },
            deleteBigTypes: {
                method: "DELETE",
                url: baseURL + '/types/bigTypes/:id'
            },
            getSmallTypes: {
                method: 'GET',
                url: baseURL + '/types/smallTypes',
            },
            saveSmallTypes: {
                method: "POST",
                url: baseURL + '/types/smallTypes'
            },
            updateSmallTypes: {
                method: "PUT",
                url: baseURL + '/types/smallTypes'
            },
            deleteSmallTypes: {
                method: "DELETE",
                url: baseURL + '/types/smallTypes/:id'
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

    this.getBigTypes = function (handler,errorCallback) {
        API.types.getBigTypes(function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.saveBigTypes = function (data,handler,errorCallback) {
        API.types.saveBigTypes(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.updateBigTypes = function (data,handler,errorCallback) {
        API.types.updateBigTypes(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.deleteBigTypes = function (id,handler,errorCallback) {
        API.types.deleteBigTypes({'id':id},function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

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