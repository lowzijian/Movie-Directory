/** 
* Name : Low Zi Jian
*Reg . No . : 16UEB03295
*/

import {
  createStackNavigator, createAppContainer
} from 'react-navigation';



// import all screens from the Screens folder
import HomeScreen from './Screens/HomeScreen';
import MovieScreen from './Screens/DisplaySelectedMovieScreen';
import CreateScreen from './Screens/CreateMovieScreen';


const AppNavigator =  createStackNavigator({
  Home: {screen: HomeScreen},

  Movie:{ screen: MovieScreen},

  Add:{ screen: CreateScreen},

}, {
  initialRouteName: 'Home',
  defaultNavigationOptions:''
});

export default createAppContainer(AppNavigator);






