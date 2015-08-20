'use strict';

var React = require('react');

var Router = require('react-router');
var getRoutes = require('./js/routes');

require('./sass/main.scss');

Router.run(getRoutes(), function (Root) {
    React.render(<Root/>, document.body);
});