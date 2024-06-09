import * as Yup from "yup";

export const productTableFields = [
  { name: "productLineId", label: "Product Line ID" },
  { name: "productSizeId", label: "Product Size ID" },
  { name: "productColorId", label: "Product Color ID" },
  { name: "inventory", label: "Inventory" },
];

export const productValidationSchema = Yup.object({
  productLineId: Yup.string().required("Product line is required"),
  productSizeId: Yup.string(),
  productColorId: Yup.string(),
  inventory: Yup.number()
    .required("Inventory is required")
    .min(0, "Inventory cannot be negative"),
  imageUrls: Yup.array()
    .of(Yup.string().required("An image URL is required"))
    .min(1, "At least one image URL is required"),
});

export const productFormInitialValues = {
  productLineId: "",
  productSizeId: null,
  productColorId: null,
  inventory: 0,
  imageUrls: [""],
};


export const queryParamsDefault = {
  page: 1,
  limit: 50,
  sortOrder: "asc"
}