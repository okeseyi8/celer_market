import { useState } from "react";

function useInputChangeHandler<T>(
  initialState: T
): [
  T,
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => void,
  React.Dispatch<React.SetStateAction<T>>
] {
  const [inputDetails, setInputDetails] = useState<T>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    setInputDetails((prev) => {
      if (Array.isArray(prev)) {
        const updated = [...prev];
        if (index !== undefined) {
          updated[index] = { ...updated[index], [name]: value };
        }
        return updated as T;
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  // Returning the setter as the 3rd value
  return [inputDetails, handleChange, setInputDetails];
}

export default useInputChangeHandler;