import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'
import star from '../Assets/star.png'
const Home = () => {
    const navigation=useNavigation();
    const [AllProduct,setAllProducts]=useState([]);
  
    const Api_Load=async()=>{
      const response=await fetch('https://dummyjson.com/products');
      const data=await response.json();
      setAllProducts(data.products);
    }
  
    useEffect(()=>{
      Api_Load()
    },[])
  
    const HandlePress=()=>{
      navigation.navigate('payment')
    }
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.mainContainer}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={styles.heading}>Daily {"\n"}Grocerry Shop</Text>
            <Icon name='search' size={25} style={styles.search_icon} />
            </View>
            <View style={{flexDirection:'row',gap:20,marginVertical:30}}>
              <TouchableOpacity style={styles.filter_btn}>
                <Text style={{color:'white'}}>Mekup</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filter_btn2}>
                <Text style={{color:'black'}}>Medicine</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filter_btn2}>
                <Text style={{color:'black'}}>Fruits</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filter_btn2}>
                <Text style={{color:'black'}}>Medicine</Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize:16,color:'black',fontWeight:'bold',marginHorizontal:8}}>Popular Products</Text>
    <View style={styles.container}>
      {
        AllProduct.map((item)=>{
          return (
            <TouchableOpacity onPress={()=>{navigation.navigate('product',{item:item})}} key={item.id}>
            <View style={styles.product_container} >
              <View style={styles.image_view}>
            <Image source={{uri:item.thumbnail}} style={styles.product_image} />
            </View>
            <Text style={styles.product_title}>{item.title.slice(0,15)}</Text>
            <View style={styles.price_rate_view}>
            <Text style={{marginVertical:0,color:'black',fontWeight:'500',marginLeft:5,fontSize:20}}>₹ {item.price}</Text>
              <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                 <Image style={styles.star} source={star} />
                <Text>{item.rating}</Text>
            </View>
            </View>
          </View>
          </TouchableOpacity>
          )
        })
      }
    </View>
    </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#fff',
        padding:20,
    },
    container:{
        width:'100%',
        backgroundColor:'#fff',
        alignItems:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
      },
    heading:{
        fontSize:35,
        fontWeight:'900',
        color:'black'
    },
      product_container:{
        backgroundColor:'#efeff1',
        height:220,
        width:170,
        padding:10,
        marginTop:15,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
      },
      product_image:{
        height:110,
        width:110,
        margin:5
      },
      product_title:{
        color:'black',
        fontWeight:'500',
        margin:5,
        marginTop:20,
        fontSize:16
      },
      FlatList:{
        flexDirection:'row'
      },
      image_view:{
        alignItems:'center',
      },
      price_rate_view:{
        flexDirection:'row',
        justifyContent:'space-between'
      },
      star:{
        height:20,
        width:20
      },
      search_icon:{
        margin:20
      },
      filter_btn:{
        height:40,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#19253d',
        borderRadius:36
      },
      filter_btn2:{
        height:40,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#efeff1',
        borderRadius:36
      }
})
