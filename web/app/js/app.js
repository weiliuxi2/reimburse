/**
 * @cjhme-admin v1.0.1
 * Copyright 2016 cjh. All Rights Reserved
 */

var cjhme = angular.module('cjhme', [
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'ui.switch',
    'ui.select',
    'chart.js',
/*    'ngFileUpload',
    'ng.ueditor',*/
    'ui.cjhme'
]);

//主控制器
cjhme.controller('cjhme.indexCtrl', ['$scope', '$state', 'cjhmeModal', 'cjhme.cjhmeSvc', function ($scope, $state, cjhmeModal, cjhmeSvc) {
    //设置标题
    $scope.$on('pageTitle', function (event, data) {
        $scope.pageTitle = data;
    });

    $scope.theme = "gradient-blue-theme";
    $scope.menuObj = [];

    //初始化
    var init = function () {
        //初始化加载模态框
        cjhmeSvc.initLoadModal();

        //初始化主题

        //初始化菜单
        $scope.menuObj = cjhmeSvc.findUserMenus();

    }

    //切换左边菜单显示/隐藏
    $scope.closeWrapper = false;
    $scope.toggleLeft = function () {
        $scope.closeWrapper = !$scope.closeWrapper;
    }

    //跳转主页
    $scope.toMainPage = function () {
        $state.go('main');
    }

    //跳转页面
    $scope.toPage = function (node) {
        if (node.data && node.url) {
            $state.go(node.url, node.data);
        } else if (node.url) {
            $state.go(node.url);
        }
    }

    $scope.exitSys = function () {
        cjhmeModal.confirm({
            title: '请确认',
            content: '您确定退出系统吗？',
            ok: function () {
                //后台处理完后进行页面跳转
                window.location.href = "index.html";
            },
            cancel: function () {

            }
        });
    }

    //选择主题
    $scope.selectTheme = function (val) {
        $scope.theme = val;
    }

    init();

}]);

/**
 * 服务
 */
cjhme.factory('cjhme.cjhmeSvc', [function () {
    var uri = {};

    var svc = {};

    //初始化加载模态框
    svc.initLoadModal = function () {
        var loadModalHtml = "<div class='c-load-modal-bg'>";
        loadModalHtml += "<span  class='c-load-modal'><i class='fa fa-spinner fa-spin fa-5x'></i></span>";
        loadModalHtml += "</div>";
        $("body").append(loadModalHtml);
    }

    //显示加载模态框
    svc.showLoadModal = function () {
        $(".c-load-modal-bg").css("display", "block");
        $(".c-load-modal").css("display", "block");
    }

    //关闭加载模态框
    svc.closeLoadModal = function () {
        $(".c-load-modal-bg").css('display', 'none');
        $(".c-load-modal").css("display", "none");
    }

    //获取用户菜单
    svc.findUserMenus = function () {
        var menuObj = [];
        var userType = globalUser.type;
        if (userType == 1) {
            //普通员工
            menuObj = [
                {
                    "id": "14",
                    "parentId": "1",
                    "name": "报销管理",
                    "icon": 'fa-user',
                    "children": [{
                        "id": "14",
                        "parentId": "1",
                        "name": "我的报销",
                        "icon": 'fa-user',
                        "url": "main"
                    }]
                },

                {
                    "id": "13",
                    "parentId": "1",
                    "name": "个人中心",
                    "icon": "fa-flag",
                    "children": [{
                        "id": "13",
                        "parentId": "1",
                        "name": "基本信息",
                        "icon": "fa-bell-o",
                        "url": "employmentInfo"
                    },
                        {
                            "id": "13",
                            "parentId": "1",
                            "name": "密码修改",
                            "icon": "fa-bell-o",
                            "url": "userPwdEdit"
                        },]
                }];
        } else if (userType == 2) {
            //管理员
            menuObj = [
                {
                    "id": "14",
                    "parentId": "1",
                    "name": "报销管理",
                    "icon": 'fa-user',
                    "children": [{
                        "id": "14",
                        "parentId": "1",
                        "name": "我的报销",
                        "icon": 'fa-user',
                        "url": "main"
                    },
                        {
                            "id": "14",
                            "parentId": "1",
                            "name": "部门报销",
                            "icon": 'fa-user',
                            "url": "reimburseDepartmentListCtl"
                        }
                    ]
                },

                {
                    "id": "13",
                    "parentId": "1",
                    "name": "个人中心",
                    "icon": "fa-flag",
                    "children": [{
                        "id": "13",
                        "parentId": "1",
                        "name": "基本信息",
                        "icon": "fa-bell-o",
                        "url": "employmentInfo"
                    },
                        {
                            "id": "13",
                            "parentId": "1",
                            "name": "密码修改",
                            "icon": "fa-bell-o",
                            "url": "userPwdEdit"
                        },
                    ]
                }];
        }

        else if (userType == 9) {
            //超管
            menuObj = [
                {
                    "id": "14",
                    "parentId": "1",
                    "name": "报销管理",
                    "icon": 'fa-user',
                    "children": [{
                        "id": "14",
                        "parentId": "1",
                        "name": "所有报销",
                        "icon": 'fa-user',
                        "url": "main"
                    },

                    ]
                },
                {
                    "id": "15",
                    "parentId": "1",
                    "name": "类别管理",
                    "icon": 'fa-user',
                    "children": [{
                        "id": "16",
                        "parentId": "15",
                        "name": "类别管理",
                        "icon": 'fa-user',
                        "url": "typeList"
                    },
                    //     {
                    //     "id": "17",
                    //     "parentId": "15",
                    //     "name": "小类管理",
                    //     "icon": 'fa-user',
                    //     "url": "smallType"
                    // }
                    ]
                },
                {
                    "id": "15",
                    "parentId": "1",
                    "name": "项目管理",
                    "icon": 'fa-user',
                    "children": [{
                        "id": "16",
                        "parentId": "15",
                        "name": "项目管理",
                        "icon": 'fa-user',
                        "url": "project"
                    }]
                },
                {
                    "id": "18",
                    "parentId": "1",
                    "name": "人员部门管理",
                    "children": [{
                        "id": "19",
                        "parentId": "18",
                        "name": "部门管理",
                        "url": "department"
                    }, {
                        "id": "20",
                        "parentId": "18",
                        "name": "人员管理",
                        "url": "employment"
                    }]
                }];
        }


        return menuObj;
    }

    return svc;
}]);

