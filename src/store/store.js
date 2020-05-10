import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import reducers from './reducers';
import thunk from 'redux-thunk';
const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

// Be sure to ONLY add this middleware in development!
const middleware = process.env.NODE_ENV !== 'production'
  ? [require('redux-immutable-state-invariant').default(), thunk] // eslint-disable-line global-require, import/no-extraneous-dependencies
  : [thunk];
  
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
));

export default store;
