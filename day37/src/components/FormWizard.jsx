import { Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "./Header";
import Navigation from "./Navigation";
import { FormWizardContext } from "../contexts/formWizardContext";
import { formSchema } from "../schemas/formSchema";
import { useState } from "react";

export default function FormWizard() {
  const steps = {
    1: "/contact-info",
    2: "/username",
    3: "/email-check",
    4: "/async",
    5: "/final",
  };
  const [stepActive, setStepActive] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let schemaPoint = stepActive > 2 ? 1 : stepActive;
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema[schemaPoint]),
    mode: "onChange",
  });

  const onSubmit = () => {
    console.log(userInfo);
  };
  const handleNextStep = () => {
    const nextStep = stepActive + 1;
    setUserInfo(Object.assign(userInfo, getValues()));
    if (stepActive === 4) {
      setLoading(true);
      setTimeout(() => {
        navigate(steps[nextStep]);
        setStepActive(nextStep);
        setLoading(false);
      }, 2000);
      return;
    }
    setStepActive(nextStep);
    navigate(steps[nextStep]);
  };
  const handlePrevStep = () => {
    const prevStep = userInfo?.email ? stepActive - 2 : stepActive - 1;
    setStepActive(prevStep === 0 ? stepActive - 1 : prevStep);
    navigate(steps[prevStep === 0 ? stepActive - 1 : prevStep]);
    setErr("");
  };
  const ignoreEmailCheck = () => {
    const nextStep = stepActive + 1;
    setStepActive(nextStep);
    navigate(steps[nextStep]);
  };
  const backContentInfo = () => {
    setStepActive(1);
    navigate(steps[1]);
    setUserInfo({});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1d232a] h-screen">
        <FormWizardContext.Provider
          value={{
            userInfo,
            steps,
            errors,
            isValid,
            stepActive,
            err,
            loading,
            setLoading,
            setStepActive,
            setErr,
            register,
            getValues,
            handleNextStep,
            handlePrevStep,
            ignoreEmailCheck,
            backContentInfo,
          }}
        >
          <Header />
          <Outlet />
          {stepActive !== 3 ? <Navigation /> : ""}
        </FormWizardContext.Provider>
      </form>
    </>
  );
}
/* Kiến thức cần:
  - context : lưu dữ liệu, truyền state xuống component con
  - state
  - schema
  - react hook form

*/
