var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('department', {
				url: '/department',
				views: {
					'main': {
						templateUrl: 'module/department-employment/department.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
                            'module/department-employment/js/deService.js',
							'module/department-employment/js/department.js',
						]);
					}]
				}
			})
	}

]);