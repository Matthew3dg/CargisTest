import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type StatusLabelProps = {
  label: string;
};

const StatusLabel = ({label}: StatusLabelProps) => {
  return <Text style={styles.primary}>{label}</Text>;
};

const styles = StyleSheet.create({
  label: {
    backgroundColor: '#E6EEF8',
    color: '#296267',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 100,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 15,
  },
  primary: {
    backgroundColor: '#296267',
    color: '#fff',
  },
});

export default StatusLabel;
