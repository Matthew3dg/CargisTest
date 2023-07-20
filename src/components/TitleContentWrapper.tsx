import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';

type TitleContentWrapperProps = {
  label: string;
  children: React.JSX.Element;
};

const TitleContentWrapper = ({label, children}: TitleContentWrapperProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7F7F7',
    borderRadius: 5,
  },

  label: {
    color: '#637A86',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    textTransform: 'uppercase',
    opacity: 0.699,
  },
});

export default TitleContentWrapper;
