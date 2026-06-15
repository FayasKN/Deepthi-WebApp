/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows the app to work as a static export for offline/Electron use
  // Comment out "output" if deploying to Vercel instead
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export / offline
  },
};

export default nextConfig;
