import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner";
import '@/index.css'
import Auth from './components/auth/Auth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='top-right' richColors />
    <Auth />
  </StrictMode>,
)
