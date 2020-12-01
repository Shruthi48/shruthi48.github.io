// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/navbar.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/navbar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navbar = void 0;

require("../styles/navbar.scss");

var navbar = function navbar() {
  var user = localStorage.getItem('user') || '';
  return "<div class=\"navbar-container\">\n    <div class=\"navbar-logo\"> Logo </div>\n    <div class=\"navbar-form-container\">\n      <form >\n        <input type=\"text\" name=\"user\" value=\"".concat(user, "\" class=\"nav-user\"/>\n        <button class=\"nav-button\">submit</button>\n      </form>\n    </div>\n  </div>");
};

exports.navbar = navbar;
},{"../styles/navbar.scss":"styles/navbar.scss"}],"styles/bookTable.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/bookTable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookTable = exports.enterData = exports.TableDetails = exports.getData = exports.TableHeader = void 0;

require("../styles/bookTable.scss");

var dataFromLocal = localStorage.getItem('data') || [];
var data = dataFromLocal && dataFromLocal.length > 0 && JSON.parse(dataFromLocal); // const data = [
//   {
//     'id': '1',
//     'book': 'book1',
//     'author': 'author1',
//     'lender': 'lender1',
//     'borrower': 'borrower1',
//     'isBorrowed': false,
//     'borrowQueue':[],
//     'actions': []
//   },
//   {
//     'id': '2',
//     'book': 'book2',
//     'author': 'author2',
//     'lender': 'lender2',
//     'borrower': 'borrower2',
//     'isBorrowed': false,
//     'borrowQueue':[],
//     'actions':[]
//   }
// ]

var id = data.length ? data.length + 1 : 1;

var TableHeader = function TableHeader() {
  var headerValues = ['Id', ' Book', 'Author', 'Lender', 'Borrower', 'Action'];
  var headerDetails = headerValues.map(function (item) {
    return "<div class=\"bookTable-header-".concat(item.toLowerCase(), "\">").concat(item, "</div>");
  });
  return headerDetails.join('');
};

exports.TableHeader = TableHeader;

var getData = function getData() {
  if (!data.length) {
    return "<div></div>";
  }

  var tableValue = data.map(function (item) {
    return "<div class=\"tableDetails-wrapper\"><div>".concat(item.id, " </div> <div>").concat(item.book, " </div> <div>").concat(item.author, "</div> <div>").concat(item.lender, "</div> <div>").concat(item.borrower, "</div></div>");
  });
  return tableValue.join('');
};

exports.getData = getData;

var TableDetails = function TableDetails() {
  return "<div class=\"bookTable-details-wrapper\">\n  ".concat(getData(), "\n  ").concat(enterData(), "\n  </div>");
};

exports.TableDetails = TableDetails;

var enterData = function enterData() {
  var user = localStorage.getItem('user') || '';
  return "<div class=\"tableDetails-wrapper\">\n        <div>".concat(id, "</div>\n        <input type=\"text\" name=\"book\" value=\"\" class=\"book-text\"/>\n        <input type=\"text\" name=\"author\" value=\"\" class=\"author-text\"/>\n        <div>").concat(user, "</div>\n        <div>\n          <button class=\"add-book\">Add Book</button>\n        </div>\n    </div>\n  </div>");
};

exports.enterData = enterData;

var bookTable = function bookTable() {
  return "<div class=\"bookTable-container\">\n   <div class=\"bookTable-wrapper\"> \n     ".concat(TableHeader(), "\n    </div>\n    <div class=\"bookTable-table-details-wrapper\">\n    ").concat(TableDetails(), "\n    </div>\n  </div>");
};

exports.bookTable = bookTable;
},{"../styles/bookTable.scss":"styles/bookTable.scss"}],"scripts/userSubmit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUserSubmit = void 0;

var handleUserSubmit = function handleUserSubmit(event) {
  var button = document.querySelector('.nav-button');
  var userEntered = '';
  button.addEventListener('click', function (event) {
    event.preventDefault();
    var element = document.querySelector('.nav-user');
    userEntered = element.value;
    localStorage.setItem('user', userEntered);
    window.location.reload();
  });
};

exports.handleUserSubmit = handleUserSubmit;
},{}],"scripts/addBook.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleAddBook = void 0;

var handleAddBook = function handleAddBook(event) {
  var user = localStorage.getItem('user') || '';
  var button = document.querySelector('.add-book');
  button.addEventListener('click', function (event) {
    event.preventDefault();
    var bookElement = document.querySelector('.book-text');
    var authorElement = document.querySelector('.author-text');
    var book = bookElement.value;
    var author = authorElement.value;
    var dataArray = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
    var formattedData = {};

    if (!dataArray.length) {
      formattedData = {
        id: 1,
        book: book,
        author: author,
        lender: user,
        borrower: '',
        actions: [],
        isBorrowed: false
      };
    } else {
      formattedData = {
        id: dataArray.length + 1,
        book: book,
        author: author,
        lender: user,
        borrower: '',
        actions: [],
        isBorrowed: false
      };
    }

    dataArray.push(formattedData);
    localStorage.setItem("data", JSON.stringify(dataArray));
    window.location.reload();
  });
};

exports.handleAddBook = handleAddBook;
},{}],"styles/app.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"scripts/app.js":[function(require,module,exports) {
"use strict";

var _navbar = require("../components/navbar");

var _bookTable = require("../components/bookTable");

var _userSubmit = require("./userSubmit");

var _addBook = require("./addBook");

require("../styles/app.scss");

var init = function init() {
  var template = document.createElement('Template');
  template.innerHTML = "<header> ".concat((0, _navbar.navbar)(), " </header> <div> ").concat((0, _bookTable.bookTable)(), "</div>");
  var newTemplate = template.content.cloneNode(true);
  var layout = document.querySelector('#app');
  layout.appendChild(newTemplate);
};

init();
(0, _userSubmit.handleUserSubmit)();
(0, _addBook.handleAddBook)();
},{"../components/navbar":"components/navbar.js","../components/bookTable":"components/bookTable.js","./userSubmit":"scripts/userSubmit.js","./addBook":"scripts/addBook.js","../styles/app.scss":"styles/app.scss"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60238" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/app.js"], null)
//# sourceMappingURL=/app.c09d0a7b.js.map