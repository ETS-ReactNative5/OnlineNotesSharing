import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator } from 'react-navigation-tab';
import LoginScreen from './Login'
import SignupScreen from './Signup'
import HomeScreen from './Home'

const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  Home: {screen: HomeScreen},

});
// const bottemNav = createBottomTabNavigator({
//   Login: {screen: LoginScreen},
//   Signup: {screen: SignupScreen},
//   Home: {screen: HomeScreen},
// });

const App = createAppContainer(MainNavigator);
// const App = createAppContainer(bottemNav);

export default App;
