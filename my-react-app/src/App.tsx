import {useEffect, useState, useCallback, memo} from 'react'
import {createPortal} from 'react-dom';
import './App.css'

type Toast = {
    text: string;
    id: number;
    exp: number;
}

export function App() {
    return (
        <>
            <Counter/>
            <ToastPanel/>
        </>
    )
}

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <h1>CoUnTeRCoUnTer</h1>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
        </>
    )
}

const ToastPanel = () => {
    const [items, setItems] = useState<Array<Toast>>([]);

    const addNewToast = useCallback(() => {
        const item = {
            text: "I'm a new toast!",
            id: Math.floor(Math.random() * 10000),
            exp: Date.now() + 4000,
        }
        setItems((prev) => [item, ...prev]);
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            const a = setInterval(() =>
                    setItems(prev =>
                        prev.filter((item: Toast) => item.exp > Date.now()))
                , 500);
            return () => {
                clearInterval(a);
            }
        }
    }, [items]);

    return (
        <>
            {createPortal(<List items={items}/>, document.body)}
            <ComponentButton addNewToast={addNewToast}/>
        </>
    )
};

const ComponentButton = memo(({addNewToast}: { addNewToast: () => void }) => {
    return (
        <>
            <h3>Toasts here</h3>
            <button onClick={addNewToast}>Toast</button>
        </>
    )
});

const List = ({items}: { items: Array<Toast> }) => {
    return (
        <div className="modal">
            <ul>
                {items.map((item: Toast) => (
                    <ListItem text={item.text} key={item.id}/>
                ))}
            </ul>
        </div>
    )
};

const ListItem = ({text}: { text: string }) => {
    return (
        <li>
            {text}
        </li>
    )
};

