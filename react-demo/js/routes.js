'use strict';
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

module.exports = function(){
    return [
        <Route>
            <DefaultRoute handler={require('./views/login/login')}/>
            <Route name="login" handler={require('./views/login/login')}/>
            <Route name="app" path="app" handler={require('./views/main')}>
                <DefaultRoute handler={require('./views/edit-works/edit-works')}/>
                <Route name="edit-price" handler={require('./views/edit-price/edit-price')}/>
                <Route name="edit-works">
                    <DefaultRoute handler={require('./views/edit-works/edit-works')}/>
                    <Route name="edit-works-text" handler={require('./views/edit-works/edit-works')}/>
                    <Route name="edit-works-video" handler={require('./views/edit-works/edit-works-video')}/>
                </Route>
                <Route name="has-released-works" handler={require('./views/has-released-works/has-released-works')}/>
                <Route name="has-released-price" handler={require('./views/has-released-price/has-released-price')}/>
                <NotFoundRoute name="404" handler={require('./components/404/404')}/>
            </Route>
        </Route>
    ];
}

