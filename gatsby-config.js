module.exports = {
  siteMetadata: {
    title: "Newtelco Landing",
    description: "Homepage for Newtelco Intranet",
    author: "Nico Domino",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "apps",
        path: `${__dirname}/src/images/apps`,
      },
    },
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {
            family: "Open Sans",
            variants: ["300", "400", "700"],
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Newtelco Landing",
        short_name: "NT Home",
        start_url: "/",
        background_color: "#575757",
        theme_color: "#575757",
        display: "standalone",
        icon: "src/images/icon-144x144.png",
      },
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data`,
      },
    },
    "gatsby-plugin-offline",
  ],
}
