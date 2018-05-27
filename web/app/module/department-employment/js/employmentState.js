var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employment', {
                url: '/employment',
                views: {
                    'main': {
                        templateUrl: 'module/department-employment/employment.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'module/department-employment/js/deService.js',
                            'module/department-employment/js/employment.js',
                        ]);
                    }]
                }
            })
        .state('userPwdEdit', {
            url: '/userPwdEdit',
            views: {
                'main': {
                    templateUrl: 'module/department-employment/userPwdEdit.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'module/department-employment/js/deService.js',
                        'module/department-employment/js/password.edit.js',
                    ]);
                }]
            }
        })
            .state('employmentInfo', {
                url: '/employmentInfo',
                views: {
                    'main': {
                        templateUrl: 'module/department-employment/employment-info.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'module/department-employment/js/deService.js',
                            'module/department-employment/js/employment.info.js',
                        ]);
                    }]
                }
            })
    }

]);