/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            pathname: '**',
          },
        ],
      },
   
};

module.exports = nextConfig

// images: {
//     domains: [
//         "utfs.io",
//     ]
// }