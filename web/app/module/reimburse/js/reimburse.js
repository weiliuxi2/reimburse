var aa = angular.module('cjhme', ['reimburseServiceModule', 'deploymentEmploymentServiceModule', 'typeServiceModule', 'projectServiceModule']);

aa.controller('reimburse.reimburseAddCtl', ['$scope', '$state', 'reimburseService', 'deploymentEmploymentService', 'typeService','projectService','cjhmeModal',
    function ($scope, $state, reimburseService, deploymentEmploymentService, typeService,projectService,cjhmeModal) {
        $scope.$emit('pageTitle', "报销管理");
    $scope.user = globalUser;
        $scope.reimburseData = {};
        $scope.reimburseData.reimburseBase = {};
        $scope.reimburseData.reimburseDetails = [];
        $scope.baseData = {};
        $scope.baseData.employmentName = $scope.user.name;
        $scope.baseData.departmentName = $scope.user.departmentName;
        //获取所有大类信息
        $scope.getAllBigTypes = function () {
            typeService.getBigTypes(function (data) {
                $scope.bigTypeList = data;
                console.log("bigtypedata", data)
            });
        }
        $scope.getAllBigTypes();

        //获取所有小类信息
     /*   $scope.getAllSmallTypes = function () {
            typeService.getSmallTypes(function (data) {
                $scope.smallTypeList = data;

                console.log("smalltypedata", data)
            });
        }
        $scope.getAllSmallTypes();*/

        //获取所有项目信息
        $scope.getProjects = function () {
            projectService.getSmallTypes(function (data) {
                $scope.projectList = data;

                console.log("projectdata", data)
            });
        }
        $scope.getProjects();

      /*  $scope.oneSmallTypeList = [];
        $scope.querySmallTypes = function (v) {
            $scope.oneSmallTypeList = [];
            angular.forEach($scope.smallTypeList, function (item) {
                if (item.bigTypeId == v.id) {
                    $scope.oneSmallTypeList.push(item);
                }
            });
        }*/

        $scope.reimburseDetailLists = [{projectBianHaoA:"",projectNameA:"",beginTime: "", endTime: "", typeNameA: "", money: "", description: ""}];

        $scope.addDetail = function () {
            $scope.reimburseDetailLists.push({});
        }

        $scope.delDetai = function (v) {
            $scope.reimburseDetailLists.splice(v,1);
            $scope.computeTotalMonoey();
        }

        $scope.baseData.total = 0;
        $scope.computeTotalMonoey = function () {
            $scope.baseData.total = 0;
            angular.forEach($scope.reimburseDetailLists, function (item, index) {
                $scope.baseData.total = parseFloat($scope.baseData.total) + parseFloat(item.money);
            });
        }
        //保存请求

        $scope.saveReq = function () {
            $("#saveReimburseBtn").attr("disabled", true);
            if ($scope.reimburseDetailLists.length == 0) {
                cjhmeModal.error({content: "请填写报销明细",  autoClose: true} );
                $("#saveReimburseBtn").attr("disabled", false);
                return;
            }

            $scope.reimburseData.reimburseBase = $scope.baseData;
            $scope.reimburseData.reimburseBase.departmentId = $scope.user.departmentId;
            for (var i = 0; i < $scope.reimburseDetailLists.length; i ++) {
                if ( $scope.reimburseDetailLists[i].beginTime > $scope.reimburseDetailLists[i].endTime ) {
                    cjhmeModal.error({content: "请检查费用发生日期，开始时间不能晚于结束时间",  autoClose: true} );
                    $("#saveReimburseBtn").attr("disabled", false);
                    return;
                }
            }

            for (var i = 0; i < $scope.reimburseDetailLists.length; i ++) {
                $scope.reimburseDetailLists[i].typeId = $scope.reimburseDetailLists[i].typeNameA.id;
                $scope.reimburseDetailLists[i].typeName = $scope.reimburseDetailLists[i].typeNameA.name;
                $scope.reimburseDetailLists[i].projectBianHao = $scope.reimburseDetailLists[i].projectBianHaoA.bianHao;
                $scope.reimburseDetailLists[i].projectName = $scope.reimburseDetailLists[i].projectNameA.name;
            }

            $scope.reimburseData.reimburseDetails = $scope.reimburseDetailLists;
            console.log($scope.reimburseData);
            reimburseService.saveReimburses($scope.reimburseData,function () {
                $("#saveReimburseBtn").attr("disabled", false);
                cjhmeModal.info({content: "保存成功",  autoClose: true},$state.go('main') );

            });

        }
        $scope.returnReimburseList = function () {
            $state.go('main');
        }

        $scope.openAddWindow = function() {
            $scope.data = {};
            cjhmeModal.customModal({
                templateUrl: "addDetail.html",
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
        $scope.selectProjectName = function (p,index) {
            angular.forEach($scope.projectList,function (v) {
                    if (p == v.bianHao) {
                        $scope.reimburseDetailLists[index].projectNameA = v;
                    }
                });

        }

        $scope.selectProjectBianHao = function (p,index) {
            angular.forEach($scope.projectList,function (v) {
                if (p == v.bianHao) {
                    $scope.reimburseDetailLists[index].projectBianHaoA = v;
                }
            });

        }



    }])

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