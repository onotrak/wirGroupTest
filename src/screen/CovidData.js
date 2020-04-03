import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Loader from '../components/loader/Loader';
import { normalize, convertCurrency, showMessage } from '../components/helpers/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/colors';
import Shadow from '../styles/shadow';
import { mainAction } from '../redux/actions';
import { RESET_MENU } from '../redux/types';

class CovidData extends React.Component {
   constructor() {
      super();
      this.state = {
         isLoading: false,
         location: '',
         dataCorona: {
            "FID": 0,
            "Kode_Provi": 0,
            "Provinsi": "Daerah Istimewa Yogyakarta",
            "Kasus_Posi": 0,
            "Kasus_Semb": 0,
            "Kasus_Meni": 0
         },
      };
   }
   
   componentDidMount() {
      console.log('onotrak CDM', this.props)
      const {provCorona} = this.props.main
      const provDIY = 'Daerah Istimewa Yogyakarta'
      if(provCorona && provCorona.length){
         let dataCorona = provCorona.filter(x => {
            return x.attributes.Provinsi.toUpperCase().search(provDIY.toUpperCase()) !== -1
         })

         dataCorona.length && this.setState({dataCorona: dataCorona[0].attributes})
         console.log('onotrak state', dataCorona[0].attributes)
      }

      this.props.dispatch(mainAction.getCoronaProv());
      this.props.dispatch(mainAction.getCoronaStatus());
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   }

   componentWillReceiveProps(nextProps) {
      const {provCorona, provCoronaSuccess} = nextProps.main
      const provDIY = 'Daerah Istimewa Yogyakarta'
      if(provCoronaSuccess && provCorona.length){
         let dataCorona = provCorona.filter(x => {
            return x.attributes.Provinsi.toUpperCase().search(provDIY.toUpperCase()) !== -1
         })

         dataCorona.length && this.setState({dataCorona: dataCorona[0].attributes})
         console.log('onotrak state', dataCorona[0].attributes)
      }
   }
   
   componentDidUpdate(prevProps, prevState) {
      const {provCoronaSuccess, getCoronaError } = this.props.main;
      if (provCoronaSuccess, getCoronaError) {
         setTimeout(() => {
            this.props.dispatch({type: RESET_MENU});
         }, 500);
      }
   }

   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
   
   render(){
      const {dataCorona} = this.state
      console.log('onotrak hasil', dataCorona)
      return (
         <View styl={styles.container}>
            <Loader show={this.state.isLoading} />
            <View style={styles.content}>
                  <Text style={styles.textTitle}>Data COVID-19 Di</Text>
                  <Text style={styles.textTitle}>{dataCorona.Provinsi}</Text>
               <ScrollView showsVerticalScrollIndicator={false}>
               <View style={styles.viewCard}>
                  <View style={[styles.cardStyle, Shadow.shadow]}>
                     <View style={styles.card1Style}>
                        <Text style={styles.textCard1}>TOTAL POSITIF</Text>
                        <Text style={styles.textCard2}>{convertCurrency(dataCorona.Kasus_Posi)}</Text>
                        <Text style={styles.textCard1}>ORANG</Text>
                     </View>
                     <Image source={require('../assets/images/sad_emoji_img.png')} style={styles.imageEmoji} resizeMode='contain' />
                  </View>
                  <View style={[styles.cardStyle1, Shadow.shadow]}>
                     <View style={styles.card1Style}>
                        <Text style={styles.textCard1}>TOTAL SEMBUH</Text>
                        <Text style={styles.textCard2}>{convertCurrency(dataCorona.Kasus_Semb)}</Text>
                        <Text style={styles.textCard1}>ORANG</Text>
                     </View>
                     <Image source={require('../assets/images/smiling_emoji_img.png')} style={styles.imageEmoji} resizeMode='contain' />
                  </View>
                  <View style={[styles.cardStyle2, Shadow.shadow]}>
                     <View style={styles.card1Style}>
                        <Text style={styles.textCard1}>TOTAL MENINGGAL</Text>
                        <Text style={styles.textCard2}>{convertCurrency(dataCorona.Kasus_Meni)}</Text>
                        <Text style={styles.textCard1}>ORANG</Text>
                     </View>
                     <Image source={require('../assets/images/crying_emoji_img.png')} style={styles.imageEmoji} resizeMode='contain' />
                  </View>
                  <Text style={[styles.textCard1, {color: Colors.primaryGreen4, textAlign: 'center'}]}>Data di update secara berkala dari kawalcorona.com</Text>
               </View>
               <TouchableOpacity onPress={()=> this.getLocation()} style={[styles.textInputView2, Shadow.shadow]}>
                  <Text style={[styles.textCard1, {color: Colors.white, textAlign: 'center'}]}>Use Your Location</Text>
               </TouchableOpacity>
               <Text style={[styles.textCard1, {color: Colors.primaryGreen4, textAlign: 'center', marginBottom: 5}]}>OR</Text>
               <View style={[styles.textInputView, Shadow.shadow]}>
                  <TextInput 
                     style={styles.textInputStyle}
                     placeholder='Input Province Location'
                     onChangeText={(text)=> this.setState({location: text})}
                     value={this.state.location}
                  />
                  <TouchableOpacity onPress={()=> this.searchProvince()} style={styles.iconStyle} >
                     <Icon name={'map-search-outline'} size={28} color={Colors.primaryGreen2}/>
                  </TouchableOpacity>
               </View>
               </ScrollView>
            </View>
         </View>
      );
   }

