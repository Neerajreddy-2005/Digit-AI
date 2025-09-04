import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DrawingCanvas from "@/components/dashboard/DrawingCanvas";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          {/* Page Header */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Sparkles className="mr-2 h-3 w-3" />
              Interactive Dashboard
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="hero-gradient">AI Digit Recognition</span> Dashboard
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Draw any digit (0-9) on the black canvas below and watch our AI model analyze and predict your handwriting in real-time.
            </p>
          </div>

          {/* Drawing Interface */}
          <DrawingCanvas />

          {/* Instructions */}
          <div className="mt-12 p-6 bg-card/30 rounded-xl border border-border/50 backdrop-blur">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 glow-effect">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">How to Use</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>1. Choose your preferred brush size using the size controls</li>
                  <li>2. Draw a single digit (0-9) on the black canvas with your mouse</li>
                  <li>3. Click "Analyze Digit" to let our AI model predict your drawing</li>
                  <li>4. View the results with confidence scores in the right panel</li>
                  <li>5. Clear the canvas to try again or download your drawing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;