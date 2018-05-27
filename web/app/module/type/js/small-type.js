var aa = angular.module('cjhme',['typeServiceModule']);

aa.controller('reimburse.smallTypeCtl',function($scope, typeService,cjhmeModal) {
    $scope.$emit('pageTitle', "报销类别管理");
    //获取所有信息
    $scope.getAllData = function(){
        typeService.getSmallTypes(function (data) {
            $scope.dataList = data;
            angular.forEach($scope.dataList,function (item) {

            });
            console.log("smalldata",data)
        });
    }
    $scope.getAllData();

    //获取所有大类信息
    $scope.bigTypeList = [];
    $scope.getAllBigTypes = function(){
        typeService.getBigTypes(function (data) {
            $scope.bigTypeList = data;
            console.log("bigtyp;edata",data)
        });
    };
    $scope.getAllBigTypes();


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
        $scope.data.bigTypeId = $scope.data.bigTypeId.id;
        typeService.saveSmallTypes($scope.data,function () {
            cjhmeModal.info({content: "保存成功",  autoClose: true},$scope.getAllData());
        });
    }

    // 打开编辑窗口
    $scope.openEditWindow = function(v) {
        $scope.editData = angular.copy(v);
        angular.forEach($scope.bigTypeList,function (item) {
            if ($scope.editData.bigTypeId == item.id) {
                $scope.editData.bigTypeId = item;
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
        $scope.editData.bigTypeId = $scope.editData.bigTypeId.id;
        typeService.updateSmallTypes($scope.editData,function () {
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
        typeService.deleteSmallTypes(v,function () {
            cjhmeModal.info({content: "删除成功",  autoClose: true},$scope.getAllData());
        });
    }
})