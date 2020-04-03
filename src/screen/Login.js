import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Loader from '../components/loader/Loader';
import LineHorizontal from '../components/line/LineHorizontal';
import { normalize, validateEmail, showMessage } from '../components/helpers/helpers';
import Colors from '../styles/colors';
import Shadow from '../styles/shadow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainAction } from '../redux/actions';
import {RESET_REGISTER, RESET_LOGIN} from '../redux/types';

class Login extends React.Component {
   
   constructor() {
      super();
      this.state = {
         isLoading: false,
         email: 'onotrak@mail.com',
         password: '111111',
         // email: '',
         // password: '',
         name: '',
         emailReg: '',
         passwordReg: '',
         passwordConfirmation: '',
         showPassword: true,
         wrongEmail: false,
         loginActive: false,
         registerActive: false,
      };
   }
   
   componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   }

   componentWillReceiveProps(nextProps) {
      const {loginSuccess, loginError, loginData, registerSuccess, registerError, registerData } = nextProps.main;
      if(registerSuccess || loginSuccess){
         if(registerSuccess){
            showMessage('Register '+registerData.status.message+'!')
            setTimeout(() => {
               showMessage('Thanks for registering '+registerData.data.name+'!')
            }, 2000)
         }
         if(loginSuccess){
            Actions.reset('Tabbar')
            showMessage('Login '+loginData.status.message+'!')
            setTimeout(() => {
               showMessage('Welcome Back '+loginData.data.user.name+'!')
            }, 2000)
         }
         this.setState({
            isLoading: false,
            loginActive: false,
            registerActive: false,
            email: '',
            password: '',
            name: '',
            emailReg: '',
            passwordReg: '',
            passwordConfirmation: '',
            showPassword: true,
         })
      }
      if(registerError || loginError){
         this.setState({isLoading: false})
         registerError && showMessage(registerData.status.message.email[0])
         loginError && showMessage(loginData.status.message)
      }
   }
   
   componentDidUpdate(prevProps, prevState) {
      const {loginSuccess, loginError, registerSuccess, registerError } = this.props.main;
      if (registerSuccess || registerError) {
         setTimeout(() => {
            this.props.dispatch({type: RESET_REGISTER});
         }, 500);
      }
      if (loginSuccess || loginError) {
         setTimeout(() => {
            this.props.dispatch({type: RESET_LOGIN});
         }, 500);
      }
   }

   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
   
   render(){
      return (
         <View styl={styles.container}>
            <Loader show={this.state.isLoading} />
            <Modal visible={this.state.loginActive} onRequestClose={()=> this.setState({loginActive: false})} animationType='slide' transparent={true}>
               <View style={styles.containerModal}>
                  <View style={[styles.loginStyle, Shadow.shadowTop]}>
                     <View style={styles.login2Style}>
                        <Text style={styles.loginText}>LOGIN</Text>
                        <LineHorizontal style={styles.line1} size={2} color={Colors.white} />
                        <View style={styles.loginStyle2}>
                           <View style={[styles.textInputView, Shadow.shadow]}>
                              <TextInput 
                                 style={styles.textInputStyle}
                                 placeholder='Email'
                                 keyboardType='email-address'
                                 onChangeText={(text)=> this.setState({email: text})}
                                 value={this.state.email}
                              />
                              <Icon name={this.state.wrongEmail ? 'account-remove-outline' : 'account-outline'} size={28} color={Colors.primaryGreen2} style={styles.iconStyle} />
                           </View>
                           <View style={[styles.textInputView, Shadow.shadow]}>
                              <TextInput 
                                 style={styles.textInputStyle}
                                 placeholder='Password'
                                 secureTextEntry={this.state.showPassword}
                                 onChangeText={(text)=> this.setState({password: text})}
                                 value={this.state.password}
                              />
                              <TouchableOpacity onPress={()=> this.setState({showPassword: !this.state.showPassword})} style={styles.iconStyle} >
                                 <Icon name={this.state.showPassword ? 'eye-outline' : 'eye-off-outline'} size={28} color={Colors.primaryGreen2}/>
                              </TouchableOpacity>
                           </View>
                           <View style={styles.textView3}>
                              <Text style={styles.text1}>Forgot password? </Text>
                              <TouchableOpacity><Text style={styles.text1}>Click here</Text></TouchableOpacity>
                           </View>
                           <TouchableOpacity onPress={()=> this.onPressLogin()} style={[styles.btnRegister, Shadow.shadow, {alignSelf: 'center'}]}>
                              <Text style={[styles.textBtn, {color: Colors.primaryGreen2}]}>LOGIN</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                     <View style={styles.botCard}>
                        <Text style={styles.text2}>Don't have an account ? Click Register</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={()=> this.setState({registerActive: true, loginActive: false})} style={[styles.registerBotStyle, Shadow.shadowTop]}>
                           <Text style={[styles.loginText, {color: Colors.primaryGreen2}]}>REGISTER</Text>
                           <LineHorizontal style={styles.line1} size={2} color={Colors.primaryGreen2} />
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            </Modal>

            <Modal visible={this.state.registerActive} onRequestClose={()=> this.setState({registerActive: false})} animationType='slide' transparent={true}>
               <View style={styles.containerModal}>
                  <View style={[styles.loginStyle, Shadow.shadowTop, {backgroundColor: Colors.white, height: '85%'}]}>
                     <View style={styles.login2Style}>
                        <Text style={[styles.loginText, {color: Colors.primaryGreen2}]}>REGISTER</Text>
                        <LineHorizontal style={styles.line1} size={2} color={Colors.primaryGreen2} />
                        <View style={styles.loginStyle2}>
                           <View style={[styles.textInputView2, Shadow.shadow, {width: '100%'}]}>
                              <TextInput 
                                 style={styles.textInputStyle}
                                 placeholder='Full Name'
                                 onChangeText={(text)=> this.setState({name: text})}
                                 value={this.state.name}
                              />
                           </View>
                           <View style={[styles.textInputView2, Shadow.shadow, {width: '100%'}]}>
                              <TextInput 
                                 style={styles.textInputStyle}
                                 placeholder='Email'
                                 keyboardType='email-address'
                                 onChangeText={(text)=> this.setState({emailReg: text})}
                                 value={this.state.emailReg}
                              />
                           </View>
                           <View style={[styles.textInputView2, Shadow.shadow, {width: '100%'}]}>
                              <TextInput 
                                 style={styles.textInputStyle}
                                 placeholder='Password'
                                 secureTextEntry={true}
                                 onChangeText={(text)=> this.setState({passwordReg: text})}
                                 value={this.state.passwordReg}
                              />
                           </View>
                           <View style={[styles.textInputView2, Shadow.shadow, {width: '100%'}]}>
                              <TextInput 
                                 style={styles.textInputStyle}
                                 placeholder='Password Confirmation'
                                 secureTextEntry={true}
                                 onChangeText={(text)=> this.setState({passwordConfirmation: text})}
                                 value={this.state.passwordConfirmation}
                              />
                           </View>
                           <TouchableOpacity onPress={()=> this.onPressRegister()} style={[styles.btnRegister2, Shadow.shadow, {alignSelf: 'center'}]}>
                              <Text style={[styles.textBtn, {color: Colors.white}]}>REGISTER</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                     <View style={styles.botCard}>
                        <Text style={[styles.text2, { color: Colors.primaryGreen2}]}>Already has an account ? Click Login</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={()=> this.setState({loginActive: true, registerActive: false})} style={[styles.loginBotStyle, Shadow.shadowTop]}>
                           <Text style={[styles.loginText, {color: Colors.white}]}>LOGIN</Text>
                           <LineHorizontal style={styles.line1} size={2} color={Colors.white} />
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            </Modal>

            <View style={styles.content}>
               <View style={styles.card1}>
                  <ImageBackground source={require('../assets/images/yogyakarta_img.jpg')} style={styles.image}>
                     <View style={styles.cardImg}>
                        {/* <Text style={[styles.titleText, {width: '100%'}]}>Welcome!  </Text> */}
                        <Text style={[styles.titleText, {width: '100%'}]}>Check Status  </Text>
                        <Text style={[styles.titleText, {width: '95%'}]}>Your Location  </Text>
                        <Text style={[styles.titleText, {width: '90%'}]}>On Aplication  </Text>
                        <Text style={[styles.titleText, {width: '85%', paddingVertical: 10, textAlign: 'center'}]}>ANTIVIRUS CORONA</Text>
                     </View>
                     {/* <View style={styles.title1}>
                        <LineHorizontal size={3} style={{width: '85%', alignSelf: 'flex-end'}} color={Colors.primaryGreen1} />
                        <LineHorizontal size={3} style={{width: '85%', alignSelf: 'flex-end'}} color={Colors.primaryGreen1} />
                        <Text style={styles.title1Text}>Welcome!</Text>
                     </View> */}
                  </ImageBackground>
               </View>
               
               {/* account-remove-outline account-check-outline eye-off-outline eye-outline */}

               <View style={styles.card2}>
                  <TouchableOpacity onPress={()=> this.setState({registerActive: true})} style={[styles.btnRegister, Shadow.shadow]}>
                     <Text style={[styles.textBtn, {color: Colors.primaryGreen4}]}>REGISTER</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.setState({loginActive: true})} style={styles.btnLogin}>
                     <Text style={styles.textBtn}>LOGIN</Text>
                  </TouchableOpacity>
               </View>

            </View>
         </View>
      );
   }

   onPressLogin = async () => {
      const {
         email,
         password,
      } = this.state;
      const {dispatch} = this.props;

      if (!email || !password) {
         return alert('Email and Password is required!');
      }
      if (!validateEmail(email)) return alert('Format email is no valid');

      const params = {
         email: email,
         password: password,
      };

      await this.setState({isLoading: true});
      dispatch(mainAction.loginProcess(params));
   }

   onPressRegister = async () => {
      const {
         name,
         emailReg,
         passwordReg,
         passwordConfirmation,
      } = this.state;
      const {dispatch} = this.props;

      if (!name || !emailReg || !passwordReg || !passwordConfirmation) {
         return alert('All field is required!');
      }
      if (!validateEmail(emailReg)) return alert('Format email is no valid');

      const params = {
         name,
         email: emailReg,
         password: passwordReg,
         c_password: passwordConfirmation,
      };

      await this.setState({isLoading: true});
      dispatch(mainAction.registerProcess(params));
   }

   handleBackButton = () => {
      if(this.state.loginActive || this.state.registerActive){
         return this.setState({loginActive: false, registerActive: false})
      }
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

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   containerModal: {
     backgroundColor: Colors.transparent,
     width: '100%',
     height: '100%',
   },
   content: {
      height: '100%',
      width: '100%',
      backgroundColor: Colors.primaryGreen2,
   },
   card1: {
      borderBottomLeftRadius: 130,
      // flex: 1,
      flex: 0.45,
      overflow: 'hidden'
   },
   card2: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 130,
      // flex: 0.1,
      flex: 0.6,
   },
   image: {
      height: '100%',
      width: '100%',
      resizeMode: "contain",
      justifyContent: "center",
      borderBottomLeftRadius: 50,
   },
   cardImg: {
      padding: 40,
      flex: 1,
      // backgroundColor: Colors.primaryGreen1,
      // opacity: 0.3,
   },
   titleText: {
      borderRadius: 5,
      alignSelf: 'flex-end',
      fontSize: normalize(20),
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'right',
      marginBottom: 10,
      backgroundColor: Colors.primaryGreen1,
      opacity: 0.6,
   },
   title1Text: {
      color: Colors.primaryGreen1,
      fontSize: normalize(30),
      fontWeight: 'bold',
      textAlign: 'center',
      // opacity: 0.8,
   },
   textStyle: {
      fontSize: normalize(15),
      color: 'black',
   },
   textBtn: {
      color: Colors.white,
      fontSize: normalize(13)
   },
   btnRegister: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: Colors.white,
      borderRadius: 3,
      width: '60%',
      marginBottom: 15
   },
   btnRegister2: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: Colors.primaryGreen2,
      borderRadius: 3,
      width: '60%',
      marginBottom: 15
   },
   btnLogin: {
      alignItems: 'center',
      padding: 10,
      width: '60%',
      borderRadius: 3,
      borderWidth: 1,
      borderColor: Colors.white
   },

   //login
   loginStyle: {
      flex: 1,
      width: '100%',
      height: '70%',
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 70,
      borderTopRightRadius: 70,
      backgroundColor: Colors.primaryGreen2,
      justifyContent: 'space-between'
   },
   login2Style: {
      paddingHorizontal: 40,
      paddingTop: 20,
   },
   loginStyle2: {
      padding: 10,
   },
   loginText: {
      color: Colors.white,
      marginBottom: 10,
      textAlign: 'center',
      fontSize: normalize(20)
   },
   line1: {
      marginBottom: 20,
   },
   textInputView: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      alignItems: 'center',
      backgroundColor: Colors.white,
      borderRadius: 10,
   },
   textInputView2: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      alignItems: 'center',
      backgroundColor: Colors.backgroundColor,
      borderRadius: 10,
   },
   textInputStyle: {
      paddingHorizontal: 5,
      width: '85%'
   },
   iconStyle: {
      width: '15%'
   },
   text1: {
      textAlign: 'right',
      fontSize: normalize(12),
      marginBottom: 20,
      color: Colors.white
   },
   text2: {
      textAlign: 'center',
      textAlignVertical: 'bottom',
      marginBottom: 5,
      fontSize: normalize(12),
      color: Colors.white
   },
   textView3: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
   },
   registerBotStyle: {
      paddingHorizontal: 40,
      paddingTop: 20,
      borderTopLeftRadius: 70,
      borderTopRightRadius: 70,
      zIndex: 99,
      backgroundColor: Colors.white,
   },
   loginBotStyle: {
      paddingHorizontal: 40,
      paddingTop: 20,
      borderTopLeftRadius: 70,
      borderTopRightRadius: 70,
      zIndex: 99,
      backgroundColor: Colors.primaryGreen2,
   },
   botCard: {
      // position: 'absolute',
      // bottom: 0,
      width: '100%',
   },
});
