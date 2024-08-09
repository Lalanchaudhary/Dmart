import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import Plus from 'react-native-vector-icons/AntDesign';

const Cart = () => {
  const navigation = useNavigation();
  const [itemData, setItemData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getValueFunction = async () => {
    try {
      const value = await AsyncStorage.getItem('item_data2');
      if (value !== null) {
        const parsedData = JSON.parse(value);
        // Initialize quantities for each item
        const updatedData = parsedData.map(item => ({ ...item, quantity: 1 }));
        setItemData(updatedData);

        calculateTotalPrice(updatedData);
      }
    } catch (error) {
      console.error("Failed to retrieve data:", error);
    }
  };

  const calculateTotalPrice = (data) => {
    let totalItemPrice = 0;
    data.map((item) => {
      totalItemPrice += item.price * item.quantity;
    });
    setTotalPrice(totalItemPrice);
  };

  useFocusEffect(
    React.useCallback(() => {
      getValueFunction();
    }, [])
  );
  const AddHandle = (item) => {
    const updatedData = itemData.map(dataItem => {
      if (dataItem.id === item.id) {
        return { ...dataItem, quantity: dataItem.quantity + 1 };
      }
      return dataItem;
    });

    setItemData(updatedData);
    calculateTotalPrice(updatedData);
  };

  const MinusHandle = (item) => {
    if (item.quantity > 1) {
      const updatedData = itemData.map(dataItem => {
        if (dataItem.id === item.id) {
          return { ...dataItem, quantity: dataItem.quantity - 1 };
        }
        return dataItem;
      });

      setItemData(updatedData);
      calculateTotalPrice(updatedData);
    }
  };

  const DeletItem = async (id) => {
    try {
      const updatedItemData = itemData.filter(item => item.id !== id);
      setItemData(updatedItemData);

      await AsyncStorage.setItem('item_data2', JSON.stringify(updatedItemData));

      calculateTotalPrice(updatedItemData);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.product_main_container}>
      <View style={styles.product_container}>
        <Image source={{ uri: item.thumbnail }} style={styles.product_image} />
        <View>
          {
            item.title.length<16?<Text style={styles.title}>{item.title}</Text>:<Text style={styles.title}>{item.title.slice(0,15)} ..</Text>
          }
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
        <View style={styles.quantity_container}>
          <TouchableOpacity onPress={() => { AddHandle(item) }}>
            <Plus name='plus' size={18} color={'black'} />
          </TouchableOpacity>
          <View style={styles.quantity}>
            <Text style={{ color: 'white' }}>{item.quantity}</Text>
          </View>
          <TouchableOpacity onPress={() => { MinusHandle(item) }}>
            <Plus name='minus' size={18} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => DeletItem(item.id)}>
        <Delete name='delete' size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => { navigation.goBack() }}>
        <Icon2 name='arrowleft' size={22} color={'#19253d'} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.heading}>Daily {"\n"}Grocery Shop</Text>
      </View>
      {itemData.length > 0 ? (
        <>
          <FlatList
            data={itemData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <View>
            <Text style={styles.total_price}>Total amount : ₹{totalPrice}</Text>
            <TouchableOpacity style={styles.checkout_btn} onPress={() => { navigation.navigate('PaymentScreen', { totalPrice }) }}>
              <Text style={styles.checkout_text}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.noItemText}>No items in the cart</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  backIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efeeee',
    marginVertical: 10,
    marginBottom: 20
  },
  heading: {
    fontSize: 35,
    fontWeight: '900',
    color: 'black'
  },
  search_icon: {
    margin: 20
  },
  product_main_container: {
    backgroundColor: '#19253d',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginVertical: 10
  },
  product_container: {
    height: 120,
    width: '84%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efeff1',
    borderRadius: 6,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  product_image: {
    height: 90,
    width: 90
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    margin: 5
  },
  price: {
    fontSize: 18,
    color: 'orange',
    fontWeight: '900',
    margin: 5
  },
  quantity: {
    height: 22,
    width: 22,
    backgroundColor: '#19253d',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantity_container: {
    alignItems: 'center',
    gap: 4,
    position: 'absolute',
    right: 24
  },
  total_price: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    color: 'black'
  },
  checkout_btn: {
    margin: 'auto',
    height: 60,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b3d60',
    borderRadius: 30,
    marginVertical: 20
  },
  checkout_text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  noItemText:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
    marginVertical:200 }
});

export default Cart;
