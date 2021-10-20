var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/hosted-git-info/git-host-info.js
var require_git_host_info = __commonJS({
  "node_modules/hosted-git-info/git-host-info.js"(exports2, module2) {
    "use strict";
    var maybeJoin = (...args) => args.every((arg) => arg) ? args.join("") : "";
    var maybeEncode = (arg) => arg ? encodeURIComponent(arg) : "";
    var defaults = {
      sshtemplate: ({ domain, user, project, committish }) => `git@${domain}:${user}/${project}.git${maybeJoin("#", committish)}`,
      sshurltemplate: ({ domain, user, project, committish }) => `git+ssh://git@${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      browsetemplate: ({ domain, user, project, committish, treepath }) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}`,
      browsefiletemplate: ({ domain, user, project, committish, treepath, path, fragment, hashformat }) => `https://${domain}/${user}/${project}/${treepath}/${maybeEncode(committish || "master")}/${path}${maybeJoin("#", hashformat(fragment || ""))}`,
      docstemplate: ({ domain, user, project, treepath, committish }) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}#readme`,
      httpstemplate: ({ auth, domain, user, project, committish }) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      filetemplate: ({ domain, user, project, committish, path }) => `https://${domain}/${user}/${project}/raw/${maybeEncode(committish) || "master"}/${path}`,
      shortcuttemplate: ({ type, user, project, committish }) => `${type}:${user}/${project}${maybeJoin("#", committish)}`,
      pathtemplate: ({ user, project, committish }) => `${user}/${project}${maybeJoin("#", committish)}`,
      bugstemplate: ({ domain, user, project }) => `https://${domain}/${user}/${project}/issues`,
      hashformat: formatHashFragment
    };
    var gitHosts = {};
    gitHosts.github = Object.assign({}, defaults, {
      protocols: ["git:", "http:", "git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "github.com",
      treepath: "tree",
      filetemplate: ({ auth, user, project, committish, path }) => `https://${maybeJoin(auth, "@")}raw.githubusercontent.com/${user}/${project}/${maybeEncode(committish) || "master"}/${path}`,
      gittemplate: ({ auth, domain, user, project, committish }) => `git://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project, committish }) => `https://codeload.${domain}/${user}/${project}/tar.gz/${maybeEncode(committish) || "master"}`,
      extract: (url) => {
        let [, user, project, type, committish] = url.pathname.split("/", 5);
        if (type && type !== "tree") {
          return;
        }
        if (!type) {
          committish = url.hash.slice(1);
        }
        if (project && project.endsWith(".git")) {
          project = project.slice(0, -4);
        }
        if (!user || !project) {
          return;
        }
        return { user, project, committish };
      }
    });
    gitHosts.bitbucket = Object.assign({}, defaults, {
      protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "bitbucket.org",
      treepath: "src",
      tarballtemplate: ({ domain, user, project, committish }) => `https://${domain}/${user}/${project}/get/${maybeEncode(committish) || "master"}.tar.gz`,
      extract: (url) => {
        let [, user, project, aux] = url.pathname.split("/", 4);
        if (["get"].includes(aux)) {
          return;
        }
        if (project && project.endsWith(".git")) {
          project = project.slice(0, -4);
        }
        if (!user || !project) {
          return;
        }
        return { user, project, committish: url.hash.slice(1) };
      }
    });
    gitHosts.gitlab = Object.assign({}, defaults, {
      protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "gitlab.com",
      treepath: "tree",
      httpstemplate: ({ auth, domain, user, project, committish }) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project, committish }) => `https://${domain}/${user}/${project}/repository/archive.tar.gz?ref=${maybeEncode(committish) || "master"}`,
      extract: (url) => {
        const path = url.pathname.slice(1);
        if (path.includes("/-/") || path.includes("/archive.tar.gz")) {
          return;
        }
        const segments = path.split("/");
        let project = segments.pop();
        if (project.endsWith(".git")) {
          project = project.slice(0, -4);
        }
        const user = segments.join("/");
        if (!user || !project) {
          return;
        }
        return { user, project, committish: url.hash.slice(1) };
      }
    });
    gitHosts.gist = Object.assign({}, defaults, {
      protocols: ["git:", "git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "gist.github.com",
      sshtemplate: ({ domain, project, committish }) => `git@${domain}:${project}.git${maybeJoin("#", committish)}`,
      sshurltemplate: ({ domain, project, committish }) => `git+ssh://git@${domain}/${project}.git${maybeJoin("#", committish)}`,
      browsetemplate: ({ domain, project, committish }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}`,
      browsefiletemplate: ({ domain, project, committish, path, hashformat }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}${maybeJoin("#", hashformat(path))}`,
      docstemplate: ({ domain, project, committish }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}`,
      httpstemplate: ({ domain, project, committish }) => `git+https://${domain}/${project}.git${maybeJoin("#", committish)}`,
      filetemplate: ({ user, project, committish, path }) => `https://gist.githubusercontent.com/${user}/${project}/raw${maybeJoin("/", maybeEncode(committish))}/${path}`,
      shortcuttemplate: ({ type, project, committish }) => `${type}:${project}${maybeJoin("#", committish)}`,
      pathtemplate: ({ project, committish }) => `${project}${maybeJoin("#", committish)}`,
      bugstemplate: ({ domain, project }) => `https://${domain}/${project}`,
      gittemplate: ({ domain, project, committish }) => `git://${domain}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ project, committish }) => `https://codeload.github.com/gist/${project}/tar.gz/${maybeEncode(committish) || "master"}`,
      extract: (url) => {
        let [, user, project, aux] = url.pathname.split("/", 4);
        if (aux === "raw") {
          return;
        }
        if (!project) {
          if (!user) {
            return;
          }
          project = user;
          user = null;
        }
        if (project.endsWith(".git")) {
          project = project.slice(0, -4);
        }
        return { user, project, committish: url.hash.slice(1) };
      },
      hashformat: function(fragment) {
        return fragment && "file-" + formatHashFragment(fragment);
      }
    });
    var names = Object.keys(gitHosts);
    gitHosts.byShortcut = {};
    gitHosts.byDomain = {};
    for (const name of names) {
      gitHosts.byShortcut[`${name}:`] = name;
      gitHosts.byDomain[gitHosts[name].domain] = name;
    }
    function formatHashFragment(fragment) {
      return fragment.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-");
    }
    module2.exports = gitHosts;
  }
});

