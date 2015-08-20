'use strict';
var React = require('react');

var Tab = require('../../components/tab/tab');

var EditWorksVideo = React.createClass({
    render: function (){
        return (
            <div className="edit-works">
                <Tab name="works" />
                <ul className="works-list">
                    <li className="list-title">
                        这个是作品视频
                    </li>

                </ul>

            </div>
        );
    }
});

module.exports = EditWorksVideo;