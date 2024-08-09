import { Image,TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import bag from '../Assets/bag.png'
import { useNavigation } from '@react-navigation/native'
const FirstScreen = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
        <View>
            <Image source={bag} style={styles.bag_ing} />
            <Text style={styles.title}>Daily Grocerry Shop</Text>
        </View>
        <Text style={{textAlign:'center',marginBottom:-180,fontSize:15}}>Welcome to FreshMart – Fresh groceries delivered to your doorstep with ease and convenience!</Text>
        <View style={{marginBottom:-70}}>
        <TouchableOpacity style={styles.signup_btn} onPress={()=>{navigation.navigate('login')}}>
              <Text style={styles.btn_text}>Sign in</Text>
            </TouchableOpacity>
            <Text style={{textAlign:'center',margin:5,fontSize:16,fontWeight:'bold'}}>or</Text>
            <TouchableOpacity style={styles.signup_btn} onPress={()=>{navigation.navigate('signup')}}>
              <Text style={styles.btn_text}>Sign up</Text>
            </TouchableOpacity>
            </View>
    </View>
  )
}

export default FirstScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:20,
        justifyContent:'space-around'
    },
    bag_ing:{
        height:150,
        width:150,
        margin:'auto'
    },
    title:{
        fontSize:30,
        fontWeight:'900',
        color:'black',
        margin: 'auto',
    },
    signup_btn: {
        height: 60,
        backgroundColor: '#19253d',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btn_text: {
        color: 'white',
        fontSize: 22,
        fontWeight: '400'
      },
})