import {StyleSheet, Dimensions} from 'react-native';

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
    backgroundColor: '#fff',
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
  container: {
    backgroundColor: '#F7F7F7',
    flexGrow: 1,
    padding: 16,
    paddingBottom: 210,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerCol: {},
  headerInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerInfoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerInfoText: {
    color: '#637A86',
    fontFamily: 'Inter',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
  },

  titleStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#232B2F',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    marginRight: 8,
  },
  companyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    flexWrap: 'wrap',
    color: '#232B2F',
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    marginRight: 8,
  },
  sectionSubText: {
    color: '#BBC5CB',
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  doubleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showDetailsText: {
    color: '#0C48A1',
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  showDetailsIco: {height: 5, width: 8, marginLeft: 8},
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subText: {
    color: '#637A86',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    textTransform: 'uppercase',
  },
  sendReqContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height - 90,
    height: 90,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -23,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 14,
  },
});

export default styles;
