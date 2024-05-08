import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Book, Package, Settings, User2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { BsBriefcase } from "react-icons/bs";

import { useTheme } from "../theme-provider";
import { cn } from "@/lib/utils";
import { FaBlogger } from "react-icons/fa";
import { isMobile } from "react-device-detect";

type Props = {};

function SiteHeader({}: Props) {
  const { setTheme } = useTheme();
  const location = useLocation();
  return (
    <>
      <div className="fixed z-10 bg-background w-full max-w-[40rem] flex flex-row justify-between border-b">
        <div className="flex items-center gap-4 px-2 py-3 flex-row sm:py-5">
          <Link
            to="/"
            className={cn(
              location.pathname === "/"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground",
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors sm:h-8 sm:w-8",
            )}
          >
            <User2 className="h-5 w-5" />
            <span className="sr-only">Vivasvan</span>
          </Link>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to="/projects"
                className={cn(
                  location.pathname === "/projects"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors sm:h-8 sm:w-8",
                )}
              >
                <BsBriefcase className="h-5 w-5" />
                <span className="sr-only">Projects</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "right" : "bottom"}>
              Projects
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to="/skills"
                className={cn(
                  location.pathname === "/skills"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors sm:h-8 sm:w-8",
                )}
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Skills</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "right" : "bottom"}>
              Skills
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to="/books"
                className={cn(
                  location.pathname === "/books"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors sm:h-8 sm:w-8",
                )}
              >
                <Book className="h-5 w-5" />
                <span className="sr-only">Books</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "right" : "bottom"}>
              Books
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to="/blogs"
                className={cn(
                  location.pathname === "/blogs"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors sm:h-8 sm:w-8",
                )}
              >
                <FaBlogger className="h-5 w-5" />
                <span className="sr-only"></span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "right" : "bottom"}>
              Blogs
            </TooltipContent>
          </Tooltip>
          {/* <Tooltip delayDuration={0} >
            <TooltipTrigger asChild>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors sm:h-8 sm:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side={isMobile?"right":"bottom"}>Analytics</TooltipContent>
          </Tooltip> */}
        </div>
        <div className="flex flex-col items-center gap-4 px-2 py-3 max-sm:mt-auto sm:flex-row sm:py-5">
          <DropdownMenu>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "right" : "bottom"}>
                Settings
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default SiteHeader;
