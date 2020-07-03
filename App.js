import React from 'react';
import {YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import PhotoScreen from './src/screens/users/photo';
import PreviewScreen from './src/screens/users/preview';
import SearchScreen from './src/screens/users/search';
import {store, persistor} from './src/redux/store';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
console.disableYellowBox = true;

const Stack = createStackNavigator();

class PhotoApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Search">
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="Photo" component={PhotoScreen} />
              <Stack.Screen name="Preview" component={PreviewScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default PhotoApp;
