/** @type {{reactStrictMode: boolean, experimental: {serverComponentsExternalPackages: string[], appDir: boolean, modularizeImports: {"@mui/lab": {transform: string}, "@mui/material": {transform: string}, "@mui/icons-material/?(((\\w*)?/?)*)": {transform: string}}}, compiler: {styledComponents: boolean}}} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
    modularizeImports: {
      '@mui/material': {
        transform: '@mui/material/{{member}}'
      },
      '@mui/lab': {
        transform: '@mui/lab/{{member}}'
      },
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
      }
    }
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
