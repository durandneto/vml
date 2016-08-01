import Reflux from 'reflux';
import request from 'superagent-bluebird-promise';

import actions from './actionInitial';
import actionCommits from './actionCommits';

export default Reflux.createStore({ 
	data: {
		repos: {
			total_count: 0,
			items: []
		},
		error : false,
		loadding : false
	},
	listenables : [actions],
 	onSearchRepo(repoName) {
		var self = this;
		self.data.loadding = true;
		self.triggerAsync(self.data);
		actionCommits.loadding();
		request.get(`https://api.github.com/search/repositories?q=user:${ repoName }&sort=stars:desc`)
			.then(function(res) {
				self.data.repos.items = res.body.items;
				self.data.repos.total_count = res.body.total_count;
				self.data.error = false;
				self.data.loadding = false;
				self.triggerAsync(self.data);
				actionCommits.reset();

			}, function(error) {
				actionCommits.render404();
				self.data.loadding = false;
				self.data.error = true;
				self.data.repos.total_count = 0;
				self.triggerAsync(self.data);
			});
 	},

 	getInitialState(){
		return this.data ;
	} 
});
