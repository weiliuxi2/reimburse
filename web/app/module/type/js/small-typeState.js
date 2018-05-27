var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('smallType', {
				url: '/smallType',
				views: {
					'main': {
						templateUrl: 'module/type/smallType.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/type/js/small-type.js',
							'module/type/js/typeService.js'
						]);
					}]
				}
			})
	}

]);