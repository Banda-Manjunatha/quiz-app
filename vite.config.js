import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react(),
        async () => {
            const remixDev = await import("@remix-run/dev");
            const remixVitePlugin = remixDev.vitePlugin; // Correct property name: vitePlugin
            return remixVitePlugin();
        },
    ],
});
