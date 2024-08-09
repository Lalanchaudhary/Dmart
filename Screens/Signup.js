import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import google from '../Assets/google.png'
import facebook from '../Assets/facebook2.png'
import { useNavigation } from '@react-navigation/native'

const Signup = () => {
  const navigation = useNavigation();

  const SignupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email Address is required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required')
  });

  const handleSignIn = async (email, password) => {
    console.log('Email:', email); // Log the email
    console.log('Password:', password); // Log the password
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Display')
      console.log('signInWithEmail:success');
    } catch (e) {
      console.warn('signInWithEmail:failure', e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon2 name='arrowleft' size={22} color={'#19253d'} />
      </TouchableOpacity>
      <Text style={styles.heading}>Register Now</Text>
      <Formik
        validationSchema={SignupValidationSchema}
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={(values) => handleSignIn(values.email, values.password)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
          <>
            <Text style={{ marginBottom: 30 }}>Sign up with your email and password for shop</Text>
            <View>
              <Icon name='email' size={20} style={styles.emailIcon} color={'#19253d'} />
              <TextInput
                style={styles.input_box}
                placeholder='Email Address'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType='email-address'
              />
            </View>
            {errors.email && <Text style={styles.errors}>{errors.email}</Text>}
            <View>
              <Icon2 name='Safety' size={20} style={styles.emailIcon} color={'#19253d'} />
              <TextInput
                style={styles.input_box}
                placeholder='Password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
            </View>
            {errors.password && <Text style={styles.errors}>{errors.password}</Text>}
            <View>
              <Icon2 name='Safety' size={20} style={styles.emailIcon} color={'#19253d'} />
              <TextInput
                style={styles.input_box}
                placeholder='Confirm Password'
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
              />
            </View>
            {errors.confirmPassword && <Text style={styles.errors}>{errors.confirmPassword}</Text>}

            <TouchableOpacity style={styles.signup_btn} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.btn_text}>Sign up</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Or continue with</Text>
            <TouchableOpacity style={[styles.another_btn, { marginTop: 33 }]}>
              <Image style={styles.google_icon} source={google} />
              <Text style={styles.btn_text2}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.another_btn}>
              <Image style={styles.facebook_icon} source={facebook} />
              <Text style={styles.btn_text2}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('login') }}>
              <Text style={{ textAlign: 'center', marginVertical: 30 }}>Already have an account? <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Sign in</Text></Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    height: 900
  },
  heading: {
    fontSize: 26,
    fontWeight: '900',
    color: '#19253d',
    marginTop: 30,
    marginVertical: 10
  },
  input_box: {
    height: 60,
    backgroundColor: '#efeeee',
    paddingHorizontal: 54,
    borderRadius: 40,
    marginVertical: 10,
    fontSize: 16,
    color: 'black'
  },
  errors: {
    color: 'red',
    marginHorizontal: 20,
    fontSize: 12
  },
  signup_btn: {
    height: 60,
    backgroundColor: '#19253d',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  btn_text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  emailIcon: {
    position: 'absolute',
    top: 30,
    zIndex: 999,
    left: 20
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
  another_btn: {
    height: 60,
    backgroundColor: '#efeeee',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  google_icon: {
    height: 50,
    width: 50
  },
  btn_text2: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  facebook_icon: {
    height: 30,
    width: 30,
    marginLeft: 15
  }
});
