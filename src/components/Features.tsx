import { Bot, Rocket, Brain, Shield, Clock, Users } from "lucide-react";

const features = [
  {
    title: "AI-Powered Assistant",
    description: "24/7 intelligent support with natural language processing and continuous learning capabilities.",
    icon: Bot,
  },
  {
    title: "Rapid Prototyping",
    description: "Transform ideas into functional prototypes quickly and affordably.",
    icon: Rocket,
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights from your data with our advanced AI analytics tools.",
    icon: Brain,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security measures to protect your sensitive data.",
    icon: Shield,
  },
  {
    title: "Quick Integration",
    description: "Seamless integration with your existing tools and workflows.",
    icon: Clock,
  },
  {
    title: "Team Collaboration",
    description: "Enhanced team productivity with AI-powered collaboration tools.",
    icon: Users,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 container-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Transforming Workplaces with AI
        </h2>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Discover how our AI solutions can revolutionize your digital workplace experience.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
              </div>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;