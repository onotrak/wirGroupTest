import React, {Component} from 'react';
import { StatusBar, Image, View } from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';

//screen
import Splash from '../../Splash';
import Main from '../screen/Main';
import Login from '../screen/Login';


// const TabIcon = ({source, focused}) => {
// 	return (
// 		<View style={{flexDirection: 'column', height: 45, width: 45, justifyContent: 'center', paddingTop: 3}}>
// 			<Image source={Selected} style={{justifyContent: 'center', width: 45, height: 4, tintColor: focused ? '':'white' }} resizeMode='contain'/>
// 			<Image source={source} style={{justifyContent: 'center', width: 45, height: 30}} resizeMode='contain'/>
// 		</View>
// 	)
// };

export default class Routing extends Component {
	render(){
		return (
			<Router>
				<Scene key="root">
					<Scene key="Splash" component={Splash} initial hideNavBar/>
					<Scene key="Main" component={Main} hideNavBar/>
					<Scene key="Login" component={Login} hideNavBar/>
					{/* <Scene key="Tabbar" tabs showLabel={true} tabBarStyle={{backgroundColor:'#FFFFFF'}} inactiveTintColor= {Color.primary} activeTintColor={Color.primary} hideNavBar>
							<Scene key="Home" component={Home} title="Home" source={HomeIcon} icon={TabIcon} hideNavBar/>
							<Scene key="History" component={History} title="History" source={HistoryIcon} icon={TabIcon} hideNavBar/>
							<Scene key="Help" component={Help} title="Help" source={HelpIcon} icon={TabIcon} hideNavBar/>
							<Scene key="More" component={More} title="More" source={MoreIcon} icon={TabIcon} hideNavBar/>
					</Scene> */}
				</Scene>
			</Router>
		)
	}
}