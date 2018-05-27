var aa = angular.module('cjhme', ['reimburseServiceModule', 'deploymentEmploymentServiceModule', 'typeServiceModule']);

aa.controller('reimburse.reimburseDepartmentListCtl', ['$scope', '$state', 'reimburseService', 'deploymentEmploymentService', 'typeService','cjhmeModal',
    function ($scope, $state, reimburseService, deploymentEmploymentService, typeService,cjhmeModal) {
        $scope.$emit('pageTitle', "报销管理");
        $scope.user = globalUser;
        $scope.bigTypeObj = {};
        $scope.smallTypeObj = {};
        //获取所有大类信息
        $scope.getAllBigTypes = function () {
            typeService.getBigTypes(function (data) {
                $scope.bigTypeList = data;
                console.log("bigtypedata", data)
                angular.forEach($scope.bigTypeList, function (item) {
                    $scope.bigTypeObj[item.id] = item.name;
                });
            });
        }
        $scope.getAllBigTypes();

        //获取所有小类信息
/*        $scope.getAllSmallTypes = function () {
            typeService.getSmallTypes(function (data) {
                $scope.smallTypeList = data;
                angular.forEach($scope.smallTypeList, function (item) {
                    $scope.smallTypeObj[item.id] = item.name;
                });
                console.log("smalltypedata", data)
            });
        }
        $scope.getAllSmallTypes();*/

        //获取所有报销基本信息
/*        $scope.getAllReimburseBases = function () {
            var paramData = {'departmentId':globalUser.departmentId};
            reimburseService.getReimburseBases(paramData,function (data) {
                $scope.reimburseBaseList = data;

                console.log("reimburseBaseList", data)
            });
        }
        $scope.getAllReimburseBases();*/


        // 作用域表单数据
        $scope.pageData = {'pageNo':1, 'pages':1, 'pageSize':10};
        $scope.getAllReimburseBases = function(flag){

            var paramData = {'departmentId':globalUser.departmentId,'pageNo':$scope.pageData.pageNo,'pageSize':$scope.pageData.pageSize};
            reimburseService.getReimburseBases(paramData,function(data){
                if (data == null){
                    $scope.reimburseBaseList = null;
                    $scope.pageData = {'pageNo':1, 'pages':1, 'pageSize':10};
                } else {
                    $scope.reimburseBaseList = data.t;
                    $scope.pageData.pages = data.total;
                }
                // 分页
                layui.use(['laypage'], function(){
                    var laypage = layui.laypage;
                    laypage.render({
                        elem: 'page',               // 指定div的id，将分页组件渲染到<div id="page"></div>标签内
                        curr: $scope.pageData.pageNo,
                        count: $scope.pageData.pages,   // 总页数
                        skip: true,                 // 是否开启跳转到指定页的功能
                        jump: function(obj, first){
                            if(!first){
                                $scope.pageData.pageNo = obj.curr;	// 获取被点击的页码
                                $scope.getAllReimburseBases();
                            }
                        }
                    });
                });

            },function(error){
                layer.msg('查找失败', {icon: 2});
            });
        }
        $scope.getAllReimburseBases();

        $scope.editReimburse = function (data) {
            $state.go('reimburseEdit',{'baseId':data,'flag':2});
        }


        $scope.downExcel = function(){
            //下载模板
            // var baseURL = "http://127.0.0.1:8080/api/v1"
            window.location.href =  baseURL + '/down?departmentId=' + globalUser.departmentId;
        }

        $scope.shenpiData = [{'code':'3','name':'通过'},{'code':'4','name':'驳回'}];
        $scope.result = {};
        // 打开审批窗口
        $scope.openShenPiWindow = function(id,v) {

            cjhmeModal.customModal({
                templateUrl: "shenpi.html",
                scope: $scope,
                size: 'md',
                controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                    $scope.editReq = function() {
                        $scope.upload (id,v);
                        $scope.$dismiss();
                    }
                    $scope.cancel = function() {
                        console.log('wer',$scope.result);
                        $scope.$dismiss();
                    }
                }]
            });
        }

        //上报
        $scope.upload = function(id,v){
            var uploadData = {};
            uploadData.danHao = v;
            uploadData.id = id;
            uploadData.status = $scope.result.code.code;
            uploadData.remark = $scope.result.remark;
            console.log('asdf',uploadData);
            reimburseService.updateReimburseBases(uploadData,function () {
                cjhmeModal.info({content: "审批成功",  autoClose: true},$scope.getAllReimburseBases() );
            });
        }


    }]);

aa.filter('textLengthSet', function() {
    return function(value, wordwise, max, tail) {
        if (!value)
            return '';

        max = parseInt(max, 10);
        if (!max)
            return value;
        if (value.length <= max)
            return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});