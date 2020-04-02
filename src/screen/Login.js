import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Loader from '../components/loader/Loader';
import { normalize } from '../components/helpers/helpers';

class Login extends React.Component {
   
   constructor() {
      super();
      this.state = {
         isLoading: false,
      };
   }
   
   componentDidMount() {
		console.log('Login Screen')
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
               <Text style={styles.textStyle}>
                  Welcome
               </Text>
               <Text style={styles.textStyle}>
                  Login Screen
               </Text>
            </View>
            <TouchableOpacity onPress={()=> this.onPressLogin()} style={styles.btnLogin}>
               <Text style={styles.textBtn}>MAIN</Text>
            </TouchableOpacity>
         </View>
      );
   }

   onPressLogin = () => {
      this.setState({isLoading: true})
      setTimeout(() => {
         this.setState({isLoading: false})
         Actions.Main()
      }, 2000)
   }

   handleBackButton = () => {
      Actions.pop()
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
      backgroundColor: 'aqua',
      justifyContent: 'center',
      alignItems: 'center',
   },
   content: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   },
   textStyle: {
      fontSize: normalize(15),
      color: 'black',
   },
   textBtn: {
      fontSize: normalize(15)
   },
   btnLogin: {
      alignItems: 'center',
      padding: 10,
      margin: 15,
      backgroundColor: 'aqua',
      borderRadius: 10,
   },
});
