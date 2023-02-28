import { createSelector } from '@reduxjs/toolkit';
import {
  ReportsByDaysView,
  ReportsByMonthView,
} from '../../models/reportTypes';
import { RootState } from '../rootState';
import { Backup, ReportStatsYear, ReportStorage } from './reportsState';

const reports = (state: RootState) => state.reports.reports;

const data = (state: RootState) => state.reports.data;

export const selectAllReports = () => createSelector(reports, (_) => _);

// TODO: delete it
export const selectReportsByMonth = (year: number, month: number) =>
  createSelector(reports, (_) => {
    const _reports: ReportStorage[] = [];
    _.map((report) => _reports.push(report));
    const result: ReportsByMonthView = {
      year: year,
      month: month,
      reportsByDays: [],
    };
    // console.log(_reports);
    if (_reports.length > 0) {
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let i = 0; i < daysInMonth; i++) {
        const day = i + 1;
        const start = new Date(year, month, i, 24, 0, 0);
        const end = new Date(year, month, day, 24, 0, 0);
        const r = _reports
          // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .filter((elem) => {
            const d = new Date(elem.date);
            return (
              d.getTime() >= start.getTime() && d.getTime() <= end.getTime()
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
    // console.log(result);
    return result;
  });

export const selectReportsByMonthView = (year: number, month: number) =>
  createSelector(data, (_) => {
    console.log(data);
    const _data = _;
    const result: ReportsByMonthView = {
      year: year,
      month: month,
      reportsByDays: [],
    };
    // console.log(_reports);
    if (_data.years[year]?.months[month]?.reports.length > 0) {
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let i = 0; i < daysInMonth; i++) {
        const day = i + 1;
        const start = new Date(year, month, i, 24, 0, 0);
        const end = new Date(year, month, day, 24, 0, 0);
        const r = _data.years[year]?.months[month].reports
          // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .filter((elem) => {
            const d = new Date(elem.date);
            return (
              d.getTime() >= start.getTime() && d.getTime() <= end.getTime()
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

export const selectStatsReportsByYear = (year: number) =>
  createSelector(data, (_) => {
    const _data = _;
    const result: ReportStatsYear = {
      year: year,
      statsMonths: [],
    };

    const monthsStr: string[] = Object.keys(
      _data.years[year] ? _data.years[year]?.months : {}
    );

    monthsStr.forEach((month: string) => {
      const currentMonth = _data.years[year].months[+month];
      const lastMonth = _data.years[year].months[+month - 1] ?? null;

      const start = new Date(year, currentMonth.month, 1, 1, 0, 0);
      const end = new Date(year, currentMonth.month + 1, 1, 0, 0, 0);
      const _r = currentMonth.reports
        // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter((elem) => {
          const d = new Date(elem.date);
          return d.getTime() >= start.getTime() && d.getTime() <= end.getTime();
        });

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
        }

        if (statSpecialMinutes >= 60) {
          statSpecialHours =
            statSpecialHours + Math.trunc(statSpecialMinutes / 60);
        }

        if (lastMonth && lastMonth.minutesPassed) {
          statMinutes = statMinutes + lastMonth.minutesPassed;
        }

        result.statsMonths.push({
          year: year,
          month: currentMonth.month,
          hours: statHours,
          publications: statPublications,
          videos: statVideos,
          returnVisits: statReturnVisits,
          biblieStudies: statBibleStudies,
          specialHours: statSpecialHours,
        });
      }
    });

    // if (_reports.length > 0) {
    //   for (let i = 0; i < 12; i++) {
    //     const month = i;
    //     const start = new Date(year, month, 1, 1, 0, 0);
    //     const end = new Date(year, month + 1, 1, 0, 0, 0);
    //     const r = _reports
    //       // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    //       .filter((elem) => {
    //         const d = new Date(elem.date);
    //         return (
    //           d.getTime() >= start.getTime() && d.getTime() <= end.getTime()
    //         );
    //       });
    //     if (r.length > 0) {
    //       let statHours: number = 0;
    //       let statMinutes: number = 0;
    //       let statPublications: number = 0;
    //       let statVideos: number = 0;
    //       let statReturnVisits: number = 0;
    //       let statBibleStudies: number = 0;
    //       let statSpecialHours: number = 0;
    //       let statSpecialMinutes: number = 0;
    //       r.forEach((elem) => {
    //         statHours = statHours + elem.hours;
    //         statMinutes = statMinutes + elem.minutes;
    //         statPublications = statPublications + elem.publications;
    //         statVideos = statVideos + elem.videos;
    //         statReturnVisits = statReturnVisits + elem.returnVisits;

    //         if (elem.bibleStudies > statBibleStudies) {
    //           statBibleStudies = elem.bibleStudies;
    //         }

    //         statSpecialHours = statSpecialHours + elem.specialHours;
    //         statSpecialMinutes = statSpecialMinutes + elem.specialMinutes;
    //       });

    //       if (statMinutes >= 60) {
    //         statHours = statHours + Math.trunc(statMinutes / 60);
    //       }

    //       if (statSpecialMinutes >= 60) {
    //         statSpecialHours =
    //           statSpecialHours + Math.trunc(statSpecialMinutes / 60);
    //       }

    //       result.statsMonths.push({
    //         year: year,
    //         month: month,
    //         hours: statHours,
    //         publications: statPublications,
    //         videos: statPublications,
    //         returnVisits: statReturnVisits,
    //         biblieStudies: statBibleStudies,
    //         specialHours: statSpecialHours,
    //       });
    //     }
    //   }
    // }
    return result;
  });

export const selectBackup = () =>
  createSelector(reports, (_) => {
    const result: Backup = {
      version: '1.0.0',
      reports: _,
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
