import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';

type SearchLabelProps = {
  isActive?: boolean;
  setActive: () => void;
  label: string;
  onPress: () => void;
};

const SearchLabel = ({
  label,
  isActive = false,
  setActive,
  onPress,
}: SearchLabelProps) => {
  return (
    <TouchableOpacity
      style={{flex: 0, alignSelf: 'flex-start'}}
      onPress={() => {
        setActive();
        onPress();
      }}>
      <Text style={[styles.label, isActive && styles.active]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    flex: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E9EDEF',
    borderStyle: 'solid',
    borderRadius: 100,
    color: '#637A86',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
  },
  active: {
    borderColor: '#0C48A1',
    color: '#0C48A1',
  },
});

export default SearchLabel;