// node_modules/hosted-git-info/git-host.js
var require_git_host = __commonJS({
  "node_modules/hosted-git-info/git-host.js"(exports2, module2) {
    "use strict";
    var gitHosts = require_git_host_info();
    var GitHost = class {
      constructor(type, user, auth, project, committish, defaultRepresentation, opts = {}) {
        Object.assign(this, gitHosts[type]);
        this.type = type;
        this.user = user;
        this.auth = auth;
        this.project = project;
        this.committish = committish;
        this.default = defaultRepresentation;
        this.opts = opts;
      }
      hash() {
        return this.committish ? `#${this.committish}` : "";
      }
      ssh(opts) {
        return this._fill(this.sshtemplate, opts);
      }
      _fill(template, opts) {
        if (typeof template === "function") {
          const options = __spreadValues(__spreadValues(__spreadValues({}, this), this.opts), opts);
          if (!options.path) {
            options.path = "";
          }
          if (options.path.startsWith("/")) {
            options.path = options.path.slice(1);
          }
          if (options.noCommittish) {
            options.committish = null;
          }
          const result = template(options);
          return options.noGitPlus && result.startsWith("git+") ? result.slice(4) : result;
        }
        return null;
      }
      sshurl(opts) {
        return this._fill(this.sshurltemplate, opts);
      }
      browse(path, fragment, opts) {
        if (typeof path !== "string") {
          return this._fill(this.browsetemplate, path);
        }
        if (typeof fragment !== "string") {
          opts = fragment;
          fragment = null;
        }
        return this._fill(this.browsefiletemplate, __spreadProps(__spreadValues({}, opts), { fragment, path }));
      }
      docs(opts) {
        return this._fill(this.docstemplate, opts);
      }
      bugs(opts) {
        return this._fill(this.bugstemplate, opts);
      }
      https(opts) {
        return this._fill(this.httpstemplate, opts);
      }
      git(opts) {
        return this._fill(this.gittemplate, opts);
      }
      shortcut(opts) {
        return this._fill(this.shortcuttemplate, opts);
      }
      path(opts) {
        return this._fill(this.pathtemplate, opts);
      }
      tarball(opts) {
        return this._fill(this.tarballtemplate, __spreadProps(__spreadValues({}, opts), { noCommittish: false }));
      }
      file(path, opts) {
        return this._fill(this.filetemplate, __spreadProps(__spreadValues({}, opts), { path }));
      }
      getDefaultRepresentation() {
        return this.default;
      }
      toString(opts) {
        if (this.default && typeof this[this.default] === "function") {
          return this[this.default](opts);
        }
        return this.sshurl(opts);
      }
    };
    module2.exports = GitHost;
  }
});

// node_modules/yallist/iterator.js
var require_iterator = __commonJS({
  "node_modules/yallist/iterator.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Yallist) {
      Yallist.prototype[Symbol.iterator] = function* () {
        for (let walker = this.head; walker; walker = walker.next) {
          yield walker.value;
        }
      };
    };
  }
});

// node_modules/yallist/yallist.js
var require_yallist = __commonJS({
  "node_modules/yallist/yallist.js"(exports2, module2) {
    "use strict";
    module2.exports = Yallist;
    Yallist.Node = Node;
    Yallist.create = Yallist;
    function Yallist(list) {
      var self = this;
      if (!(self instanceof Yallist)) {
        self = new Yallist();
      }
      self.tail = null;
      self.head = null;
      self.length = 0;
      if (list && typeof list.forEach === "function") {
        list.forEach(function(item) {
          self.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self.push(arguments[i]);
        }
      }
      return self;
    }
    Yallist.prototype.removeNode = function(node) {
      if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
      }
      var next = node.next;
      var prev = node.prev;
      if (next) {
        next.prev = prev;
      }
      if (prev) {
        prev.next = next;
      }
      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }
      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };
    Yallist.prototype.unshiftNode = function(node) {
      if (node === this.head) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };
    Yallist.prototype.pushNode = function(node) {
      if (node === this.tail) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }
      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };
    Yallist.prototype.push = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.unshift = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.pop = function() {
      if (!this.tail) {
        return void 0;
      }
      var res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.shift = function() {
      if (!this.head) {
        return void 0;
      }
      var res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.forEach = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };
    Yallist.prototype.forEachReverse = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };
    Yallist.prototype.get = function(n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        walker = walker.next;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.getReverse = function(n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        walker = walker.prev;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.map = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.head; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res;
    };
    Yallist.prototype.mapReverse = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.tail; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res;
    };
    Yallist.prototype.reduce = function(fn, initial) {
      var acc;
      var walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }
      return acc;
    };
    Yallist.prototype.reduceReverse = function(fn, initial) {
      var acc;
      var walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }
      return acc;
    };
    Yallist.prototype.toArray = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }
      return arr;
    };
    Yallist.prototype.toArrayReverse = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }
      return arr;
    };
    Yallist.prototype.slice = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }
      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.sliceReverse = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }
      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }
      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }
      var ret = [];
      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }
      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }
      for (var i = 0; i < nodes.length; i++) {
        walker = insert(this, walker, nodes[i]);
      }
      return ret;
    };
    Yallist.prototype.reverse = function() {
      var head = this.head;
      var tail = this.tail;
      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this;
    };
    function insert(self, node, value) {
      var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
      if (inserted.next === null) {
        self.tail = inserted;
      }
      if (inserted.prev === null) {
        self.head = inserted;
      }
      self.length++;
      return inserted;
    }
    function push(self, item) {
      self.tail = new Node(item, self.tail, null, self);
      if (!self.head) {
        self.head = self.tail;
      }
      self.length++;
    }
    function unshift(self, item) {
      self.head = new Node(item, null, self.head, self);
      if (!self.tail) {
        self.tail = self.head;
      }
      self.length++;
    }
    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }
      this.list = list;
      this.value = value;
      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }
      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }
    try {
      require_iterator()(Yallist);
    } catch (er) {
    }
  }
});

