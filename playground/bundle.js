
// ==UserScript==
// @name           plugin-playground
// @namespace      https://github.com/conventional-changelog/get-pkg-repo
// @version        0.0.1
// @author         Nickname
// @description    A Test
// @include        *
// @homepage       https://github.com/conventional-changelog/get-pkg-repo#readme
// @supportURL     https://github.com/conventional-changelog/get-pkg-repo/issue
// @updateURL      https://raw.githubusercontent.com/conventional-changelog/get-pkg-repo/main/user.js
// @downloadURL    https://raw.githubusercontent.com/conventional-changelog/get-pkg-repo/main/user.js
// @grant          GM_getValue
// @connect        api.juejin.com
// ==/UserScript==
(function () {
    'use strict';

    GM_getValue();


    GM_xmlhttpRequest({
        method: "post",
        url: "https://api.juejin.com/abc/api/q?1"
    });

})();
