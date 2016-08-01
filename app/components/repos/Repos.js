import React from 'react';
import Reflux from 'reflux';
import request from 'superagent-bluebird-promise';
import _ from 'underscore';

import actions from './actionCommits';
import actionsInitial from './actionInitial';
import storeInitial from './storeInitial';
import ListCommitsWrapper from './ListCommitsWrapper';
 
var Repos = React.createClass({
	mixins : [Reflux.connect(storeInitial,"github")],

	getDefaultProps() {
		return {
			repoMap: {}
		};
	},

	getInitialState() {
		return (
			{ repoMap: this.props.params.repository }
		);
	},

  	componentWillMount() {
  		var userName =  (this.state.repoMap  !== undefined) ? this.state.repoMap  : 'globocom';
  		actionsInitial.searchRepo(userName);
  	},
 	 

  	_renderRepos() {
  		var items = this.state.github.repos.items;

		switch(true) {
			case this.state.github.loadding:
				return (<div>loadding...</div>);
				break;
			case this.state.github.error:
				return (<div>404</div>);
				break;
			default:
				return (
						items.map(repo => {
				        	return (
				        		<p className="menu" onClick={ actions.updateCommits.bind(this, repo) }  key={_.uniqueId()}>
				        			<span className="link" > 
				        		 		<span className="name">{repo.name}</span>
				        		 		<span className="stars"><i className="fa fa-star" aria-hidden="true"></i> {repo.stargazers_count} <i className="fa fa-code-fork" aria-hidden="true"></i> {repo.forks_count}</span>
				        		 	</span>
				        		</p>
				        	);
				    	})
					);
		}
  	},
  	handleChange: function(event) {
	 	this.setState({
			input_repo_name: event.target.value
	  	});
	},

  	goToSearch(e) {
  		e.preventDefault(); 
  		actionsInitial.searchRepo(this.state.input_repo_name);
  		window.location.href = "#/"+ this.state.input_repo_name;
	},

  	render() {
	  	var total_count = this.state.github.repos.total_count;
	    return (
      		<article className="row repos">
				<nav>
					<p className="search">
						<input type="text" value={this.state.input_repo_name} onChange={this.handleChange} placeholder="Type a repository name" />
						<button onClick={this.goToSearch} type="button" >search</button>
			      	</p>	
		      		<h2>Projetos ({total_count}) </h2>
			        { this._renderRepos() }
		    	</nav>
	        	<ListCommitsWrapper/>
	    	</article>
	    );
	}
});


export default Repos;