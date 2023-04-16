import React, { ReactNode, useState, useReducer, ChangeEvent } from "react";
import { useCounter, useCounterText } from "./Context/CounterContext";

type ChildrenType = {
    children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
    // useState method
    const [countState, setCountState] = useState<number>(0);

    const decrementState = () =>
        setCountState((prevCount) => {
            if (prevCount > 0) {
                return prevCount - 1;
            }
            return prevCount;
        });
    const incrementState = () => setCountState((prevCount) => prevCount + 1);

    // useReducer method with useContext
    const { count, increment, decrement } = useCounter();
    const { text, userInputHandler } = useCounterText();
    return (
        <div>
            {/* useState method  */}
            <div className='useState-div'>
                <h1>Counter using useState</h1>
                <h2>{children(countState)}</h2>
                <div>
                    <button type='button' onClick={decrementState}>
                        -
                    </button>
                    <button type='button' onClick={incrementState}>
                        +
                    </button>
                </div>
            </div>

            {/* useReducer method */}
            {/* All values are coming from useContext */}
            <div className='useReducer-div' style={{ marginTop: "3rem" }}>
                <h1>Counter using useReducer</h1>
                <h2>{children(count)}</h2>

                <div>
                    <button type='button' onClick={decrement}>
                        -
                    </button>
                    <button type='button' onClick={increment}>
                        +
                    </button>
                </div>
                <p>{text}</p>
                <input type='text' onChange={userInputHandler} />
            </div>
        </div>
    );
};

export default Counter;
