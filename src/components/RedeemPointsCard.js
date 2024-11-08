import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors, family, size, WP } from "../utils"

const RedeemPointsCard = ({
    image,
    points,
    price,
    isRedeemed,
    isRedeemPoint,
    isPurchaseSticker,
    cbRedeem = () => console.log("hello"),
    cbPurchase = () => console.log("hello")
}) => {
    return (
        <View style={styles.redeemCardMain}>
            <View style={styles.redeemCardImgMain}>
                <Image
                    source={image}
                    style={styles.cardImg}
                />
            </View>
            {isRedeemPoint && (
                <Text style={styles.redeemText}>{points}</Text>
            )}
            {isPurchaseSticker && (
                <Text style={styles.redeemText}>${price}</Text>
            )}
            {
                isRedeemPoint && (
                    <TouchableOpacity
                        onPress={cbRedeem}
                        style={[styles.redeemPointsBtn, { backgroundColor: isRedeemed ? colors.redeemed : colors.redeemText }]}
                        disabled={isRedeemed}
                    >
                        <Text style={styles.redeemBtnText}>Redeem</Text>
                    </TouchableOpacity>
                )
            }
            {
                isPurchaseSticker && (
                    <TouchableOpacity
                        style={[styles.redeemPointsBtn, { backgroundColor: isRedeemed ? colors.redeemed : colors.redeemText }]}
                        onPress={cbPurchase}
                        disabled={isRedeemed}
                    >
                        <Text style={styles.redeemBtnText}>Purchase</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default RedeemPointsCard

const styles = StyleSheet.create({
    redeemCardMain: {
        width: WP('26%'),
    },
    redeemCardImgMain: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.redeemBorder,
        paddingVertical: WP('5%')
    },
    cardImg: {
        width: WP('17%'),
        resizeMode: 'contain',
        height: WP('17%'),
        alignSelf: 'center'
    },
    redeemText: {
        textAlign: 'center',
        color: colors.redeemText,
        fontSize: size.large,
        fontWeight: '600',
        marginTop: WP('2%'),
        fontFamily: family.ArialCE,
        fontSize: 15
    },
    redeemPointsBtn: {
        width: '90%',
        backgroundColor: colors.redeemText,
        alignSelf: 'center',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: WP('7.5'),
        marginTop: 10,
    },
    redeemBtnText: {
        color: colors.white,
        fontSize: size.xsmall,
        fontWeight: '600',
        fontFamily: family.ArialCE
    }

})