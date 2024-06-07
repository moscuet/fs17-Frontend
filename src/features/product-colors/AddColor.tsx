import React from "react";
import { colorsActions } from "./productColorSlice";
import AddItem from "../../shared-components/AddColorAndSize";

const AddColor: React.FC = () => {
  return (
    <AddItem
      itemName="Color"
      onSubmit={colorsActions.createOne}
    />
  );
};

export default AddColor;