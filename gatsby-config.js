module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/inventory`,
        name: `inventory`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `jpg`, `png`],
          placeholder: `blurred`,
          quality: 80,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
        // Disable AVIF to prevent build issues
        failOn: `none`,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // Disable AVIF format generation
        checkSupportedExtensions: false,
      },
    },
    `gatsby-plugin-image`,
  ],
}