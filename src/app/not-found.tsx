import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <span className="text-8xl font-bold text-primary/20 select-none">404</span>
      <h1 className="text-h2 mt-4 mb-3">Page not found</h1>
      <p className="text-body text-text-secondary max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg">
          <ArrowLeft size={18} className="mr-2" strokeWidth={1.75} />
          Back to home
        </Button>
      </Link>
    </div>
  );
}
