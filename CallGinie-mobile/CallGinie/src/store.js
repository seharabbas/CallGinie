import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

//{},__DEV__? applyMiddleware(ReduxThunk,logger): 
let store=null;
store = createStore(reducers,applyMiddleware(ReduxThunk,logger));

export default store;