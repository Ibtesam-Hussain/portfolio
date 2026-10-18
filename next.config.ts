import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import mdxMermaid from "mdx-mermaid";


const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Note: rehype plugins can be added but need to be serializable
    // For now, we'll use basic MDX without extra rehype plugins
    // You can add syntax highlighting via CSS or other methods
    remarkPlugins: [
      ["mdxMermaid", { output: "svg" }],
    ],
    
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default withMDX(nextConfig);
