import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  & > * {
    max-width: 50%;
  }
`

export default class FormContainer extends Component {
  render() {
    return <Container>{this.props.children}</Container>
  }
}
