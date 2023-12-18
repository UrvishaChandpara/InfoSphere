import rootSaga from "./saga";
import rootReducer from "./reducer";
import createSagaMiddleware from 'redux-saga';
import { configureStore} from "@reduxjs/toolkit";


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);
  return store;
}

