var express = require('express');
var router = express.Router();
var Instance = require('../models/exception-instance');
var Exception = require('../models/exception');

var mongoose = require('mongoose');

router.get('/', function(req, res){
	res.locals.active.dashboard = true;
	var last24 = 0;
	var instanceCounter = 0;
	var unresolvedCounter = 0;

	//We're going to create a graph of the exceptions over the last -custom time-.
	//For the moment we're going to do it over the last week.
	// var weekAgo = new Date();
	// weekAgo = weekAgo.setDate(weekAgo.getDate() - 7);
	// var timeFrom = 0;

	// Instance.find({created_at: {$gt: weekAgo}}, function(err, instances){
	// 	//Here's all the instances in the last week.
	// 	instances.forEach(function(instance){
	// 		//Time from one week ago.
	// 		timeFrom = instance.created_at - weekAgo;
	// 		graphdata.push({x: })
	// 	});
	// });

	Exception.find({project: res.locals.project._id}).populate({path: 'instances', model: Instance}).exec(function(err, exceptions){

		exceptions.forEach(function(exception){
			exception.instances.forEach(function(instance){
				//These are all the instances for this one.
				if(instance.created_at >= new Date(new Date() - 24*60*60*1000)){
					instanceCounter++;
				}
			});

			if(exception.created_at >= new Date(new Date() - 24*60*60*1000)){
				last24++;
			}
			unresolvedCounter++;
		});



		res.render('dashboard', {
			title: res.locals.project.name+' Dashboard',
			last24: last24,
			instanceCounter: instanceCounter,
			unresolvedCounter: unresolvedCounter,
			backBtn: {
				url: '/projects',
				text: 'Projects'
			}
		});

	});


});

module.exports = router;