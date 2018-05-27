var aa = angular.module('cjhme',['deploymentEmploymentServiceModule']);

aa.controller('reimburse.departmentCtl',function($scope, deploymentEmploymentService,cjhmeModal) {
    $scope.$emit('pageTitle', "部门管理");
    //获取所有信息
    $scope.getAllData = function(){
        deploymentEmploymentService.getDepartments(function (data) {
            $scope.dataList = data;
            console.log("deployment;edata",data)
        });
    }
    $scope.getAllData();


    $scope.data = {};
    // 打开添加窗口
    $scope.openAddWindow = function() {
        $scope.data = {};
        cjhmeModal.customModal({
            templateUrl: "add.html",
            scope: $scope,
            size: 'md',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                $scope.saveReq = function() {
                    $scope.save();
                    $scope.$dismiss();
                }
                $scope.cancel = function() {
                    $scope.$dismiss();
                }
            }]
        });
    }
    //保存请求
    $scope.save = function(){
        deploymentEmploymentService.saveDepartments($scope.data,function () {
            cjhmeModal.info({content: "保存成功",  autoClose: true},$scope.getAllData() );
        });
    }

    // 打开编辑窗口
    $scope.openEditWindow = function(v) {
        $scope.editData = angular.copy(v);
        cjhmeModal.customModal({
            templateUrl: "editBigType.html",
            scope: $scope,
            size: 'md',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                $scope.editReq = function() {
                    $scope.edit();
                    $scope.$dismiss();
                    // $scope.getAllBigTypes();
                }
                $scope.cancel = function() {
                    $scope.$dismiss();
                }
            }]
        });
    }

    //修改请求
    $scope.edit = function(){
        deploymentEmploymentService.updateDepartments($scope.editData,function () {
            cjhmeModal.info({content: "修改成功",  autoClose: true},$scope.getAllData() );
        });
    }


    //删除窗口
    $scope.deleteWindow = function(v){
        cjhmeModal.confirm({
            title: '您确定删除吗？',           //标题
            ok: function() {         //确认按钮回调函数
                $scope.delete(v);
                // $scope.getAllBigTypes();
            },
            cancel: function() {    //取消按钮回调函数
                console.info("确认框 cancel")
            }
        });
    }
    //删除
    $scope.delete = function(v){
        deploymentEmploymentService.deleteDepartments(v,function () {
            cjhmeModal.info({content: "删除成功",  autoClose: true},$scope.getAllData() );
        });
    }
})