// node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "node_modules/lru-cache/index.js"(exports2, module2) {
    "use strict";
    var Yallist = require_yallist();
    var MAX = Symbol("max");
    var LENGTH = Symbol("length");
    var LENGTH_CALCULATOR = Symbol("lengthCalculator");
    var ALLOW_STALE = Symbol("allowStale");
    var MAX_AGE = Symbol("maxAge");
    var DISPOSE = Symbol("dispose");
    var NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
    var LRU_LIST = Symbol("lruList");
    var CACHE = Symbol("cache");
    var UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
    var naiveLength = () => 1;
    var LRUCache = class {
      constructor(options) {
        if (typeof options === "number")
          options = { max: options };
        if (!options)
          options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0))
          throw new TypeError("max must be a non-negative number");
        const max = this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      }
      set max(mL) {
        if (typeof mL !== "number" || mL < 0)
          throw new TypeError("max must be a non-negative number");
        this[MAX] = mL || Infinity;
        trim(this);
      }
      get max() {
        return this[MAX];
      }
      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }
      get allowStale() {
        return this[ALLOW_STALE];
      }
      set maxAge(mA) {
        if (typeof mA !== "number")
          throw new TypeError("maxAge must be a non-negative number");
        this[MAX_AGE] = mA;
        trim(this);
      }
      get maxAge() {
        return this[MAX_AGE];
      }
      set lengthCalculator(lC) {
        if (typeof lC !== "function")
          lC = naiveLength;
        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach((hit) => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }
        trim(this);
      }
      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }
      get length() {
        return this[LENGTH];
      }
      get itemCount() {
        return this[LRU_LIST].length;
      }
      rforEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].tail; walker !== null; ) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }
      forEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].head; walker !== null; ) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }
      keys() {
        return this[LRU_LIST].toArray().map((k) => k.key);
      }
      values() {
        return this[LRU_LIST].toArray().map((k) => k.value);
      }
      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
        }
        this[CACHE] = new Map();
        this[LRU_LIST] = new Yallist();
        this[LENGTH] = 0;
      }
      dump() {
        return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter((h) => h);
      }
      dumpLru() {
        return this[LRU_LIST];
      }
      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }
          const node = this[CACHE].get(key);
          const item = node.value;
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET])
              this[DISPOSE](key, item.value);
          }
          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }
        const hit = new Entry(key, value, len, now, maxAge);
        if (hit.length > this[MAX]) {
          if (this[DISPOSE])
            this[DISPOSE](key, value);
          return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }
      has(key) {
        if (!this[CACHE].has(key))
          return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }
      get(key) {
        return get(this, key, true);
      }
      peek(key) {
        return get(this, key, false);
      }
      pop() {
        const node = this[LRU_LIST].tail;
        if (!node)
          return null;
        del(this, node);
        return node.value;
      }
      del(key) {
        del(this, this[CACHE].get(key));
      }
      load(arr) {
        this.reset();
        const now = Date.now();
        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0)
            this.set(hit.k, hit.v);
          else {
            const maxAge = expiresAt - now;
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }
      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }
    };
    var get = (self, key, doUse) => {
      const node = self[CACHE].get(key);
      if (node) {
        const hit = node.value;
        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE])
            return void 0;
        } else {
          if (doUse) {
            if (self[UPDATE_AGE_ON_GET])
              node.value.now = Date.now();
            self[LRU_LIST].unshiftNode(node);
          }
        }
        return hit.value;
      }
    };
    var isStale = (self, hit) => {
      if (!hit || !hit.maxAge && !self[MAX_AGE])
        return false;
      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
    };
    var trim = (self) => {
      if (self[LENGTH] > self[MAX]) {
        for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null; ) {
          const prev = walker.prev;
          del(self, walker);
          walker = prev;
        }
      }
    };
    var del = (self, node) => {
      if (node) {
        const hit = node.value;
        if (self[DISPOSE])
          self[DISPOSE](hit.key, hit.value);
        self[LENGTH] -= hit.length;
        self[CACHE].delete(hit.key);
        self[LRU_LIST].removeNode(node);
      }
    };
    var Entry = class {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    };
    var forEachStep = (self, fn, node, thisp) => {
      let hit = node.value;
      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE])
          hit = void 0;
      }
      if (hit)
        fn.call(thisp, hit.value, hit.key, self);
    };
    module2.exports = LRUCache;
  }
});

