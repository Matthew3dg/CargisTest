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
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  tabContainer: {
    width: '50%',
    // flex: 1,
  },
  tabText: {
    color: '#637A86',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    paddingVertical: 10,
  },
  tabActiveText: {
    color: '#0C48A1',
  },
  activeTabUnderline: {
    height: 2,
    width: '100%',
    backgroundColor: '#0C48A1',
  },
  // ORDER DETAILS
});

export default styles;
