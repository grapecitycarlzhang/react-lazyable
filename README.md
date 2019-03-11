# Welcome to React-Lazyable!

Use react **suspense** and **lazy**  to async loading component, support **[antd](https://ant.design/)** components.
Thanks for **[react code splitting](https://reactjs.org/docs/code-splitting.html)**, **[loadable-components](https://github.com/smooth-code/loadable-components)** and  **[react-loadable](https://github.com/jamiebuilds/react-loadable)**. 
If you want to do code-splitting in a server rendered app or require other features, please use the components mentioned above.

## Install
```sh
npm i react-lazyable
yarn add react-lazyable
```
## Example
```js
import * as React from "react";
import { loadable } from "react-lazyable";

const LoadableComponent= loadable({
    loader:() => import('./my-component')
})

export default class OtherComponent extends React.Component {
    render(){
        const props = {
            prop1:'',
            prop2:'',
        };
        const children = this.props.children;
        return <LoadableComponent{...props}>{children}</LoadableComponent>
    }
}
```
## Options

### loader (*required*)
required.
```
lazyload({loader:() => import('react-component')})
lazyload({loader:() => import('./my-component')})
```
### loading  (*optional*)
```
lazyload({
    loader:() => import('react-component'),
    loading:() => <loading/>
})
```
### delay (*optional*)
```
lazyload({
    loader:() => import('react-component'),
    delay:1000
})
```
### export (*optional*)
```
lazyload({
    loader:() => import('react-component'),
    export:(d) => d.wantExport || d.default
})
```
### forwardRef (*optional*)
If you want to get ref manually, set forwardRef to true. 

### identifier (*optional*)
Set component's identifier name.

### statics (*optional*)
The option using for antd component static propertise, use [babel-plugin-import-antd-async](https://github.com/grapecitycarlzhang/babel-plugin-import-antd-async) for it.