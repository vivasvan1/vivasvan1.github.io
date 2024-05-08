import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

type Props = {};

const projects = [
  {
    name: "K|Lens GmbH",
    description: `At K|Lens GmbH, I contributed to the development of the company's innovative vision system, focusing on depth estimation, real-world semantic segmentation, and object classification. My work involved researching and developing AI algorithms to address complex visual perception challenges, integrating these findings with software solutions, and presenting our research outcomes in industry conferences.`,
    images: ["/imgs/projects/klens/showcase.png"], // Add images showing the technology or conference presentations
    videos: [], // Consider including a video demonstration of the technology
    link: "", // Add the company or project link if available
    logo: "", // Add company or project logo if available
    time: "Jan 20 - Mar 22",
    team: "K|Lens R&D Team",
  },
  {
    name: "Vaato",
    description: `At Vaato, I spearhead the development of an AI-powered contextual conversation partner designed to revolutionize interview preparation. My role involves:`,
    images: [
      "/imgs/projects/vaato/homepage.jpg",
      "/imgs/projects/vaato/dashboard.jpg",
    ],
    videos: [],
    link: "https://vaato.ultimateworld.io",
    logo: "/imgs/projects/vaato/logo.jpg",
    time: "Aug 22 - Present",
    team: "UltimateWorld Team",
  },
  {
    name: "Global Compass",
    description: `As the Lead Software Developer at Global Compass, I was responsible for developing an automated system that helps individuals determine the best immigration program suited to their personal profiles and backgrounds. This involved designing algorithmic solutions to efficiently process and analyze personal data, and collaborating with a multidisciplinary team to ensure system compliance with legal and ethical standards.`,
    images: [
      "/imgs/projects/global-compass/homepage.png",
      "/imgs/projects/global-compass/assessment.png",
    ],
    videos: [], // Add a walkthrough video if available
    link: "global-compass.ai", // Add the company or project link if available
    logo: "", // Add project logo if available
    time: "Jan 23 - May 23",
    team: "Greenberg Hameed Group",
  },
  {
    name: "ArchiDocx",
    description: `Single handledly developed an Architecture Project Management System for simple client architect communication and organisation. Client UI has taken inspiration from Google Drive design for easy to learn and use.`,
    images: [
      "/imgs/projects/archidocx/phone_home.png",
      "/imgs/projects/archidocx/project_view.png",
      "/imgs/projects/archidocx/recent_files_view.png",
      "/imgs/projects/archidocx/team_management.png",
    ],
    videos: [], // Add a walkthrough video if available
    link: "https://www.archidocx.com/", // Add the company or project link if available
    logo: "", // Add project logo if available
    time: "Jan 23 - May 23",
    team: "Lavingya Consulatants",
  },
];

function Projects({}: Props) {
  return (
    <div className="p-3 py-10 w-full flex flex-col gap-5">
      <div className="text-center">
        <CardTitle>Work / Projects</CardTitle>
      </div>
      {projects.map((project) => (
        <Project project={project} />
      ))}
    </div>
  );
}

type PProps = {
  project: (typeof projects)[0];
};

function Project({ project }: PProps) {
  const [isShowMore, setIsShowMore] = useState(false);
  return (
    <Card className="hover:bg-muted">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex  items-center gap-4 font-light">
            <Avatar className="text-base border">
              <AvatarImage src={project.logo} alt="logo" />
              <AvatarFallback>
                {project.name.at(0)?.toUpperCase() ?? "A"}
              </AvatarFallback>
            </Avatar>
            {project.name}
          </CardTitle>
          <div className="flex gap-1">
            {project.link && (
              <Button
                size={"sm"}
                onClick={() => {
                  window.open(project.link, "_blank");
                }}
                variant={"outline"}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="!my-5">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground ">{project.team}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground ">{project.time}</div>
          </div>
        </div>

        {project.description && (
          <>
            <CardDescription
              className={`${!isShowMore ? "truncate" : ""} w-full`}
            >
              {project.description}
            </CardDescription>
            <CardDescription className="">
              <button
                onClick={() => {
                  setIsShowMore(!isShowMore);
                }}
                className="w-max underline"
              >
                {isShowMore ? "Hide" : "Show More"}
              </button>
            </CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {project.images.map((image, index) => (
              <CarouselItem key={index} onClick={() => {}} className="m-auto">
                <img
                  src={image}
                  alt={project.name}
                  className="w-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
}

export default Projects;