/**
 * 页面自适应
 */
cjhme.directive('pageResize', function ($window) {
    return function (scope, element, attr) {
        var w = $window;
        scope.$watch(function () {
            return {
                'h': w.innerHeight
            };
        }, function (newValue, oldValue) {
            scope.hStyle = {
                'height': newValue.h + 'px'
            }

            scope.cStyle = {
                'height': (newValue.h - 62) + 'px'
            }
        }, true);

        angular.element($window).bind('resize', function () {
            scope.$apply();
        })
    }
});

/**
 * 配置$provide
 */
cjhme.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        cjhme.controller = $controllerProvider.register;
        cjhme.directive = $compileProvider.directive;
        cjhme.filter = $filterProvider.register;
        cjhme.factory = $provide.factory;
        cjhme.service = $provide.service;
        cjhme.constant = $provide.constant;
    }
]);

/**
 * 配置$ocLazyLoadProvider
 */
cjhme.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: true
    });
}]);

/**
 * 拦截器
 */
cjhme.config(['$httpProvider',
    function ($httpProvider) {
        //增加跨域信任
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        var httpCommonInterceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cjhme.cjhmeSvc',
            function ($q, $cacheFactory, $timeout, $rootScope, $log, cjhmeSvc) {

                //判断是否后台请求方法
                var isSvcReq = function (config) {
                    if (config.url && /((^.*\.jhtml$)|(^.*\.jhtml\?))/.test(config.url)) {
                        return true;
                    } else {
                        return false;
                    }
                }

                return {
                    'request': function (config) {
                        if (isSvcReq(config)) {
                            //转圈圈
                            cjhmeSvc.showLoadModal();
                        }
                        return config;
                    },
                    'response': function (response) {
                        if (isSvcReq(response.config)) {
                            //关圈圈
                            cjhmeSvc.closeLoadModal();
                        }

                        return response;
                    },

                    'responseError': function (rejection) {
                        console.info("httpLoadingInterceptor responseError");
                        //关圈圈
                        cjhmeSvc.closeLoadModal();
                        return $q.reject(rejection);
                    }
                };
            }
        ];

        //http请求公共拦截器
        $httpProvider.interceptors.push(httpCommonInterceptor);
    }

]);