import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
