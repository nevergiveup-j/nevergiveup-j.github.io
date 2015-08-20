'use strict';
var React = require('react');
var Link = require('react-router').Link;

require('./header.scss');

var Header = React.createClass({
    render: function (){
        var data = this.props.data;

        var login = function(){
            // 未登录
            if(data.username == '') {
                return (
                    <div className="not-login">未登录</div>
                );
            }else{
                return (
                    <ul className="top-user-info">
                        <li>
                            <img className="avatar" src={data.avatar} alt=""/>
                            <span className="name">{data.username}</span>
                        </li>
                        <li className="button-logout">
                            <a href="javascript:">退出</a>
                        </li>
                    </ul>
                );
            }
        }

        return (
            <header className="ui-header">
                <div className="fn-clearfix ui-header-bd">
                    <h1 className="ui-logo">
                        <Link to="edit-works">
                            <img src={require('../../../images/logo.png')} alt=""/>
                        </Link>
                    </h1>
                    <div className="ui-top-login">
                        {login()}
                    </div>
                </div>
            </header>
        );
    }
});

module.exports = Header;