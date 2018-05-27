var aa = angular.module('cjhme', ['reimburseServiceModule', 'deploymentEmploymentServiceModule', 'typeServiceModule', 'projectServiceModule']);

aa.controller('reimburse.reimburseEditCtl', ['$scope', '$state', 'reimburseService', 'deploymentEmploymentService',
    '$stateParams','typeService','cjhmeModal','projectService',
    function ($scope, $state, reimburseService, deploymentEmploymentService, $stateParams,typeService,cjhmeModal,projectService) {

        $scope.$emit('pageTitle', "报销管理");
    console.log('cccccc',$stateParams.baseId);
        console.log('cccccc222',$stateParams.flag);
    $scope.danHao = $stateParams.baseId;
        $scope.flag = $stateParams.flag;
    $scope.user = globalUser;
        $scope.editBaseData = {};

       $scope.statusData = {'1':'未上报','2':'审批中','3':'通过','4':'驳回'};
       // $scope.statusData = [{'code':1,'name':'未上报'},{'code':2,'name':'审批中'},{'code':3,'name':'通过'},{'code':4,'name':'驳回'}];

        //获取所有大类信息
        $scope.getAllBigTypes = function () {
            typeService.getBigTypes(function (data) {
                $scope.bigTypeList = data;
                console.log("bigtypedata", data)
            });
        }
        $scope.getAllBigTypes();

        //获取所有小类信息
      /*  $scope.getAllSmallTypes = function () {
            typeService.getSmallTypes(function (data) {
                $scope.smallTypeList = data;
                angular.forEach($scope.dataList, function (item) {

                });
                console.log("smalltypedata", data)
            });
        }
        $scope.getAllSmallTypes();*/

        //获取所有项目信息
        $scope.projectList  = [];
        $scope.getProjects = function () {
            projectService.getSmallTypes(function (data) {
                $scope.projectList = data;

                console.log("projectdata", data)
            });
        }
        $scope.getProjects();

        $scope.oneSmallTypeList = [];
        $scope.querySmallTypes = function (v) {
            $scope.oneSmallTypeList = [];
            angular.forEach($scope.smallTypeList, function (item) {
                if (item.bigTypeId == v.id) {
                    $scope.oneSmallTypeList.push(item);
                }
            });
        }

        //获取所有部门信息信息
        $scope.getAllDepartmentData = function(){
            deploymentEmploymentService.getDepartments(function (data) {
                $scope.departmentList = data;
                console.log("deployment;edata",data)
            });
        }
        $scope.getAllDepartmentData();

    //获得报销信息
        $scope.editDetailLists = [];
        $scope.getReimburse = function () {
            reimburseService.getReimburses($scope.danHao,function (data) {
                console.log('rrrrrrrrrr',data);
                $scope.editBaseData = data.reimburseBase;
                angular.forEach($scope.departmentList,function (item) {
                    if ($scope.editBaseData.departmentId == item.id ) {
                        $scope.editBaseData.departmentName = item.name;
                    }
                });
                angular.forEach($scope.bigTypeList,function (item) {
                    if ($scope.editBaseData.bigTypeId == item.id ) {
                        $scope.editBaseData.bigTypeA = item;
                        //$scope.querySmallTypes(item);
                    }
                });

                // angular.forEach($scope.projectList,function (item) {
                //     if ($scope.editBaseData.projectBianHao == item.bianHao ) {
                //         $scope.editBaseData.project = item;
                //     }
                // });

                $scope.editDetailLists = data.reimburseDetails;

                $scope.$watch('bigTypeList',function () {

                    angular.forEach($scope.editDetailLists,function (item) {
                        angular.forEach($scope.bigTypeList,function (v) {
                            if (item.typeId == v.id) {
                                item.typeNameA = v;
                            }
                        });
                    });
                },true)

                $scope.$watch('projectList',function () {

                    angular.forEach($scope.editDetailLists,function (item) {
                        angular.forEach($scope.projectList,function (v) {
                            if (item.projectBianHao == v.bianHao) {
                                item.projectBianHaoA = v;
                                item.projectNameA = v;
                            }
                        });
                    });
                },true)
            });
        }
        $scope.getReimburse();


        $scope.returnReimburseList = function () {
            $state.go('main');
        }



        $scope.addDetail = function () {
            $scope.editDetailLists.push({});
        }

        $scope.delDetai = function (v) {
            $scope.editDetailLists.splice(v,1);
            $scope.computeTotalMonoey();
        }

        $scope.editBaseData.total = 0;
        $scope.computeTotalMonoey = function () {
            $scope.editBaseData.total = 0;
            angular.forEach($scope.editDetailLists, function (item, index) {
                $scope.editBaseData.total = parseInt($scope.editBaseData.total) + parseInt(item.money);
            });
        }
        //保存请求
        $scope.reimburseEditData = {};
        $scope.reimburseEditData.reimburseBase= {};
        $scope.updateReq = function () {
            $("#editReimburseBtn").attr("disabled", true);

            if ($scope.editDetailLists.length == 0) {
                cjhmeModal.error({content: "请填写报销明细",  autoClose: true} );
                $("#editReimburseBtn").attr("disabled", false);
                return;
            }


            $scope.reimburseEditData.reimburseBase = $scope.editBaseData;
            for (var i = 0; i < $scope.editDetailLists.length; i ++) {
                if ( $scope.editDetailLists[i].beginTime > $scope.editDetailLists[i].endTime ) {
                    cjhmeModal.error({content: "请检查费用发生日期，开始时间不能晚于结束时间",  autoClose: true} );
                    $("#editReimburseBtn").attr("disabled", false);
                    return;
                }
            }

            for (var i = 0; i < $scope.editDetailLists.length; i ++) {
                $scope.editDetailLists[i].typeId = $scope.editDetailLists[i].typeNameA.id;
                $scope.editDetailLists[i].typeName = $scope.editDetailLists[i].typeNameA.name;
                $scope.editDetailLists[i].projectBianHao = $scope.editDetailLists[i].projectBianHaoA.bianHao;
                $scope.editDetailLists[i].projectName = $scope.editDetailLists[i].projectNameA.name;
            }

            $scope.reimburseEditData.reimburseDetails = $scope.editDetailLists;

            reimburseService.updateReimburses($scope.reimburseEditData,function () {
                $("#editReimburseBtn").attr("disabled", false);
                cjhmeModal.info({content: "更新成功",  autoClose: true},$state.go('main') );

            });

        }
        $scope.returnReimburseList = function () {
            $state.go('main');
        }
        $scope.returnReimburseDepartmentList = function () {
            $state.go('reimburseDepartmentListCtl');
        }


        $scope.selectProjectName = function (p,index) {
            angular.forEach($scope.projectList,function (v) {
                if (p == v.bianHao) {
                    $scope.editDetailLists[index].projectNameA = v;
                }
            });

        }

        $scope.selectProjectBianHao = function (p,index) {
            angular.forEach($scope.projectList,function (v) {
                if (p == v.bianHao) {
                    $scope.editDetailLists[index].projectBianHaoA = v;
                }
            });

        }

    }])