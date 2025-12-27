import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import httpServices from '../../services/httpservices';
import ScreenName from '../../constants/ScreenName';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onPressLogin = async () => {
    if (!userId || !userPassword) {
      Alert.alert('Error', 'Please enter User ID and Password');
      return;
    }

    const body = {
      userid: userId.trim(),
      password: userPassword.trim(),
    };

    try {
      setLoading(true);
      const response = await httpServices.post(
        '/login.php',
        body,
      );

      if (response.data.status) {
        navigation.navigate(ScreenName.OtpScreen, {
          userId: response?.data?.userid,
        });
      } else {
        Alert.alert('Login Failed', response.data.msg || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Please check your credentials and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue to your dashboard</Text>

        <TextInput
          value={userId}
          placeholder="User ID"
          placeholderTextColor="#9CA3AF"
          onChangeText={setUserId}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          value={userPassword}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          onChangeText={setUserPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={onPressLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Having trouble? <Text style={styles.help}>Contact Support</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
