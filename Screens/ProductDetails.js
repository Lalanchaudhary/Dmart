import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/AntDesign';
import man from '../Assets/man.jpg';
import star from '../Assets/5star.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [itemArray, setItemArray] = useState([]);

  const getItemArray = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('item_data2');
      if (storedItems) {
        setItemArray(JSON.parse(storedItems));
      } else {
        setItemArray([]); // Ensure it's an array if no data is found
      }
    } catch (error) {
      console.error("Failed to retrieve item data:", error);
    }
  };

  useEffect(() => {
    getItemArray();
  }, []);

  const handlePress = async () => {
    try {
      const updatedItemArray = [...itemArray, item];
      await AsyncStorage.setItem('item_data2', JSON.stringify(updatedItemArray));
      setItemArray(updatedItemArray); // Update state with new array
    } catch (error) {
      console.error("Failed to save item data:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Icon2 name='arrowleft' size={22} color={'#19253d'} />
        </TouchableOpacity>
        <View style={styles.image_view}>
          <Image source={{ uri: item.images[0] }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>Product Description</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.subtitle}>Product Reviews</Text>
          <View style={styles.review_sec}>
            <View style={styles.review_row}>
              <Image source={man} style={styles.review_img} />
              <View>
                <Text>{item.reviews[0].reviewerName}</Text>
                <Image source={star} style={styles.star} />
              </View>
            </View>
            <Text>{item.reviews[0].date.slice(0, 10)}</Text>
          </View>
          <Text style={styles.review_comment}>{item.reviews[0].comment}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.price}>₹ {item.price}</Text>
        <TouchableOpacity style={styles.add_btn} onPress={handlePress}>
          <Text style={styles.add_text}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
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
    marginBottom: 20,
  },
  image: {
    width: width - 40, // responsive width
    height: 280,
  },
  image_view: {
    backgroundColor: '#efeeee',
    borderRadius: 25,
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: 'black',
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  description: {
    paddingHorizontal: 10,
  },
  review_sec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  review_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  review_img: {
    height: 45,
    width: 45,
    borderRadius: 23,
  },
  star: {
    height: 20,
    width: 80,
  },
  review_comment: {
    padding: 20,
    paddingBottom: 0,
  },
  bottom: {
    height: 90,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#19253d',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    bottom: 0,
  },
  price: {
    color: 'white',
    fontSize: 28,
  },
  add_btn: {
    height: 50,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add_text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProductDetails;
