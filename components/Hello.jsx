var React = require('React');

var Hello = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

module.exports = Hello;