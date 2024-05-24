import createBaseSlice from "../../app/baseSlice";
import { CategoryCreateDto, CategoryReadDto, CategoryUpdateDto } from "./categoryDto";


const { slice, actions } = createBaseSlice<CategoryReadDto, CategoryCreateDto, CategoryUpdateDto>("categories", "/categories")

export const categoriesReducer = slice.reducer
export const categoriesActions = actions