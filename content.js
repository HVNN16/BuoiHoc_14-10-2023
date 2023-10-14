import { useRef, useContext } from "react";
import ProductContext from "./context";
import Item from "./item";

function Content() {
  let productContext = useContext(ProductContext);
  console.log(productContext);
  let products = productContext.state;
  let addProduct = productContext.addProduct;

  let inpName = useRef();
  let inpPrice = useRef();

  let data = products.map((product, index) => {
    return <Item key={index} product={product} index={index} />;
  });

  let sum = products.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue.price),
    0
  );

  return (
    <div className="Content">
      Name: <input ref={inpName}></input> <br />
      Price: <input ref={inpPrice}></input>
      <br />
      <button
        onClick={() =>
          addProduct(inpName.current.value, inpPrice.current.value)
        }
      >
        Add
      </button>
      Total: {sum}
      <table border={1}>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        {data}
      </table>
    </div>
  );
}

export default Content;
