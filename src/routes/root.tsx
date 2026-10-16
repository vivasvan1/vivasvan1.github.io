import SiteFooter from "@/components/site/header-footer/site-footer";
import SiteHeader from "@/components/site/header-footer/site-header";
import { InteractiveDotsBackground } from "@/components/ui/interactive-dots-background";
import { Outlet } from "react-router-dom";

type Props = {};

function Root({}: Props) {
  return (
    <div className="relative min-h-screen flex justify-center bg-white dark:bg-black overflow-x-hidden">
      <InteractiveDotsBackground />
      <div className="relative z-10 flex justify-center min-h-screen max-sm:min-w-[100dvw] sm:max-w-[40rem]">
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
