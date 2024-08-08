import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/FontAwesome5'
import Home from './Home'
import Profile from './Profile'
import Order from './Order'
import Cart from './Cart'
const Display = () => {
    const Tab=createBottomTabNavigator();
  return (
        <Tab.Navigator screenOptions={{
            tabBarStyle:styles.bottom_container,
        }}>
            <Tab.Screen name='Home' component={Home} options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarIcon:({focused})=>(
                    <View style={styles.icon_View}>
                        <Icon name='home' size={22} color={focused?'white':'grey'} />
                      <Text style={{color:focused?'white':'grey'}}>Home</Text>
                    </View>
                )
            }} />
            <Tab.Screen name='Order' component={Order} options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarIcon:({focused})=>(
                    <View style={styles.icon_View}>
                        <Icon2 name='first-order' size={22} color={focused?'white':'grey'}  />
                      <Text style={{color:focused?'white':'grey'}}>Order</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name='Cart' component={Cart} options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarIcon:({focused})=>(
                    <View style={styles.icon_View}>
                        <Icon3 name='shopping-cart' size={22} color={focused?'white':'grey'}  />
                      <Text style={{color:focused?'white':'grey'}}>My Cart</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name='Profile' component={Profile} options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarIcon:({focused})=>(
                    <View style={styles.icon_View}>
                        <Icon4 name='user-circle' size={22} color={focused?'white':'grey'}  />
                      <Text style={{color:focused?'white':'grey'}}>Profile</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
  )
}

export default Display

const styles = StyleSheet.create({
    bottom_container:{
        height:80,
        backgroundColor:'#19253d'
    },
    icon_View:{
        alignItems:'center'
      },
})