   getLocation = () => {
   }

   searchProvince = async () => {
      const {location} = this.state
      const {provCorona} = this.props.main
      await this.setState({isLoading: true})
      console.log('onotrak provCorona', this.props)
      if(provCorona.length){
         let data = provCorona.filter(x => {
            return x.attributes.Provinsi.toUpperCase().search(location.toUpperCase()) !== -1
         })
         if(data.length){
            this.setState({
               dataCorona: data[0].attributes
            })
            showMessage('Province FOund!')
         }else{
            showMessage('No Province detected, Please check your Province input', 'long')
         }
      }
      setTimeout(() => {this.setState({isLoading: false})}, 1000)
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

export default connect(mapStateToProps)(CovidData);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'aqua',
      justifyContent: 'center',
      alignItems: 'center',
   },
   content: {
      // flex: 1,
      width: '100%',
      height: '100%',
      padding: 15,
      paddingBottom: 0,
      backgroundColor: Colors.backgroundColor,
   },
   textTitle: {
      color: Colors.primaryGreen4,
      textAlign: 'center',
      fontSize: normalize(17),
      fontWeight: 'bold',
      // marginBottom: 20,
   },
   viewCard: {
      marginTop: 10,
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      marginBottom: 30,
   },
   cardStyle: {
      padding: 25,
      borderRadius: 10,
      backgroundColor: Colors.positif,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      width: '80%',
      marginBottom: 20,
   },
   cardStyle1: {
      padding: 25,
      borderRadius: 10,
      backgroundColor: Colors.sembuh,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      width: '80%',
      marginBottom: 20,
   },
   cardStyle2: {
      padding: 25,
      borderRadius: 10,
      backgroundColor: Colors.meninggal,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      width: '80%',
      marginBottom: 20,
   },
   card1Style: {
   },
   textCard1: {
      color: Colors.white,
      fontSize: normalize(13),
   },
   textCard2: {
      color: Colors.white,
      fontSize: normalize(20),
      fontWeight: 'bold',
      // marginVertical: 10,
   },
   imageEmoji: {
      height: 50,
      width: 50,
   },
   textStyle: {
      fontSize: normalize(20),
      color: 'black',
   },
   textBtn: {
      fontSize: normalize(15)
   },
   btnLogin: {
      alignItems: 'center',
      padding: 10,
      margin: 15,
      backgroundColor: 'aqua'
   },
   textInputView: {
      paddingHorizontal: 10,
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      alignItems: 'center',
      backgroundColor: Colors.backgroundColor,
      borderWidth: 1,
      borderColor: Colors.primaryGreen1,
      borderRadius: 10,
   },
   textInputView2: {
      paddingVertical: 15,
      marginHorizontal: 10,
      marginBottom: 5,
      alignItems: 'center',
      backgroundColor: Colors.primaryGreen4,
      borderRadius: 10,
   },
   textInputStyle: {
      paddingHorizontal: 5,
      width: '85%'
   },
   iconStyle: {
      width: '15%',
      alignItems: 'flex-end'
   },
});
