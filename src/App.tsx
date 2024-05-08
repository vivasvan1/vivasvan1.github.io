import { Copy, Mail, MoveRight, Paperclip, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

type Props = {};

function App({}: Props) {
  return (
    <div className="flex flex-col gap-5 p-3 py-10">
      <Card className="w-full">
        <CardHeader>
          <Avatar className="w-32 h-32">
            <AvatarImage src="/imgs/avatar.webp" />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
          
          <CardTitle className="">Vivasvan Patel</CardTitle>
          <CardDescription>
            A seasoned Computer Vision Researcher with a passion in Frontend
            Development.
          </CardDescription>
        </CardHeader>
      </Card>
      <Link to={"/projects"}>
        <Card className="hover:bg-muted">
          <CardHeader>
            <CardTitle className="flex w-full items-center justify-between">
              Work / Projects <MoveRight className="h-5 w-5" />
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <a
        href="https://vivasvan-cheatsheet.readthedocs.io/en/latest/"
        target="_blank"
        rel="noreferrer"
      >
        <Card className="hover:bg-muted">
          <CardHeader>
            <CardTitle className="flex w-full items-center justify-between">
              <span className="flex items-center justify-center gap-1">
                <Paperclip className="mr-1 h-5 w-5" /> Cheatsheet
              </span>{" "}
              <MoveRight className="h-5 w-5" />
            </CardTitle>
          </CardHeader>
        </Card>
      </a>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="">Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>
                <Phone className="h-5 w-5" />
              </span>{" "}
              <div className="flex gap-1">
                <a target="_blank" href="tel:+919727790271">
                  <span>+91 9727790271</span>
                </a>
                <Button
                  size={"xs"}
                  onClick={() => {
                    navigator.clipboard.writeText("+919727790271").then((_) => {
                      toast.success("Phone number copied");
                    });
                  }}
                  variant={"outline"}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span>
                <Mail className="h-5 w-5" />
              </span>{" "}
              <div className="flex gap-1">
                <a
                  target="_blank"
                  href="mailto:vivasvanpatel40@gmail.com"
                  className="overflow-hidden truncate text-blue-400 underline max-sm:max-w-36"
                >
                  <span className="">vivasvanpatel40@gmail.com</span>
                </a>
                <Button
                  size={"xs"}
                  onClick={() => {
                    navigator.clipboard
                      .writeText("vivasvanpatel40@gmail.com")
                      .then((_) => {
                        toast.success("Email copied");
                      });
                  }}
                  variant={"outline"}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span>
                <TbBrandGithub className="h-5 w-5" />
              </span>{" "}
              <div className="flex gap-1">
                <a
                  target="_blank"
                  href="https://github.com/vivasvan1"
                  className="overflow-hidden truncate text-blue-400 underline max-sm:max-w-36"
                >
                  <span className="">github.com/vivasvan1</span>
                </a>
                <Button
                  size={"xs"}
                  onClick={() => {
                    navigator.clipboard
                      .writeText("https://github.com/vivasvan1")
                      .then((_) => {
                        toast.success("Link copied");
                      });
                  }}
                  variant={"outline"}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span>
                <TbBrandLinkedin className="h-5 w-5" />
              </span>{" "}
              <div className="flex gap-1">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/vivasvan-patel-a0b132139"
                  className="overflow-hidden truncate text-blue-400 underline max-sm:max-w-36"
                >
                  <span className="">
                    linkedin.com/in/vivasvan-patel-a0b132139
                  </span>
                </a>
                <Button
                  size={"xs"}
                  onClick={() => {
                    navigator.clipboard
                      .writeText(
                        "https://www.linkedin.com/in/vivasvan-patel-a0b132139",
                      )
                      .then((_) => {
                        toast.success("Link copied");
                      });
                  }}
                  variant={"outline"}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
