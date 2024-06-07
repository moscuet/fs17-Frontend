import React from "react";
import { colorsActions } from "../product-colors/productColorSlice";
import AddItem from "../product-colors/AddColorAndSize";
import { sizesActions } from "./productSizeSlice";


const AddColor: React.FC = () => {
  return (
    <AddItem
      itemName="Size"
      onSubmit={sizesActions.createOne}
    />
  );
};

export default AddColor;
