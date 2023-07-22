import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type StatusLabelProps = {
  label: string;
};

const StatusLabel = ({label}: StatusLabelProps) => {
  return <Text style={styles.label}>{label}</Text>;
};

const styles = StyleSheet.create({
  label: {
    color: '#0C48A1',
    fontFamily: 'Inter',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    backgroundColor: '#E6EEF8',
    borderRadius: 16,
    paddingHorizontal: 8,
  },
});

export default StatusLabel;
