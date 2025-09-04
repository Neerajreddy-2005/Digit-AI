import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Trash2, 
  Download, 
  Brain, 
  Loader2, 
  CheckCircle,
  Palette 
} from "lucide-react";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState<{
    digit: number;
    confidence: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [brushSize, setBrushSize] = useState(8);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Set drawing properties
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = brushSize;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [brushSize]);

  const startDrawing = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const draw = useCallback((e: React.MouseEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    toast.success("Canvas cleared!");
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a link element and trigger download
    const link = document.createElement("a");
    link.download = "digit-drawing.png";
    link.href = canvas.toDataURL();
    link.click();
    
    toast.success("Drawing downloaded!");
  };

  const analyzeDigit = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsAnalyzing(true);
    
    try {
      // Simulate API call to backend ML model
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock prediction result
      const mockPrediction = {
        digit: Math.floor(Math.random() * 10),
        confidence: 0.85 + Math.random() * 0.14 // 85-99% confidence
      };
      
      setPrediction(mockPrediction);
      toast.success(`Detected digit: ${mockPrediction.digit}`);
    } catch (error) {
      toast.error("Failed to analyze digit. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Drawing Canvas */}
      <Card className="overflow-hidden elegant-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <span>Drawing Canvas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Brush Size Control */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Brush Size:</span>
            <div className="flex space-x-2">
              {[4, 8, 12, 16].map((size) => (
                <Button
                  key={size}
                  size="sm"
                  variant={brushSize === size ? "default" : "outline"}
                  onClick={() => setBrushSize(size)}
                  className="w-10 h-10 p-0 smooth-transition"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="canvas-board border-2 border-border/50"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={clearCanvas}
              variant="outline"
              size="sm"
              className="smooth-transition hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
            
            <Button
              onClick={downloadCanvas}
              variant="outline"
              size="sm"
              className="smooth-transition"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            
            <Button
              onClick={analyzeDigit}
              disabled={isAnalyzing}
              className="bg-primary hover:bg-primary/90 glow-effect smooth-transition flex-1"
            >
              {isAnalyzing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Brain className="h-4 w-4 mr-2" />
              )}
              {isAnalyzing ? "Analyzing..." : "Analyze Digit"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Panel */}
      <Card className="elegant-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>Recognition Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {prediction ? (
            <div className="space-y-6 animate-fade-in">
              {/* Predicted Digit */}
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="text-8xl font-bold hero-gradient mx-auto w-fit animate-glow-pulse">
                    {prediction.digit}
                  </div>
                  <CheckCircle className="absolute -top-2 -right-2 h-8 w-8 text-green-500" />
                </div>
                
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Recognized
                </Badge>
              </div>

              {/* Confidence */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Confidence</span>
                  <span className="text-sm text-muted-foreground">
                    {(prediction.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full smooth-transition"
                    style={{ width: `${prediction.confidence * 100}%` }}
                  />
                </div>
              </div>

              {/* Model Info */}
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <h4 className="font-medium mb-2">Model Information</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Neural Network Architecture: CNN</p>
                  <p>• Training Dataset: MNIST</p>
                  <p>• Processing Time: ~50ms</p>
                  <p>• Model Size: 2.1MB</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Ready to Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  Draw a digit on the canvas and click "Analyze Digit" to see the AI prediction.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawingCanvas;