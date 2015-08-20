'use strict';
var React = require('react');

require('./footer.scss');

var Home = module.exports = React.createClass({
    render: function (){
        return (
            <footer className="ui-footer">
                <a href="#">关于散单</a>
                <a href="#">服务协议</a>
                <a href="#">客服中心</a>
                <a href="#">联系邮箱</a>
                <span className="ui-copyright">Copyright © 2012-2015 Sandan. All Rights Reserved.</span>
            </footer>
        );
    }
});