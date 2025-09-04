import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Cpu, 
  Zap, 
  Palette, 
  Code, 
  Database,
  Layers,
  Target
} from "lucide-react";

const TechSection = () => {
  const technologies = [
    {
      name: "TensorFlow.js",
      description: "Client-side machine learning for real-time digit recognition",
      icon: Brain,
      category: "AI/ML"
    },
    {
      name: "Canvas API",
      description: "Interactive drawing surface with smooth brush strokes",
      icon: Palette,
      category: "Graphics"
    },
    {
      name: "React",
      description: "Modern frontend framework with TypeScript support",
      icon: Code,
      category: "Frontend"
    },
    {
      name: "Neural Networks",
      description: "Deep learning models trained on handwritten digits",
      icon: Layers,
      category: "AI/ML"
    },
    {
      name: "Real-time Processing",
      description: "Instant digit classification with optimized performance",
      icon: Zap,
      category: "Performance"
    },
    {
      name: "Computer Vision",
      description: "Image preprocessing and feature extraction algorithms",
      icon: Target,
      category: "AI/ML"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI/ML":
        return "bg-primary/10 text-primary border-primary/20";
      case "Graphics":
        return "bg-accent/10 text-accent border-accent/20";
      case "Frontend":
        return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      case "Performance":
        return "bg-primary/20 text-primary border-primary/30";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Cpu className="mr-2 h-3 w-3" />
            Technologies & Tools
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Powered by <span className="hero-gradient">Cutting-Edge Tech</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our digit recognition system leverages the latest in machine learning and web technologies to deliver accurate, real-time results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            
            return (
              <Card 
                key={tech.name}
                className="group hover:shadow-lg smooth-transition hover:scale-105 elegant-shadow bg-card/50 backdrop-blur border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 glow-effect group-hover:animate-glow-pulse">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{tech.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(tech.category)}`}
                        >
                          {tech.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold hero-gradient">99.2%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold hero-gradient">&lt;50ms</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold hero-gradient">10</div>
            <div className="text-sm text-muted-foreground">Digit Classes</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold hero-gradient">∞</div>
            <div className="text-sm text-muted-foreground">Possibilities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;