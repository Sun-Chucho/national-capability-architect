import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        engagement: resolve(__dirname, 'engagement.html'),
        geography: resolve(__dirname, 'geography.html'),
        architecture: resolve(__dirname, 'architecture.html'),
        insights: resolve(__dirname, 'insights.html'),
        about: resolve(__dirname, 'about.html'),
        resources: resolve(__dirname, 'resources.html')
      }
    }
  }
});
