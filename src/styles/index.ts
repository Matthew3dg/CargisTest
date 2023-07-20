import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // COMMON
  wrapper: {
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  // ORDERS LIST
  title: {
    color: '#232B2F',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  listContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F7F7F7',
  },

  // ORDER DETAILS
});

export default styles;
