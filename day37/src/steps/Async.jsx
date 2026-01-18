import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormWizardContext } from "../contexts/formWizardContext";

export default function Async() {
  const { userInfo } = use(FormWizardContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.firstName) {
      navigate("/");
    }
  }, [userInfo]);
  return (
    <div className="py-20 mx-auto max-w-227">
      <h2 className="mb-6.5 text-white/85 text-[26px] font-bold">Async</h2>
      <p className="mb-6.5 text-white/85 text-lg font-normal">
        Pressing "Next" does async operation that takes 2 seconds before we
        proceed to the next step.
      </p>
    </div>
  );
}
