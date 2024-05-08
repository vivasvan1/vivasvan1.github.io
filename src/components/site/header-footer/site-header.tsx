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
type Props = {};

function SiteHeader({}: Props) {
  const { setTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 w-14 flex md:hidden flex-col border-r bg-background">
        <nav className="flex flex-col items-center gap-4 px-2 py-3 sm:py-5">
          <Link
            to="/"
            className={cn(
              location.pathname === "/"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground",
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
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
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
                )}
              >
                <BsBriefcase className="h-5 w-5" />
                <span className="sr-only">Projects</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Projects</TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to="/books"
                className={cn(
                  location.pathname === "/books"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
                )}
              >
                <Book className="h-5 w-5" />
                <span className="sr-only">Books</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Books</TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to="/skills"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8"
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Skills</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Skills</TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to="/blogs"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8"
              >
                <FaBlogger className="h-5 w-5" />
                <span className="sr-only"></span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right"></TooltipContent>
          </Tooltip>
          {/* <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip> */}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-3 sm:py-5">
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
              <TooltipContent side="right">Settings</TooltipContent>
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
        </nav>
      </aside>
    </>
  );
}

export default SiteHeader;
