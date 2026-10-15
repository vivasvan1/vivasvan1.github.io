import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ZoomableImage } from "@/components/ui/zoomable-image";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

type Props = {};

type ProjectType = (typeof projects)[0];

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
      "/imgs/projects/vaato/dashboard.png",
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
      "/imgs/projects/archidocx/project_view.png",
      "/imgs/projects/archidocx/recent_files_view.png",
      "/imgs/projects/archidocx/team_management.png",
      "/imgs/projects/archidocx/phone_home.png",
    ],
    videos: [], // Add a walkthrough video if available
    link: "https://www.archidocx.com/", // Add the company or project link if available
    logo: "", // Add project logo if available
    time: "Jan 24 - Present",
    team: "Lavingya Consulatants",
  },
  {
    name: "PolarProject",
    description: `Build a project showcase website for an non-profit organization. The website showcase an unique, innovative, futuristic 3d design. `,
    images: [
      "/imgs/projects/polar-projects/home.jpg",
      "/imgs/projects/polar-projects/inside.jpg",
    ],
    videos: [], // Add a walkthrough video if available
    link: "https://www.polarprojects.io/", // Add the company or project link if available
    logo: "", // Add project logo if available
    time: "Nov 23 - Dec 23",
    team: "Sahil Patel",
  },
];

function Projects({}: Props) {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  return (
    <>
      <div className="py-10">
        <div className="py-10 text-center">
          <CardTitle>Work / Projects</CardTitle>
        </div>
        <div className="flex w-full flex-col gap-5 p-3 sm:grid sm:grid-cols-2">
          {projects.map((project) => (
            <Project
              key={project.name}
              project={project}
              onOpen={() => {
                setSelectedProject(project);
              }}
            />
          ))}
        </div>
      </div>
      <ProjectModal
        project={selectedProject}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedProject(null);
          }
        }}
      />
    </>
  );
}

type PProps = {
  project: ProjectType;
  onOpen: () => void;
};

function Project({ project, onOpen }: PProps) {
  const [isShowMore, setIsShowMore] = useState(false);
  const projectLink = getProjectLink(project.link);

  return (
    <Card
      className="space-between flex cursor-pointer flex-col transition-colors hover:bg-muted"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex  items-center gap-4 font-light">
            <Avatar className="border text-base">
              <AvatarImage src={project.logo} alt="logo" />
              <AvatarFallback>
                {project.name.at(0)?.toUpperCase() ?? "A"}
              </AvatarFallback>
            </Avatar>
            {project.name}
          </CardTitle>
          <div className="flex gap-1">
            {projectLink && (
              <Button
                size={"sm"}
                type="button"
                aria-label={`Open ${project.name} website`}
                onClick={() => {
                  window.open(projectLink, "_blank", "noopener,noreferrer");
                }}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClickCapture={(event) => {
                  event.stopPropagation();
                }}
                variant={"outline"}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
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
                type="button"
                onClick={() => {
                  setIsShowMore(!isShowMore);
                }}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClickCapture={(event) => {
                  event.stopPropagation();
                }}
                className="w-max underline"
              >
                {isShowMore ? "Hide" : "Show More"}
              </button>
            </CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="my-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {project.images.map((image) => (
              <CarouselItem key={image} className="m-auto">
                <img
                  src={image}
                  alt={project.name}
                  className="h-64 w-full rounded-md object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
      <CardFooter className="">
        <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
          <div>{project.team}</div>
          <div>{project.time}</div>
        </div>
      </CardFooter>
    </Card>
  );
}

type ModalProps = {
  project: ProjectType | null;
  onOpenChange: (isOpen: boolean) => void;
};

function ProjectModal({ project, onOpenChange }: ModalProps) {
  const projectLink = getProjectLink(project?.link);

  return (
    <Dialog open={Boolean(project)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        {project ? (
          <div className="space-y-6">
            <DialogHeader className="pr-10">
              <DialogTitle className="flex items-center gap-4 text-2xl font-medium">
                <Avatar className="border text-base">
                  <AvatarImage src={project.logo} alt={`${project.name} logo`} />
                  <AvatarFallback>
                    {project.name.at(0)?.toUpperCase() ?? "A"}
                  </AvatarFallback>
                </Avatar>
                {project.name}
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span>{project.team}</span>
                <span>{project.time}</span>
              </DialogDescription>
            </DialogHeader>

            <Carousel className="mx-auto w-full max-w-3xl">
              <CarouselContent>
                {project.images.map((image) => (
                  <CarouselItem key={image}>
                    <ZoomableImage src={image} alt={project.name} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {project.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>

            <div className="space-y-4">
              <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {project.description}
              </p>
              {projectLink && (
                <div className="flex justify-end">
                  <Button asChild>
                    <a href={projectLink} target="_blank" rel="noreferrer">
                      Visit Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function getProjectLink(link?: string) {
  if (!link) {
    return "";
  }

  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  }

  return `https://${link}`;
}

export default Projects;
