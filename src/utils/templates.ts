import { i18n } from 'i18next';
import { ReportStatsMonthView } from '../models';

export const defaultTemplate = (i18n: i18n, stats: ReportStatsMonthView) =>
  `${i18n.t(`month-${stats?.month || 0}`)} ${stats?.year}:\n\t
  ${i18n.t('Hours')}: ${stats?.hours || 0}${
    stats?.publications
      ? `\n\t${i18n.t('Publications')}: ${stats?.publications || 0}`
      : ``
  }${stats?.videos ? `\n\t${i18n.t('Videos')}: ${stats?.videos || 0}` : ``}${
    stats?.returnVisits
      ? `\n\t${i18n.t('Return Visits')}: ${stats?.returnVisits || 0}`
      : ``
  }${
    stats?.biblieStudies
      ? `\n\t${i18n.t('Bible Studies')}: ${stats?.biblieStudies || 0}`
      : ``
  }${
    stats?.specialHours
      ? `\n\n\t${i18n.t('Notes')}:\n\t ${i18n.t('Special Hours')}: ${
          stats?.specialHours || 0
        }`
      : ``
  }
`;
