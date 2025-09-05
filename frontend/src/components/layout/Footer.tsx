import { Brain, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 glow-effect">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg hero-gradient">DigitAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced digit recognition powered by machine learning. Draw, detect, and discover.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary smooth-transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-muted-foreground hover:text-primary smooth-transition">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Technologies</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">React & TypeScript</li>
              <li className="text-muted-foreground">TensorFlow.js</li>
              <li className="text-muted-foreground">Canvas API</li>
              <li className="text-muted-foreground">Machine Learning</li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 hover:bg-accent/50 smooth-transition"
                onClick={() => window.open('https://github.com/Neerajreddy-2005/Digit-AI', '_blank')}
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 hover:bg-accent/50 smooth-transition"
                onClick={() => window.open('mailto:dvenkatneerajreddy10@gmail.com', '_blank')}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 DigitAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;