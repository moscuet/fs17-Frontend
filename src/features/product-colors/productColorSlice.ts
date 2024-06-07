import createBaseSlice from "../../app/baseSlice";
import { ColorCreateDto, ColorReadDto, ColorUpdateDto } from "./colorDto";

const { slice, actions } = createBaseSlice<ColorReadDto, ColorCreateDto, ColorUpdateDto>("colors", "/api/v1/product-colors")

export const colorsReducer = slice.reducer;
export const colorsActions = actions;