// node_modules/hosted-git-info/index.js
var require_hosted_git_info = __commonJS({
  "node_modules/hosted-git-info/index.js"(exports2, module2) {
    "use strict";
    var url = require("url");
    var gitHosts = require_git_host_info();
    var GitHost = module2.exports = require_git_host();
    var LRU = require_lru_cache();
    var cache = new LRU({ max: 1e3 });
    var protocolToRepresentationMap = {
      "git+ssh:": "sshurl",
      "git+https:": "https",
      "ssh:": "sshurl",
      "git:": "git"
    };
    function protocolToRepresentation(protocol) {
      return protocolToRepresentationMap[protocol] || protocol.slice(0, -1);
    }
    var authProtocols = {
      "git:": true,
      "https:": true,
      "git+https:": true,
      "http:": true,
      "git+http:": true
    };
    var knownProtocols = Object.keys(gitHosts.byShortcut).concat(["http:", "https:", "git:", "git+ssh:", "git+https:", "ssh:"]);
    module2.exports.fromUrl = function(giturl, opts) {
      if (typeof giturl !== "string") {
        return;
      }
      const key = giturl + JSON.stringify(opts || {});
      if (!cache.has(key)) {
        cache.set(key, fromUrl(giturl, opts));
      }
      return cache.get(key);
    };
    function fromUrl(giturl, opts) {
      if (!giturl) {
        return;
      }
      const url2 = isGitHubShorthand(giturl) ? "github:" + giturl : correctProtocol(giturl);
      const parsed = parseGitUrl(url2);
      if (!parsed) {
        return parsed;
      }
      const gitHostShortcut = gitHosts.byShortcut[parsed.protocol];
      const gitHostDomain = gitHosts.byDomain[parsed.hostname.startsWith("www.") ? parsed.hostname.slice(4) : parsed.hostname];
      const gitHostName = gitHostShortcut || gitHostDomain;
      if (!gitHostName) {
        return;
      }
      const gitHostInfo = gitHosts[gitHostShortcut || gitHostDomain];
      let auth = null;
      if (authProtocols[parsed.protocol] && (parsed.username || parsed.password)) {
        auth = `${parsed.username}${parsed.password ? ":" + parsed.password : ""}`;
      }
      let committish = null;
      let user = null;
      let project = null;
      let defaultRepresentation = null;
      try {
        if (gitHostShortcut) {
          let pathname = parsed.pathname.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
          const firstAt = pathname.indexOf("@");
          if (firstAt > -1) {
            pathname = pathname.slice(firstAt + 1);
          }
          const lastSlash = pathname.lastIndexOf("/");
          if (lastSlash > -1) {
            user = decodeURIComponent(pathname.slice(0, lastSlash));
            if (!user) {
              user = null;
            }
            project = decodeURIComponent(pathname.slice(lastSlash + 1));
          } else {
            project = decodeURIComponent(pathname);
          }
          if (project.endsWith(".git")) {
            project = project.slice(0, -4);
          }
          if (parsed.hash) {
            committish = decodeURIComponent(parsed.hash.slice(1));
          }
          defaultRepresentation = "shortcut";
        } else {
          if (!gitHostInfo.protocols.includes(parsed.protocol)) {
            return;
          }
          const segments = gitHostInfo.extract(parsed);
          if (!segments) {
            return;
          }
          user = segments.user && decodeURIComponent(segments.user);
          project = decodeURIComponent(segments.project);
          committish = decodeURIComponent(segments.committish);
          defaultRepresentation = protocolToRepresentation(parsed.protocol);
        }
      } catch (err) {
        if (err instanceof URIError) {
          return;
        } else {
          throw err;
        }
      }
      return new GitHost(gitHostName, user, auth, project, committish, defaultRepresentation, opts);
    }
    var correctProtocol = (arg) => {
      const firstColon = arg.indexOf(":");
      const proto = arg.slice(0, firstColon + 1);
      if (knownProtocols.includes(proto)) {
        return arg;
      }
      const firstAt = arg.indexOf("@");
      if (firstAt > -1) {
        if (firstAt > firstColon) {
          return `git+ssh://${arg}`;
        } else {
          return arg;
        }
      }
      const doubleSlash = arg.indexOf("//");
      if (doubleSlash === firstColon + 1) {
        return arg;
      }
      return arg.slice(0, firstColon + 1) + "//" + arg.slice(firstColon + 1);
    };
    var isGitHubShorthand = (arg) => {
      const firstHash = arg.indexOf("#");
      const firstSlash = arg.indexOf("/");
      const secondSlash = arg.indexOf("/", firstSlash + 1);
      const firstColon = arg.indexOf(":");
      const firstSpace = /\s/.exec(arg);
      const firstAt = arg.indexOf("@");
      const spaceOnlyAfterHash = !firstSpace || firstHash > -1 && firstSpace.index > firstHash;
      const atOnlyAfterHash = firstAt === -1 || firstHash > -1 && firstAt > firstHash;
      const colonOnlyAfterHash = firstColon === -1 || firstHash > -1 && firstColon > firstHash;
      const secondSlashOnlyAfterHash = secondSlash === -1 || firstHash > -1 && secondSlash > firstHash;
      const hasSlash = firstSlash > 0;
      const doesNotEndWithSlash = firstHash > -1 ? arg[firstHash - 1] !== "/" : !arg.endsWith("/");
      const doesNotStartWithDot = !arg.startsWith(".");
      return spaceOnlyAfterHash && hasSlash && doesNotEndWithSlash && doesNotStartWithDot && atOnlyAfterHash && colonOnlyAfterHash && secondSlashOnlyAfterHash;
    };
    var correctUrl = (giturl) => {
      const firstAt = giturl.indexOf("@");
      const lastHash = giturl.lastIndexOf("#");
      let firstColon = giturl.indexOf(":");
      let lastColon = giturl.lastIndexOf(":", lastHash > -1 ? lastHash : Infinity);
      let corrected;
      if (lastColon > firstAt) {
        corrected = giturl.slice(0, lastColon) + "/" + giturl.slice(lastColon + 1);
        firstColon = corrected.indexOf(":");
        lastColon = corrected.lastIndexOf(":");
      }
      if (firstColon === -1 && giturl.indexOf("//") === -1) {
        corrected = `git+ssh://${corrected}`;
      }
      return corrected;
    };
    var parseGitUrl = (giturl) => {
      let result;
      try {
        result = new url.URL(giturl);
      } catch (err) {
      }
      if (result) {
        return result;
      }
      const correctedUrl = correctUrl(giturl);
      try {
        result = new url.URL(correctedUrl);
      } catch (err) {
      }
      return result;
    };
  }
});

