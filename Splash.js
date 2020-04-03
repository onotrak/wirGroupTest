import React from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {mainAction} from './src/redux/actions';
import { normalize } from './src/components/helpers/helpers';
import Colors from './src/styles/colors';

class Splash extends React.Component {

	componentDidMount(){
		console.log('Splash Screen', this.props.main)
      this.props.dispatch(mainAction.getCoronaProv());
      this.props.dispatch(mainAction.getCoronaStatus());
		this.checkLogin()

	}

	checkLogin = () => {
		if(this.props.main.isLoggedin){
			const {userData} = this.props.main
			this.props.dispatch(mainAction.getArticle(1, userData.token));
			setTimeout(() => {
				Actions.reset('Tabbar')
			}, 1000)            
		} else {
			setTimeout(() => Actions.reset('Login'), 1000)
		}
	}

	render(){
		return (
			<View style={styles.container}>
					<Image source={require('./src/assets/images/coronavirus.png')} style={styles.imageStyle} />
					<Text style={styles.textStyle}>ANTIVIRUS CORONA</Text>
			</View>
		)
	}

}

const mapStateToProps = ({mainReducer}) => ({
  main: mainReducer,
});

export default connect(mapStateToProps)(Splash)

const styles = StyleSheet.create({
   container: {
		backgroundColor: Colors.backgroundColor, 
		flex: 1, 
		justifyContent:'center', 
		alignItems:'center',
   },
   imageStyle: {
		width: '700%', 
		height: 300, 
		resizeMode:'contain',
   },
   textStyle: {
		fontSize: normalize(20),
		fontWeight: 'bold',
		marginTop: 20,
		color: 'red'
   },
});