import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { useStripe, StripeProvider, CardField } from '@stripe/stripe-react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Card1 from '../Assets/card21.png';
import Icon2 from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native';
const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route)
  const { totalPrice } = route.params;
  const amount = Math.round(totalPrice);
  const { confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handlePayment = async () => {

    Alert.alert('payment success')
    navigation.navigate('Order')
    // if (!cardDetails?.complete) {
    //   Alert.alert('Error', 'Please enter complete card details.');
    //   return;
    // }

    // try {
    //   const billingDetails = {
    //     email: email,
    //     name: name,
    //   };

    //   const response = await fetch('http://192.168.0.88:3000/create-payment-intent', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ amount: amount }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok.');
    //   }

    //   const { clientSecret } = await response.json();

    //   const { error, paymentIntent } = await confirmPayment(clientSecret, {
    //     paymentMethodType: 'Card',
    //     paymentMethod: {
    //       card: cardDetails,
    //       billingDetails,
    //     },
    //   });

    //   if (error) {
    //     console.error('Payment failed:', error.message);
    //     Alert.alert('Payment Error', error.message);
    //   } else {
    //     console.log('Payment Successful', paymentIntent);
    //     Alert.alert('Success', 'Payment Successful');
    //     navigation.navigate('Order')
    //   }
    // } catch (error) {
    //   console.error('Payment Error', error);
    //   Alert.alert('Payment Error', 'An unexpected error occurred.');
    // }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
      <TouchableOpacity style={styles.backIcon} onPress={()=>{navigation.goBack()}}>
                <Icon2 name='arrowleft' size={22} color={'#19253d'} />
            </TouchableOpacity>
        <Image source={Card1} style={styles.cardImage} />
        <View style={styles.cardContainer}>
          <View style={{ marginVertical: 30, height: 45 }}>
            <Text>CARD HOLDER NAME</Text>
            <TextInput style={styles.NameInput} value={name} onChangeText={(value) => setName(value)} />
          </View>

          <View style={{ marginVertical: 30, height: 45 }}>
            <Text>ENTER YOUR EMAIL</Text>
            <TextInput style={styles.NameInput} value={email} onChangeText={(value) => { setEmail(value) }} />
          </View>

          <Text style={{ color: 'grey' }}>CREDIT CARD NUMBER</Text>
          <CardField
            postalCodeEnabled={false}
            placeholder={{ number: '4242 4242 4242 4242' }}
            cardStyle={styles.cardField}
            style={styles.cardFieldContainer}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />
          <View style={{ marginVertical: 20 }}>
            <BouncyCheckbox
              size={25}
              fillColor="#0e1333"
              unFillColor="#FFFFFF"
              text="Save this card for future transactions"
              innerIconStyle={{ borderWidth: 2, borderColor: '#0e1333' }}
              textStyle={{ fontFamily: "JosefinSans-Regular" }}
            />
          </View>
          <View style={styles.payment_box}>
            <Text style={styles.total}>TOTAL: ₹{totalPrice}</Text>
            <TouchableOpacity style={styles.payment_button} onPress={handlePayment}>
              <Text style={styles.payment_button_text}>PROCEED TO PAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51PgO1lHPutiZIS9jYa7HuTGEtifW9foDSiAmiEKCZkbJcnLDystAqgcgIa9E7xdcFZrOlKNLyWT1WDX56eGZLGVj00ZTUzjMCy">
      <PaymentScreen />
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f2ff',
    // alignItems:'center'
  },
  backIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efeeee',
    margin:20
    // position:'absolute',
    // left:20,
    // top:10
},
  cardImage: {
    marginTop:-30,
    // marginBottom: -20,
    width: 400,
    marginLeft: 7
  },
  cardContainer: {
    height: 500,
    width: '100%',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    padding: 25,
  },
  cardFieldContainer: {
    height: 50,
    marginVertical: 10,
  },
  cardField: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
  },
  payment_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payment_button: {
    backgroundColor: '#0e1333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  payment_button_text: {
    color: '#fff',
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  NameInput: {
    borderBottomWidth: 0.8,
    fontSize: 18,
    color: 'black',

  },

});

export default App;
