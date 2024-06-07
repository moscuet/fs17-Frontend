export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const getModifiedImagesUrls = (images: string[]) => {
  return images.map((image) =>
    isValidUrl(image) ? image : `/assets/productImages/${image}`
  );
};

export const getModifiedImagesUrl = (image: string) => {
   return  isValidUrl(image) ? image : `/assets/productImages/${image}`
};