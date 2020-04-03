import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Loader from '../../components/loader/Loader';
import { normalize } from '../../components/helpers/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Home extends React.Component {
   constructor() {
      super();
      this.state = {
         isLoading: false,
      };
   }
   
   componentDidMount() {
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
                  ONOTRAK Starter
               </Text>
               <Icon name='shield-home' color='black' size={100} />
            </View>
            <TouchableOpacity onPress={()=> Actions.Article()} style={styles.btnLogin}>
               <Text style={styles.textBtn}>Article</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> Actions.CovidData()} style={styles.btnLogin}>
               <Text style={styles.textBtn}>Covid</Text>
            </TouchableOpacity>
         </View>
      );
   }

   onPressLogin = () => {
      Actions.Article()
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

export default connect(mapStateToProps)(Home);

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
});
