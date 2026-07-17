import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import os from "os";
import path from "path";

export default defineConfig({
  cacheDir: path.join(os.tmpdir(), "vite-cache-ridhiportfolio"),
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
