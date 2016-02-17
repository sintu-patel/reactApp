var React = require('react'),
    Hello = require('./components/Hello.jsx');

module.exports = {

    index: function(req, res){

        // Render to Component's Virtual DOM as string
        var markup = React.renderComponentToString(
            Hello()
        );

        // Set up initial state
        var state = JSON.stringify({
            name: 'World',
        });

        // Pass our app markup and our initial
        // state to be render in the template
        res.render('index', {
            markup: markup,
            state:  state
        });

    }
}