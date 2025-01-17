import { fileURLToPath, URL } from "node:url";

import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";

export default defineConfig({
  server: {
    port: 7836
  },
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`
    }
  },
  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: true
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss()
  ]
});
