import { useState, useEffect } from "react";

export function useDebounce(value, timeout, callback) {
    const [timer, setTimer] = useState(null);

    //method for clearing the current timout.
    const clearTimer = () => {
        if (timer) {
            clearTimeout(timer);
        }
    }

    //Use Effect hook to clear timer and set new timer.
    //Triggered everytime value prop is changed.
    useEffect(() => {

        clearTimer();

        if (value && callback) {
            const newTimer = setTimeout(callback, timeout);
            setTimer(newTimer);
        }

    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps


}