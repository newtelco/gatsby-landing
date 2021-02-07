import React from "react"
import { ThemeProvider } from "styled-components"
import SEO from "./seo"
import theme from "../../../styles/theme"
import GlobalStyles from "../../../styles/GlobalStyles"
import "../../../../static/fonts/fonts.css"

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <SEO /> {/* eslint-disable-line */}
    <GlobalStyles />
    {children}
  </ThemeProvider>
)

export default Layout
