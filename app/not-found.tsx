import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-svh flex flex-col items-center justify-center gap-5">
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <Link href="/">
        <Button size="lg" className="text-lg">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
