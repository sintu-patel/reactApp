var React = require('React');

var Button = React.createClass({
	getInitialState: function() {
	    return {liked: false};
	  },
	handleClick: function() {
		this.setState({liked: !this.state.liked});
	},

    render: function() {
    	var text = this.state.liked ? 'like' : 'Unlike';
        return <div>
        <p>This button is rendered from Server side</p>
        <button type="button" onClick={this.handleClick}>Click here to {text}</button>
        </div>;
    }
});

module.exports = Button;