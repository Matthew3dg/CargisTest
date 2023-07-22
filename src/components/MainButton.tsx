import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type TButton = {
  text?: string;
  onPress: () => void;
  type?: 'default' | 'secondary';
  extraStyle?: ViewStyle | ViewStyle[];
  extraTextStyle?: TextStyle;
  children?: JSX.Element;
  disabled?: boolean;
  disabledUpload?: boolean;
};

const Button = ({
  text,
  onPress,
  type,
  extraStyle,
  extraTextStyle,
  disabled = false,
}: TButton) => {
  let buttonStyle = null;
  let textStyle = null;

  switch (type) {
    case 'default':
      buttonStyle = styles.default;
      textStyle = styles.defaultText;
      break;
    case 'secondary':
      buttonStyle = styles.secondary;
      textStyle = styles.secondaryText;
      break;
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, buttonStyle, extraStyle]}
      activeOpacity={0.7}
      onPress={onPress}>
      {text && (
        <Text style={[styles.text, textStyle, extraTextStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 30,
    width: '48%',
    alignSelf: 'center',
  },
  text: {
    color: '#0C48A1',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  default: {
    backgroundColor: '#0C48A1',
    color: '#ffffff',
  },
  defaultText: {
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: '#ffffff',
    borderColor: '#E9EDEF',
    color: '#0C48A1',
    borderWidth: 1,
  },
  secondaryText: {
    color: '#0C48A1',
  },
});

export default Button;
