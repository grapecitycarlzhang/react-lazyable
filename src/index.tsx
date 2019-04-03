import * as React from 'react'
import * as hoistNonReactStatic from 'hoist-non-react-statics';

export function LazyLoading({ delay, children }: { delay?: number | boolean, children?: any }) {
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        if (delay) {
            const delayTicker = setTimeout(() => {
                clearTimeout(delayTicker);
                setLoading(true)
            }, typeof delay === 'number' ? delay : 1000);
        } else {
            setLoading(true);
        }
    }, []);
    return loading ? children : null;
}

export { lazyload as loadable }

export default function lazyload({
    loader,
    loading,
    delay,
    export: exportDefault,
    statics,
    identifier,
    forwardRef }: {
        loader: () => Promise<any>,
        loading?: any,
        delay?: number,
        export?: any,
        statics?: string,
        identifier?: string,
        forwardRef?: boolean
    }) {

    const getExpect = modules => !!exportDefault ? exportDefault(modules) : modules.default;

    let chains = null;
    if (statics) {

        chains = JSON.parse(statics);

        if (chains.func && chains.func.length > 0) {
            const funcs = {};
            chains.func.forEach(fn => {
                funcs[fn] = function () {
                    var args = arguments
                    return new Promise((resolve, reject) => {
                        loader()
                            .then(modules => Promise.resolve(getExpect(modules)))
                            .then((expect) => (
                                Object.getOwnPropertyNames(expect).forEach(key => funcs[key] = expect[key]),
                                resolve([expect[fn].apply(null, args), expect])
                            ))
                            .catch(reject)
                    })
                }
            });
            return funcs;
        }
    }

    const copyStatics = modules => {
        const expect = getExpect(modules);
        hoistNonReactStatic(LazyWrapperComponent, expect);
        return expect;
    }

    const wrappedLoader: any = () =>
        new Promise((resolve, reject) =>
            loader()
                .then(modules => {
                    resolve({ default: copyStatics(modules) })
                })
                .catch(reject));

    const Component = React.lazy(wrappedLoader) as any;
    const ExpectLoading = loading;

    class LazyWrapperComponent extends React.Component<{ forwardedRef }, { hasError }> {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }
        static getDerivedStateFromError(error) {
            // Update state so the next render will show the fallback UI.
            return { hasError: true };
        }
        componentDidCatch(error, info) {
            // You can also log the error to an error reporting service
        }
        render() {
            const { forwardedRef, ...rest } = this.props;
            if (this.state.hasError) {
                // You can render any custom fallback UI
                return null;
            }
            return (
                <React.Suspense fallback={<LazyLoading delay={delay} >{loading ? <ExpectLoading /> : null}</LazyLoading>}>
                    <Component ref={forwardedRef} {...rest} />
                </React.Suspense>
            )
        }
    }
    LazyWrapperComponent['displayName'] = `LazyWrapperComponent(${identifier})`;
    LazyWrapperComponent['lazyload'] = wrappedLoader;

    function linkChains(props, fallback) {
        const prop = props.shift();
        const nextfallback = d => fallback(d)[prop];
        const component = lazyload({
            loader: loader,
            export: nextfallback,
            identifier: prop,
        });
        props.length > 0 && (component[props[0]] = linkChains(props, nextfallback));
        return component;
    }

    if (statics) {

        chains.react.forEach(chain => {
            const props = chain.split('.');
            LazyWrapperComponent[props[0]] = linkChains(props, d => d.default);
        })

        chains.reactfunc.forEach(fn => {
            LazyWrapperComponent[fn] = function () {
                var args = arguments
                return new Promise((resolve, reject) => {
                    wrappedLoader()
                        .then(({ default: expect }) => resolve([expect[fn].apply(null, args), expect]))
                        .catch(reject)
                })
            }
        })

    }

    if (forwardRef) {

        const forwardRef: any = (props, ref) => <LazyWrapperComponent {...props} forwardedRef={ref}></LazyWrapperComponent>;

        forwardRef.displayName = `LazyWrapperComponent(${identifier})`;

        return React.forwardRef(forwardRef) as any;
    }

    return LazyWrapperComponent as any;
}
