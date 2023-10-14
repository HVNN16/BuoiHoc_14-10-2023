// import logo from './logo.svg';
// import './App.css';
// import {useState, useEffect,useRef} from 'react';

// function App() {
//   //Thay đổi useState - cách dùng
//   // let [count, setCount] = useState(0)
//   // function handleCount () {
//   //   setCount (count +1)
//   // }
//   // return (
//   //   <div className="App">
//   //   <h1>Hello</h1>
//   //   <h2>{count}</h2>
//   //   <button onClick={handleCount}>+</button>
//   //   </div>
//   // );
//   //Dùng useEffect
// //   let [count, setCount] = useState(0)
// //   let [text, setText] = useState("Hello")
// //   function handleCount () {
// //     setCount (count +1)
// //   }
// //   useEffect(()=>{
// //     document.title =text
// //   })
  
// //   return (
// //     <div className="App">
// //     <h1>Hello</h1>
// //     <h2>{count}</h2>
// //     <button onClick={handleCount}>+</button> <br/>
// //     Title ={' '} 
// //     <input onChange={(e)=>{
// //       setText(e.target.value)
// //     }}></input>
// //     </div>
// //   );
// // }
// //Dùng useRef và useEffect
// let [count, setCount] = useState(0);
// let [text, setText] = useState("Hello");
// let [todos, setTodos] = useState([]);
// let data = useRef([]);

// function handleCount() {
//   setCount ((prevState) => prevState +1)
// }

// useEffect(() => {
//   document.title = text;
// }, [text]);

// useEffect(() => {
//   fetch('https://jsonplaceholder.typicode.com/todos/')
//     .then(response => response.json())
//     .then(json => {
//       data.current = json;
//       setTodos(json);
//     });
// }, []);

// return (
//   <div className="App">
//     <h1>Hello</h1>
//     <h2>{count}</h2>
//     <button onClick={handleCount}>+</button>
//     <button>Stop</button><br />
//     Title ={' '}
//     <input
//       onChange={(e) => {
//         setText(e.target.value);
//       }}
//     ></input>
//     <ul>
//       {todos.map((item, index) => (
//         <li key={index}>{item.title}</li>
//       ))}
//     </ul>
//   </div>
// );
// }

// export default App;

//Của Thầy 
// import logo from "./logo.svg";
// import "./App.css";
// import { useState, useEffect, useRef, useCallback } from "react";
// import Content from "./content";

// function App() {
//   let [count, setCount] = useState(0);
//   let [show, setShow] = useState(false);
//   let handleCount = useCallback(() => {
//     setCount((prevState) => prevState + 1);
//   }, []);
//   // function handleCount

//   // let a = 5; // a #fff = 5

//   // handleCount #ff3 =  ff5
//   // ff4 =  {
//   //   setCount((prevState) => prevState + 1);
//   // }

//   console.log("Re-render APP");

//   return (
//     <div className="App">
//       <h2>{count}</h2>

//       <br />

//       <button
//         onClick={() => {
//           setShow(!show);
//         }}
//       >
//         Show/hide Content
//       </button>
//       {show && <Content handleCount={handleCount} />}
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { useState, useReducer } from "react";
import Main from "./main";
import ProductContext from "./context";

const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "DELETE_PRODUCT":
      return state.filter((product, index) => index !== action.payload);
    default:
      return state;
  }
};

function App() {
  const [count, dispatchCount] = useReducer((state, action) => {
    switch (action.type) {
      case "UP":
        return state + 1;
      case "DOWN":
        return state - 1;
      default:
        return state;
    }
  }, 0);

  const [products, dispatchProducts] = useReducer(productReducer, [
    {
      name: "Banh mi",
      price: 10000,
    },
  ]);

  const addProduct = (name, price) => {
    const product = {
      name,
      price,
    };
    dispatchProducts({ type: "ADD_PRODUCT", payload: product });
  };

  const deleteProduct = (index) => {
    dispatchProducts({ type: "DELETE_PRODUCT", payload: index });
  };

  return (
    <ProductContext.Provider
      value={{
        state: products,
        addProduct: addProduct,
        deleteProduct: deleteProduct,
      }}
    >
      <div className="App">
        <h2>{count}</h2>
        <button
          onClick={() => {
            dispatchCount({ type: "UP" });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatchCount({ type: "DOWN" });
          }}
        >
          -
        </button>{" "}
        <br />
        <Main />
      </div>
    </ProductContext.Provider>
  );
}

export default App;
