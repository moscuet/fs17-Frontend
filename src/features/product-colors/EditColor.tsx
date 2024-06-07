import React from "react";
import { colorsActions } from "./productColorSlice";
import EditItem from "./EditColorAndSize";

const EditColor: React.FC = () => {
  const selectColors = (state: any) => state.colors.items;

  return (
    <EditItem
      itemName="colors"
      actions={colorsActions}
      selectItems={selectColors}
    />
  );
};

export default EditColor;
