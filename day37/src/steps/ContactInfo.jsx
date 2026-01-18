/* eslint-disable no-useless-escape */
import { use } from "react";
import { FormWizardContext } from "../contexts/formWizardContext";

export default function ContactInfo() {
  const { register, errors, err, setErr } = use(FormWizardContext);
  const handleEnterEmail = (e) => {
    const email = e.target.value;
    const validateEmail =
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
    if (!email) {
      setErr(`This field is required`);
      return;
    }
    if (!validateEmail.test(email)) {
      setErr(`Email must be a valid email`);
      return;
    }
    setErr("");
  };
  return (
    <div className="py-20 mx-auto max-w-227">
      <h2 className="mb-6.5 text-white/85 text-[26px] font-bold">
        Contact Info
      </h2>

      <div className="flex flex-row gap-6 flex-wrap">
        <div className="grow shrink-0 basis-72">
          <label className="block mb-2 text-md font-medium text-white">
            First Name
          </label>
          <input
            type="text"
            placeholder="e.g. John"
            className="block w-full p-3 placeholder-gray-400 outline-none bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:border-blue-500 focus:bg-gray-700 focus:ring-blue-500 "
            {...register("firstName")}
          />
          {errors?.firstName?.message && (
            <p className="text-red-400 text-md">{errors.firstName.message}</p>
          )}
        </div>

        <div className="grow shrink-0 basis-72">
          <label className="block mb-2 text-md font-medium text-white">
            Last Name
          </label>
          <input
            type="text"
            placeholder="e.g. Doe"
            className="block w-full p-3 placeholder-gray-400 outline-none bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:border-blue-500"
            {...register("lastName")}
          />
          {errors?.lastName?.message && (
            <p className="text-red-400 text-md">{errors.lastName.message}</p>
          )}
        </div>

        <div className="grow shrink-0 basis-72">
          <label className="block mb-2 text-md font-medium text-white">
            Age
          </label>
          <input
            type="number"
            placeholder="e.g. 18"
            className="block w-full p-3 placeholder-gray-400 outline-none bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:border-blue-500"
            {...register("age")}
          />
          {errors?.age?.message && (
            <p className="text-red-400 text-md">{errors.age.message}</p>
          )}
        </div>

        <div className="grow shrink-0 basis-72">
          <label className="block mb-2 text-md font-medium text-white">
            Email
          </label>
          <input
            type="email"
            placeholder="e.g. john@doe.com"
            className="block w-full p-3 placeholder-gray-400 outline-none bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:border-blue-500"
            {...register("email")}
            onInput={handleEnterEmail}
          />
          {err && <p className="text-red-400 text-md">{err}</p>}
        </div>
      </div>
    </div>
  );
}
