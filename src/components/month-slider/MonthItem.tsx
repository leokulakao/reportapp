import { NavigationProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { StyleSheet, Text, View, Share, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../theme';
import { useTranslation } from 'react-i18next';
import { defaultTemplate } from '../../utils/templates';
import { ReportRoundedState, ReportStatsMonthView } from '../../models';
import { doRoundRemainingHours } from '../../store/reports/reportsService';
import { useDispatch } from 'react-redux';

type Props = {
  year: number;
  month: number;
  navigation?: NavigationProp<any, any>;
  stats: ReportStatsMonthView | null;
};

const MonthItem: React.FC<Props> = (props) => {
  const { year, month, navigation, stats } = props;
  const theme = useTheme<Theme>();
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation();

  const [canShareReport, setCanShareReport] = useState<boolean>(false);

  const onPressToMonthNavigate = (month: number) =>
    navigation?.navigate('MonthReport', {
      year: year,
      month: month,
      initialDate:
        new Date().getMonth() === month ? new Date() : new Date(year, month, 1),
    });

  const roundMinutes = (
    state: ReportRoundedState.ROUNDED_UP | ReportRoundedState.ROUNDED_DOWN
  ) => {
    if (stats) {
      doRoundRemainingHours(dispatch, {
        year: year,
        month: month,
        reportRounded: stats?.reportRounded,
        minutesPassed: stats?.minutesPassed,
        spetialMinutesPassed: stats?.spetialMinutesPassed,
        reportRoundedState: state,
      });
      setCanShareReport(true);
      // setTimeout(() => shareReport(), 1000);
    }
  };

  const shareReport = useCallback(() => {
    if (stats) {
      Share.share({
        message: defaultTemplate(i18n, stats),
      })
        //after successful share return result
        .then((result) => console.log(result))
        //If any thing goes wrong it comes here
        .catch((errorMsg) => console.log(errorMsg));
    }
  }, [stats, i18n]);

  const shareAlert = () => {
    if (stats) {
      console.log(stats);
      if (stats.minutes || stats.specialMinutes) {
        Alert.alert(
          i18n.t('Rounding minutes'),
          i18n.t('Do you want to round the minutes?') ||
            'Do you want to round the minutes?',
          [
            {
              text: i18n.t('Round up') || 'Round up',
              onPress: () => {
                roundMinutes(ReportRoundedState.ROUNDED_UP);
              },
            },
            {
              text: i18n.t('Round down') || '',
              onPress: () => {
                roundMinutes(ReportRoundedState.ROUNDED_DOWN);
              },
            },
            {
              text: i18n.t('Cancel') || '',
              onPress: () => shareReport(),
              style: 'cancel',
            },
          ]
        );
      } else {
        shareReport();
      }
    }
  };

  useEffect(() => {
    if (stats && canShareReport) {
      shareReport();
      setCanShareReport(false);
    }
  }, [stats, canShareReport, shareReport]);

  return (
    <View style={styles(theme).item}>
      <TouchableOpacity
        style={styles(theme).mainPress}
        onPress={() => onPressToMonthNavigate(month)}
      >
        <Text style={styles(theme).title}>{t(`month-${month}`)}</Text>
        <View style={styles(theme).statsSection}>
          <View style={styles(theme).statContainer}>
            <Icon
              name="stopwatch-outline"
              size={22}
              color={theme.colors.textColor}
            />
            <Text style={styles(theme).statTitle}>{t('Hours')}</Text>
            <Text style={styles(theme).statValue}>
              {stats?.hours || 0}
              {`${t('h')}`}
              {stats?.minutes && stats?.minutes > 0
                ? ` ${stats?.minutes}${t('m')}`
                : ''}
            </Text>
          </View>
          <View style={styles(theme).statContainer}>
            <Icon
              name="library-outline"
              size={22}
              color={theme.colors.textColor}
            />
            <Text style={styles(theme).statTitle}>{t('Publications')}</Text>
            <Text style={styles(theme).statValue}>
              {stats?.publications || 0}
            </Text>
          </View>
          <View style={styles(theme).statContainer}>
            <Icon
              name="play-outline"
              size={22}
              color={theme.colors.textColor}
            />
            <Text style={styles(theme).statTitle}>{t('Videos')}</Text>
            <Text style={styles(theme).statValue}>{stats?.videos || 0}</Text>
          </View>
          <View style={styles(theme).statContainer}>
            <Icon
              name="chatbubbles-outline"
              size={22}
              color={theme.colors.textColor}
            />
            <Text style={styles(theme).statTitle}>{t('Return Visits')}</Text>
            <Text style={styles(theme).statValue}>
              {stats?.returnVisits || 0}
            </Text>
          </View>
          <View style={styles(theme).statContainer}>
            <Icon
              name="people-outline"
              size={22}
              color={theme.colors.textColor}
            />
            <Text style={styles(theme).statTitle}>{t('Bible Studies')}</Text>
            <Text style={styles(theme).statValue}>
              {stats?.biblieStudies || 0}
            </Text>
          </View>
          <View style={styles(theme).statContainer}>
            <Icon
              name="stopwatch-outline"
              size={22}
              color={theme.colors.textColor}
            />
            <Text style={styles(theme).statTitle}>{t('Special Hours')}</Text>
            <Text style={styles(theme).statValue}>
              {stats?.specialHours || 0}
              {`${t('h')}`}
              {stats?.specialMinutes && stats?.specialMinutes > 0
                ? ` ${stats?.specialMinutes}${t('m')}`
                : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles(theme).buttonShare,
          !stats && styles(theme).buttonShareDiseabled,
        ]}
        disabled={!stats}
        onPress={() => shareAlert()}
      >
        <Icon name="share-outline" size={22} color={theme.colors.textColor} />
        <Text style={styles(theme).buttonShareText}>{t('Send Report')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MonthItem;

const styles = (theme: Theme) =>
  StyleSheet.create({
    mainPress: {
      flex: 1,
    },
    item: {
      flex: 1,
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
      marginLeft: '2.5%',
      marginRight: '2.5%',
      backgroundColor: theme.colors.backgroundColor,
    },
    title: {
      fontSize: 38,
      paddingVertical: 20,
      color: theme.colors.textColor,
    },
    statsSection: {
      paddingVertical: 15,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.secondaryBackgroundColor,
    },
    statContainer: {
      paddingTop: 4,
      paddingBottom: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    statTitle: {
      flex: 1,
      paddingLeft: 15,
      fontSize: 14,
      lineHeight: 18,
      color: theme.colors.textColor,
    },
    statValue: {
      flex: 1,
      paddingLeft: 5,
      textAlign: 'right',
      fontSize: 14,
      lineHeight: 18,
      color: theme.colors.textColor,
    },
    buttonShare: {
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonShareText: {
      flex: 1,
      paddingLeft: 15,
      fontSize: 14,
      color: theme.colors.textColor,
    },
    buttonShareDiseabled: {
      opacity: 0.6,
    },
  });
