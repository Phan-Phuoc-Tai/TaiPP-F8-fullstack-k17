import { use } from "react";
import { FormWizardContext } from "../contexts/formWizardContext";

export default function Header() {
  const { stepActive, steps } = use(FormWizardContext);
  let percentWidth = (stepActive - 1) * 25;
  return (
    <header className="pt-4 pb-3">
      <div className="flex items-center justify-between px-5.5">
        <h1 className="text-xl text-white/95 font-bold">day37-wizard</h1>
        <div className="flex items-center gap-3">
          <h3 className="text-sm text-white/85">
            Step <span>{stepActive}</span> / {Object.keys(steps).length}
          </h3>
          <a href="#!" className="block w-10 h-10 bg-white rounded-full">
            <img
              src="/src/assets/github.svg"
              className="w-full object-cover "
            />
          </a>
        </div>
      </div>
      <div className="bg-gray-600 h-1 mt-4">
        <div
          style={{ width: percentWidth + "%" }}
          className="h-full bg-green-400 transition-all duration-500"
        ></div>
      </div>
    </header>
  );
}
