import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Signup from './Screens/Signup'
import Login from './Screens/Login'
import Home from './Screens/Home'
import Display from './Screens/Display'
import ProductDetails from './Screens/ProductDetails'
import PaymentScreen from './Screens/PaymentScreen'
const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Display' component={Display} options={{
          headerShown:false
        }}/>
        <Stack.Screen name='signup' component={Signup} options={
          {
            headerShown: false
          }
        } />
        <Stack.Screen name='login' component={Login} options={{
          headerShown: false
        }} />
                <Stack.Screen name='product' component={ProductDetails} options={{
          headerShown: false
        }} />
              <Stack.Screen name='PaymentScreen' component={PaymentScreen} options={{
          headerShown:false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})