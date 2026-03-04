import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For user-level GitHub Pages (amjadsaadeh.github.io), base is '/'
  // If you move to a project repo like github.com/user/mysite, change to '/<repo-name>/'
  base: '/',
})
