import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Content from './components/content/Content';
import Repos from './components/repos/Repos';

var App = React.createClass({

	render: function(){
		return (
			<Router history={ hashHistory }>
				<Route path="/" component={ Content }>
					<IndexRoute component={ Repos } />
					<Route path=":repository" component={ Repos } />
				</Route>
			</Router>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));