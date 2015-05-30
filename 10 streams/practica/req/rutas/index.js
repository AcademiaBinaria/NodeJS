module.exports = function (router) {
	require('./root')(router.route('/'));
	require('./articulo')(router.route('/:nombrearticulo'));
};
 


