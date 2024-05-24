import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const ScreenOne = ({navigation: { navigate }}) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({navigation: { navigate }}) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({navigation: { goBack }}) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>Go to Back</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name='One' component={ScreenOne}/>
      <NativeStack.Screen name='Two' component={ScreenTwo}/>
      <NativeStack.Screen name='Three' component={ScreenThree}/>
    </NativeStack.Navigator>
  )
}

export default Stack