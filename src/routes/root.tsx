import SiteFooter from "@/components/site/header-footer/site-footer";
import SiteHeader from "@/components/site/header-footer/site-header";
import { Outlet } from "react-router-dom";

type Props = {};

function Projects({}: Props) {
  return (
    <div className="min-w-screen min-h-screen flex">
      <SiteHeader />
      <div className="flex flex-col max-sm:ml-14 justify-between w-full">
        <Outlet />
        <SiteFooter />
      </div>
    </div>
  );
}

export default Projects;
