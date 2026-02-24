import react from '@vitejs/plugin-react-swc'
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({mode}) => {
  const {GOOGLE_MAPS_API_KEY = ''} = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY)
    },
    resolve: {
      alias: {
        '@vis.gl/react-google-maps/examples.js':
          'https://visgl.github.io/react-google-maps/scripts/examples.js',
          "@": path.resolve(__dirname, "./src"),
      }
    }
  };
});