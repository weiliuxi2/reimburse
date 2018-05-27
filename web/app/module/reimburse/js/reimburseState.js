var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('reimburseAdd', {
				url: '/reimburseAdd',
				views: {
					'main': {
						templateUrl: 'module/reimburse/reimburseAdd.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([

                            'module/type/js/typeService.js',
                            'module/project/js/projectService.js',
                            'module/department-employment/js/deService.js',
                            'module/reimburse/js/reimburseService.js',
							'module/reimburse/js/reimburse.js',

						]);
					}]
				}
			})
            .state('reimburseEdit', {
                url: '/reimburseEdit',
                params:{'baseId':null,'flag':null},
                views: {
                    'main': {
                        templateUrl: 'module/reimburse/reimburseEdit.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([

                            'module/type/js/typeService.js',
                            'module/project/js/projectService.js',
                            'module/department-employment/js/deService.js',
                            'module/reimburse/js/reimburseService.js',
                            'module/reimburse/js/reimburse.edit.js',

                        ]);
                    }]
                }
            })
            .state('main', {
                url: '/main',
                views: {
                    'main': {
                        templateUrl: 'module/reimburse/reimburseList.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'module/reimburse/js/reimburseService.js',
                            'module/type/js/typeService.js',
                            'module/department-employment/js/deService.js',
                            'module/reimburse/js/reimburseList.js',

                        ]);
                    }]
                }
            })
            .state('reimburseDepartmentListCtl', {
                url: '/reimburseDepartmentListCtl',
                views: {
                    'main': {
                        templateUrl: 'module/reimburse/reimburseList-department.html'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'module/reimburse/js/reimburseService.js',
                            'module/type/js/typeService.js',
                            'module/department-employment/js/deService.js',
                            'module/reimburse/js/reimburseDepartmentList.js',

                        ]);
                    }]
                }
            })
	}

]);