import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      {/* Any static layout content can go here */}
      <Outlet /> {/* This will render the Home component or any child routes */}
    </div>
  );
}
