"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoistNonReactStatic = require("hoist-non-react-statics");
function LazyLoading(_a) {
    var delay = _a.delay, children = _a.children;
    var _b = __read(React.useState(false), 2), loading = _b[0], setLoading = _b[1];
    React.useEffect(function () {
        if (delay) {
            var delayTicker_1 = setTimeout(function () {
                clearTimeout(delayTicker_1);
                setLoading(true);
            }, typeof delay === 'number' ? delay : 1000);
        }
        else {
            setLoading(true);
        }
    }, []);
    return loading ? children : null;
}
exports.LazyLoading = LazyLoading;
function lazyload(_a) {
    var loader = _a.loader, loading = _a.loading, delay = _a.delay, exportDefault = _a.export, statics = _a.statics, identifier = _a.identifier, forwardRef = _a.forwardRef;
    var getExpect = function (modules) { return !!exportDefault ? exportDefault(modules) : modules.default; };
    var chains = null;
    if (statics) {
        chains = JSON.parse(statics);
        if (chains.func && chains.func.length > 0) {
            var funcs_1 = {};
            chains.func.forEach(function (fn) {
                funcs_1[fn] = function () {
                    var args = arguments;
                    return new Promise(function (resolve, reject) {
                        loader()
                            .then(function (modules) { return Promise.resolve(getExpect(modules)); })
                            .then(function (expect) { return (Object.getOwnPropertyNames(expect).forEach(function (key) { return funcs_1[key] = expect[key]; }),
                            resolve([expect[fn].apply(null, args), expect])); })
                            .catch(reject);
                    });
                };
            });
            return funcs_1;
        }
    }
    var copyStatics = function (modules) {
        var expect = getExpect(modules);
        hoistNonReactStatic(LazyWrapperComponent, expect);
        return expect;
    };
    var wrappedLoader = function () {
        return new Promise(function (resolve, reject) {
            return loader()
                .then(function (modules) {
                resolve({ default: copyStatics(modules) });
            })
                .catch(reject);
        });
    };
    var Component = React.lazy(wrappedLoader);
    var ExpectLoading = loading;
    var LazyWrapperComponent = /** @class */ (function (_super) {
        __extends(LazyWrapperComponent, _super);
        function LazyWrapperComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { hasError: false };
            return _this;
        }
        LazyWrapperComponent.getDerivedStateFromError = function (error) {
            // Update state so the next render will show the fallback UI.
            return { hasError: true };
        };
        LazyWrapperComponent.prototype.componentDidCatch = function (error, info) {
            // You can also log the error to an error reporting service
        };
        LazyWrapperComponent.prototype.render = function () {
            var _a = this.props, forwardedRef = _a.forwardedRef, rest = __rest(_a, ["forwardedRef"]);
            if (this.state.hasError) {
                // You can render any custom fallback UI
                return null;
            }
            return (React.createElement(React.Suspense, { fallback: React.createElement(LazyLoading, { delay: delay }, loading ? React.createElement(ExpectLoading, null) : null) },
                React.createElement(Component, __assign({ ref: forwardedRef }, rest))));
        };
        return LazyWrapperComponent;
    }(React.Component));
    LazyWrapperComponent['displayName'] = "LazyWrapperComponent(" + identifier + ")";
    LazyWrapperComponent['lazyload'] = wrappedLoader;
    function linkChains(props, fallback) {
        var prop = props.shift();
        var nextfallback = function (d) { return fallback(d)[prop]; };
        var component = lazyload({
            loader: loader,
            export: nextfallback,
            identifier: prop,
        });
        props.length > 0 && (component[props[0]] = linkChains(props, nextfallback));
        return component;
    }
    if (statics) {
        chains.react.forEach(function (chain) {
            var props = chain.split('.');
            LazyWrapperComponent[props[0]] = linkChains(props, function (d) { return d.default; });
        });
        chains.reactfunc.forEach(function (fn) {
            LazyWrapperComponent[fn] = function () {
                var args = arguments;
                return new Promise(function (resolve, reject) {
                    wrappedLoader()
                        .then(function (_a) {
                        var expect = _a.default;
                        return resolve([expect[fn].apply(null, args), expect]);
                    })
                        .catch(reject);
                });
            };
        });
    }
    if (forwardRef) {
        var forwardRef_1 = function (props, ref) { return React.createElement(LazyWrapperComponent, __assign({}, props, { forwardedRef: ref })); };
        forwardRef_1.displayName = "LazyWrapperComponent(" + identifier + ")";
        return React.forwardRef(forwardRef_1);
    }
    return LazyWrapperComponent;
}
exports.default = lazyload;
exports.loadable = lazyload;
