var aa = angular.module('cjhme',['typeServiceModule']);

aa.controller('reimburse.typeListCtl',function($scope, typeService,cjhmeModal) {
    $scope.$emit('pageTitle', "报销类别管理");
    //获取所有信息
    $scope.getAllBigTypes = function(){
        typeService.getBigTypes(function (data) {
            $scope.bigTypeList = data;
            console.log("bigtyp;edata",data)
        });
    }
    $scope.getAllBigTypes();


    $scope.bigTypeData = {};
    // 打开添加窗口
    $scope.openAddBigTypeWindow = function() {
        $scope.bigTypeData = {};
        cjhmeModal.customModal({
            templateUrl: "addBigType.html",
            scope: $scope,
            size: 'ld',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                $scope.saveBigTypeReq = function() {
                    $scope.saveBigType();
                    $scope.$dismiss();
                    // $scope.getAllBigTypes();
                }
                $scope.cancel = function() {
                    $scope.$dismiss();
                }
            }]
        });
    }
    //保存请求
    $scope.saveBigType = function(){
        typeService.saveBigTypes($scope.bigTypeData,function () {

            cjhmeModal.info({content: "保存成功",  autoClose: true},$scope.getAllBigTypes());
        });
    }

    // 打开编辑窗口
    $scope.openEditBigTypeWindow = function(v) {
        $scope.editBigTypeData = angular.copy(v);
        cjhmeModal.customModal({
            templateUrl: "editBigType.html",
            scope: $scope,
            size: 'md',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                $scope.editBigTypeReq = function() {
                    $scope.editBigType();
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
    $scope.editBigType = function(){
        typeService.updateBigTypes($scope.editBigTypeData,function () {
            cjhmeModal.info({content: "修改成功",  autoClose: true},$scope.getAllBigTypes());
        });
    }


    //删除窗口
    $scope.deleteBigTypeWindow = function(v){
        cjhmeModal.confirm({
            title: '您确定删除吗？',           //标题
            ok: function() {         //确认按钮回调函数
                $scope.deleteBigType(v);
                // $scope.getAllBigTypes();
            },
            cancel: function() {    //取消按钮回调函数
                console.info("确认框 cancel")
            }
        });
    }
    //删除
    $scope.deleteBigType = function(v){
        typeService.deleteBigTypes(v,function () {
            cjhmeModal.info({content: "删除成功",  autoClose: true},$scope.getAllBigTypes());
        });
    }
})