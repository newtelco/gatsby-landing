import React from 'react'
import styled from 'styled-components'
import Tilt from 'react-parallax-tilt'

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

  &:hover {
    transform: translateY(-5px);
    transition: all 150ms linear;
  }

  &::before, &::after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }


  & {
    transition: color 0.25s;
  }
  &::before, &::after {
    border: 4px solid transparent;
    border-radius: 10px;
    width: 0;
    height: 0;
  }
  &::before {
    top: 0;
    left: 0;
  }
  &::after {
    bottom: 0;
    right: 0;
  }
  &:hover {
    color: #60daaa;
  }
  &:hover::before, &:hover::after {
    width: 100%;
    height: 100%;
  }
  &:hover::before {
    border-top-color: #60daaa;
    border-right-color: #60daaa;
    border-radius: 10px;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }
  &:hover::after {
    border-bottom-color: #60daaa;
    border-left-color: #60daaa;
    border-radius: 10px;
    transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s;
  }

  &:hover {
    color: #fff;
  }
  &::after {
    top: 0;
    left: 0;
  }
  &:hover::before {
    border-top-color: #fff;
    border-radius: 10px;
    border-right-color: #fff;
  }
  &:hover::after {
    border-bottom-color: #fff;
    border-radius: 10px;
    border-left-color: #fff;
    transition: height 0.25s ease-out, width 0.25s ease-out 0.25s;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  display: inline-block;
  transition: all 150ms linear;
`

const AppPanel = (props) => {
  return (
    <Link target='_blank' href={props.app.url}>
      <Tilt
        tiltReverse
        tiltMaxAngleX={35}
        tiltMaxAngleY={35}
        gyroscope
      >
        <Wrapper>
          {props.app.name}
        </Wrapper>
      </Tilt>
    </Link>
  )
}

export default AppPanel
