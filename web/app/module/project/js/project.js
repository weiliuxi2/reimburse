var aa = angular.module('cjhme',['projectServiceModule']);

aa.controller('reimburse.projectCtl',function($scope, projectService,cjhmeModal) {
    $scope.$emit('pageTitle', "项目管理");
    //获取所有信息
    $scope.getAllData = function(){
        projectService.getSmallTypes(function (data) {
            $scope.dataList = data;
            console.log("project",data)
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
            size: 'lg',
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
        projectService.saveSmallTypes($scope.data,function () {
            cjhmeModal.info({content: "保存成功",  autoClose: true},$scope.getAllData());
        });
    }

    // 打开编辑窗口
    $scope.openEditWindow = function(v) {
        $scope.editData = angular.copy(v);
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
        projectService.updateSmallTypes($scope.editData,function () {
            cjhmeModal.info({content: "修改成功",  autoClose: true},$scope.getAllData());
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
        projectService.deleteSmallTypes(v,function () {
            cjhmeModal.info({content: "删除成功",  autoClose: true},$scope.getAllData());
        });
    }
})



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