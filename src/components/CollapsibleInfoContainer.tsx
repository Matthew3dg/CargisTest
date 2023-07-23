import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Collapsible from 'react-native-collapsible';
import {hitSlop} from '../environment/constants';
import down from '../assets/images/down.png';
import up from '../assets/images/up.png';

interface CollapsibleInfoContainerProps {
  title: string;
  children: JSX.Element;
}

const CollapsibleInfoContainer = ({
  title,
  children,
}: CollapsibleInfoContainerProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsCollapsed(prev => !prev)}
        hitSlop={hitSlop}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>{title}</Text>

          <Image style={styles.arrowIcon} source={isCollapsed ? down : up} />
        </View>
      </TouchableOpacity>
      {/* @ts-ignore */}
      <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
});

export default CollapsibleInfoContainer;
