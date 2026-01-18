import { use, useEffect, useState } from "react";
import { FormWizardContext } from "../contexts/formWizardContext";
import { useNavigate } from "react-router-dom";

export default function Username() {
  const { register, errors, userInfo, err, setErr } = use(FormWizardContext);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleEnterUsername = (e) => {
    const username = e.target.value;
    const firstName = userInfo.firstName;
    setValue(username);
    if (!username.toLowerCase().includes(firstName.toLowerCase()) && username) {
      setErr(`Username should contain your first name (${firstName})`);
      return;
    }
    setErr("");
  };
  useEffect(() => {
    if (!userInfo.firstName) {
      navigate("/");
    }
  }, [userInfo]);
  return (
    <div className="py-20 mx-auto max-w-227">
      <h2 className="mb-6.5 text-white/85 text-[26px] font-bold">Username</h2>
      <p className="mb-6.5 text-white/85 text-lg font-normal">
        Username should include your first name. This step is to demonstrate
        that we can validate field based on what user typed in the previous
        step.
      </p>
      <div className="flex flex-row gap-6 flex-wrap">
        <div className="grow shrink-0 basis-72">
          <label className="block mb-2 text-md font-medium text-white">
            Username
          </label>
          <input
            type="text"
            className="block w-full p-3 placeholder-gray-400 outline-none bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:border-blue-500 focus:bg-gray-700 focus:ring-blue-500 "
            {...register("username")}
            value={value}
            onInput={handleEnterUsername}
          />
          {errors?.username?.message && (
            <p className="text-red-400 text-md">{errors.username.message}</p>
          )}
          {err && <p className="text-red-400 text-md">{err}</p>}
        </div>
      </div>
    </div>
  );
}
