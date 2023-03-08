import { createSelector } from '@reduxjs/toolkit';
import {
  Backup,
  MinutesPassedAlert,
  ReportRounded,
  ReportsByDaysView,
  ReportsByMonthView,
  ReportStatsYearView,
} from '../../models/reportTypes';
import { RootState } from '../rootState';

const data = (state: RootState) => state.reports.data;

export const selectReportsByMonthView = (year: number, month: number) =>
  createSelector(data, (_) => {
    const _data = _;
    const result: ReportsByMonthView = {
      year: year,
      month: month,
      minutesPassed: _data.years[year]?.months[month]?.minutesPassed || 0,
      reportRounded:
        _data.years[year]?.months[month]?.reportRounded || ReportRounded.NONE,
      reportsByDays: [],
    };
    // console.log(_reports);
    if (_data.years[year]?.months[month]?.reports.length > 0) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let i = 0; i < daysInMonth; i++) {
        const day = i + 1;
        const start = new Date(year, month, day);
        const end = new Date(year, month, day + 1);
        const r = _data.years[year]?.months[month].reports
          // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .filter((elem) => {
            const d = new Date(elem.date);
            return (
              d.getTime() >= start.getTime() && d.getTime() < end.getTime()
            );
          });
        if (r.length > 0) {
          const _reportByDays: ReportsByDaysView = {
            year: year,
            month: month,
            day: day,
            start: start.toISOString(),
            end: end.toISOString(),
            reports: r,
          };
          result.reportsByDays.push(_reportByDays);
        }
      }
    }
    return result;
  });

export const selectMinutesPassedAlert = (year: number, month: number) =>
  createSelector(data, (_) => {
    const _data = _;
    const result: MinutesPassedAlert = {
      minutesPassed: _data.years[year]?.months[month]?.minutesPassed || 0,
      reportRounded:
        _data.years[year]?.months[month]?.reportRounded || ReportRounded.NONE,
    };
    return result;
  });

export const selectStatsReportsByYear = (year: number) =>
  createSelector(data, (_) => {
    const _data = _;
    const result: ReportStatsYearView = {
      year: year,
      statsMonths: [],
    };

    const monthsStr: string[] = Object.keys(
      _data.years[year] ? _data.years[year]?.months : {}
    );

    monthsStr.forEach((month: string) => {
      const currentMonth = _data.years[year].months[+month];
      const _r = currentMonth.reports;

      if (_r.length > 0) {
        let statHours: number = 0;
        let statMinutes: number = 0;
        let statPublications: number = 0;
        let statVideos: number = 0;
        let statReturnVisits: number = 0;
        let statBibleStudies: number = 0;
        let statSpecialHours: number = 0;
        let statSpecialMinutes: number = 0;
        _r.forEach((elem) => {
          statHours = statHours + elem.hours;
          statMinutes = statMinutes + elem.minutes;
          statPublications = statPublications + elem.publications;
          statVideos = statVideos + elem.videos;
          statReturnVisits = statReturnVisits + elem.returnVisits;

          if (elem.bibleStudies > statBibleStudies) {
            statBibleStudies = elem.bibleStudies;
          }

          statSpecialHours = statSpecialHours + elem.specialHours;
          statSpecialMinutes = statSpecialMinutes + elem.specialMinutes;
        });

        if (statMinutes >= 60) {
          statHours = statHours + Math.trunc(statMinutes / 60);
          statMinutes = statMinutes - Math.trunc(statMinutes / 60) * 60;
        }

        if (statSpecialMinutes >= 60) {
          statSpecialHours =
            statSpecialHours + Math.trunc(statSpecialMinutes / 60);
          statSpecialMinutes =
            statSpecialMinutes - Math.trunc(statSpecialMinutes / 60) * 60;
        }

        result.statsMonths.push({
          year: year,
          month: currentMonth.month,
          hours: statHours,
          minutes: statMinutes,
          publications: statPublications,
          videos: statVideos,
          returnVisits: statReturnVisits,
          biblieStudies: statBibleStudies,
          specialHours: statSpecialHours,
          specialMinutes: statSpecialMinutes,
        });
      }
    });
    return result;
  });

export const selectBackup = () =>
  createSelector(data, (_) => {
    const result: Backup = {
      version: '1.0.0',
      data: _,
    };
    return result;
  });

export const selectMinYear = () =>
  createSelector(data, (_) => {
    const _data = _;
    const yearsStr: string[] = Object.keys(_data.years);
    yearsStr.sort((a, b) => +a - +b);
    return yearsStr.length > 0 ? +yearsStr[0] : 2021;
  });
