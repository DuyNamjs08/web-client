import {combineReducers,createStore,applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import ReducerCheckout from './ReducerCheckout'
import  Saga  from '../redux-saga/Saga'
import CartReducer from './CartReducer'
import logger from 'redux-logger'
import{composeWithDevTools} from 'redux-devtools-extension'
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    ReducerCheckout:ReducerCheckout,
    CartReducer:CartReducer,
    
})
 const store= createStore(rootReducer ,composeWithDevTools(applyMiddleware(logger,sagaMiddleware)))
 sagaMiddleware.run(Saga)
 export default store