var typeServiceModule = angular.module("deploymentEmploymentServiceModule",['ngResource'])
typeServiceModule.service('deploymentEmploymentService',function ($resource,cjhmeModal) {
    // var baseURL = "http://127.0.0.1:8080/api/v1"
    var API = {
        types: $resource('',{},{
            getDepartments: {
                method: 'GET',
                url: baseURL + '/departments',
            },
            saveDepartments: {
                method: "POST",
                url: baseURL + '/departments'
            },
            updateDepartments: {
                method: "PUT",
                url: baseURL + '/departments'
            },
            deleteDepartments: {
                method: "DELETE",
                url: baseURL + '/departments/:id'
            },
            getEmployments: {
                method: 'GET',
                url: baseURL + '/employments',
            },
            saveEmployments: {
                method: "POST",
                url: baseURL + '/employments'
            },
            updateEmployments: {
                method: "PUT",
                url: baseURL + '/employments'
            },
            updatePassword: {
                method: "POST",
                url: baseURL + '/employments/password'
            },
            deleteEmployments: {
                method: "DELETE",
                url: baseURL + '/employments/:id'
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
            cjhmeModal.error({content: msg,  autoClose: true  });
        }
    }

    this.updatePassword = function (data,handler,errorCallback) {
        API.types.updatePassword(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.getDepartments = function (handler,errorCallback) {
        API.types.getDepartments(function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.saveDepartments = function (data,handler,errorCallback) {
        API.types.saveDepartments(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.updateDepartments = function (data,handler,errorCallback) {
        API.types.updateDepartments(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.deleteDepartments = function (id,handler,errorCallback) {
        API.types.deleteDepartments({'id':id},function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.getEmployments = function (handler,errorCallback) {
        API.types.getEmployments(function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.saveEmployments = function (data,handler,errorCallback) {
        API.types.saveEmployments(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.updateEmployments = function (data,handler,errorCallback) {
        API.types.updateEmployments(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.deleteEmployments = function (id,handler,errorCallback) {
        API.types.deleteEmployments({'id':id},function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };


    // 通用错误回调
    commonErrorCallBack2 = function(error, status){
        //layer.closeAll();
        //layer.msg('未知错误', {icon : 2});
        console.log('出现未知异常：' , { status: status, message: error});
        cjhmeModal.error({content: 出现未知异常,  autoClose: true  });
    };
});