export declare function LazyLoading({ delay, children }: {
    delay?: number | boolean;
    children?: any;
}): any;
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
