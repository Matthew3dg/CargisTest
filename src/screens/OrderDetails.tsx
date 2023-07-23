import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import s from '../styles/index';
import StatusLabel from '../components/StatusLabel';
import {observer} from 'mobx-react-lite';
import orders from '../store/orders';
import goBack from '../assets/images/go-back.png';
import {hitSlop} from '../environment/constants';
import TitleContentWrapper from '../components/TitleContentWrapper';
import badgeInfo from '../assets/images/badge-info.png';
import badgeVerification from '../assets/images/badge-verification.png';
import fromIco from '../assets/images/from.png';
import eye from '../assets/images/eye.png';
import to from '../assets/images/to.png';
import showDetails from '../assets/images/show-details.png';
import phone from '../assets/images/phone.png';

import MainButton from '../components/MainButton';
import {StackParamList} from '../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CollapsibleInfoContainer from '../components/CollapsibleInfoContainer';
import {convertStatus} from '../services/helpers';

const OrderDetails = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'OrderDetails'>) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const renderHeader = () => (
    <>
      <View style={s.headerContainer}>
        {/* TODO move to separate component */}
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={hitSlop}>
          <Image
            style={{height: 14, width: 8, marginRight: 20}} // TODO to separate s
            source={goBack}
          />
        </TouchableOpacity>
        <View style={s.headerCol}>
          <View style={s.headerRow}>
            <View style={s.titleStatusRow}>
              <Text style={s.headerText}>
                Заявка №{orders.orderDetails.order_number ?? '- - -'}
              </Text>
              <StatusLabel
                label={convertStatus(orders.orderDetails.status_1c)}
              />
            </View>
          </View>
          <View style={s.headerInfoRow}>
            <View style={s.headerInfoItemContainer}>
              <Text style={s.headerInfoText}>
                От {orders.orderDetails.create_dt.split(' ')[0]}
              </Text>
            </View>
            <View style={s.headerInfoItemContainer}>
              <Image
                style={{height: 9, width: 13, marginRight: 5}} // TODO to separate s
                source={eye}
              />
              <Text style={s.headerInfoText}>
                Просмотры: {orders.orderDetails.views_count}{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={s.tabsRow}>
        {/* TODO move to separate component */}
        <View style={s.tabContainer}>
          <Text style={[s.tabText, s.tabActiveText]}>Информация</Text>
          <View style={s.activeTabUnderline}></View>
        </View>
        <View style={s.tabContainer}>
          <Text style={[s.tabText]}>Мои перевозки</Text>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={s.wrapper}>
      {renderHeader()}
      <ScrollView contentContainerStyle={s.container}>
        <CollapsibleInfoContainer title={'Календарь суточной загрузки'}>
          <Text>Календарь суточной загрузки</Text>
        </CollapsibleInfoContainer>
        <CollapsibleInfoContainer title={'Детали заявки'}>
          <>
            <TitleContentWrapper label={'Заказчик'}>
              <View style={s.companyNameRow}>
                <Text style={s.sectionText}>
                  {orders.orderDetails.shipper_company_shortname}
                </Text>
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
            {/* TODO make Collapsible*/}
            <View style={s.showDetailsRow}>
              <Text style={s.showDetailsText}>Показать контакты</Text>
              <Image
                style={s.showDetailsIco} // TODO to separate styles
                source={showDetails}
              />
            </View>
          </>
        </CollapsibleInfoContainer>
        <CollapsibleInfoContainer title={'Детали перевозки'}>
          <>
            <TitleContentWrapper label={'Маршрут перевозки'}>
              <>
                <View style={s.companyNameRow}>
                  <Image
                    style={{height: 11, width: 8, marginRight: 8}} // TODO to separate s
                    source={fromIco}
                  />
                  <Text style={s.sectionText}>
                    {orders.orderDetails.loading_address}
                  </Text>
                </View>
                <View style={s.companyNameRow}>
                  <Image
                    style={{height: 11, width: 8, marginRight: 8}} // TODO to separate s
                    source={to}
                  />
                  <Text style={s.sectionText}>
                    {orders.orderDetails.unloading_address}
                  </Text>
                </View>
              </>
            </TitleContentWrapper>
            <TitleContentWrapper label={'сроки перевозки'}>
              <Text style={s.sectionText}>
                С {orders.orderDetails.load_dt} по{' '}
                {orders.orderDetails.ending_dt ?? '?'}
              </Text>
            </TitleContentWrapper>

            <View style={s.doubleRow}>
              <TitleContentWrapper
                containerStyles={{
                  marginRight: 4,
                  flexGrow: 1,
                  flexBasis: '48%',
                }}
                label={'расстояние'}>
                <Text style={s.sectionText}>
                  {(orders.orderDetails.distance_m / 1000).toFixed()} км
                </Text>
              </TitleContentWrapper>
              <TitleContentWrapper
                containerStyles={{marginLeft: 4, flexGrow: 1, flexBasis: '48%'}}
                label={'Тариф'}>
                <Text style={s.sectionText}>
                  {orders.orderDetails.tariff_c}
                  <Text style={s.sectionSubText}> Без НДС</Text>
                </Text>
              </TitleContentWrapper>
            </View>
            <View style={s.doubleRow}>
              <TitleContentWrapper
                containerStyles={{
                  marginRight: 4,
                  flexGrow: 1,
                  flexBasis: '48%',
                }}
                label={'Груз'}>
                <Text style={s.sectionText}>
                  {orders.orderDetails.cargo_type}
                </Text>
              </TitleContentWrapper>
              <TitleContentWrapper
                containerStyles={{marginLeft: 4, flexGrow: 1, flexBasis: '48%'}}
                label={'всего к перевозке'}>
                <Text style={s.sectionText}>
                  {(orders.orderDetails.tonnage_balance_kg / 1000).toFixed()}т
                  <Text style={s.sectionSubText}>
                    {' '}
                    / из {(orders.orderDetails.tonnage_kg / 1000).toFixed()}т
                  </Text>
                </Text>
              </TitleContentWrapper>
            </View>
            <TitleContentWrapper
              containerStyles={{marginLeft: 4, flexGrow: 1, flexBasis: '48%'}}
              label={'Комментарий'}>
              <Text style={s.sectionText}>
                {orders.orderDetails.loading_desc}
              </Text>
            </TitleContentWrapper>
          </>
        </CollapsibleInfoContainer>
        <CollapsibleInfoContainer title={'Погрузка'}>
          <>
            <TitleContentWrapper label={'Грузоотправитель'}>
              <>
                <View style={s.companyNameRow}>
                  <Text style={s.sectionText}>
                    {orders.orderDetails.shipper_company_shortname}
                  </Text>
                  <Image
                    style={{height: 16, width: 16, marginRight: 8}} // TODO to separate styles
                    source={badgeVerification}
                  />
                  <Image
                    style={{height: 15, width: 13}} // TODO to separate styles
                    source={badgeInfo}
                  />
                </View>
                <Text style={s.subText}>
                  ИНН: {orders.orderDetails.shipper_inn ?? '---'}
                </Text>
              </>
            </TitleContentWrapper>
            <TitleContentWrapper label={'Ответственный представитель'}>
              <>
                <View style={s.phoneRow}>
                  <Text style={s.sectionText}>
                    {orders.orderDetails.shipper_contact ?? '- - -'}
                  </Text>

                  <Image
                    style={{height: 16, width: 16}} // TODO to separate styles
                    source={phone}
                  />
                </View>
                <Text style={s.showDetailsText}>
                  {orders.orderDetails.shipper_contact_phone ?? '- - -'}
                </Text>
              </>
            </TitleContentWrapper>
          </>
        </CollapsibleInfoContainer>
        <CollapsibleInfoContainer title={'Выгрузка'}>
          <>
            <TitleContentWrapper label={'Грузополучатель'}>
              <>
                <View style={s.companyNameRow}>
                  <Text style={s.sectionText}>
                    {orders.orderDetails.consignee ?? '- - -'}
                  </Text>
                  <Image
                    style={{height: 16, width: 16, marginRight: 8}} // TODO to separate styles
                    source={badgeVerification}
                  />
                  <Image
                    style={{height: 15, width: 13}} // TODO to separate styles
                    source={badgeInfo}
                  />
                </View>
                <Text style={s.subText}>
                  ИНН: {orders.orderDetails.consignee_inn ?? '- - -'}
                </Text>
              </>
            </TitleContentWrapper>
            <TitleContentWrapper label={'Ответственный представитель'}>
              <>
                <View style={s.phoneRow}>
                  <Text style={s.sectionText}>
                    {orders.orderDetails.consignee_contact ?? '- - -'}
                  </Text>

                  <Image
                    style={{height: 16, width: 16}} // TODO to separate styles
                    source={phone}
                  />
                </View>
                <Text style={s.showDetailsText}>
                  {orders.orderDetails.consignee_contact_phone ?? '- - -'}
                </Text>
              </>
            </TitleContentWrapper>
          </>
        </CollapsibleInfoContainer>
      </ScrollView>
      <View style={s.sendReqContainer}>
        <MainButton
          type="default"
          text="Оставить отклик"
          onPress={() => {
            Alert.alert('Отклик оставлен', 'TODO');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(OrderDetails);
