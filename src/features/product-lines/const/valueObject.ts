import * as Yup from "yup";

const urlOrFilenameRegex = /^(https?:\/\/[^\s$.?#].[^\s]*$|[\w,\s-]+\.(jpg|jpeg|png|webp|gif))$/i;
export const productLineValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  categoryId: Yup.string().required('Category is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  imageUrl: Yup.string()
    .required('Product image is required')
    .test(
      'is-url-or-filename',
      'Image must be a valid URL or a local file name with an image extension',
      value => urlOrFilenameRegex.test(value)
    ),
});