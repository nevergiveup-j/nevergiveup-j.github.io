'use strict';
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

// 头部
var Header = require('../components/header/header');
// 底部
var Footer = require('../components/footer/footer');
// 侧栏
var SubNav = require('../components/sub-nav/sub-nav');
var apiUrl = require('../config');

console.log( apiUrl.userInfo );


var App = React.createClass({
    getInitialState: function() {
        return {
            username: ''
        }
    },
    componentDidMount: function() {

        $.getJSON(apiUrl.userInfo).then(function(data) {
            if(data.status === 200) {
                this.setState(data.data);
            }
        }.bind(this));

    },
    render: function() {

        return (
            <div>
                <Header data={this.state} />
                <div className="ui-wrap">
                    <SubNav />
                    <div className="ui-content">
                        <RouteHandler />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});

module.exports = App;