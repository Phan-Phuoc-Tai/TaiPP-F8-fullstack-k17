import React, { useEffect, useState } from "react";

export default function Debounce(value, timeout = 500) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), timeout);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debounceValue;
}
