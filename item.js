import { useContext } from "react";
import ProductContext from "./context";

function Item({ product, index }) {
  let productContext = useContext(ProductContext);

  let deleteProduct = productContext.deleteProduct;
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <button
          onClick={() => {
            deleteProduct(index);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Item;
