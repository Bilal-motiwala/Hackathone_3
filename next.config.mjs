import { hostname } from "os";
import path from "path";

const nextConfig = {
eslint: {
    ignoreDuringBuilds: true,
},
images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "cdn.sanity.io",
            pathname: '/images/**'
        }
    ]
},
};
export default nextConfig;
