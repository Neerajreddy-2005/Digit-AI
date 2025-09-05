import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Brain } from "lucide-react";
import heroImage from "@/assets/hero-digit-recognition.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Recognition</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="hero-gradient">Digit Recognition</span>
                <br />
                <span className="text-foreground">Made Simple</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Draw digits on our interactive canvas and watch our AI instantly recognize and classify your handwriting with cutting-edge machine learning.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="group bg-primary hover:bg-primary/90 glow-effect smooth-transition">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="smooth-transition hover:bg-accent/50">
                <Brain className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right">
            <Card className="overflow-hidden elegant-shadow hover:shadow-2xl smooth-transition transform hover:scale-105">
              <img
                src={heroImage}
                alt="AI Digit Recognition Interface"
                className="w-full h-auto object-cover"
              />
            </Card>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full animate-float opacity-20" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent to-accent/80 rounded-full animate-float opacity-10" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;