import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ASSETS_URL} from '../config/WebService';
import {colors} from '../utils';

const Img = ({src, local, style, resizeMode, tintColor}) => {
  const [load, setLoad] = useState(false);
  return (
    <View>
      <FastImage
        onLoadStart={() => setLoad(true)}
        onLoadEnd={() => setLoad(false)}
        style={style}
        source={
          local
            ? src
            : {
                uri: ASSETS_URL + src,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.web,
              }
        }
        tintColor={tintColor && tintColor}
        resizeMode={resizeMode}
      />
      {load ? (
        <View
          style={{
            ...style,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.lightGray,
          }}>
          <ActivityIndicator color={colors.primary} size="small" />
        </View>
      ) : null}
    </View>
  );
};

export default Img;
