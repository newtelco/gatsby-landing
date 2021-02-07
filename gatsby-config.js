module.exports = {
  siteMetadata: {
    title: "Newtelco Home",
    description: "Homepage for Newtelco Intranet",
    author: "ndom91 <ndomino@newtelco.de>",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
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
        icon: "src/images/favicon.png",
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
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /src\/images\/icons/,
        },
      },
    },
    "gatsby-plugin-offline",
  ],
}
