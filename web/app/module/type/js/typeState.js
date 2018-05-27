var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('typeList', {
				url: '/typeList',
				views: {
					'main': {
						templateUrl: 'module/type/typeList.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/type/js/type.js',
							'module/type/js/typeService.js'
						]);
					}]
				}
			})
	}

]);