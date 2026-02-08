import PptxGenJS from "pptxgenjs";
import { PresentationData, ThemeId } from "../types";

// Define Theme Colors and Styles
const THEMES: Record<ThemeId, {
  background: string;
  titleColor: string;
  bodyColor: string;
  accent: string;
  font: string;
}> = {
  modern: { background: "FFFFFF", titleColor: "1E293B", bodyColor: "475569", accent: "3B82F6", font: "Inter" }, // Blue/Slate
  corporate: { background: "F8FAFC", titleColor: "0F172A", bodyColor: "334155", accent: "0F172A", font: "Arial" }, // Navy/Grey
  minimal: { background: "FFFFFF", titleColor: "000000", bodyColor: "404040", accent: "000000", font: "Helvetica" }, // Black/White
  vibrant: { background: "FFF1F2", titleColor: "9F1239", bodyColor: "881337", accent: "F43F5E", font: "Verdana" }, // Rose/Red
  dark: { background: "1E293B", titleColor: "F8FAFC", bodyColor: "CBD5E1", accent: "60A5FA", font: "Arial" }, // Dark Slate
};

export const exportToPPTX = (data: PresentationData) => {
  const pptx = new PptxGenJS();
  const theme = THEMES[data.theme] || THEMES.modern;
  const animOpts = data.enableAnimations ? { type: "FADE" as const, duration: 800 } : undefined;

  // Set Metadata
  pptx.author = "SlidecraftAI";
  pptx.company = "SlidecraftAI";
  pptx.title = data.title;
  pptx.subject = data.subtitle || "Presentation";

  // 1. Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: theme.background };
  
  titleSlide.addText(data.title, {
    x: "5%", y: "35%", w: "90%",
    fontSize: 44, bold: true, align: "center",
    color: theme.titleColor, fontFace: theme.font,
    // @ts-ignore - pptxgenjs types may vary slightly
    animation: animOpts
  });

  if (data.subtitle) {
    titleSlide.addText(data.subtitle, {
      x: "10%", y: "55%", w: "80%",
      fontSize: 20, align: "center",
      color: theme.bodyColor, fontFace: theme.font,
      // @ts-ignore
      animation: data.enableAnimations ? { type: "FADE" as const, duration: 800, delay: 500 } : undefined
    });
  }

  // Add decorative accent line
  titleSlide.addShape(pptx.ShapeType.rect, {
    x: "45%", y: "65%", w: "10%", h: 0.1,
    fill: { color: theme.accent },
    // @ts-ignore
    animation: data.enableAnimations ? { type: "flyIn" as const, duration: 1000, delay: 800 } : undefined
  });

  // 2. Content Slides
  data.slides.forEach((slide) => {
    const slidePage = pptx.addSlide();
    slidePage.background = { color: theme.background };
    
    // Header
    slidePage.addText(slide.title, {
      x: "5%", y: "5%", w: "90%", h: 1,
      fontSize: 28, bold: true,
      color: theme.titleColor, align: "left",
      fontFace: theme.font,
      // @ts-ignore
      animation: animOpts
    });

    // Divider Line
    slidePage.addShape(pptx.ShapeType.line, { 
      x: "5%", y: 1.1, w: "90%", h: 0, 
      line: { color: theme.accent, width: 2 } 
    });

    // Content logic
    const hasVisual = !!slide.imageUrl || !!slide.chart;
    
    // Text Column
    slidePage.addText(slide.content.map(c => ({ text: c, options: { breakLine: true } })), {
      x: "5%",
      y: 1.4,
      w: hasVisual ? "45%" : "90%",
      h: "75%",
      fontSize: 16,
      color: theme.bodyColor,
      bullet: { type: "number", color: theme.accent },
      lineSpacing: 24,
      valign: "top",
      fontFace: theme.font,
      // @ts-ignore
      animation: data.enableAnimations ? { type: "FADE" as const, duration: 1000, delay: 300 } : undefined
    });

    // Visual Column (Right Side)
    if (slide.chart) {
        const chartType = slide.chart.type === 'pie' ? pptx.charts.PIE : 
                          slide.chart.type === 'line' ? pptx.charts.LINE : pptx.charts.BAR;
        
        const chartData = [{
            name: slide.chart.seriesName || "Data",
            labels: slide.chart.labels,
            values: slide.chart.values
        }];

        slidePage.addChart(chartType, chartData, { 
            x: "55%", y: 1.5, w: "40%", h: 3.5,
            chartColors: [theme.accent, theme.bodyColor, theme.titleColor],
            chartColorsOpacity: 90,
            showTitle: true, title: slide.chart.title,
            titleColor: theme.titleColor,
            titleFontSize: 12
        });
    } else if (slide.imageUrl) {
        // Use the generated base64 image
        slidePage.addImage({
            data: `image/png;base64,${slide.imageUrl}`,
            x: "55%", y: 1.5, w: "40%", h: 3.5,
            sizing: { type: "contain", w: "40%", h: 3.5 },
             // @ts-ignore
             animation: data.enableAnimations ? { type: "flyIn" as const, duration: 1200, delay: 500 } : undefined
        });
    } else if (slide.imagePrompt) {
         // Fallback to pollinations if generation failed or wasn't triggered
         const encodedPrompt = encodeURIComponent(slide.imagePrompt);
         slidePage.addImage({
            path: `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true`,
            x: "55%", y: 1.5, w: "40%", h: 3.5,
            sizing: { type: "contain", w: "40%", h: 3.5 },
             // @ts-ignore
             animation: data.enableAnimations ? { type: "flyIn" as const, duration: 1200, delay: 500 } : undefined
        });
    }

    // Speaker Notes
    if (slide.speakerNotes) {
      slidePage.addNotes(slide.speakerNotes);
    }
  });

  // Save the file
  pptx.writeFile({ fileName: `${data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pptx` });
};