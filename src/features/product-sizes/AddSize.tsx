import React from "react";
import AddItem from "../../shared-components/AddColorAndSize";
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