// node_modules/@hutson/parse-repository-url/src/index.js
var require_src = __commonJS({
  "node_modules/@hutson/parse-repository-url/src/index.js"(exports2, module2) {
    "use strict";
    var { parse } = require("url");
    var URL_PATTERNS = new RegExp(/^\/?:?([/\w-.]+)\/([\w-.]+)\/?$/);
    var GITHUB_API = new RegExp(/^\/repos\/([\w-.]+)\/([\w-.]+)\/(?:tarball|zipball)(?:\/.+)?$/);
    var GITHUB_CODELOAD = new RegExp(/^\/([\w-.]+)\/([\w-.]+)\/(?:legacy\.(?:zip|tar\.gz))(?:\/.+)?$/);
    module2.exports = (url) => {
      const modifiedURL = url.replace(/^git@/, `https://git@`).replace(/\.git$/, ``);
      const parsedURL = parse(modifiedURL);
      const format = (matches) => {
        return { browse: createBrowseURL(parsedURL, matches), domain: parsedURL.host, project: matches[2] || null, type: getType(parsedURL), user: matches[1] || null };
      };
      if (parsedURL.host) {
        if (parsedURL.host.includes(`api.github.com`)) {
          const matches = GITHUB_API.exec(parsedURL.pathname) || [];
          return format(matches);
        }
        if (parsedURL.host.includes(`codeload.github.com`)) {
          const matches = GITHUB_CODELOAD.exec(parsedURL.pathname) || [];
          return format(matches);
        }
      }
      return format(URL_PATTERNS.exec(parsedURL.pathname) || []);
    };
    function getType(parsedURL) {
      if (typeof parsedURL.host !== `string`) {
        return null;
      }
      if (parsedURL.host.indexOf(`github`) !== -1) {
        return "github";
      }
      if (parsedURL.host.indexOf(`gitlab`) !== -1) {
        return "gitlab";
      }
      return null;
    }
    function createBrowseURL(parsedURL, matches) {
      const protocol = parsedURL.protocol === `http:` ? `http:` : `https:`;
      const browseURL = `${protocol}//${parsedURL.host}/${matches[1]}/${matches[2]}`;
      return () => {
        return browseURL;
      };
    }
  }
});

// node_modules/get-pkg-repo/src/index.js
var require_src2 = __commonJS({
  "node_modules/get-pkg-repo/src/index.js"(exports2, module2) {
    "use strict";
    var hostedGitInfo = require_hosted_git_info();
    var parseRepositoryURL = require_src();
    module2.exports = (packageData) => {
      if (!packageData || !packageData.repository || typeof packageData.repository !== "string" && !packageData.repository.url) {
        throw new Error(`No valid "repository" data found in package metadata. Please see https://docs.npmjs.com/files/package.json#repository for proper syntax.`);
      }
      const repositoryURL = typeof packageData.repository === "string" ? packageData.repository : packageData.repository.url;
      return hostedGitInfo.fromUrl(repositoryURL) || parseRepositoryURL(repositoryURL);
    };
  }
});

