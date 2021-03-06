import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import FormContainer from "../FormContainer"
import styled from "styled-components"

import { camelToTitle } from "../../functions/library"

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8ch, 1fr));
  grid-gap: 1rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: ${props => (props.row ? "flex-start" : "flex-end")};
  padding: 0.5rem;
  grid-column: span ${props => (props.span ? props.span : "1")};
  & label {
    font-size: 1rem;
  }
  & input {
    padding: 0.25rem;
  }
`

export default class ClientInfo extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    clientInfo: PropTypes.shape({
      name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
        uniqueID: PropTypes.string
      }).isRequired, // Redundant?
      address: PropTypes.shape({
        line1: PropTypes.string.isRequired,
        line2: PropTypes.string,
        town: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired
      }).isRequired
    })
  }

  handleChange(e) {
    const { name, value } = e.target
    const { category } = e.target.dataset
    const clientInfo = { ...this.props.clientInfo }
    clientInfo[category][name] = value
    this.props.handleChange({ clientInfo })
  }

  render() {
    return (
      <FormContainer header="Client Info">
        {Object.keys(this.props.clientInfo).map(category => (
          <Fragment key={category}>
            <h3>{camelToTitle(category)}</h3>
            <InputRow>
              {Object.keys(this.props.clientInfo[category]).map(field => (
                <InputGroup key={field}>
                  <label htmlFor={field}>{camelToTitle(field)}</label>
                  <input
                    type="text"
                    data-category={category}
                    name={field}
                    onChange={this.handleChange}
                    value={this.props.clientInfo[category][field]}
                  />
                </InputGroup>
              ))}
            </InputRow>
          </Fragment>
        ))}
      </FormContainer>
    )
  }
}
