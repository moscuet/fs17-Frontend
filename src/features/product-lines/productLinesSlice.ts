import createBaseSlice from "../../app/baseSlice";
import { ProductLineReadDto, ProductLineCreateDto, ProductLineUpdateDto } from "./productLineDto";

const { slice, actions } = createBaseSlice<ProductLineReadDto, ProductLineCreateDto, ProductLineUpdateDto>("productlines", "/api/v1/product-lines");

export const productLinesReducer = slice.reducer;
export const { fetchAllWithParams: fetchAllProductLines } = actions;

