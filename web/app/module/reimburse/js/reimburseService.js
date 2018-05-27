var reimburseServiceModule = angular.module("reimburseServiceModule",['ngResource'])
reimburseServiceModule.service('reimburseService',function ($resource,cjhmeModal) {
    // var baseURL = "http://127.0.0.1:8080/api/v1"
    var API = {
        types: $resource('',{},{

            downExcel: {
                method: "GET",
                url: baseURL + '/down',
            },
            saveReimburses: {
                method: "POST",
                url: baseURL + '/reimburses',
            },
            updateReimburses: {
                method: "PUT",
                url: baseURL + '/reimburses',
            },

            deleteReimburses: {
                method: "DELETE",
                url: baseURL + '/reimburses/:danHao',
            },
            getReimburses: {
                method: "GET",
                url: baseURL + '/reimburses/:danHao',
            },
            getReimburseBases: {
                method: 'GET',
                url: baseURL + '/reimburses/bases',
            },
            saveReimburseBases: {
                method: "POST",
                url: baseURL + '/reimburses/bases',
            },
            updateReimburseBases: {
                method: "PUT",
                url: baseURL + '/reimburses/bases',
            },
            deleteReimburseBases: {
                method: "DELETE",
                url: baseURL + '/reimburses/bases/:id'
            },

            getReimburseDetails: {
                method: 'GET',
                url: baseURL + '/reimburses/details',
            },
            saveReimburseDetails: {
                method: "POST",
                url: baseURL + '/reimburses/details',
            },
            updateReimburseDetails: {
                method: "PUT",
                url: baseURL +'/reimburses/details',
            },
            deleteReimburseDetails: {
                method: "DELETE",
                url: baseURL + '/reimburses/details/:id'
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
            // layer.msg(msg, {icon : 2});
        }
    }

    this.getReimburseBases = function (paramData,handler,errorCallback) {
        API.types.getReimburseBases(paramData,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.downExcel = function (handler,errorCallback) {
        API.types.downExcel(function(result) {
            //commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.deleteReimburses = function (danHao,handler,errorCallback) {
        API.types.deleteReimburses({'danHao':danHao},function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.getReimburses = function (danHao,handler,errorCallback) {
        API.types.getReimburses({'danHao':danHao},function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.saveReimburseBases = function (data,handler,errorCallback) {
        API.types.saveReimburseBases(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.saveReimburses = function (data,handler,errorCallback) {
        API.types.saveReimburses(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };
    this.updateReimburses = function (data,handler,errorCallback) {
        API.types.updateReimburses(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.updateReimburseBases = function (data,handler,errorCallback) {
        API.types.updateReimburseBases(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.deleteReimburseBases = function (id,handler,errorCallback) {
        API.types.deleteReimburseBases({'id':id},function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };


    this.getReimburseDetails = function (handler,errorCallback) {
        API.types.getReimburseDetails(function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.saveReimburseDetails = function (data,handler,errorCallback) {
        API.types.saveReimburseDetails(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.updateReimburseDetails = function (data,handler,errorCallback) {
        API.types.updateReimburseDetails(data,function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    this.deleteReimburseDetails = function (id,handler,errorCallback) {
        API.types.deleteReimburseDetails({'id':id},function(result) {
            commonHandler(result,handler);
        }, angular.isDefined(errorCallback) ? errorCallback : commonErrorCallBack2);
    };

    // 通用错误回调
    commonErrorCallBack2 = function(error, status){
        //layer.closeAll();
        //layer.msg('未知错误', {icon : 2});
        console.log('出现未知异常222：' , { status: status, message: error});
        cjhmeModal.error({content: 出现未知异常,  autoClose: true  });
    };
});