/**
 * Created by xavier on 4/26/16.
 */
import {
    Router,
    Scene,
    Modal
} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {connect} from 'react-redux';
import reducers from './reducers/combined';
import devTools from 'remote-redux-devtools';
import React, {Component} from 'react';
import Home from './containers/Home'
import Splash from './containers/Splash'
import Search from './containers/Search'
import SubcategoryModal from './containers/SubcategoryModal'
import Subcategory2Modal from './containers/Subcategory2Modal'
import ProductSpecs from './containers/ProductSpecs'
import Refine from './containers/Refine'
import OrderByModal from './containers/OrderByModal'


import {
    realTimeUpdatingMiddleware,
    cqrsMiddleware
} from 'redux-realtime-cqrs'

import {
    FindFiltersHandler,
    CategorySearchHandler,
    FlatCategoriesHandler
} from './filter/Handlers'

import {
    GoHomeHandler,
    GoBackHandler,
    FocusOnSearchHandler,
    GoSubcategoryModalHandler,
    GoSubcategory2ModalHandler,
    GoRefineHandler,
    GoSearchHandler,
    GoOrderByModalHandler,
    HideFtsBoxHandler,
    FtsChangeTextHandler

} from './app/Handlers'

import config from './config'


const RouterWithRedux = connect()(Router);

let commandHandlers = [
    FindFiltersHandler,
    GoHomeHandler,
    FocusOnSearchHandler,
    CategorySearchHandler,
    GoSubcategoryModalHandler,
    GoBackHandler,
    GoSubcategory2ModalHandler,
    GoRefineHandler,
    GoSearchHandler,
    GoOrderByModalHandler,
    HideFtsBoxHandler, FtsChangeTextHandler,
    FlatCategoriesHandler,

];


const middleware = [cqrsMiddleware(commandHandlers), realTimeUpdatingMiddleware(config)];
const store = compose(
    applyMiddleware(...middleware),
    devTools()
)(createStore)(reducers);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux >
                    <Scene key="modal" component={Modal}>
                        <Scene key="root">
                            <Scene key="splash" component={Splash} hideNavBar={true} initial={true}/>
                            <Scene key="home" component={Home} hideNavBar={true}/>
                            <Scene key="search" component={Search} hideNavBar={true}/>
                            <Scene key="refine" component={Refine} hideNavBar={true}/>
                            <Scene key="productSpecs" component={ProductSpecs} hideNavBar={true} />
                        </Scene>
                        <Scene key="subcategoryModal" component={SubcategoryModal} hideNavBar={true}/>
                        <Scene key="subcategory2Modal" component={Subcategory2Modal} hideNavBar={true}/>
                        <Scene key="orderByModal" component={OrderByModal} hideNavBar={true}/>
                    </Scene>


                </RouterWithRedux>
            </Provider>

        );
    }
}


