import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { QrCode, Languages, Link as LinkIcon, ArrowRight, Zap, Shield, Sparkles, Lock, Keyboard } from "lucide-react";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-100/50 backdrop-blur-md border border-white/10 mb-8 shadow-sm"
          >
            <Sparkles size={16} className="text-warning" />
            <span className="text-sm font-medium">New tools available</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-base-content via-primary to-secondary"
          >
            Your Digital <br /> Swiss Army Knife
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            A refined collection of essential tools designed for speed, simplicity, and productivity. No clutter, just utility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#tools" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Explore Tools
            </a>
            <Link to="/docs" className="btn btn-ghost btn-lg rounded-full px-8">
              Documentation
            </Link>
          </motion.div>
        </div>

        {/* Tools Grid */}
        <motion.div
          id="tools"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
        >
          {/* QR Generator Card */}
          <motion.div variants={itemVariants}>
            <Link
              to="/qr"
              className="group relative block h-full p-8 rounded-3xl bg-base-100/40 backdrop-blur-md border border-white/10 hover:bg-base-100/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <QrCode size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">QR Generator</h3>
              <p className="opacity-60 mb-6 leading-relaxed">
                Generate custom QR codes instantly. Customize colors, download in high quality, and share with ease.
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                Try it now <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          </motion.div>

          {/* Translator Card */}
          <motion.div variants={itemVariants}>
            <Link
              to="/translate"
              className="group relative block h-full p-8 rounded-3xl bg-base-100/40 backdrop-blur-md border border-white/10 hover:bg-base-100/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Languages size={28} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Translator</h3>
              <p className="opacity-60 mb-6 leading-relaxed">
                Professional French-English translation powered by AI. Save your history and access it anytime.
              </p>
              <div className="flex items-center text-secondary font-semibold group-hover:gap-2 transition-all">
                Try it now <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          </motion.div>

          {/* URL Shortener Card */}
          <motion.div variants={itemVariants}>
            <Link
              to="/shorten"
              className="group relative block h-full p-8 rounded-3xl bg-base-100/40 backdrop-blur-md border border-white/10 hover:bg-base-100/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LinkIcon size={28} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">URL Shortener</h3>
              <p className="opacity-60 mb-6 leading-relaxed">
                Transform long, ugly links into short, shareable URLs. Track your recent links automatically.
              </p>
              <div className="flex items-center text-accent font-semibold group-hover:gap-2 transition-all">
                Try it now <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          </motion.div>

          {/* Password Generator Card */}
          <motion.div variants={itemVariants}>
            <Link
              to="/password"
              className="group relative block h-full p-8 rounded-3xl bg-base-100/40 backdrop-blur-md border border-white/10 hover:bg-base-100/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-success/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock size={28} className="text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Password Gen</h3>
              <p className="opacity-60 mb-6 leading-relaxed">
                Create strong, secure passwords instantly. Customize length and complexity to stay safe online.
              </p>
              <div className="flex items-center text-success font-semibold group-hover:gap-2 transition-all">
                Try it now <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          </motion.div>

          {/* Typing Test Card */}
          <motion.div variants={itemVariants}>
            <Link
              to="/typing-test"
              className="group relative block h-full p-8 rounded-3xl bg-base-100/40 backdrop-blur-md border border-white/10 hover:bg-base-100/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-warning/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Keyboard size={28} className="text-warning" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Typing Test</h3>
              <p className="opacity-60 mb-6 leading-relaxed">
                Test your typing speed and accuracy. Challenge yourself to improve your WPM score.
              </p>
              <div className="flex items-center text-warning font-semibold group-hover:gap-2 transition-all">
                Try it now <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Tools-kits?</h2>
            <p className="opacity-60 max-w-xl mx-auto">Built for modern workflows with a focus on user experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4 text-primary">
                <Zap size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
              <p className="opacity-60 text-sm">Optimized for performance. No loading screens, no waiting.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4 text-secondary">
                <Shield size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Privacy First</h3>
              <p className="opacity-60 text-sm">We don't track your data. Everything runs locally or via secure APIs.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4 text-accent">
                <Sparkles size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Modern Design</h3>
              <p className="opacity-60 text-sm">Clean, refined interface that's easy on the eyes and a joy to use.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
