import createBaseSlice from "../../app/baseSlice";
import { ProductColorCreateDto, ProductColorReadDto, ProductColorUpdateDto } from "./productColorDto";

const { slice, actions } = createBaseSlice<ProductColorReadDto, ProductColorCreateDto, ProductColorUpdateDto>("colors", "/api/v1/product-colors")

export const colorsReducer = slice.reducer;
export const colorsActions = actions;