import { ArrowRight, Bot, Rocket, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 container-padding bg-primary text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
          Innovating the Digital Employee Experience with AI
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
          Empower your workforce with AI-powered virtual assistants and affordable prototyping solutions that transform the way you work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products" className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            Explore Products
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
            Schedule a Demo
          </button>
          <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
            Join Our Events
          </button>
        </div>
      </div>
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Bot className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Virtual Assistant</h3>
          <p className="text-neutral-300">Intelligent support that learns and adapts to your needs</p>
        </div>
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Prototyping Solutions</h3>
          <p className="text-neutral-300">Turn ideas into reality with our affordable prototyping tools</p>
        </div>
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Regular Events</h3>
          <p className="text-neutral-300">Join our community events and stay updated with AI trends</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;