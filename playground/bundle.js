
// ==UserScript==
// @name           plugin-playground
// @namespace      https://github.com/conventional-changelog/get-pkg-repo
// @version        0.0.1
// @author         Nickname
// @description    A Test
// @include        *
// @homepage       https://github.com/conventional-changelog/get-pkg-repo#readme
// @supportURL     https://github.com/conventional-changelog/get-pkg-repo/issue
// @updateURL      https://raw.githubusercontent.com/conventional-changelog/get-pkg-repo/main/main.user.js
// @downloadURL    https://raw.githubusercontent.com/conventional-changelog/get-pkg-repo/main/main.user.js
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @grant          GM_setValue
// @connect        api.juejin.cn
// ==/UserScript==
(function () {
  'use strict';

  const storageKey = "last_sign_timestamp";
  const lastSignNumberOfDays = GM_getValue(storageKey, 0);
  const currentNumberOfDays = Math.floor(
    new Date().valueOf() / 1000 / 60 / 60 / 24
  );

  if (currentNumberOfDays !== lastSignNumberOfDays) {
    GM_xmlhttpRequest({
      url: "https://api.juejin.cn/growth_api/v1/check_in",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": navigator.userAgent,
      },
      responseType: "json",
      onload(response) {
        if (response.status === 200) {
          const data = response.response;
          if (data.data === "success") {
            alert("success");
          } else {
            alert(data.err_msg);
          }
          GM_setValue(storageKey, currentNumberOfDays);
        }
      },
    });
  }

})();
