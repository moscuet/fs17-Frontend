import createBaseSlice from "../../app/baseSlice";
import { ProductLineReadDto, ProductLineCreateDto, ProductLineUpdateDto } from "./productLineDto";

const { slice, actions } = createBaseSlice<ProductLineReadDto, ProductLineCreateDto, ProductLineUpdateDto>("productlines", "/productlines")

export const productLinesReducer = slice.reducer
export const productLinesActions = actions