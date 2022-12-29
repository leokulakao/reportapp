import * as yup from 'yup';

export const ReportSchema = yup.object().shape({
  title: yup.string(),
  date: yup.date().required(),
  hours: yup
    .number()
    .min(0)
    .required()
    .when('minutes', {
      is: (minutes: number) => minutes === 0,
      then: yup.number().min(1),
    }),
  minutes: yup.number().min(0).max(59).required(),
  publications: yup.number(),
  videos: yup.number(),
  returnVisits: yup.number(),
  bibleStudies: yup.number(),
});
