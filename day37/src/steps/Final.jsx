import { use, useEffect } from "react";
import { FormWizardContext } from "../contexts/formWizardContext";
import { useNavigate } from "react-router-dom";

export default function Final() {
  const { userInfo } = use(FormWizardContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.firstName) {
      navigate("/");
    }
  }, [userInfo]);
  return (
    <div className="py-20 mx-auto max-w-227">
      <h2 className="mb-6.5 text-white/85 text-[26px] font-bold">
        Congratulations!
      </h2>
      <p className="mb-6.5 text-white/85 text-lg font-normal">
        You did it{" "}
        <span className="text-white font-bold">{userInfo.username}</span> ! 🎉
      </p>
      <p className="mb-6.5 text-white/85 text-lg font-normal">
        Here's your input:
      </p>
      <pre className="px-5 py-4 rounded-sm bg-black/80 text-white text-md">
        {JSON.stringify(userInfo, null, 2)}
      </pre>
    </div>
  );
}
