import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom';
import './App.css'

export function App() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 1300);
            return (() => clearTimeout(timer));
        }
    }, [show]);

    return (
        <>
            <Counter/>
            {show ? createPortal(<Modal/>, document.body) : null}
            <button onClick={() => setShow(true)}></button>
        </>
    )
}

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <h1>COUnTer</h1>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <h3>Toasts here</h3>
        </>
    )
}

const Modal = () => {

    return (
        <div className="modal">
            <p>I'm Modal</p>
        </div>
    )
}

