import { CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

type Props = {};

function Blogs({}: Props) {
  return (
    <div className="w-full py-10 sm:max-w-[40rem]">
      <div className="flex flex-col gap-3 py-10 text-center">
        <CardTitle>Blogs</CardTitle>
        <CardDescription>
          All the spicy and intersting takes of the internet happen here.
        </CardDescription>
      </div>
      <Separator />
      <div className="flex min-h-32 flex-col items-center justify-center gap-5">
        <div className="text-bold text-xl">Coming soon...</div>
      </div>
    </div>
  );
}

export default Blogs;
