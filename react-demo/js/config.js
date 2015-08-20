'use strict';

var ApiUrl = {
    // 本地json
    test: {
        userInfo: '/js/data/userInfo.json'
    },
    dist: {
        userInfo: 'https://api.github.com/users/nevergiveup-j/gists'
    }
}

var url = ApiUrl.dist;

if(document.cookie.indexOf('reactSetTest') !== -1) {
    url = ApiUrl.test;
}

module.exports = url;