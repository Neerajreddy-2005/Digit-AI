import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Home, BarChart3 } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 smooth-transition hover:scale-105">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 glow-effect">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl hero-gradient">DigitAI</span>
        </Link>

        <nav className="flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`smooth-transition ${
                    isActive 
                      ? "bg-primary text-primary-foreground glow-effect" 
                      : "hover:bg-accent/50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;