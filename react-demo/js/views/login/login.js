'use strict';
var React = require('react');
var Link = require('react-router').Link;

require('./login.scss');


var EditWorks = React.createClass({
    componentDidMount: function() {

    },
    render: function (){

        return (
            <div className="fn-clearfix login-wrap">
                <div className="login-right">
                    <div className="business-login">

                        <div className="business-button">
                            <Link to="app" className="button-weibo" title="新浪微博"></Link>
                            <Link to="app" className="button-qq" title="QQ"></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = EditWorks;