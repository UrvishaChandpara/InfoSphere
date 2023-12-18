/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import configureAppStore from './src/services/redux/store';
import { Provider } from 'react-redux';

const store=configureAppStore()

const AppRegister=()=>(
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRegister);
