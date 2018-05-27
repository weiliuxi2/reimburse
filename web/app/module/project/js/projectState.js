var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('project', {
				url: '/project',
				views: {
					'main': {
						templateUrl: 'module/project/project.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/project/js/project.js',
							'module/project/js/projectService.js'
						]);
					}]
				}
			})
	}

]);