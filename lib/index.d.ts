import { Component } from 'react';
export declare function LazyLoadIcon({ size }: {
    size?: string;
}): JSX.Element;
export declare class LazyLoading extends Component<{
    delay?: any;
}, {
    loading: any;
}> {
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export { lazyload as loadable };
export default function lazyload({ loader, loading, delay, export: exportDefault, statics, identifier, forwardRef }: {
    loader: () => Promise<any>;
    loading?: any;
    delay?: number;
    export?: any;
    statics?: string;
    identifier?: string;
    forwardRef?: boolean;
}): any;
