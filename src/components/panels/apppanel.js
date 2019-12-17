import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 10px;
  padding: 5px;
  background: rgba(0,0,0,0.1);
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-weight: 100;
`

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  display: inline-block;
  transition: all 150ms linear;

  &:hover {
    transform: translateY(-5px);
    transition: color 0.25s;
  }

  &::before,
  &::after {
    // Set border to invisible, so we don't see a 4px border on a 0x0 element before the transition starts
    border: 2px solid transparent;
    width: 0;
    height: 0;
  }

  // This covers the top & right borders (expands right, then down)
  &::before {
    top: 0;
    left: 0;
  }

  // And this the bottom & left borders (expands left, then up)
  &::after {
    bottom: 0;
    right: 0;
  }
  
  &:hover {
    color: #67b246;
  }

  // Hover styles
  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
  }

  &:hover::before {
    border-top-color: #67b246; // Make borders visible
    border-right-color: #67b246;
    transition:
      width 0.25s ease-out, // Width expands first
      height 0.25s ease-out 0.25s; // And then height
  }

  &:hover::after {
    border-bottom-color: #67b246; // Make borders visible
    border-left-color: #67b246;
    transition:
      border-color 0s ease-out 0.5s, // Wait for ::before to finish before showing border
      width 0.25s ease-out 0.5s, // And then exanding width
      height 0.25s ease-out 0.75s; // And finally height
  }
`

const AppPanel = (props) => {
  return (
    <Link target='_blank' href={props.app.url}>
      <Wrapper>
        {props.app.name}
      </Wrapper>
    </Link>
  )
}

export default AppPanel
