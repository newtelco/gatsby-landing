import React, { useEffect } from "react"
import styled from "styled-components"
import UniversalTilt from "universal-tilt.js"

import gmail from "../../images/icons/gmail.svg"
import drive from "../../images/icons/drive.svg"
import threecx from "../../images/icons/threecx.svg"
import nt from "../../images/icons/nt.svg"
import password from "../../images/icons/password.svg"
import netbox from "../../images/icons/netbox.svg"

const icons = {
  telefon: threecx,
  gmail: gmail,
  gdrive: drive,
  crm: nt,
  vacation: nt,
  passwords: password,
  racks: netbox,
}

const Wrapper = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: color 250ms ease-in-out, box-shadow 250ms ease-in-out;

  // Glassmorphism

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(18px);
  transform-style: preserve-3d;
  transform: translateZ(-100px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 22px 0 rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
  }

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

const CardHeader = styled.div`
  position: absolute;
  top: -5px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${(props) => props.theme.color.accent};
  border-radius: 5px;
`

const CardTitle = styled.div`
  font-family: "Inconsolata", monospace;
  font-size: 1.5rem;
  font-weight: 200;
  margin-bottom: 1rem;
  color: #fff;
`

const ProductIcon = ({ name }) => {
  if (!icons[name]) {
    return null
  }
  const Image = icons[name]
  return <Image style={{ filter: "grayscale(1)" }} height="32" width="32" />
}

const AppPanel = (props) => {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const elems = document.querySelectorAll("#tilt")
      UniversalTilt.init({
        elements: elems,
        settings: {
          scale: 1.05,
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
        <CardHeader>
          <ProductIcon name={props.app.name.toLowerCase()} />
        </CardHeader>
        <CardTitle style={{ transform: "translateZ(20px)" }}>
          {props.app.name}
        </CardTitle>
      </Wrapper>
    </Link>
  )
}

export default AppPanel
