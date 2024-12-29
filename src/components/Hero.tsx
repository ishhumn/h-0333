import { ArrowRight, Bot, Rocket, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 container-padding bg-gradient-to-br from-primary via-neutral-900 to-primary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 text-transparent bg-clip-text">
            Empowering the Future of Work with AI
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-10 leading-relaxed">
            Innovating Digital Employee Experiences with AI-Powered Solutions that transform the way you work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products" 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl hover:translate-y-[-2px] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 hover:translate-y-[-2px] transition-all duration-200 shadow-lg shadow-black/5">
              Schedule a Demo
            </button>
            <Link 
              to="/events" 
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 hover:translate-y-[-2px] transition-all duration-200 shadow-lg shadow-black/5"
            >
              Join Our Events
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative animate-float">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="AI Technology"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent/30 to-transparent mix-blend-overlay" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-overlay rounded-2xl" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl mix-blend-multiply" />
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/40 rounded-full filter blur-3xl mix-blend-multiply" />
        </motion.div>
      </div>
      <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-200"
        >
          <div className="bg-accent/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Bot className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-white">AI Virtual Assistant</h3>
          <p className="text-neutral-300 leading-relaxed">Intelligent support that learns and adapts to your needs</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-200"
        >
          <div className="bg-accent/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Rocket className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-white">Prototyping Solutions</h3>
          <p className="text-neutral-300 leading-relaxed">Turn ideas into reality with our affordable prototyping tools</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-200"
        >
          <div className="bg-accent/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Calendar className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-white">Regular Events</h3>
          <p className="text-neutral-300 leading-relaxed">Join our community events and stay updated with AI trends</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;