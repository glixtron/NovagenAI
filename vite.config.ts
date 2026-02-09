import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // securely map all API keys to build environment
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY),
      'process.env.ANTHROPIC_API_KEY': JSON.stringify(env.ANTHROPIC_API_KEY),
      'process.env.STABILITY_API_KEY': JSON.stringify(env.STABILITY_API_KEY),
      'process.env.REPLICATE_API_KEY': JSON.stringify(env.REPLICATE_API_KEY),
      'process.env.ELEVENLABS_API_KEY': JSON.stringify(env.ELEVENLABS_API_KEY),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(env.DEEPSEEK_API_KEY)
    },
    build: {
      outDir: 'dist', // Vercel expects 'dist' folder
      sourcemap: false, // Disable source maps for security in production
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            // Simple string chunk names for Vercel compatibility
            if (id.includes('multiAIService')) {
              return 'multiAIService';
            }
            if (id.includes('LogoDesigner')) {
              return 'LogoDesigner';
            }
          }
        }
      }
    },
    server: {
      port: 3000
    }
  };
});