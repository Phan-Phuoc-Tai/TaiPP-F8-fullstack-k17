import { useEffect, useRef, useState } from "react";

export default function Form(props) {
  const { onSubmit: handleSendToken, OTPLength } = props;
  const [values, setValues] = useState([]);
  const handleChangeValue = (e) => {
    setValues([...values, e.target.value]);
  };
  const formRef = useRef();

  useEffect(() => {
    const formEl = formRef.current;
    let order = values.length;
    if (order < 6) {
      formEl[order].focus();
    }

    const handleClear = (e) => {
      if (e.key === "Backspace" && order !== 0) {
        values.pop();
        formEl[values.length].value = "";
        setValues([...values]);
        return;
      }
      return;
    };
    formEl.addEventListener("keydown", handleClear);

    const handlePasteToken = async (e) => {
      e.preventDefault();
      const clipboardData = await navigator.clipboard.readText();
      if (clipboardData.length <= OTPLength) {
        for (let i = 0; i < clipboardData.length; i++) {
          formEl[i].value = clipboardData.charAt(i);
        }
        setValues([...values, ...clipboardData.split("")]);
      }
    };
    formEl[0].addEventListener("paste", handlePasteToken);

    const resetForm = () => {
      const tokens = Array.from(formEl.children);
      tokens.map((token) => (token.value = ""));
      setValues([]);
    };
    let result = values.join("");
    if (result.length === OTPLength) {
      handleSendToken(+result);
      setTimeout(() => {
        resetForm();
      }, 100);
    }

    return () => {
      formEl.removeEventListener("keydown", handleClear);
      formEl[0].removeEventListener("paste", handlePasteToken);
    };
  }, [values]);

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-800">
      <form className="flex items-center" ref={formRef}>
        <input
          type="text"
          maxLength={values.length ? "1" : ""}
          onChange={handleChangeValue}
          className="outline-none w-15 h-20 rounded-tl-md rounded-bl-md border border-white/30 text-center text-3xl text-white transition duration-400 focus:border-white"
        />
        <input
          type="text"
          maxLength="1"
          onChange={handleChangeValue}
          className="outline-none w-15 h-20 border-0.5 border-t border-b border-white/30 text-center text-3xl text-white  transition duration-400 focus:border-white focus:border"
        />
        <input
          type="text"
          maxLength="1"
          onChange={handleChangeValue}
          className="outline-none w-15 h-20 rounded-tr-md rounded-br-md border border-white/30 text-center text-3xl text-white transition duration-400 focus:border-white "
        />
        <div className="inline-block mx-2 rounded-full px-2 py-1 bg-white/30 "></div>
        <input
          type="text"
          maxLength="1"
          onChange={handleChangeValue}
          className="outline-none w-15 h-20 rounded-tl-md rounded-bl-md border border-white/30 text-center text-3xl text-white transition duration-400 focus:border-white "
        />
        <input
          type="text"
          maxLength="1"
          onChange={handleChangeValue}
          className="outline-none w-15 h-20 border-t border-b border-white/30 text-center text-3xl text-white transition duration-400 focus:border-white focus:border"
        />
        <input
          type="text"
          maxLength="1"
          onChange={handleChangeValue}
          className="outline-none w-15 h-20 rounded-tr-md rounded-br-md border border-white/30 text-center text-3xl text-white transition duration-400 focus:border-white"
        />
      </form>
    </div>
  );
}
