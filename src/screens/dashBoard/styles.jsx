import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    padding: 20,
  },
  welcome: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },

  carousel: {
    marginTop: 10,
  },
  banner: {
    width: width - 40,
    height: 160,
    marginHorizontal: 20,
    borderRadius: 14,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infoCard: {
    width: '30%',
    borderRadius: 14,
    padding: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  cardValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },

  studentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
  },
  studentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  studentText: {
    fontSize: 15,
    color: '#444',
  },
});

export default styles;
