import React, { useEffect } from "react"
import styled from "styled-components"
import UniversalTilt from "universal-tilt.js"

const Wrapper = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 5px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.2);
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  font-family: "HK Grotesk Light", Arial, Helvetica, sans-serif;
  font-weight: 100;
  transition: color 250ms ease-in-out, box-shadow 250ms ease-in-out;

  // Glassmorphism
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(203, 207, 252, 0.1);
  backdrop-filter: blur(20px);

  /* background: rgb(115 115 115 / 30%);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgb(120 120 120 / 30%) 42%,
    rgb(51 51 51 / 30%) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgb(122 122 122 / 30%); */

  /* &::before,
  &::after {
    box-sizing: inherit;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 4px solid transparent;
    border-radius: 10px;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
  } */
  &:hover {
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px 0 rgba(203, 207, 252, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  /* &:hover {
    color: #fff;
  }
  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  &:hover::before {
    border-top-color: #fff;
    border-right-color: #fff;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }
  &:hover::after {
    border-bottom-color: #fff;
    border-left-color: #fff;
    transition: height 0.25s ease-out, width 0.25s ease-out 0.25s;
  } */
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: #333;
  display: inline-block;
  transition: all 150ms linear;

  &:focus {
    outline: none;

    & .wrapper {
      border-radius: 5px;
      box-shadow: 0 0 0 4px rgba(103, 178, 70, 0.3);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`

const AppPanel = (props) => {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const elems = document.querySelectorAll("#tilt")
      UniversalTilt.init({
        elements: elems,
        settings: {
          scale: 1.2,
          reverse: true,
        },
      })
    }
  }, [])

  return (
    <Link target="_blank" href={props.app.url}>
      <Wrapper
        className="wrapper"
        id="tilt"
        style={{ transformStyle: "preserve-3d" }}
      >
        <span style={{ transform: "translateZ(20px)" }}>{props.app.name}</span>
      </Wrapper>
    </Link>
  )
}

export default AppPanel
