
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Instagram, Mail, Phone, ChevronDown } from "lucide-react";
import { Button } from "./components/ui/button";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

const InstagramEmbed = ({ url }) => {
  const normalizedUrl = url.endsWith('/') ? url : `${url}/`;
  
  return (
    <div className="instagram-embed">
      <iframe
        src={`${normalizedUrl}embed/captioned/?cr=1&v=14&wp=540&rd=https%3A%2F%2Fhorizons.hostinger.com&rp=%2F%3Fpreview_id%3D1#%7B%22ci%22%3A0%2C%22os%22%3A2624.5999999996275%2C%22ls%22%3A2624.5999999996275%2C%22le%22%3A2624.5999999996275%7D`}
        className="w-full h-full"
        frameBorder="0"
        scrolling="no"
        allowtransparency="true"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const portfolioReels = [
  {
    url: "https://www.instagram.com/reel/DGnj6AxvOUp/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==/",
    description: "Fashion Brand Promo, 50K Views"
  },
  {
    url: "https://www.instagram.com/reel/DHdkGAuNmrG/",
    description: "Lifestyle Content, 30K Views"
  },
  {
    url: "https://www.instagram.com/reel/DHdNTlxgbI4/",
    description: "Product Showcase, 45K Views"
  },
  {
    url: "https://www.instagram.com/reel/DHdkGAuNmrG/",
    description: "Brand Story, 25K Views"
  },
  {
    url: "https://www.instagram.com/reel/DHdNTlxgbI4/",
    description: "Travel Content, 35K Views"
  },
  {
    url: "https://www.instagram.com/reel/DHdkGAuNmrG/",
    description: "Food Review, 40K Views"
  }
];

const skills = [
  "Premiere Pro",
  "CapCut",
  "Trendy Transitions",
  "Color Grading",
  "Sound Design",
  "Motion Graphics"
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "portfolio", "about", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    e.target.reset();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-32 md:w-40"
          >
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/f6e0a927-839e-4ad6-aa0a-4fff77a2c1bd/180a8085a0bfd206faaba8717fe59163.png" 
              alt="MS Edits Logo" 
              className="w-full h-auto"
            />
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["hero", "portfolio", "about", "contact"].map((section) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection(section)}
                className={`nav-link capitalize ${
                  activeSection === section ? "text-primary" : ""
                }`}
              >
                {section}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-lg border-b"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
                {["hero", "portfolio", "about", "contact"].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    whileHover={{ x: 10 }}
                    className={`text-left text-lg capitalize ${
                      activeSection === section ? "text-primary font-semibold" : ""
                    }`}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 hero-pattern">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
            >
              Crafting Viral Reels
              <br />
              That Stand Out
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-12"
            >
              Professional Instagram Reels Editor
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
              <Button
                onClick={() => scrollToSection("contact")}
                className="text-lg px-8 py-6 rounded-full"
              >
                Start a Project
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-6 rounded-2xl">
              <InstagramEmbed url="https://www.instagram.com/reel/DHdNTlxgbI4/" />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mt-12"
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-accent section-pattern">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="section-title text-center">Featured Work</h2>
            <p className="section-subtitle">
              Discover how we help brands create engaging content that drives results
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioReels.map((reel, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card p-6 rounded-2xl"
                >
                  <InstagramEmbed url={reel.url} />
                  <p className="mt-4 text-sm font-medium text-muted-foreground">
                    {reel.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <h2 className="section-title text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <p className="text-xl mb-8 leading-relaxed">
                  With 3+ years of experience editing Reels for brands and creators,
                  I specialize in creating engaging content that captures attention
                  and drives engagement.
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-6">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        variants={itemVariants}
                        className="skill-badge"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl">
                <InstagramEmbed url="https://www.instagram.com/reel/DHdNTlxgbI4/" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-accent section-pattern">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="section-title text-center">Let's Create Together</h2>
            <p className="section-subtitle">
              Ready to take your content to the next level? Get in touch!
            </p>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <motion.div variants={itemVariants}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      required
                      className="input-style"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      required
                      className="input-style"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Message</label>
                    <textarea
                      required
                      rows="4"
                      className="input-style"
                      placeholder="Tell me about your project"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full text-lg py-6">
                    Send Message
                  </Button>
                </form>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-semibold mb-8">Connect With Me</h3>
                <div className="space-y-4">
                  <a
                    href="https://instagram.com/ms_edits_oo7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <Instagram className="h-6 w-6" />
                    <span className="font-medium">@ms_edits_oo7</span>
                  </a>
                  <a
                    href="mailto:contact@msedits.in"
                    className="contact-link"
                  >
                    <Mail className="h-6 w-6" />
                    <span className="font-medium">contact@msedits.in</span>
                  </a>
                  <a
                    href="tel:7766741683"
                    className="contact-link"
                  >
                    <Phone className="h-6 w-6" />
                    <span className="font-medium">+91 7766741683</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Toaster />
    </div>
  );
}
