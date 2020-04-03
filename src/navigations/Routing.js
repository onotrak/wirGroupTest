import React, {Component} from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';


//screen
import Splash from '../../Splash';
import Login from '../screen/Login';
import CovidData from '../screen/CovidData';
import Article from '../screen/Article';
import MapsHome from '../screen/MapsHome';

//Tabbar
import Home from '../screen/Tabbar/Home';
import Maps from '../screen/Tabbar/Maps';
import Account from '../screen/Tabbar/Account';

//Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/colors';


const TabIcon = ({source, focused}) => {
	return (
		<Icon name={focused ? source : source+'-outline'} color={Colors.primaryGreen4} size={30} style={{marginTop: 10, marginBottom: 5}}/>
	)
};

export default class Routing extends Component {
	render(){
		return (
			<Router>
				<Scene key="root">
					<Scene key="Splash" component={Splash} initial hideNavBar/>
					<Scene key="Login" component={Login} hideNavBar/>
					<Scene key="Tabbar" tabs showLabel={true} tabBarStyle={{backgroundColor: Colors.backgroundColor}} inactiveTintColor= {Colors.primaryGreen4} activeTintColor={Colors.primaryGreen4} hideNavBar>
						<Scene key="Maps" component={Maps} title="Maps" source='shield-link-variant' icon={TabIcon} hideNavBar/>
						<Scene key="Home" component={Home} initial title="Home" source='shield-home' icon={TabIcon} hideNavBar/>
						<Scene key="Account" component={Account} title="Account" source='shield-account' icon={TabIcon} hideNavBar/>
					</Scene>
					<Scene key="CovidData" component={CovidData} hideNavBar/>
					<Scene key="Article" component={Article} hideNavBar/>
				</Scene>
			</Router>
		)
	}
}