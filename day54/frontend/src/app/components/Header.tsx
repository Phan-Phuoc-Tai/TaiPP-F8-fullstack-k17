import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-3">
      <h1 className="text-3xl font-semibold">Logo</h1>
      <NavBar />
    </header>
  );
}
