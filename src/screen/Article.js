import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Loader from '../components/loader/Loader';
import { normalize, showMessage } from '../components/helpers/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainAction } from '../redux/actions';
import { RESET_ARTICLE, RESET_DATA_ARTICLE } from '../redux/types';
import Colors from '../styles/colors';

class Article extends React.Component {
   constructor() {
      super();
      this.state = {
         isLoading: true,
         page: 1,
         refreshing: false,
         data: []
      };
   }
   
   componentDidMount() {
      this.fetchRecords(this.state.page)
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   }

   componentWillReceiveProps(nextProps) {
      console.log('WRP', this.props.main)
      const {articleData, articleSuccess, articleError} = this.props.main
      const {data} = this.state
      setTimeout(() => {
         
      }, 2000)
      this.setState({isLoading: false, refreshing: false})
      
      if(articleSuccess){
         this.setState({data: data.concat(articleData)})
      }else(
         showMessage('Get Article Error', 'long')
      )
   }
   
   componentDidUpdate(prevProps, prevState) {
      const {articleSuccess, articleError } = this.props.main;
      if (articleSuccess, articleError) {
         setTimeout(() => {
            this.props.dispatch({type: RESET_ARTICLE});
         }, 500);
      }
   }

   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
   
   render(){
      const {data, refreshing} = this.state
      return (
         <View styl={styles.container}>
            <Loader show={this.state.isLoading} />
            <View style={styles.header}>
               <TouchableOpacity onPress={()=> this.handleBackButton()} style={styles.btnHeader}>
                  <Icon name='chevron-left' color={Colors.white} size={30} />
               </TouchableOpacity>
               <Text style={styles.textHeader}>Article Menu</Text>
            </View>
            <View style={styles.content}>
               <ScrollView 
                  style={{paddingHorizontal: 20}}
                  onMomentumScrollEnd={ ({nativeEvent}) => {
                     if(this.scrollEnd(nativeEvent)){
                        this.onScrollHandler()
                     }
                  }}
                  showsVerticalScrollIndicator={true}
               >
                  <FlatList
                     data={data}
                     renderItem={({item, index}) => (
                        <View style={styles.cardList}>
                           <View style={styles.cardList1}>
                              <Image source={{uri: item.image}} resizeMode='contain' style={styles.imgList} />
                              <View>
                                 <Text style={styles.titleList}>{item.title}</Text>
                                 <Text style={styles.titleList}>{item.category}</Text>
                              </View>
                           </View>
                           <Text style={styles.descList}>{item.description}</Text>
                        </View>
                     )}
                  />
                  {
                     refreshing &&
                     <View style={styles.actInd}>
                        <ActivityIndicator 
                           size='small'
                           color={Colors.primaryGreen4}
                        />
                     </View>
                  }
               </ScrollView>
            </View>
         </View>
      );
   }

   fetchRecords = (page) => {
      const {userData} = this.props.main
      this.props.dispatch(mainAction.getArticle(page, userData.token));
   }
   
   onScrollHandler = async () => {
      await this.setState({refreshing: true})
      this.setState({
         page: this.state.page + 1
      }, () => this.fetchRecords(this.state.page));
   }

   scrollEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
      return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - 20
   };

   handleBackButton = () => {
      // this.props.dispatch({type: RESET_DATA_ARTICLE})
      Actions.pop()
      return true;
   }

};

const mapStateToProps = ({mainReducer}) => ({
  main: mainReducer,
});

export default connect(mapStateToProps)(Article);

const styles = StyleSheet.create({
   container: {
   },
   content: {
      height: '92%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 0,
      backgroundColor: Colors.backgroundColor
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primaryGreen3,
      width: '100%',
      height: '8%',
   },
   textHeader: {
      width: '85%',
      color: Colors.white,
      textAlignVertical: 'center',
      fontSize: normalize(17),
      paddingVertical: 15
   },
   btnHeader: {
      width: '15%',
      paddingHorizontal: 15,
   },
   cardList: {
      padding: 20,
      backgroundColor: Colors.white,
      borderRadius: 3,
      marginVertical: 10,
   },
   cardList1: {
      flexDirection: 'row',
      width: '70%',
   },
   imgList: {
      width: '70%',
      height: 100,
      alignSelf: 'flex-start',
   },
   titleList: {
      fontSize: normalize(15),
      color: Colors.primaryGreen4,
      textAlign: 'center',
      marginLeft: 15,
   },
   descList: {
      fontSize: normalize(13),
      marginTop: 5,
      color: Colors.primaryGreen4,
   },
   actInd: {
      width: '100%',
      alignItems: 'center',
      paddingBottom: 15,
   },
});
