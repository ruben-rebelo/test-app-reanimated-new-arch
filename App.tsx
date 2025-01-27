import * as React from 'react';
import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InformationalScreenExample} from './app/InformationalScreen';
import {TamaguiProvider} from '@tamagui/core';
import {config} from './tamagui.config';
import { AppRegistry } from 'react-native';

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={InformationalScreenExample}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <TamaguiProvider
            config={config}
            defaultTheme="light"
        >
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </TamaguiProvider>
    );
}

AppRegistry.registerComponent('App', () => App);
