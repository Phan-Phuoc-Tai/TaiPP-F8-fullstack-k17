import { Toaster, toast } from "sonner";
import Form from "./components/Form";
import congratulation from "./tools/congratulation";
export default function App() {
  const OTP = 123456;
  const OTPLength = OTP.toString().length;
  const confirmOTP = (numberToken) => {
    if (numberToken === OTP && numberToken) {
      toast.success("OTP chính xác", {
        position: "top-right",
      });
      congratulation();
      return;
    }
    toast.error("OTP không chính xác", {
      position: "top-right",
    });
  };
  return (
    <main>
      <Form onSubmit={confirmOTP} OTPLength={OTPLength} />
      <Toaster />
    </main>
  );
}