// node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = __spreadProps(__spreadValues({}, POSIX_CHARS), {
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    });
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      CHAR_0: 48,
      CHAR_9: 57,
      CHAR_UPPERCASE_A: 65,
      CHAR_LOWERCASE_A: 97,
      CHAR_UPPERCASE_Z: 90,
      CHAR_LOWERCASE_Z: 122,
      CHAR_LEFT_PARENTHESES: 40,
      CHAR_RIGHT_PARENTHESES: 41,
      CHAR_ASTERISK: 42,
      CHAR_AMPERSAND: 38,
      CHAR_AT: 64,
      CHAR_BACKWARD_SLASH: 92,
      CHAR_CARRIAGE_RETURN: 13,
      CHAR_CIRCUMFLEX_ACCENT: 94,
      CHAR_COLON: 58,
      CHAR_COMMA: 44,
      CHAR_DOT: 46,
      CHAR_DOUBLE_QUOTE: 34,
      CHAR_EQUAL: 61,
      CHAR_EXCLAMATION_MARK: 33,
      CHAR_FORM_FEED: 12,
      CHAR_FORWARD_SLASH: 47,
      CHAR_GRAVE_ACCENT: 96,
      CHAR_HASH: 35,
      CHAR_HYPHEN_MINUS: 45,
      CHAR_LEFT_ANGLE_BRACKET: 60,
      CHAR_LEFT_CURLY_BRACE: 123,
      CHAR_LEFT_SQUARE_BRACKET: 91,
      CHAR_LINE_FEED: 10,
      CHAR_NO_BREAK_SPACE: 160,
      CHAR_PERCENT: 37,
      CHAR_PLUS: 43,
      CHAR_QUESTION_MARK: 63,
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      CHAR_RIGHT_CURLY_BRACE: 125,
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      CHAR_SEMICOLON: 59,
      CHAR_SINGLE_QUOTE: 39,
      CHAR_SPACE: 32,
      CHAR_TAB: 9,
      CHAR_UNDERSCORE: 95,
      CHAR_VERTICAL_LINE: 124,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      SEP: path.sep,
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      globChars(win322) {
        return win322 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports2) {
    "use strict";
    var path = require("path");
    var win322 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str);
    exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports2.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports2.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports2.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win322 === true || path.sep === "\\";
    };
    exports2.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1)
        return input;
      if (input[idx - 1] === "\\")
        return exports2.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports2.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports2.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      CHAR_AT,
      CHAR_BACKWARD_SLASH,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_EXCLAMATION_MARK,
      CHAR_FORWARD_SLASH,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_LEFT_PARENTHESES,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_PLUS,
      CHAR_QUESTION_MARK,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_RIGHT_PARENTHESES,
      CHAR_RIGHT_SQUARE_BRACKET
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob)
          glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = __spreadValues({}, options);
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win322 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win322);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = __spreadProps(__spreadValues({}, EXTGLOB_CHARS[value2]), { conditions: 1, inner: "" });
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            output = token.close = `)${rest})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix2 = POSIX_REGEX_SOURCE[rest2];
                if (posix2) {
                  prev.value = pre + posix2;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = __spreadValues({}, options);
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win322 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win322);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match)
              return;
            const source2 = create(match[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse;
  }
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var scan = require_scan();
    var parse = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix2 = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = __spreadProps(__spreadValues({}, options), { ignore: null, onMatch: null, onResult: null });
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix: posix2 });
        const result = { glob, state, regex, posix: posix2, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix: posix2 } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix2 ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix2);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob, options, posix2 = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse(pattern, __spreadProps(__spreadValues({}, options), { fastpaths: false }));
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_picomatch();
  }
});

// src/index.js
var import_path2 = __toModule(require("path"));
var import_promises = __toModule(require("fs/promises"));
var import_util = __toModule(require("util"));
var import_child_process = __toModule(require("child_process"));
var import_url = __toModule(require("url"));
var import_get_pkg_repo = __toModule(require_src2());

// node_modules/estree-walker/src/walker.js
var WalkerBase = class {
  constructor() {
    this.should_skip = false;
    this.should_remove = false;
    this.replacement = null;
    this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (node) => this.replacement = node
    };
  }
  replace(parent, prop, index, node) {
    if (parent) {
      if (index !== null) {
        parent[prop][index] = node;
      } else {
        parent[prop] = node;
      }
    }
  }
  remove(parent, prop, index) {
    if (parent) {
      if (index !== null) {
        parent[prop].splice(index, 1);
      } else {
        delete parent[prop];
      }
    }
  }
};

// node_modules/estree-walker/src/sync.js
var SyncWalker = class extends WalkerBase {
  constructor(enter, leave) {
    super();
    this.enter = enter;
    this.leave = leave;
  }
  visit(node, parent, prop, index) {
    if (node) {
      if (this.enter) {
        const _should_skip = this.should_skip;
        const _should_remove = this.should_remove;
        const _replacement = this.replacement;
        this.should_skip = false;
        this.should_remove = false;
        this.replacement = null;
        this.enter.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const skipped = this.should_skip;
        const removed = this.should_remove;
        this.should_skip = _should_skip;
        this.should_remove = _should_remove;
        this.replacement = _replacement;
        if (skipped)
          return node;
        if (removed)
          return null;
      }
      for (const key in node) {
        const value = node[key];
        if (typeof value !== "object") {
          continue;
        } else if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i += 1) {
            if (value[i] !== null && typeof value[i].type === "string") {
              if (!this.visit(value[i], node, key, i)) {
                i--;
              }
            }
          }
        } else if (value !== null && typeof value.type === "string") {
          this.visit(value, node, key, null);
        }
      }
      if (this.leave) {
        const _replacement = this.replacement;
        const _should_remove = this.should_remove;
        this.replacement = null;
        this.should_remove = false;
        this.leave.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const removed = this.should_remove;
        this.replacement = _replacement;
        this.should_remove = _should_remove;
        if (removed)
          return null;
      }
    }
    return node;
  }
};

// node_modules/estree-walker/src/index.js
function walk(ast, { enter, leave }) {
  const instance = new SyncWalker(enter, leave);
  return instance.visit(ast, null);
}

// node_modules/is-reference/src/index.js
function is_reference(node, parent) {
  if (node.type === "MemberExpression") {
    return !node.computed && is_reference(node.object, node);
  }
  if (node.type === "Identifier") {
    if (!parent)
      return true;
    switch (parent.type) {
      case "MemberExpression":
        return parent.computed || node === parent.object;
      case "MethodDefinition":
        return parent.computed;
      case "PropertyDefinition":
        return parent.computed || node === parent.value;
      case "Property":
        return parent.computed || node === parent.value;
      case "ExportSpecifier":
      case "ImportSpecifier":
        return node === parent.local;
      case "LabeledStatement":
      case "BreakStatement":
      case "ContinueStatement":
        return false;
      default:
        return true;
    }
  }
  return false;
}

// node_modules/@rollup/pluginutils/dist/es/index.js
var import_path = __toModule(require("path"));
var import_picomatch = __toModule(require_picomatch2());
var WalkerBase2 = class {
  constructor() {
    WalkerBase2.prototype.__init.call(this);
    WalkerBase2.prototype.__init2.call(this);
    WalkerBase2.prototype.__init3.call(this);
    WalkerBase2.prototype.__init4.call(this);
  }
  __init() {
    this.should_skip = false;
  }
  __init2() {
    this.should_remove = false;
  }
  __init3() {
    this.replacement = null;
  }
  __init4() {
    this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (node) => this.replacement = node
    };
  }
  replace(parent, prop, index, node) {
    if (parent) {
      if (index !== null) {
        parent[prop][index] = node;
      } else {
        parent[prop] = node;
      }
    }
  }
  remove(parent, prop, index) {
    if (parent) {
      if (index !== null) {
        parent[prop].splice(index, 1);
      } else {
        delete parent[prop];
      }
    }
  }
};
var SyncWalkerClass = class extends WalkerBase2 {
  constructor(walker) {
    super();
    this.enter = walker.enter;
    this.leave = walker.leave;
  }
  visit(node, parent, enter, leave, prop, index) {
    if (node) {
      if (enter) {
        const _should_skip = this.should_skip;
        const _should_remove = this.should_remove;
        const _replacement = this.replacement;
        this.should_skip = false;
        this.should_remove = false;
        this.replacement = null;
        enter.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const skipped = this.should_skip;
        const removed = this.should_remove;
        this.should_skip = _should_skip;
        this.should_remove = _should_remove;
        this.replacement = _replacement;
        if (skipped)
          return node;
        if (removed)
          return null;
      }
      for (const key in node) {
        const value = node[key];
        if (typeof value !== "object") {
          continue;
        } else if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i += 1) {
            if (value[i] !== null && typeof value[i].type === "string") {
              if (!this.visit(value[i], node, enter, leave, key, i)) {
                i--;
              }
            }
          }
        } else if (value !== null && typeof value.type === "string") {
          this.visit(value, node, enter, leave, key, null);
        }
      }
      if (leave) {
        const _replacement = this.replacement;
        const _should_remove = this.should_remove;
        this.replacement = null;
        this.should_remove = false;
        leave.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const removed = this.should_remove;
        this.replacement = _replacement;
        this.should_remove = _should_remove;
        if (removed)
          return null;
      }
    }
    return node;
  }
};
function walk2(ast, walker) {
  const instance = new SyncWalkerClass(walker);
  return instance.visit(ast, null, walker.enter, walker.leave);
}
var extractors = {
  ArrayPattern(names, param) {
    for (const element of param.elements) {
      if (element)
        extractors[element.type](names, element);
    }
  },
  AssignmentPattern(names, param) {
    extractors[param.left.type](names, param.left);
  },
  Identifier(names, param) {
    names.push(param.name);
  },
  MemberExpression() {
  },
  ObjectPattern(names, param) {
    for (const prop of param.properties) {
      if (prop.type === "RestElement") {
        extractors.RestElement(names, prop);
      } else {
        extractors[prop.value.type](names, prop.value);
      }
    }
  },
  RestElement(names, param) {
    extractors[param.argument.type](names, param.argument);
  }
};
var extractAssignedNames = function extractAssignedNames2(param) {
  const names = [];
  extractors[param.type](names, param);
  return names;
};
var blockDeclarations = {
  const: true,
  let: true
};
var Scope = class {
  constructor(options = {}) {
    this.parent = options.parent;
    this.isBlockScope = !!options.block;
    this.declarations = Object.create(null);
    if (options.params) {
      options.params.forEach((param) => {
        extractAssignedNames(param).forEach((name) => {
          this.declarations[name] = true;
        });
      });
    }
  }
  addDeclaration(node, isBlockDeclaration, isVar) {
    if (!isBlockDeclaration && this.isBlockScope) {
      this.parent.addDeclaration(node, isBlockDeclaration, isVar);
    } else if (node.id) {
      extractAssignedNames(node.id).forEach((name) => {
        this.declarations[name] = true;
      });
    }
  }
  contains(name) {
    return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
  }
};
var attachScopes = function attachScopes2(ast, propertyName = "scope") {
  let scope = new Scope();
  walk2(ast, {
    enter(n, parent) {
      const node = n;
      if (/(Function|Class)Declaration/.test(node.type)) {
        scope.addDeclaration(node, false, false);
      }
      if (node.type === "VariableDeclaration") {
        const { kind } = node;
        const isBlockDeclaration = blockDeclarations[kind];
        node.declarations.forEach((declaration) => {
          scope.addDeclaration(declaration, isBlockDeclaration, true);
        });
      }
      let newScope;
      if (/Function/.test(node.type)) {
        const func = node;
        newScope = new Scope({
          parent: scope,
          block: false,
          params: func.params
        });
        if (func.type === "FunctionExpression" && func.id) {
          newScope.addDeclaration(func, false, false);
        }
      }
      if (/For(In|Of)?Statement/.test(node.type)) {
        newScope = new Scope({
          parent: scope,
          block: true
        });
      }
      if (node.type === "BlockStatement" && !/Function/.test(parent.type)) {
        newScope = new Scope({
          parent: scope,
          block: true
        });
      }
      if (node.type === "CatchClause") {
        newScope = new Scope({
          parent: scope,
          params: node.param ? [node.param] : [],
          block: true
        });
      }
      if (newScope) {
        Object.defineProperty(node, propertyName, {
          value: newScope,
          configurable: true
        });
        scope = newScope;
      }
    },
    leave(n) {
      const node = n;
      if (node[propertyName])
        scope = scope.parent;
    }
  });
  return scope;
};
var reservedWords = "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public";
var builtins = "arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl";
var forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(" "));
forbiddenIdentifiers.add("");

// src/GMAPIs.js
var GMAPIs_default = [
  "GM_addStyle",
  "GM_addElement",
  "GM_log",
  "GM_setValue",
  "GM_getValue",
  "GM_listValues",
  "GM_addValueChangeListener",
  "GM_removeValueChangeListener",
  "GM_getResourceText",
  "GM_getResourceURL",
  "GM_registerMenuCommand",
  "GM_unregisterMenuCommand",
  "GM_openInTab",
  "GM_xmlhttpRequest",
  "GM_download",
  "GM_getTab",
  "GM_saveTab",
  "GM_getTabs",
  "GM_notification",
  "GM_setClipboard"
];

// src/index.js
var exec = (0, import_util.promisify)(import_child_process.exec);
var getPkgAuthor = (pkg) => {
  const author = pkg?.author;
  if (typeof author === "string") {
    return author;
  } else if (typeof author === "object") {
    return `${author.name}`;
  }
};
var getCurrentBranch = async () => {
  const { stdout } = await exec("git branch --show-current").catch();
  return stdout?.trim();
};
var generateUserScriptHeader = (headerContent) => {
  const maxLength = Math.max(...headerContent.map(([name]) => name.length));
  return [
    "// ==UserScript==",
    ...headerContent.map(([name, value]) => `// ${name.padEnd(maxLength + 4)}${value}`),
    "// ==/UserScript=="
  ].join("\n");
};
var cwd = process.cwd();
module.exports = function({ metaPath, transformHeaderContent } = {
  metaPath: (0, import_path2.resolve)(cwd, "meta.json"),
  transformHeaderContent: void 0
}) {
  const headerMap = new Map();
  return {
    name: "tampermonkey-header",
    buildStart() {
      this.addWatchFile(metaPath);
    },
    transform(code, id) {
      const ast = this.parse(code);
      let scope = attachScopes(ast, "scope");
      const grantSet = new Set();
      const connectSet = new Set();
      walk(ast, {
        enter(node, parent) {
          if (node.scope)
            scope = node.scope;
          if (node.type === "Identifier" && is_reference(node, parent) && !scope.contains(node.name)) {
            const nodeName = node.name;
            if (GMAPIs_default.includes(nodeName)) {
              grantSet.add(nodeName);
              if (nodeName === "GM_xmlhttpRequest" && parent.callee === node) {
                const urlNode = parent?.arguments?.[0]?.properties?.find(({ key }) => key.type === "Identifier" && key.name === "url");
                if (urlNode && urlNode.value.type === "Literal") {
                  connectSet.add(new import_url.URL(urlNode.value.value).host);
                }
              }
            }
          }
        },
        leave(node) {
          if (node.scope)
            scope = scope.parent;
        }
      });
      headerMap.set(id, {
        grantSet,
        connectSet
      });
    },
    renderStart({ file }) {
      userScriptFile = file ?? "user.js";
    },
    async banner() {
      try {
        const pkgPath = (0, import_path2.resolve)(cwd, "package.json");
        const pkg = JSON.parse(await (0, import_promises.readFile)(pkgPath));
        const pkgRepo = pkg.repository && (0, import_get_pkg_repo.default)(pkg);
        const repoUrl = pkgRepo?.browse();
        const repoRelatedMeta = {};
        if (pkgRepo) {
          const branch = await getCurrentBranch();
          const rawURL = pkgRepo.type === "github" ? repoUrl.replace(pkgRepo.domain, "raw.githubusercontent.com") + `/${branch}/${userScriptFile}` : "";
          Object.assign(repoRelatedMeta, {
            "@homepage": `${repoUrl}#readme`,
            "@supportURL": `${repoUrl}/issue`,
            "@updateURL": rawURL,
            "@downloadURL": rawURL
          });
        }
        const metaData = __spreadValues({
          "@name": pkg.name,
          "@namespace": repoUrl ?? pkg.name,
          "@version": pkg.version,
          "@author": getPkgAuthor(pkg),
          "@description": pkg.description,
          "@icon": pkg.icon,
          "@include": "*"
        }, repoRelatedMeta);
        try {
          const userMetaFile = await (0, import_promises.readFile)(metaPath);
          const userMetaData = JSON.parse(userMetaFile);
          Object.assign(metaData, userMetaData);
        } catch (err) {
        }
        const itemEntries = Object.entries(metaData).filter(([_name, value]) => !!value);
        const grants = new Set();
        const connects = new Set();
        const moduleIds = this.getModuleIds();
        for (const id of moduleIds) {
          const moduleHeader = headerMap.get(id);
          if (moduleHeader) {
            const { grantSet, connectSet } = moduleHeader;
            grantSet.size && grants.add(...grantSet);
            connectSet.size && connects.add(...connectSet);
          }
        }
        for (const v of grants) {
          itemEntries.push(["@grant", v]);
        }
        for (const v of connects) {
          itemEntries.push(["@connect", v]);
        }
        const headerContent = transformHeaderContent?.([...itemEntries]) ?? itemEntries;
        return generateUserScriptHeader(headerContent);
      } catch (error) {
        console.log(error);
      }
    },
    api: {
      generateUserScriptHeader
    }
  };
};
//# sourceMappingURL=plugin.cjs.map
