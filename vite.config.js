import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { remixVitePlugin } from "@remix-run/dev";

export default defineConfig({
    plugins: [react(), remixVitePlugin()],
});
