import * as React from 'react';
import 'react-native-reanimated';
import {AppRegistry} from 'react-native';
import TextCarousel from './app/TextCarousel';

export default function App() {
    return <TextCarousel />;
}

AppRegistry.registerComponent('App', () => App);
