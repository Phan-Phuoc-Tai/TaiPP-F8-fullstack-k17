import { Navigate, Route, Routes } from "react-router-dom";
import FormWizard from "./components/FormWizard";
import ContactInfo from "./steps/ContactInfo";
import Username from "./steps/Username";
import EmailCheck from "./steps/EmailCheck";
import Async from "./steps/Async";
import Final from "./steps/Final";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FormWizard />}>
          <Route index element={<Navigate to="contact-info" replace />} />
          <Route path="contact-info" element={<ContactInfo />} />
          <Route path="username" element={<Username />} />
          <Route path="email-check" element={<EmailCheck />} />
          <Route path="async" element={<Async />} />
          <Route path="final" element={<Final />} />
        </Route>
      </Routes>
    </>
  );
}
