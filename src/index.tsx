import * as React from 'react'
import { Component } from 'react'
import styled from 'styled-components';
import hoistNonReactStatic from 'hoist-non-react-statics';

const LazyLoadTag = styled.div`
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0, 0, 0, .65);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    color: #1890ff;
    vertical-align: middle;
    text-align: center;
    opacity: 0;
    position: absolute;
    transition: transform .3s cubic-bezier(.78, .14, .15, .86);
    display: none;
    opacity: 1;
    position: static;
    display: inline-block;
    i{
        position: relative;
        display: inline-block;
        font-size: 20px;
        width: 20px;
        height: 20px;
        display: inline-block;
        font-style: normal;
        vertical-align: -.125em;
        text-align: center;
        text-transform: none;
        line-height: 0;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        svg{
            display: inline-block;
            overflow: hidden;
            animation: loadingCircle 1s linear infinite;
            line-height: 1;
        }
    }
`;

export function LazyLoadIcon({ size = '1em' }) {
    return (
        <LazyLoadTag className={'suspense-loading'}>
            <i>
                <svg viewBox="0 0 1024 1024" data-icon="loading" width={size} height={size} fill="currentColor" aria-hidden="true">
                    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                </svg>
            </i>
        </LazyLoadTag>
    )
}

export class LazyLoading extends Component<{ delay?}, { loading }> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        if (this.props.delay) {
            const delayTicker = setTimeout(() => {
                clearTimeout(delayTicker);
                this.setState({ loading: true })
            }, typeof this.props.delay === 'number' ? this.props.delay : 1000);
        }
    }
    render() {
        return this.state.loading ? <LazyLoadIcon></LazyLoadIcon> : null
    }
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
                return <LazyLoading />;
            }
            return (
                <React.Suspense fallback={!!loading ? <ExpectLoading /> : <LazyLoading delay={delay} />}>
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
