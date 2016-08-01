import React from 'react';
import Repos from './../repos/Repos';

var Content = React.createClass({ 

  render: function(){

    return (
      <section>
        <header>
          <h1>Search a Repository on Github</h1>  
        </header>

        { this.props.children }

        <footer>Test VML</footer> 
      </section> 
    )
  }
});


export default Content;