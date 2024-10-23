import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {colors, family} from '../utils';

const CustomText = ({
  text = '',
  size = 16,
  style = {},
  // font = '',
  onPress = undefined,
  color,
  expandable = false,
  intialLength = 100,
  numberOfLines,
  textDecorationLine,
}) => {
  const [textData, setTextData] = useState(text);

  useEffect(() => {
    if (expandable && text.length >= intialLength) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  }, [text]);

  const toggleExpandable = () => {
    if (textData.length == text.length) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  };

  const actionBtnLable =
    textData.length == text.length ? 'Show Less' : 'See more';
  return (
    <Text
      onPress={onPress ?? undefined}
      style={{
        fontSize: size,
        color: color ?? colors.txt1,
        // fontFamily: font,
        textDecorationLine: textDecorationLine,
        ...style,
      }}
      numberOfLines={numberOfLines}>
      {textData}
      {expandable && text.length >= intialLength ? '  ' : ''}
      {expandable && text.length >= intialLength && (
        <Text
          onPress={toggleExpandable}
          style={{
            color: colors.notification,
            textDecorationLine: 'underline',
            // fontFamily: font,
          }}>
          {actionBtnLable}
        </Text>
      )}
    </Text>
  );
};

export default CustomText;
