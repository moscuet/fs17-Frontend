import React from "react";
import { sizesActions } from "./productSizeSlice";
import EditItem from "../../shared-components/EditColorAndSize";

const EditSize: React.FC = () => {
  const selectSizes = (state: any) => state.sizes.items;

  return (
    <EditItem
      itemName="sizes"
      actions={sizesActions}
      selectItems={selectSizes}
    />
  );
};

export default EditSize;
