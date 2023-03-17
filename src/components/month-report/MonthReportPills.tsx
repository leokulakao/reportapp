import { useTheme } from '@shopify/restyle';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ReportsByDaysView } from '../../models';
import Theme from '../../theme';
import Pill from '../Pill';
import i18n from '../../../localization';

type Props = {
  reports: ReportsByDaysView;
};

const MonthReportPills: React.FC<Props> = (props) => {
  const { reports } = props;
  const theme = useTheme<Theme>();

  const pillHoursMinutesTmpl = `${
    reports.statsDay.hours
      ? reports.statsDay.hours +
        i18n.t('h') +
        (reports.statsDay.minutes ||
        reports.statsDay.specialHours ||
        reports.statsDay.specialMinutes
          ? ' '
          : '')
      : ''
  }${reports.statsDay.minutes ? reports.statsDay.minutes + i18n.t('m') : ''}${
    reports.statsDay.specialHours || reports.statsDay.specialMinutes
      ? '(Special:' +
        `${
          reports.statsDay.specialHours
            ? ' ' + reports.statsDay.specialHours + i18n.t('h')
            : ''
        }${
          reports.statsDay.specialMinutes
            ? ' ' + reports.statsDay.specialMinutes + i18n.t('m')
            : ''
        })`
      : ''
  }`;

  const pillPublicationsTmpl = `${
    reports.statsDay.publications ? reports.statsDay.publications : ''
  }`;

  const pillVideosTmpl = `${
    reports.statsDay.videos ? reports.statsDay.videos : ''
  }`;

  const pillReturnVisitsTmpl = `${
    reports.statsDay.returnVisits ? reports.statsDay.returnVisits : ''
  }`;

  const pillBibleStudies = `${
    reports.statsDay.biblieStudies ? reports.statsDay.biblieStudies : ''
  }`;

  return (
    <View style={styles(theme).pills}>
      <Pill
        text={reports.day + ''}
        color={theme.colors.backgroundColor}
        textColor={theme.colors.secondaryTextColor}
        border={false}
      />
      {pillHoursMinutesTmpl ? (
        <Pill text={pillHoursMinutesTmpl} icon={'time-outline'} />
      ) : null}
      {pillPublicationsTmpl ? (
        <Pill text={pillPublicationsTmpl} icon={'library-outline'} />
      ) : null}
      {pillVideosTmpl ? (
        <Pill text={pillVideosTmpl} icon={'play-outline'} />
      ) : null}
      {pillReturnVisitsTmpl ? (
        <Pill text={pillReturnVisitsTmpl} icon={'chatbubbles-outline'} />
      ) : null}
      {pillBibleStudies ? (
        <Pill text={pillBibleStudies} icon={'people-outline'} />
      ) : null}
    </View>
  );
};

export default MonthReportPills;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 10,
    },
    pills: {
      // justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      // paddingTop: 10,
      // paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    titleText: {
      justifyContent: 'center',
      fontSize: 14,
      color: theme.colors.secondaryTextColor,
    },
    item: {
      flexDirection: 'row',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: theme.colors.cardItemColor,
    },
    actionContainer: {
      marginLeft: 'auto',
    },
    itemText: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.textColor,
    },
  });
