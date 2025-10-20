import { Spinner } from "@/components/ui/spinner";

// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-20">
      <Spinner className="size-10" />
    </div>
  );
}
