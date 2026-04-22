import { use } from "react";
import { FormWizardContext } from "../contexts/formWizardContext";
import { useLocation } from "react-router-dom";

export default function Navigation() {
  const { isValid, steps, handleNextStep, handlePrevStep, err, loading } =
    use(FormWizardContext);
  const { pathname } = useLocation();
  return (
    <div className="p-4.5 fixed bottom-4 left-0 right-0 mx-auto max-w-227">
      <div className="flex items-center justify-center gap-70">
        <button
          disabled={pathname === steps[1] ? true : false}
          className=" w-36.5 flex items-center justify-center gap-2 py-3 px-4.5 rounded-sm  bg-[#605dff] text-white cursor-pointer disabled:bg-white/10 disabled:cursor-default hover:bg-[#4845d0]"
          onClick={handlePrevStep}
        >
          <i className="fa-solid fa-arrow-left-long text-2xl"></i>
          <span className="uppercase font-medium">Previous</span>
        </button>
        {loading ? (
          <button
            disabled={true}
            className=" w-36.5 flex items-center justify-center gap-2 py-3 px-4.5 rounded-sm  bg-[#605dff] text-white cursor-pointer disabled:bg-white/10 disabled:cursor-default hover:bg-[#4845d0]"
          >
            <div className="w-4 h-4 border-2 border-l-white/30 border-white/60 border-r--white/80 border-b-white border-dotted rounded-full animate-spin"></div>
            <span className="uppercase font-medium">Next</span>
            <i className="fa-solid fa-arrow-right-long text-2xl"></i>
          </button>
        ) : (
          <button
            disabled={pathname === steps[5] ? true : err ? true : !isValid}
            className=" w-36.5 flex items-center justify-center gap-2 py-3 px-4.5 rounded-sm  bg-[#605dff] text-white cursor-pointer disabled:bg-white/10 disabled:cursor-default hover:bg-[#4845d0]"
            onClick={handleNextStep}
          >
            <span className="uppercase font-medium">Next</span>
            <i className="fa-solid fa-arrow-right-long text-2xl"></i>
          </button>
        )}
      </div>
    </div>
  );
}
