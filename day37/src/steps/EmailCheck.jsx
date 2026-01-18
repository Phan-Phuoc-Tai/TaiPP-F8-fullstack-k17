import { use, useEffect } from "react";
import { FormWizardContext } from "../contexts/formWizardContext";
import { useNavigate } from "react-router-dom";

export default function EmailCheck() {
  const { userInfo, ignoreEmailCheck, backContentInfo } =
    use(FormWizardContext);
  const isEnterEmail = userInfo.email ? true : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.firstName) {
      navigate("/");
    }
  }, [userInfo]);
  return (
    <>
      {isEnterEmail ? (
        ignoreEmailCheck()
      ) : (
        <div className="py-20 mx-auto max-w-227">
          <h2 className="mb-6.5 text-white/85 text-[26px] font-bold">
            Warning
          </h2>
          <p className="mb-6.5 text-white/85 text-lg font-normal">
            Seems like you did not fill your email. Would you like to do it?
          </p>
          <p className="mb-6.5 text-white/85 text-lg font-normal">
            <span className="text-white/95 font-bold">Note</span>: This step is
            automatically skipped if user filled their email in the first step.
          </p>
          <div className="flex gap-4">
            <button
              className="outline-none py-2 px-4 border border-white/30 bg-black/30 text-white uppercase cursor-pointer hover:bg-black/70 hover:border-white/70"
              onClick={() => ignoreEmailCheck()}
            >
              No
            </button>
            <button
              className="outline-none py-2 px-4 border border-white/30 bg-black/30 text-white uppercase cursor-pointer hover:bg-black/70 hover:border-white/70"
              onClick={() => backContentInfo()}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
