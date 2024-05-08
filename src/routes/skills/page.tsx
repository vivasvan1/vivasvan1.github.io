import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
type Props = {};

// Define the type for a single skill
type Skill = {
  name: string; // Name of the skill
  level: string; // Skill level (e.g., Beginner, Intermediate, Advanced)
};

// Sample list of skills
const computer_skills: Skill[] = [
  {  name: "JS/TS", level: "Master" },
  {  name: "Go", level: "Master" },
  {  name: "Python3", level: "Master" },
  {  name: "Dart", level: "Master" },
  {  name: "C/C++", level: "Master" },
  {  name: "Rust", level: "Master" },

  {  name: "Linear Algebra", level: "Master" },
  {  name: "Design Patterns", level: "Master" },
  {  name: "UI/UX Design", level: "Intermediate" },
];

const framework_skills: Skill[] = [
  {  name: "PyTorch/TF/JAX", level: "Master" },
  {  name: "NextJS", level: "Master" },
  {  name: "Flutter", level: "Master" },
  {  name: "AWS", level: "Master" },
  {  name: "GCP", level: "Master" },
  {  name: "Azure", level: "Master" },
  {  name: "Docker", level: "Master" },
  {  name: "Kubernetes", level: "Intermediate" },
];

const communication_skills: Skill[] = [
  {  name: "English", level: "Master" },
  {  name: "Hindi", level: "Master" },
  {  name: "Gujarati", level: "Master" },
  {  name: "German", level: "Intermediate" },
];

function Skills({}: Props) {
  return (
    <div className="w-full py-10 sm:max-w-[40rem]">
      <div className="flex flex-col gap-3 py-10 text-center">
        <CardTitle>Skill Set {"{ }"}</CardTitle>
        <CardDescription>
          If you are in rush and want to know what I can do, check out my
          skillset.
        </CardDescription>
      </div>
      <Separator />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        <div className="py-10 text-center">
          <CardTitle className="text-lg">Programming</CardTitle>
          <div className="flex w-full flex-col gap-5 p-3">
            {computer_skills.map((skill, index) => (
              <Skill skill={skill} key={index} />
            ))}
          </div>
        </div>
        <div className="py-10 text-center">
          <CardTitle className="text-lg">Framework</CardTitle>
          <div className="flex w-full flex-col gap-5 p-3">
            {framework_skills.map((skill, index) => (
              <Skill skill={skill} key={index} />
            ))}
          </div>
        </div>

        <div className="py-10 text-center">
          <CardTitle className="text-lg">Communication</CardTitle>
          <div className="flex w-full flex-col gap-5 p-3">
            {communication_skills.map((skill, index) => (
              <Skill skill={skill} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type SkillProps = {
  skill: Skill;
};

function Skill({ skill }: SkillProps) {
  return (
    <Card className="flex flex-col hover:bg-muted ">
      <CardHeader className="my-auto">
        <div className="flex justify-center text-center">
          {/* <skill.logo className="h-5 w-5" /> */}
          <div>{skill.name}</div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default Skills;
