import { FaReact } from "react-icons/fa";
import { TbBrandVite } from "react-icons/tb";

type Props = {};

function SiteFooter({}: Props) {
  return (
    <div className="h-14 border-t flex justify-center items-center">
      Build by{" "}
      <a href="https://github.com/vivasvan1" className="mx-1 underline">
        vivasvan1
      </a>
      using <FaReact className="mx-1 w-5 h-5" /> +{" "}
      <TbBrandVite className="mx-1 w-5 h-5" />
    </div>
  );
}

export default SiteFooter;
