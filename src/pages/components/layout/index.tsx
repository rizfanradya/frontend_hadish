import { ReactNode } from "react";
import NavbarDefault from "../navbar";
import Sidebar from "../sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-blue-gray-50/50">
      <div className="flex gap-4 p-4">
        <Sidebar />
        <NavbarDefault />
      </div>

      <div>{children}</div>
    </div>
  );
}
