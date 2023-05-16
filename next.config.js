const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
  },
  /*compiler: {
    styledComponents: true
  },*/
  images: {
    domains: ['http.cat'],
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/x-data-grid': {
      transform: '@mui/x-data-grid/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    },
    '@mui/base': {
      transform: '@mui/base/{{member}}'
    },
    '@mui/x-date-pickers': {
      transform: '@mui/x-date-pickers/{{member}}'
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
    }
  }
}

module.exports = nextConfig;
