'use strict';
var React = require('react');
var Link = require('react-router').Link;

require('./sub-nav.scss');

var SubNav = React.createClass({
    render: function (){
        return (
            <div className="ui-sub-nav">
                <ul className="ui-sub-nav-list">
                    <li>
                        <Link to="edit-works">发布作品</Link>
                    </li>
                    <li>
                        <Link to="edit-price">发布价格</Link>
                    </li>
                    <li>
                        <Link to="has-released-works">已发布作品</Link>
                    </li>
                    <li>
                        <Link to="has-released-price">已发布价格</Link>
                    </li>

                </ul>
            </div>
        );
    }
});

module.exports = SubNav;