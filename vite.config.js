import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Import `remixVitePlugin` from CommonJS
import remixDev from "@remix-run/dev";
const remixVitePlugin = remixDev.remixVitePlugin;

export default defineConfig({
    plugins: [react(), remixVitePlugin()],
});
