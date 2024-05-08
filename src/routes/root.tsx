import SiteFooter from "@/components/site/header-footer/site-footer";
import SiteHeader from "@/components/site/header-footer/site-header";
import { Outlet } from "react-router-dom";

type Props = {};

function Root({}: Props) {
  return (
    <div className="flex justify-center bg-white bg-dot-black/[0.2]  dark:bg-black dark:bg-dot-white/[0.2] ">
      <div className="flex justify-center min-h-screen max-sm:min-w-[100dvw] sm:max-w-[40rem]">
        <SiteHeader />
        <div className="flex w-full flex-col justify-between pt-14 sm:max-w-[40rem]">
          <Outlet />
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}

export default Root;
