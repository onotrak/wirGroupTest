import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Loader from '../components/loader/Loader';
import { normalize } from '../components/helpers/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/colors';
import { LOGOUT } from '../redux/types';

class Account extends React.Component {
   constructor() {
      super();
      this.state = {
         isLoading: false,
      };
   }
   
   componentDidMount() {
		console.log('Account Screen')
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   }

   componentWillReceiveProps(nextProps) {
   }
   
   componentDidUpdate(prevProps, prevState) {
      
   }

   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
   
   render(){
      return (
         <View styl={styles.container}>
            <Loader show={this.state.isLoading} />
            <View style={styles.content}>
               <View style={styles.card1}>
                  {/* <ImageBackground source={require('../assets/images/city_img.jpg')} style={styles.imgbackgoundStyle} > */}
                     <Icon name='shield-account' color='black' size={100} />
                     <Text style={styles.name}>Pandy onotrak</Text>
                  {/* </ImageBackground> */}
               </View>
               <ScrollView showsVerticalScrollIndicator= {false}>
                  <Text style={styles.textTitle}>E-mail</Text>
                  <View style={[styles.card2, {width: '100%'}]}>
                     <Text style={styles.textStyle}>onotrak@mail.com</Text>
                  </View>
                  <Text style={styles.textTitle}>Location</Text>
                  <View style={[styles.card2, {width: '90%'}]}>
                     <Text style={styles.textStyle}>Yogyakarta D.I</Text>
                  </View>
                  <Text style={styles.textTitle}>Status In Radius 5 km</Text>
                  <View style={[styles.card2, {width: '80%', marginBottom: 10}]}>
                     <Text style={styles.textStyle}>0 Orang Dalam Pemantauan</Text>
                  </View>
                  <View style={[styles.card2, {width: '70%', marginBottom: 10}]}>
                     <Text style={styles.textStyle}>0 Pasien Dalam Pengawasan</Text>
                  </View>
                  <View style={[styles.card2, {width: '60%', marginBottom: 10}]}>
                     <Text style={styles.textStyle}>0 Positif Terkena COVID-19</Text>
                  </View>
                  <TouchableOpacity onPress={()=> this.onPressLogout()} style={styles.btnLogin}>
                     <Text style={styles.textBtn}>LOGOUT</Text>
                  </TouchableOpacity>
               </ScrollView>
            </View>
            {/* <View style={styles.viewBtn}>
            </View> */}
         </View>
      );
   }

   onPressLogout = () => {
      Alert.alert(
         'Log Out',
         'Are you sure? Logging out will remove all account data.',
         [
            {
               text: "Cancel",
               onPress: () => null,
               style: "cancel"
            },
            {
               text: "OK",
               onPress: () => {
                  this.props.dispatch({type: LOGOUT})
                  // Actions.Login()
                  Actions.reset('Login')
               }
            }
         ],
         {
            cancelable: false
         }
      );
   }

   handleBackButton = () => {
      Alert.alert(
         "Exit App",
         "Exiting the application?",
         [
            {
               text: "Cancel",
               onPress: () => null,
               style: "cancel"
            },
            {
               text: "OK",
               onPress: () => BackHandler.exitApp()
            }
         ],
         {
            cancelable: false
         }
      );
      return true;
   }

};

const mapStateToProps = ({mainReducer}) => ({
  main: mainReducer,
});

export default connect(mapStateToProps)(Account);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   content: {
      height: '100%',
      width: '100%',
      paddingHorizontal: 20,
      backgroundColor: Colors.backgrounColor
   },
   // imgbackgoundStyle: {
   //    width: '100%',
   //    // height: '100%',
   //    padding: 20,
   //    justifyContent: 'center',
   //    alignItems: 'center',
   //    resizeMode: 'stretch',
   // },
   card1: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primaryGreen1,
      marginBottom: 20,
      borderRadius: 5,
      padding: 20,
   },
   card2: {
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      backgroundColor: Colors.backgrounColor,
      // alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: Colors.primaryGreen3
   },
   name: {
      marginTop: 20,
      fontSize: normalize(20),
      fontWeight: 'bold',
      color: Colors.primaryGreen4
   },
   textStyle: {
      fontSize: normalize(13),
      color: Colors.primaryGreen4
   },
   textTitle: {
      fontSize: normalize(11),
      marginBottom: 5,
      color: Colors.primaryGreen4
   },
   viewBtn: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
   },
   textBtn: {
      fontSize: normalize(15),
      color: Colors.white
   },
   btnLogin: {
      alignItems: 'center',
      padding: 10,
      marginHorizontal: 50,
      marginVertical: 20,
      borderRadius: 10,
      backgroundColor: Colors.primaryGreen4
   },
});
