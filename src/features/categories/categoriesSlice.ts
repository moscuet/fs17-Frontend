import createBaseSlice from "../../app/baseSlice";
import { CategoryCreateDto, CategoryReadDto, CategoryUpdateDto } from "./categoryDto";


const { slice, actions } = createBaseSlice<CategoryReadDto, CategoryCreateDto, CategoryUpdateDto>("categories", "/api/v1/categories")

export const categoriesReducer = slice.reducer
export const categoriesActions = actions
export const { fetchAll: fetchAllCategories } = actions;
