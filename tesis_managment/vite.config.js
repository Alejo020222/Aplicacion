import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import urlPlugin from "@rollup/plugin-url";

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    urlPlugin({
      include: ["**/*.woff", "**/*.woff2", "**/*.ttf", "**/*.eot"],
    }),
  ],
  // resolve: {
  //   alias: {
  //     "/": "/src/",
  //   },
  // },
});
