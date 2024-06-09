import React from "react";
import AddColorAndSize from "../../shared-components/AddColorAndSize";
import { sizesActions } from "./productSizeSlice";


const AddColor: React.FC = () => {
  return (
    <AddColorAndSize
      itemName="Size"
      onSubmit={sizesActions.createOne}
    />
  );
};

export default AddColor;
