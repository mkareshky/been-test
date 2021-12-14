import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required'),
  description: yup
    .string()
    .required('Description is required'),
  gift: yup
    .string()
    .required('Gift is required'),
});
