import Counter from "./Counter";

function App() {
    return (
        <main>
            <Counter>{(num: number) => <>Current Count: {num}</>}</Counter>
        </main>
    );
}

export default App;
