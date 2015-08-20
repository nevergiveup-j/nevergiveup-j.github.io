'use strict';
var React = require('react');
var Link = require('react-router').Link;

// 发布作品
var works = [
    {
        name: '静态图文',
        url: 'edit-works-text'
    },
    {
        name: '视频',
        url: 'edit-works-video'
    }
]

require('./tab.scss');

var Tab = React.createClass({
    getInitialState: function() {
        return {
            name: 'works'
        }
    },
    renderList: function() {
        var json = {};

        if(this.props.name == 'works') {
            json = works;
        }

        return json.map((value, index) => {
            return (
                <li>
                    <Link to={value.url}>{value.name}</Link>
                </li>
            );
        })
    },
    render: function (){
        return (
            <div className="ui-tab">
                <ul className="ui-tab-list">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
});

module.exports = Tab;