import {useState, useEffect} from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
    // -- Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Check if window is defined to avoid SSR error
            if (typeof window !== "undefined") {
                // -- Get from local storage by key
                const item = window.localStorage.getItem(key);
                // -- Parse stored JSON or if none return initialValue
                return item ? JSON.parse(item) : initialValue;
            }
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const valueToStore =
                    typeof storedValue === "function"
                        ? storedValue(storedValue)
                        : storedValue;
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;
