import { cn } from "@/lib/utils";

export const Section = ({ children, className, id }) => (
    <section id={id} className={cn("relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24", className)}>
        {children}
    </section>
);