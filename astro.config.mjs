import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://teddiur.netlify.app/",
  integrations: [react()]
});