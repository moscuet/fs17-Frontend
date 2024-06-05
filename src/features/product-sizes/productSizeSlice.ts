import createBaseSlice from "../../app/baseSlice";
import { ProductSizeReadDto, ProductSizeCreateDto, ProductSizeUpdateDto } from "./productSizeDto";

const { slice, actions } = createBaseSlice<ProductSizeReadDto, ProductSizeCreateDto, ProductSizeUpdateDto>("sizes", "/api/v1/product-Sizes")

export const sizesReducer = slice.reducer;
export const sizesActions = actions;