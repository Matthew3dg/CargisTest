import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Collapsible from 'react-native-collapsible';
import {hitSlop} from '../environment/constants';
import TitleContentWrapper from './TitleContentWrapper';
import down from '../assets/images/down.png';
import up from '../assets/images/up.png';
import time from '../assets/images/time.png';
import badgeInfo from '../assets/images/badge-info.png';
import badgeVerification from '../assets/images/badge-verification.png';
import fromIco from '../assets/images/from.png';
import to from '../assets/images/to.png';
import eye from '../assets/images/eye.png';
import StatusLabel from './StatusLabel';
import MainButton from './MainButton';
import orders from '../store/orders';

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

  const onDetailsPress = (id: number) => {
    orders.getOrderDetails(id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsCollapsed(prev => !prev)}
        hitSlop={hitSlop}>
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View style={styles.titleStatusRow}>
              <Text style={styles.headerText}>Заявка №{order_number}</Text>
              <StatusLabel label={status_1c} />
            </View>

            <Image style={styles.arrowIcon} source={isCollapsed ? down : up} />
          </View>
          <View style={styles.headerInfoRow}>
            <View style={styles.headerInfoItemContainer}>
              <Text style={styles.headerInfoText}>
                От {create_dt.split(' ')[0]}
              </Text>
            </View>
            <View style={styles.headerInfoItemContainer}>
              <Image
                style={{height: 10, width: 10, marginRight: 5}} // TODO to separate styles
                source={time}
              />
              <Text style={styles.headerInfoText}>
                {load_dt} - {ending_dt ?? '?'}
              </Text>
            </View>
            <View style={styles.headerInfoItemContainer}>
              <Image
                style={{height: 9, width: 13, marginRight: 5}} // TODO to separate styles
                source={eye}
              />
              <Text style={styles.headerInfoText}>
                Просмотры: {views_count}{' '}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* @ts-ignore */}
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.divider} />
        <TitleContentWrapper label={'Заказчик'}>
          <View style={styles.companyNameRow}>
            <Text style={styles.sectionText}>{companyName}</Text>
            <Image
              style={{height: 16, width: 16, marginRight: 8}} // TODO to separate styles
              source={badgeVerification}
            />
            <Image
              style={{height: 15, width: 13}} // TODO to separate styles
              source={badgeInfo}
            />
          </View>
        </TitleContentWrapper>
        <TitleContentWrapper label={'Маршрут перевозки'}>
          <>
            <View style={styles.companyNameRow}>
              <Image
                style={{height: 11, width: 8, marginRight: 8}} // TODO to separate styles
                source={fromIco}
              />
              <Text style={styles.sectionText}>{loading_address}</Text>
            </View>
            <View style={styles.companyNameRow}>
              <Image
                style={{height: 11, width: 8, marginRight: 8}} // TODO to separate styles
                source={to}
              />
              <Text style={styles.sectionText}>{unloading_address}</Text>
            </View>
          </>
        </TitleContentWrapper>

        <View style={styles.doubleRow}>
          <TitleContentWrapper
            containerStyles={{marginRight: 4, flexGrow: 1, flexBasis: '48%'}}
            label={'расстояние'}>
            <Text style={styles.sectionText}>
              {(distance_m / 1000).toFixed()} км
            </Text>
          </TitleContentWrapper>
          <TitleContentWrapper
            containerStyles={{marginLeft: 4, flexGrow: 1, flexBasis: '48%'}}
            label={'Тариф'}>
            <Text style={styles.sectionText}>
              {tariff_c}
              <Text style={styles.sectionSubText}> Без НДС</Text>
            </Text>
          </TitleContentWrapper>
        </View>
        <View style={styles.doubleRow}>
          <TitleContentWrapper
            containerStyles={{marginRight: 4, flexGrow: 1, flexBasis: '48%'}}
            label={'Груз'}>
            <Text style={styles.sectionText}>{cargo_type}</Text>
          </TitleContentWrapper>
          <TitleContentWrapper
            containerStyles={{marginLeft: 4, flexGrow: 1, flexBasis: '48%'}}
            label={'всего к перевозке'}>
            <Text style={styles.sectionText}>
              {(tonnage_balance_kg / 1000).toFixed()}т
              <Text style={styles.sectionSubText}>
                {' '}
                / из {(tonnage_kg / 1000).toFixed()}т
              </Text>
            </Text>
          </TitleContentWrapper>
        </View>
        <View style={styles.btnsRow}>
          <MainButton
            extraStyle={{marginRight: 4}}
            text="Подробнее"
            type="secondary"
            onPress={() => onDetailsPress(id)}
          />
          <MainButton
            extraStyle={{marginLeft: 4}}
            type="default"
            text="Оставить отклик"
            onPress={() => {
              Alert.alert('Отклик оставлен', 'TODO');
            }}
          />
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
  arrowIcon: {width: 8, height: 4},
  headerText: {
    color: '#232B2F',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    marginRight: 8,
  },
  divider: {
    marginVertical: 16,
    width: '100%',
    height: 1,
    backgroundColor: '#F7F7F7',
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
  btnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CollapsibleOrderItem;
