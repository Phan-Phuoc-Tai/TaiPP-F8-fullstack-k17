import Link from "next/link";
import { NAV_BAR } from "../constants/navBar.constant";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        {NAV_BAR.MENU.map((item) => (
          <li key={item.id} className="text-xl font-medium">
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
