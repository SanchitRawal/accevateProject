import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import httpServices from '../../services/httpservices';
import styles from './styles';
import * as Keychain from 'react-native-keychain';
import ScreenName from '../../constants/ScreenName';

const DashBoardScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (isFocused) {
      dashBoardApi();
    }
  }, [isFocused]);

  const dashBoardApi = async () => {
    const response = await httpServices.get('/dashboard.php');
    setDashboardData(response.data);
  };

  const onLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await Keychain.resetGenericPassword();

          navigation.reset({
            index: 0,
            routes: [{ name: ScreenName.LoginScreen }],
          });
        },
      },
    ]);
  };

  const dashboard = dashboardData?.dashboard;
  const user = dashboardData?.user;

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: dashboard?.color?.dynamic_color || '#F5F5F5' },
      ]}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome 👋</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      {dashboard?.carousel?.length > 0 && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {dashboard.carousel.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.banner}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      )}

      {/* Amount Cards */}
      <View style={styles.cardRow}>
        <InfoCard
          title="Total"
          value={`₹ ${dashboard?.amount?.Total}`}
          bg="#6366F1"
        />
        <InfoCard
          title="Paid"
          value={`₹ ${dashboard?.amount?.Paid}`}
          bg="#22C55E"
        />
        <InfoCard
          title="Due"
          value={`₹ ${dashboard?.amount?.due}`}
          bg="#EF4444"
        />
      </View>

      {/* Students */}
      <View style={styles.studentCard}>
        <Text style={styles.studentTitle}>Students</Text>
        <View style={styles.studentRow}>
          <Text style={styles.studentText}>
            👦 Boys: {dashboard?.student?.Boy}
          </Text>
          <Text style={styles.studentText}>
            👧 Girls: {dashboard?.student?.Girl}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const InfoCard = ({ title, value, bg }) => {
  return (
    <View style={[styles.infoCard, { backgroundColor: bg }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
};

export default DashBoardScreen;
