import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon2 from 'react-native-vector-icons/AntDesign'
import ProfileIcon from '../Assets/profileIcon.png'
import LalanImage from '../Assets/lalanimage.jpg'
import Icon from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome6'
import Icon4 from 'react-native-vector-icons/AntDesign'
import Icon5 from 'react-native-vector-icons/Foundation'
import Icon6 from 'react-native-vector-icons/Feather'
const Profile = () => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={() => { navigation.goBack() }}>
          <Icon2 name='arrowleft' size={22} color={'#19253d'} />
        </TouchableOpacity>
        <View style={styles.Image_view}>
          <Image source={ProfileIcon} style={styles.ProfileIcon} />
          <Image source={LalanImage} style={styles.LalanImage} />
        </View>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', margin: 'auto', marginBottom: 30 }}>Lalan Chaudhary</Text>
        <View style={styles.profile_info}>
          <View style={styles.icon_container}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              gap: 20
            }}>
              <Icon name='user' size={22} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Edit Profile</Text>
            </View>
            <Icon name='chevron-small-right' size={22} />
          </View>

          <View style={styles.icon_container}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              gap: 20
            }}>
              <Icon3 name='location-dot' size={22} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Shopping Address</Text>
            </View>
            <Icon name='chevron-small-right' size={22} />
          </View>
          <View style={styles.icon_container}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              gap: 20
            }}>
              <Icon4 name='heart' size={22} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Wish List</Text>
            </View>
            <Icon name='chevron-small-right' size={22} />
          </View>
          <View style={styles.icon_container}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              gap: 20
            }}>
              <Icon5 name='clipboard-notes' size={22} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Order History</Text>
            </View>
            <Icon name='chevron-small-right' size={22} />
          </View>
          <View style={styles.icon_container}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              gap: 20
            }}>
              <Icon4 name='bells' size={22} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Notification</Text>
            </View>
            <Icon name='chevron-small-right' size={22} />
          </View>
          <View style={styles.icon_container}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              gap: 20
            }}>
              <Icon4 name='creditcard' size={22} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Cards</Text>
            </View>
            <Icon name='chevron-small-right' size={22} />
          </View>
          <View style={styles.icon_container}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              gap: 20
            }}>
              <Icon6 name='log-out' size={22} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Log Out</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    // padding: 20,
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
    margin: 20
  },
  ProfileIcon: {
    height: 200,
    width: 200
  },
  Image_view: {
    margin: 'auto'
  },
  LalanImage: {
    position: 'absolute',
    height: 120,
    width: 120,
    borderRadius: 60,
    top: 33,
    left: 39
  },
  profile_info: {
    flex: 1,
    backgroundColor: '#e3e2e7',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20
  },
  icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical:10
  }
})