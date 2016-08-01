import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore'; 

import storeCommits from './storeCommits';

export default React.createClass({
	mixins : [Reflux.connect(storeCommits,"githubCommits")],
	_renderCommits(){
	  	var commits = this.state.githubCommits.commits; 
	  	var loadding = this.state.githubCommits.loadding;
	  	var begin = this.state.githubCommits.begin;
	  	var error = this.state.githubCommits.error;

	  	switch ( true ) {
	  		case begin :
	  			return (<div>Clique em um commit para detalhar.</div>);
	  			break
	  		case loadding :
	  			return (<div>loadding</div>);
	  		case error :
	  			return (<div>Github não encontrado, escolha outro e clique no botão [search]</div>);
	  			break
	  		default:
	  			return commits.map(repo => { 
					return (
						<div className="commit" key={ _.uniqueId() } >
							<span className="date">{repo.commit.author.date }</span>
							{(repo.author)?<img className='avatar' src={ repo.author.avatar_url }/>:''}
							<span className='author'>{ (repo.author)?repo.author.login:repo.commit.author.name } <span className='message'>{repo.commit.message}</span></span>
						</div>
					);
				})
	  	}

	
	},

  	render: function() {
		return (
			<main className="column list-commits-wrapper">
				<article>		  
					{ this._renderCommits() }
				</article>
			</main>
		);
  	}
});
