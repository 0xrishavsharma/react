import { useReducer, useState } from 'react';

const ACTION = {
  INPUT_VALUE: "inputValue",
  INCREMENT: "increment",
  DECREMENT: "decrement",
  IS_BLUE: "isBlue"
}
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INPUT_VALUE:
      return { ...state, inputValue: action.payload }
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 }
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 }
    case ACTION.IS_BLUE:
      return { ...state, isBlue: !state.isBlue }
    default:
      throw new Error();
  }
}



function App() {

  const [state, dispatch] = useReducer(reducer, {
    inputValue: "",
    count: 0,
    isBlue: false
  })

  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);
  const [isRed, setIsRed] = useState(false);
  return (
    <main>
      <h1>State management with two hooks of React: useState and useReducer</h1>
      <div>
        <h2>useState</h2>
        <input type="text" onChange={(e) => setInputValue(e.target.value)} />
        <p className={`${isRed ? "para red-text" : "para"}`}>{count}</p>
        <div>
          <button type='button' onClick={() => setCount((prev) => prev - 1)}>-</button>
          <button type='button' onClick={() => setCount((prev) => prev + 1)}>+</button>
          <button type='button' onClick={() => setIsRed(!isRed)}>Change Color</button>
        </div>
        <p className={`${isRed ? "para red-text" : "para"}`}>{inputValue}</p>
      </div>
      <div>
        <h2>useReducer</h2>
        <input type="text" onChange={(e) => dispatch({ type: ACTION.INPUT_VALUE, payload: e.target.value })} />
        <p className={`${state.isBlue ? "para blue-text" : "para"}`}>{state.count}</p>
        <div>
          <button type='button' onClick={() => dispatch({ type: ACTION.INCREMENT })}>-</button>
          <button type='button' onClick={() => dispatch({ type: ACTION.DECREMENT })}>+</button>
          <button type='button' onClick={() => dispatch({ type: ACTION.IS_BLUE })}>Change Color</button>
        </div>
        <p className={`${state.isBlue ? "para blue-text" : "para"}`}>{state.inputValue}</p>
      </div>

    </main>
  )
}

export default App
