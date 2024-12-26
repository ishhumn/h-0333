import { Brain } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Brain className="w-8 h-8 text-accent animate-float" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
        NexusAI
      </span>
    </div>
  );
};

export default Logo;