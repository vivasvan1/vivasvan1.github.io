import SiteFooter from "@/components/site/header-footer/site-footer";
import SiteHeader from "@/components/site/header-footer/site-header";
import { Outlet } from "react-router-dom";

type Props = {};

function Root({}: Props) {
  return (
    <div className="flex justify-center">
      <div className="max-sm:min-w-[100dvw] sm:max-w-[30rem] min-h-screen flex">
        <SiteHeader />
        <div className="flex flex-col max-sm:pl-14 sm:pt-14 justify-between w-full">
          <Outlet />
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}

export default Root;
