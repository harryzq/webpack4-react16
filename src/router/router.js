import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../redux/store';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
// /官方按需加载
import loadable from '@loadable/component'
const Home = loadable(() => import(/* webpackChunkName: 'Home' */'pages/Home/Home'))
const Page1 = loadable(() => import(/* webpackChunkName: 'Page1' */'pages/Page1/Page1'))
const Counter = loadable(() => import(/* webpackChunkName: 'Counter' */'pages/Counter/Counter'))
const UserInfo = loadable(() => import(/* webpackChunkName: 'UserInfo' */'pages/UserInfo/UserInfo'))



import { hot } from 'react-hot-loader'
const getRouter = () => (
    // <Provider store={store}>
         <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/userinfo">UserInfo</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1" component={Page1}/>
                <Route path="/counter" component={Counter}/>
                <Route path="/userinfo" component={UserInfo}/>
            </Switch>
        </div>
    </Router>
    // </Provider>
   
);

export default getRouter;
// export default hot(module)(App);