import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import Purchases, { PurchasesOffering } from 'react-native-purchases';

import { SettingsStackParamList } from './SettingsStack';
import Theme from '../../theme';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import ScreenHeader from '../../components/ScreenHeader';
import MainButton from '../../components/buttons/MainButton';
import BottomSheetModalComp from '../../components/BottomSheetModalComp';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AnimatedLottieView from 'lottie-react-native';

const IOS_API_KEY: any = process.env.EXPO_PUBLIC_REVENUEC_IOS_API;

type Props = NativeStackScreenProps<SettingsStackParamList, 'Donation'>;

const DonationScreen: React.FC<Props> = ({ navigation }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  const [purchaseProducts, setPurchaseProducts] = useState([]);
  // const [currentOffering, setCurrentOffering] =
  //   useState<PurchasesOffering | null>(null);

  useEffect(() => {
    // IOS PURCHSES
    if (Platform.OS === 'ios') {
      const setup = async () => {
        await Purchases.configure({ apiKey: IOS_API_KEY });

        // const offerings = await Purchases.getOfferings();
        // setCurrentOffering(offerings.current);

        const prods = await Purchases.getProducts(['ra_5', 'ra_10', 'ra_25']);
        setPurchaseProducts(prods);
      };

      Purchases.setDebugLogsEnabled(true);

      setup().catch(console.log);
    }
  }, []);

  const iosPurchase = async (id: string) => {
    const purchaseMade = await Purchases.purchaseProduct(id);
    // const purchaseMade = await Purchases.purchasePackage();

    if (purchaseMade?.productIdentifier) {
      // Toggle bottom sheet
      bottomSheetModalRef.current?.present();
      setTimeout(() => {
        bottomSheetModalRef.current?.close();
      }, 3300);
    }
  };

  // BOTTOM SHEET REF
  const animation = useRef(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  return (
    <ScreenSafeAreaContainer
      style={styles(theme).screenContainer}
      scrollContainer
      noBounces
      disableSafeAreaEdges={['top']}
    >
      <ScreenHeader title={t('Donations')} />

      {Platform.OS === 'android' ? (
        // ANDROID
        <View style={styles(theme).paymentContainer}>
          <MainButton
            text={t('Contribute')}
            icon="heart"
            onPress={() => navigation?.navigate('PayPal')}
            style={styles(theme).button}
            iconColor="white"
            textColor="white"
          />
        </View>
      ) : (
        // IOS
        <>
          {purchaseProducts?.length ? (
            <View style={styles(theme).paymentContainer}>
              {purchaseProducts
                .sort((a: any, b: any) => a.price - b.price)
                .map((item: any, index: number) => (
                  <TouchableOpacity
                    onPress={() => iosPurchase(item.identifier)}
                    style={[
                      styles(theme).paymentCard,
                      index !== purchaseProducts.length - 1 &&
                        styles(theme).paymentCardMb,
                    ]}
                    activeOpacity={0.5}
                    key={index}
                  >
                    <Text style={styles(theme).paymentCardText}>
                      {t('Send')}{' '}
                    </Text>
                    <Text style={styles(theme).paymentCardPrice}>
                      {item.priceString}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          ) : (
            <View style={styles(theme).loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
        </>
      )}

      <View style={styles(theme).aboutUsContainer}>
        <Text style={styles(theme).aboutUsTitle}>{t('About us')}</Text>
        <Text style={styles(theme).aboutUsText}>{t('About us text')}</Text>
      </View>

      <BottomSheetModalComp
        innerRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        bottomInset={46}
        detached={true}
        style={styles(theme).sheetContainer}
      >
        <View style={styles(theme).sheetContentContainer}>
          <AnimatedLottieView
            onLayout={() => {
              animation.current?.play();
            }}
            ref={animation}
            style={styles(theme).sheetAnimatedIcon}
            source={require('../../../assets/lottie/thankYou.json')}
          />
        </View>
      </BottomSheetModalComp>
    </ScreenSafeAreaContainer>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      backgroundColor: theme.colors.backgroundColor,
      paddingBottom: 50,
    },
    paymentContainer: {
      marginTop: 15,
      paddingHorizontal: 25,
      marginBottom: 30,
    },
    button: {
      backgroundColor: theme.colors.pinkColor,
    },

    paymentCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 25,
      paddingHorizontal: 20,
      borderRadius: 8,
      backgroundColor: theme.colors.secondaryBackgroundColor,
      borderWidth: 0.5,
      borderColor: theme.colors.secondaryTextColor,
    },
    paymentCardMb: {
      marginBottom: 25,
    },
    paymentCardText: {},
    paymentCardPrice: {
      fontWeight: 'bold',
    },

    aboutUsContainer: {
      paddingHorizontal: 25,
      paddingVertical: 35,
      backgroundColor: theme.colors.secondaryBackgroundColor,
    },
    aboutUsTitle: {
      fontSize: 28,
      lineHeight: 34,
      color: theme.colors.textColor,
      marginBottom: 22,
    },
    aboutUsText: {
      fontSize: 12,
      lineHeight: 20,
      color: theme.colors.textColor,
    },

    loadingContainer: {
      paddingVertical: 100,
    },

    // BOTTOM SHEET
    sheetContainer: {
      // add horizontal space
      marginHorizontal: 5,
    },
    sheetContentContainer: {
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sheetAnimatedIcon: {
      flexGrow: 1,
      width: 200,
      height: 200,
    },
  });

export default DonationScreen;
