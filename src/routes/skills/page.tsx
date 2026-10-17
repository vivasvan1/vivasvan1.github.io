import { CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cloud, Code2, Cpu, Globe, Layers } from "lucide-react";

type Props = {};

type SkillItem = {
  name: string;
  level?: string;
};

type SkillCategory = {
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
};

const categories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "TypeScript / JavaScript" },
      { name: "Python" },
      { name: "Go" },
      { name: "Rust" },
      { name: "C / C++" },
      { name: "Dart" },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: Cpu,
    skills: [
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "JAX" },
      { name: "Computer Vision" },
      { name: "Linear Algebra" },
    ],
  },
  {
    title: "Frameworks & Frontend",
    icon: Layers,
    skills: [
      { name: "Next.js / React" },
      { name: "Flutter" },
      { name: "Tailwind CSS" },
      { name: "Design Patterns" },
      { name: "UI/UX Design" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "AWS" },
      { name: "Google Cloud (GCP)" },
      { name: "Azure" },
    ],
  },
  {
    title: "Spoken Languages",
    icon: Globe,
    skills: [
      { name: "English", level: "Fluent" },
      { name: "Hindi", level: "Native" },
      { name: "Gujarati", level: "Native" },
      { name: "German", level: "Intermediate" },
    ],
  },
];

function Skills({}: Props) {
  return (
    <div className="w-full py-10 sm:max-w-[40rem]">
      <div className="flex flex-col gap-2 py-10 text-center">
        <CardTitle>Skills & Technologies</CardTitle>
        <CardDescription className="max-w-md mx-auto text-sm leading-relaxed">
          A quick overview of the languages, frameworks, AI/ML tools, and cloud infrastructure I work with.
        </CardDescription>
      </div>

      <Separator />

      <div className="flex flex-col gap-5 py-8 px-2 sm:px-0">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="group rounded-xl border border-border/70 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-md"
            >
              <div className="mb-3.5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-muted/70 text-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground/90 transition-all duration-150 hover:border-primary/40 hover:bg-muted"
                  >
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[11px] font-normal text-muted-foreground">
                        · {skill.level}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
