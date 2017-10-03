define('app',['exports', './data', 'aurelia-fetch-client'], function (exports, _data, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Hello World!';
      this.empData = [];
      this.nameField = '';
      this.baseURL = 'http://localhost:8080';
      this.cityField = '';
    }

    App.prototype.refreshData = function refreshData(fetchedData) {
      this.empData = [];
      for (var i = 0; i < fetchedData.length; i++) {
        if (fetchedData[i] != null) {
          this.empData.push(new _data.data(fetchedData[i].name, fetchedData[i].city));
        }
      }
    };

    App.prototype.loadData = function loadData() {
      var _this = this;

      var client = new _aureliaFetchClient.HttpClient();
      client.fetch(this.baseURL + '/data/get').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.refreshData(data);
      });
    };

    App.prototype.addData = function addData() {
      var _this2 = this;

      console.log('triggered');
      if (this.nameField && this.cityField) {

        var comment = { name: this.nameField, city: this.cityField };
        console.log(comment);

        var client = new _aureliaFetchClient.HttpClient();

        client.fetch(this.baseURL + '/data/post', {
          method: 'post',
          body: (0, _aureliaFetchClient.json)(comment)
        }).then(function (response) {
          return response.json();
        }).then(function (savedComment) {
          console.log(savedComment);
          _this2.loadData();
        }).catch(function (error) {});
      }
    };

    return App;
  }();
});
define('data',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var data = exports.data = function data(name, city) {
		_classCallCheck(this, data);

		this.name = name;
		this.city = city;
	};
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1><button click.trigger=\"loadData()\">Refresh</button><br><br><br><br><form submit.trigger=\"addData()\"><input type=\"text\" value.bind=\"nameField\"> <input type=\"text\" value.bind=\"cityField\"> <button type=\"submit\">Submit</button></form><br><br><br><br><table border=\"1\"><tr><th>Name</th><th>City</th></tr><tr repeat.for=\"d of empData\"><td>${d.name}</td><td>${d.city}</td></tr></table></template>"; });
//# sourceMappingURL=app-bundle.js.map