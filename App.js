import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react'
import RootStack from './components/RootStack';

const App = () => {
  return (
    <NavigationContainer>
    <RootStack/>
  </NavigationContainer>
  )
  
}

export default App;

