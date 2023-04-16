import {
    ChangeEvent,
    ReactElement,
    createContext,
    useCallback,
    useContext,
    useReducer,
} from "react";
import Counter from "../Counter";

type StateType = {
    count: number;
    text: string;
};

export const initialState: StateType = {
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

const reducer = (state: StateType, action: ReducerAction): StateType => {
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

// creating a custom hook which will hold the state and logic as we use it
const useCounterContext = (initialState: StateType) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const decrement = useCallback(
        () => dispatch({ type: ACTION_TYPE.DECREMENT }),
        []
    );
    const increment = useCallback(
        () => dispatch({ type: ACTION_TYPE.INCREMENT }),
        []
    );

    const userInputHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
                type: ACTION_TYPE.NEW_INPUT,
                payload: e.target.value,
            }),
        []
    );

    return { state, increment, decrement, userInputHandler };
};

// creating a context
type UseCounterContextType = ReturnType<typeof useCounterContext>;
const initialContextState: UseCounterContextType = {
    state: initialState,
    increment: () => {},
    decrement: () => {},
    userInputHandler: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const CounterContext =
    createContext<UseCounterContextType>(initialContextState);

type ChildrenType = {
    children?: ReactElement | undefined;
};

export const CounterProvider = ({
    children,
}: ChildrenType & StateType): ReactElement => {
    return (
        <CounterContext.Provider value={useCounterContext(initialState)}>
            {children}
        </CounterContext.Provider>
    );
};

type UseCounterHookType = {
    count: number;
    increment: () => void;
    decrement: () => void;
};

export const useCounter = (): UseCounterHookType => {
    const {
        state: { count },
        increment,
        decrement,
    } = useContext(CounterContext);

    return { count, increment, decrement };
};

type UseCounterTextHookType = {
    text: string;
    userInputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useCounterText = (): UseCounterTextHookType => {
    const {
        state: { text },
        userInputHandler,
    } = useContext(CounterContext);

    return { text, userInputHandler };
};
