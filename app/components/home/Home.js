import React from 'react';
import Repos from './../repos/Repos';

var Home = React.createClass({

  componentWillMount() {
    console.log(this.props);
  },

  // <section>
  //       <header>
  //         <h1>HTML5 Semantics and Flexbox</h1>    
  //       </header>

  //       <Repos />

  //       <footer>Nov, 2015 @ royray</footer> 
  //     </section> 

  render: function(){
    return (
      <h1>test</h1> 
    )
  }
});


export default Home;