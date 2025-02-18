import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { remixVitePlugin } from "@remix-run/dev"; // Import the plugin

export default defineConfig({
    plugins: [
        react(),
        remixVitePlugin(), // Add the Remix plugin here
    ],
});
