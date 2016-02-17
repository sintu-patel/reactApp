var React = require('react');
var Hello = require('../../components/Hello.jsx');
var Content = require('../../components/Content.jsx');
var Button = require('../../components/Button.jsx');


// Render the components, picking up where react left off on the server
React.render(
  <Content/>,
  document.getElementById('content')
);

// Render button from server
React.render(
  <Button/>,
  document.getElementById('server-button')
);

