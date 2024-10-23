import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {appIcons} from '../assets';
import Shadows from '../helpers/Shadows';
import {colors, size, family} from '../utils';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
const Search = ({
  onChangeText = () => {},
  onSearch = () => {},
  containerStyle,
}) => {
  const [search, setSearch] = React.useState('');
  const {t} = useTranslation();
  useFocusEffect(
    React.useCallback(() => {
      setSearch('');
    }, []),
  );

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <TextInput
        onChangeText={text => {
          setSearch(text);
          onChangeText(text);
        }}
        returnKeyType={'search'}
        placeholder={t('str_Search')}
        value={search}
        placeholderTextColor={colors.gray}
        style={{
          flex: 1,
          color: colors.black,
          fontSize: size.xsmall,
          fontFamily: family?.ArialCE,
        }}
        maxLength={20}
      />
      <TouchableOpacity onPress={() => onSearch(search)}>
        <Image
          source={appIcons.search}
          style={{height: 20, width: 20, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    height: 50,
    marginTop: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 30,
    ...Shadows.shadow3,
    margin: 3,
  },
});
