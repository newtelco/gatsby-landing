import React from 'react'
import styled from 'styled-components'

const BlackOut = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.7);
  z-index: 999;
`

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 200px;
  left: calc(50% - 175px);
  bottom: auto;
  right: auto;
  width: 350px;
  border-radius: 5px;
  background: rgb(48, 51, 56);
  z-index: 9999;
`

const Header = styled.div`
  top: 0;
  left: 0;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  background-color: #1c1d23;
  color: #fff;
  font-weight: 600;
  border-radius: 5px 5px 0 0;
`

const ModalBody = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid #757575;
  border-radius: 5px;
`

const Content = styled.div`
  color: #fff;
  margin: 10px;
`

const Input = styled.input`
  position: relative;
  margin: 10px;
  font-size: 14px;
  width: 90%;
  border-radius: 4px;
  border: 2px solid #181a1f;
  padding: 6px;
  outline: none;
  background-color: #f3f3f3;
  color: #000;
`

const Helper = styled.div`
  font-size: 12px;
  margin: 10px;
  color: #1c1d23;

  & > a {
    text-decoration: none;
    color: #1c1d23;
    font-weight: 600;
  }
`

const Button = styled.button`
  width: 90%;
  margin: 0px 20px 20px 20px;
  height: 40px;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  background-color: #1c1d23;
  border: 2px solid #000;
  transition: box-shadow 250ms ease-in-out;

  &:hover {
    box-shadow: 0px 5px 10px rgba(0,0,0,0.4);
  }
`

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  saveInput = (e) => {
    e && window.localStorage.setItem('TOGGL_TOKEN', this.state.inputValue)
    this.props.close()
  }

  inputChange = (e) => {
    console.log(e.target)
    console.log(e.target.value)
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    const {
      inputValue
    } = this.state

    return (
      <BlackOut onClick={() => this.props.close()}>
        <Wrapper onClick={e => e.stopPropagation()}>
          <Header>
            Missing Key
          </Header>
          <ModalBody>
            <Content>Please input your Toggl API key</Content>
            <Input autoFocus onChange={this.inputChange} value={inputValue} />
            <Helper>If you do not have a key yet, please go <a target='_blank' rel='noopener' href='https://toggl.com/app/profile'>here</a></Helper>
          </ModalBody>
          <Button onClick={this.saveInput}>Save</Button>
        </Wrapper>
      </BlackOut>
    )
  }
}
