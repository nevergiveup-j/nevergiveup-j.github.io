'use strict';
var React = require('react');
var { Navigation, State } = require('react-router');

var Tab = require('../../components/tab/tab');

require('./edit-works.scss');

//https://gist.github.com/insin/8418675

var EditWorks = React.createClass({
    mixins: [ State ],
    handleChange: function() {

    },
    getInitialState: function() {
        return {errors: {}}
    },
    isValid: function() {

    },
    handleSubmit: function() {
        console.log(this.getPath());
        console.log('demo');
    },
    handlePreviews: function() {
    },
    render: function (){
        return (
            <div className="edit-works">
                <Tab name="works" />
                <form>
                    这个是作品图片
                </form>
            </div>
        );
    }
});

module.exports = EditWorks;