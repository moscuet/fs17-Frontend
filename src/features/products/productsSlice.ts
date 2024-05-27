import createBaseSlice from "../../app/baseSlice";
import { ProductCreateDto, ProductReadDto, ProductUpdateDto } from "./productDto";

const { slice, actions } = createBaseSlice<ProductReadDto, ProductCreateDto, ProductUpdateDto>("products", "/api/v1/products");

export const productsReducer = slice.reducer;
export const productsActions = actions;
