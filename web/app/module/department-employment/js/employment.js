var aa = angular.module('cjhme',['deploymentEmploymentServiceModule']);

aa.controller('reimburse.employmentCtl',function($scope, deploymentEmploymentService,cjhmeModal) {
    $scope.$emit('pageTitle', "人员管理");
    //获取所有信息
    $scope.getAllData = function(){
        deploymentEmploymentService.getEmployments(function (data) {
            $scope.dataList = data;
            angular.forEach($scope.dataList,function (item) {

            });
            console.log("smalldata",data)
        });
    }
    $scope.getAllData();

    //获取所有部门信息
    $scope.deploymentList = [];
    $scope.getAllDepartments = function(){
        deploymentEmploymentService.getDepartments(function (data) {
            $scope.deploymentList = data;
            console.log("bigtyp;edata",data)
        });
    };
    $scope.getAllDepartments();


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
                   // $scope.getAllData();
                }
                $scope.cancel = function() {
                    $scope.$dismiss();
                }
            }]
        });
    }
    //保存请求
    $scope.save = function(){
        $scope.data.departmentId = $scope.data.departmentId.id;
        // $scope.data.permission = $scope.data.permission ? 1 : 2;
        $scope.data.type = $scope.data.type ? 2 : 1;
        deploymentEmploymentService.saveEmployments($scope.data,function () {
            cjhmeModal.info({content: "保存成功",  autoClose: true},$scope.getAllData() );
        });
    }

    // 打开编辑窗口
    $scope.openEditWindow = function(v) {
        $scope.editData = angular.copy(v);
        $scope.isAdmin = $scope.editData.type == 2 ? true : false;
        angular.forEach($scope.deploymentList,function (item) {
            if ($scope.editData.departmentId == item.id) {
                $scope.editData.departmentId = item;
            }
        });
        cjhmeModal.customModal({
            templateUrl: "edit.html",
            scope: $scope,
            size: 'md',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                $scope.editReq = function() {
                    $scope.edit();
                    $scope.$dismiss();
                    // $scope.getAllData();
                }
                $scope.cancel = function() {
                    $scope.$dismiss();
                }
            }]
        });
    }

    //修改请求
    $scope.edit = function(){
        $scope.editData.type = $scope.isAdmin ? 2 : 1;
        $scope.editData.departmentId = $scope.editData.departmentId.id;
        deploymentEmploymentService.updateEmployments($scope.editData,function () {
            cjhmeModal.info({content: "修改成功",  autoClose: true},$scope.getAllData() );
        });
    }


    //删除窗口
    $scope.deleteWindow = function(v){
        cjhmeModal.confirm({
            title: '您确定删除吗？',           //标题
            ok: function() {         //确认按钮回调函数
                $scope.delete(v);
                // $scope.getAllData();
            },
            cancel: function() {    //取消按钮回调函数
                console.info("确认框 cancel")
            }
        });
    }
    //删除
    $scope.delete = function(v){
        deploymentEmploymentService.deleteEmployments(v,function () {
            cjhmeModal.info({content: "删除成功",  autoClose: true},$scope.getAllData() );
        });
    };

    $scope.switchChange = function(val) {
        $scope.isAdmin = val;
    }
})