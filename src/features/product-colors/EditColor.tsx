import React from "react";
import { colorsActions } from "./productColorSlice";
import AddColorAndSize from "../../shared-components/EditColorAndSize";

const EditColor: React.FC = () => {
  const selectColors = (state: any) => state.colors.items;

  return (
    <AddColorAndSize
      itemName="colors"
      actions={colorsActions}
      selectItems={selectColors}
    />
  );
};

export default EditColor;
