import { cn } from "cn-func";

const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("min-h-[calc(100vh-80px)] w-full px-5 py-10", className)}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
