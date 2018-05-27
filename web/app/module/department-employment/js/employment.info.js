var aa = angular.module('cjhme',['deploymentEmploymentServiceModule']);

aa.controller('reimburse.employmentInfoCtl',function($scope, deploymentEmploymentService,cjhmeModal) {
    $scope.$emit('pageTitle', "信息管理");
    $scope.employmentInfo = globalUser;




    $scope.savePassword = function(){
        $scope.employmentvo = {};
        $scope.employmentvo.id = $scope.employmentInfo.id;
        $scope.employmentvo.id = $scope.employmentInfo.id;
        $scope.employmentvo.telephone = $scope.employmentInfo.telephone;
        $scope.employmentvo.address = $scope.employmentInfo.address;
        deploymentEmploymentService.updateEmployments($scope.employmentvo,function () {
            cjhmeModal.info({ content: '信息修改成功',autoClose: true });
        });

    };

})