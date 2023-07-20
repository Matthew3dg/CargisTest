import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// COMPONENTS
import Collapsible from 'react-native-collapsible';
import {hitSlop} from '../environment/constants';

import down from '../assets/images/down.png';
import up from '../assets/images/up.png';
import TitleContentWrapper from './TitleContentWrapper';

interface CollapsibleOrderItemProps {
  id: number;
  order_number: number;
  views_count: number;
  create_dt: string;
  load_dt: string;
  ending_dt: string;
  loading_address: string;
  unloading_address: string;
  distance_m: number;
  cargo_type: string;
  tonnage_balance_kg: number;
  tonnage_kg: number;
  tariff_c: number;
  tariff_nds_c: number;
  status_1c: string;
  companyName: string;
}

const CollapsibleOrderItem = ({
  cargo_type,
  companyName,
  create_dt,
  distance_m,
  ending_dt,
  id,
  load_dt,
  loading_address,
  order_number,
  status_1c,
  tariff_c,
  tariff_nds_c,
  tonnage_balance_kg,
  tonnage_kg,
  unloading_address,
  views_count,
}: CollapsibleOrderItemProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsCollapsed(prev => !prev)}
        hitSlop={hitSlop}>
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View style={styles.titleStatusRow}>
              <Text style={styles.headerText}>Заявка №{order_number}</Text>
            </View>

            <Image style={styles.arrowIcon} source={isCollapsed ? down : up} />
          </View>
          <View style={styles.headerInfoRow}>
            <Text>dfdfgd </Text>
            <Text>dfdfgd </Text>
            <Text>dfdfgd </Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* @ts-ignore */}
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.divider} />
        <TitleContentWrapper label={'Заказчик'}>
          <Text>{companyName}</Text>
        </TitleContentWrapper>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    minWidth: '100%',
    marginBottom: 16,
  },
  collapsible: {
    minWidth: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 22,
    borderRadius: 12,
  },
  headerContainer: {},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // marginBottom: 16,
  },
  titleStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {width: 8, height: 4},
  headerText: {
    color: '#232B2F',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  divider: {
    marginVertical: 16,
    width: '100%',
    height: 1,
    backgroundColor: '#F7F7F7',
  },
  bold: {},
  text: {
    // fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
  },
  btnContainer: {marginTop: 16, flex: 0},
});

export default CollapsibleOrderItem;
