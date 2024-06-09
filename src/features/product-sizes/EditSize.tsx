import React from "react";
import { sizesActions } from "./productSizeSlice";
import AddColorAndSize from "../../shared-components/EditColorAndSize";

const EditSize: React.FC = () => {
  const selectSizes = (state: any) => state.sizes.items;

  return (
    <AddColorAndSize
      itemName="sizes"
      actions={sizesActions}
      selectItems={selectSizes}
    />
  );
};

export default EditSize;
