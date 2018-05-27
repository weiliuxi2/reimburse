var aa = angular.module('cjhme',['deploymentEmploymentServiceModule']);

aa.controller('reimburse.passwordEditCtl',function($scope, deploymentEmploymentService,cjhmeModal) {

    $scope.$emit('pageTitle', "密码管理");

    //获取所有部门信息
    $scope.userInfo = globalUser;
    $scope.oldPassword;
    $scope.newPassword2;
    $scope.employmentvo = {};
    //删除
    $scope.savePassword = function(){
        $scope.employmentvo.id = $scope.userInfo.id;
        if ($scope.employmentvo.password !=$scope.newPassword2) {
            cjhmeModal.error({
                content: '密码输入不一致',  //内容
                autoClose: true              //是否自动关闭,值为true和false
            });
            return;
        }
        deploymentEmploymentService.updatePassword($scope.employmentvo,function () {
            cjhmeModal.info({ content: '密码修改成功',autoClose: true });
        });

    };


})