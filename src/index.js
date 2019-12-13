import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import getRouter from 'router/router';
import './assets/css/global.scss'

const store = configureStore()
/*初始化*/
renderWithHotReload(getRouter());
if (MOCK) {
    require('api/mock/index');
}
/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}