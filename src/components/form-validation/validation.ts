import * as yup from 'yup';

export const ReportSchema = yup.object().shape({
  id: yup.string().uuid(),
  title: yup.string(),
  date: yup.date().required(),
  hours: yup.number().min(0).required(),
  minutes: yup
    .number()
    .min(0)
    .max(59)
    .required()
    .when(['hours', 'specialHours', 'specialMinutes'], {
      is: (hours: number, specialHours: number, specialMinutes: number) =>
        hours === 0 && specialHours === 0 && specialMinutes === 0,
      then: yup.number().min(1),
    }),
  publications: yup.number(),
  videos: yup.number(),
  returnVisits: yup.number(),
  bibleStudies: yup.number(),
  specialHours: yup.number().min(0).required(),
  specialMinutes: yup.number().min(0).max(59).required(),
});
