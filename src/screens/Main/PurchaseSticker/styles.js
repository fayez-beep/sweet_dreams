import {StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {colors, HP, WP, size} from '../../../utils';

const styles = StyleSheet.create({
    redeemScroll:{
        width: WP('100%'),
    },
    redeemMain:{
        width : WP('90%'),
        alignSelf:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        paddingBottom: HP('5%')
    },
    listContainer:{
        margin:'2%'
    }

})

export default styles;