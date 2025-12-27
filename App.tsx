import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './src/screens/login'
import AppNavigator from './src/navigation/AppNavigator'

const App = () => {
  return(
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}

export default App