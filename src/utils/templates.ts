import { i18n } from 'i18next';
import { ReportStatsMonth } from '../store/reports/reportsState';

export const defaultTemplate = (i18n: i18n, stats: ReportStatsMonth | null) =>
  `${i18n.t(`month-${stats?.month || 0}`)}:\n${i18n.t('Hours')}: ${
    stats?.hours || 0
  }\n${i18n.t('Publications')}: ${stats?.publications || 0}\n${i18n.t(
    'Videos'
  )}: ${stats?.videos || 0}\n${i18n.t('Return Visits')}: ${
    stats?.returnVisits || 0
  }\n${i18n.t('Bible Studies')}: ${stats?.biblieStudies || 0}\n${i18n.t(
    'Notes'
  )}:\n${i18n.t('Special Hours')} - ${stats?.specialHours || 0}
`;
