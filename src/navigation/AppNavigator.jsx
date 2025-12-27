import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import LoginScreen from '../screens/login';
import OtpScreen from '../screens/otp';
import DashBoardScreen from '../screens/dashBoard';
import ScreenName from '../constants/ScreenName';
import * as Keychain from 'react-native-keychain';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        setInitialRoute(ScreenName.DashBoardScreen);
      } else {
        setInitialRoute(ScreenName.LoginScreen);
      }
    } catch (error) {
      setInitialRoute(ScreenName.LoginScreen);
    }
  };

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ScreenName.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={ScreenName.OtpScreen} component={OtpScreen} />
      <Stack.Screen
        name={ScreenName.DashBoardScreen}
        component={DashBoardScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
