import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react(),
        async () => {
            // Use an async function for dynamic import
            const { remixVitePlugin } = await import("@remix-run/dev");
            return remixVitePlugin();
        },
    ],
});
