import Reflux from 'reflux';
import request from 'superagent-bluebird-promise';

import actions from './actionCommits';

export default Reflux.createStore({
	data : {
		commits : [],
		error : false,
		begin : true,
		loadding : false
	},
	listenables : [actions],
	onReset() {
		this.data.commits = [];
		this.data.loadding = false;
		this.data.error = false;
		this.data.begin = true;
		this.trigger(this.data);
	},

	onRender404() {
		this.data.commits = [];
		this.data.loadding = false;
		this.data.error = true;
		this.data.begin = false;
		this.trigger(this.data);
	},
	
	onLoadding() {
		this.data.commits = [];
		this.data.loadding = true;
		this.data.error = false;
		this.data.begin = false;
		this.trigger(this.data);
	},

	onUpdateCommits(repo) { 
 
 		var self = this;
 		self.data.loadding = true;
		self.trigger(self.data);
		request.get(`https://api.github.com/repos/${ repo.owner.login }/${ repo.name }/commits`)
			.then(function(res) {
				self.data.commits = res.body;
				self.data.loadding = false;
				self.data.error = false;
				self.data.begin = false;
				self.trigger(self.data);
			}, function(error) {
				self.data.begin = false;
				self.data.loadding = false;
				self.data.error = true;
				self.trigger(self.data);
				throw error;
			});
 	},
 	getInitialState(){
		return this.data ;
	} 
});