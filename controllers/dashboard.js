var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
		
	res.render('dashboard', {
		title: res.locals.project.name+' Dashboard'
	});

});

module.exports = router;