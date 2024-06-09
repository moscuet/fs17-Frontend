import React from "react";
import { colorsActions } from "./productColorSlice";
import AddColorAndSize from "../../shared-components/AddColorAndSize";

const AddColor: React.FC = () => {
  return (
    <AddColorAndSize
      itemName="Color"
      onSubmit={colorsActions.createOne}
    />
  );
};

export default AddColor;
