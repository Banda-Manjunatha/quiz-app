import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Import default from @remix-run/dev
import remixDev from "@remix-run/dev";

export default defineConfig({
    plugins: [react(), remixDev.remixVitePlugin()],
});
