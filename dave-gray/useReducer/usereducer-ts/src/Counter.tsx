import React, { ReactNode, useState, useReducer } from "react";

const initialState = {
    count: 0,
    text: "",
};

const enum ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT,
}

type ReducerAction = {
    type: ACTION_TYPE;
    payload?: string;
};

const reducer = (
    state: typeof initialState,
    action: ReducerAction
): typeof initialState => {
    switch (action.type) {
        case ACTION_TYPE.DECREMENT:
            return {
                ...state,
                count: state.count > 0 ? state.count - 1 : state.count,
            };
        case ACTION_TYPE.INCREMENT:
            return { ...state, count: state.count + 1 };
        case ACTION_TYPE.NEW_INPUT:
            return { ...state, text: action.payload ?? "" }; // ?? is the nullish coalescing operator which is used to return the right hand side operand when the left hand side operand is null or undefined
        default:
            throw new Error();
    }
};

type ChildrenType = {
    children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
    // useState method
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount((prevCount) => prevCount + 1);
    const decrement = () =>
        setCount((prevCount) => {
            if (prevCount > 0) {
                return prevCount - 1;
            }
            return prevCount;
        });

    // useReducer method
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            {/* useState method  */}
            <div className='useState-div'>
                <h1>Counter using useState</h1>
                <h2>{children(count)}</h2>
                <div>
                    <button type='button' onClick={decrement}>
                        -
                    </button>
                    <button type='button' onClick={increment}>
                        +
                    </button>
                </div>
            </div>

            {/* useReducer method */}
            <div className='useReducer-div' style={{ marginTop: "3rem" }}>
                <h1>Counter using useReducer</h1>
                <h2>{children(state.count)}</h2>

                <div>
                    <button
                        type='button'
                        onClick={() =>
                            dispatch({ type: ACTION_TYPE.DECREMENT })
                        }
                    >
                        -
                    </button>
                    <button
                        type='button'
                        onClick={(e) =>
                            dispatch({
                                type: ACTION_TYPE.INCREMENT,
                            })
                        }
                    >
                        +
                    </button>
                </div>
                <p>{state.text}</p>
                <input
                    type='text'
                    onChange={(e) =>
                        dispatch({
                            type: ACTION_TYPE.NEW_INPUT,
                            payload: e.target.value,
                        })
                    }
                />
            </div>
        </div>
    );
};

export default Counter;
