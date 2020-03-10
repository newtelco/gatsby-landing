import React from 'react'
import styled from 'styled-components'
import UniversalTilt from 'universal-tilt.js'

// import Tilt from 'react-parallax-tilt'

const Wrapper = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 10px;
  padding: 5px;
  background: rgba(0,0,0,0.2);
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-weight: 100;
  transition: color 0.25s;

  &::before, &::after {
    box-sizing: inherit;
    content: '';
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
  }
  &:hover {
    color: #fff;
  }
  &:hover::before, &:hover::after {
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
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  display: inline-block;
  transition: all 150ms linear;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`

const AppPanel = (props) => {
  if (typeof window !== 'undefined') {
    const elems = document.querySelectorAll('#tilt')
    UniversalTilt.init({
      elements: elems,
      settings: {
        scale: 1.2,
        reverse: true
      }
    })
  }
  return (
    <Link target='_blank' href={props.app.url}>
      <Wrapper id='tilt' style={{ transformStyle: 'preserve-3d' }}>
        <span style={{ transform: 'translateZ(20px)' }}>
          {props.app.name}
        </span>
      </Wrapper>
    </Link>
  )
}

export default AppPanel
