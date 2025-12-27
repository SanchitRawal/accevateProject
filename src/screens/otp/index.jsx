import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import * as Keychain from 'react-native-keychain';
import styles from './styles';
import httpServices from '../../services/httpservices';
import ScreenName from '../../constants/ScreenName';

const OtpScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onOtpVerify = async otpValue => {
    if (otpValue.length !== 6) return;

    const body = {
      userid: route?.params?.userId?.toString().trim(),
      otp: otpValue,
    };

    try {
      setLoading(true);
      const responseOtp = await httpServices.post('/verify_otp.php', body);

      if (responseOtp.data.status) {
        await Keychain.setGenericPassword(
          'userSession',
          responseOtp.data.token,
        );
        Alert.alert('Success', 'OTP Verified Successfully');
        navigation.reset({
          index: 0,
          routes: [{ name: ScreenName.DashBoardScreen }],
        });
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      console.log('OTP Verification Error:', error);
      Alert.alert('Error', 'OTP Verification Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your mobile number
        </Text>

        <OtpInput
          numberOfDigits={6}
          focusColor="#4F46E5"
          blurOnFilled
          type="numeric"
          onFilled={onOtpVerify}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
        />

        <TouchableOpacity
          disabled={loading}
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={() => Alert.alert('Info', 'Enter OTP to verify')}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Didn’t receive the code? <Text style={styles.resend}>Resend</Text>
        </Text>
      </View>
    </View>
  );
};

export default OtpScreen;
