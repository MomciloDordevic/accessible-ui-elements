import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/accessible-ui-elements/",
  plugins: [react()],
});
