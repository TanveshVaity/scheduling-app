import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

interface SubmitButtonProps {
  src?: string; 
  name: string;
}

export default function SubmitButton({ src, name }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      className="w-full font-semibold relative"
      type="submit"
      disabled={pending}
    >
      {src && (
        <Image src={src} alt={name} className="size-6" />
      )}
      <span className={pending ? "text-transparent" : ""}>{name}</span>
      {pending && (
        <span className="flex justify-center items-center w-full h-full absolute">
          <LoaderCircle className="animate-spin" size={20} />
        </span>
      )}
    </Button>
  );
}
