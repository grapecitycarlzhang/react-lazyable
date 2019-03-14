"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LazyLoadIcon = LazyLoadIcon;
exports.default = exports.loadable = lazyload;
exports.LazyLoading = void 0;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LazyLoadTag = _styledComponents.default.div.withConfig({
  displayName: "src__LazyLoadTag",
  componentId: "dqk9l5-0"
})(["font-size:14px;font-variant:tabular-nums;line-height:1.5;color:rgba(0,0,0,.65);box-sizing:border-box;margin:0;padding:0;list-style:none;color:#1890ff;vertical-align:middle;text-align:center;opacity:0;position:absolute;transition:transform .3s cubic-bezier(.78,.14,.15,.86);display:none;opacity:1;position:static;display:inline-block;i{position:relative;display:inline-block;font-size:20px;width:20px;height:20px;display:inline-block;font-style:normal;vertical-align:-.125em;text-align:center;text-transform:none;line-height:0;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;svg{display:inline-block;overflow:hidden;animation:loadingCircle 1s linear infinite;line-height:1;}}"]);

function LazyLoadIcon(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? '1em' : _ref$size;
  return React.createElement(LazyLoadTag, {
    className: 'suspense-loading'
  }, React.createElement("i", null, React.createElement("svg", {
    viewBox: "0 0 1024 1024",
    "data-icon": "loading",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
  }))));
}

var LazyLoading =
/*#__PURE__*/
function (_Component) {
  _inherits(LazyLoading, _Component);

  function LazyLoading(props) {
    var _this;

    _classCallCheck(this, LazyLoading);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LazyLoading).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "delayTicker", void 0);

    _this.state = {
      loading: false
    };
    return _this;
  }

  _createClass(LazyLoading, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.delayTicker = setTimeout(function () {
        return _this2.setState({
          loading: true
        });
      }, this.props.delay || 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.delayTicker);
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.loading ? React.createElement(LazyLoadIcon, null) : null;
    }
  }]);

  return LazyLoading;
}(React.Component);

exports.LazyLoading = LazyLoading;

function lazyload(_ref2) {
  var loader = _ref2.loader,
      loading = _ref2.loading,
      delay = _ref2.delay,
      exportDefault = _ref2.export,
      statics = _ref2.statics,
      identifier = _ref2.identifier,
      forwardRef = _ref2.forwardRef;

  var getExpect = function getExpect(modules) {
    return !!exportDefault ? exportDefault(modules) : modules.default;
  };

  var chains = null;

  if (statics) {
    chains = JSON.parse(statics);

    if (chains.func && chains.func.length > 0) {
      var funcs = {};
      chains.func.forEach(function (fn) {
        funcs[fn] = function () {
          var args = arguments;
          return new Promise(function (resolve, reject) {
            loader().then(function (modules) {
              return Promise.resolve(getExpect(modules));
            }).then(function (expect) {
              return Object.getOwnPropertyNames(expect).forEach(function (key) {
                return funcs[key] = expect[key];
              }), resolve([expect[fn].apply(null, args), expect]);
            }).catch(reject);
          });
        };
      });
      return funcs;
    }
  }

  var copyStatics = function copyStatics(modules) {
    var expect = getExpect(modules);
    (0, _hoistNonReactStatics.default)(LazyWrapperComponent, expect);
    return expect;
  };

  var wrappedLoader = function wrappedLoader() {
    return new Promise(function (resolve, reject) {
      return loader().then(function (modules) {
        resolve({
          default: copyStatics(modules)
        });
      }).catch(reject);
    });
  };

  var Component = React.lazy(wrappedLoader);
  var ExpectLoading = loading;

  var LazyWrapperComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(LazyWrapperComponent, _React$Component);

    function LazyWrapperComponent(props) {
      var _this3;

      _classCallCheck(this, LazyWrapperComponent);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(LazyWrapperComponent).call(this, props));
      _this3.state = {
        hasError: false
      };
      return _this3;
    }

    _createClass(LazyWrapperComponent, [{
      key: "componentDidCatch",
      value: function componentDidCatch(error, info) {// You can also log the error to an error reporting service
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            forwardedRef = _this$props.forwardedRef,
            rest = _objectWithoutProperties(_this$props, ["forwardedRef"]);

        if (this.state.hasError) {
          // You can render any custom fallback UI
          return React.createElement(LazyLoading, null);
        }

        return React.createElement(React.Suspense, {
          fallback: !!loading ? React.createElement(ExpectLoading, null) : React.createElement(LazyLoading, {
            delay: delay
          })
        }, React.createElement(Component, _extends({
          ref: forwardedRef
        }, rest)));
      }
    }], [{
      key: "getDerivedStateFromError",
      value: function getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {
          hasError: true
        };
      }
    }]);

    return LazyWrapperComponent;
  }(React.Component);

  LazyWrapperComponent['displayName'] = "LazyWrapperComponent(".concat(identifier, ")");
  LazyWrapperComponent['lazyload'] = wrappedLoader;

  function linkChains(props, fallback) {
    var prop = props.shift();

    var nextfallback = function nextfallback(d) {
      return fallback(d)[prop];
    };

    var component = lazyload({
      loader: loader,
      export: nextfallback,
      identifier: prop
    });
    props.length > 0 && (component[props[0]] = linkChains(props, nextfallback));
    return component;
  }

  if (statics) {
    chains.react.forEach(function (chain) {
      var props = chain.split('.');
      LazyWrapperComponent[props[0]] = linkChains(props, function (d) {
        return d.default;
      });
    });
    chains.reactfunc.forEach(function (fn) {
      LazyWrapperComponent[fn] = function () {
        var args = arguments;
        return new Promise(function (resolve, reject) {
          wrappedLoader().then(function (_ref3) {
            var expect = _ref3.default;
            return resolve([expect[fn].apply(null, args), expect]);
          }).catch(reject);
        });
      };
    });
  }

  if (forwardRef) {
    var _forwardRef = function _forwardRef(props, ref) {
      return React.createElement(LazyWrapperComponent, _extends({}, props, {
        forwardedRef: ref
      }));
    };

    _forwardRef.displayName = "LazyWrapperComponent(".concat(identifier, ")");
    return React.forwardRef(_forwardRef);
  }

  return LazyWrapperComponent;
}