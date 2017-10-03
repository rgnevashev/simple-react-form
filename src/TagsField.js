/* eslint-disable no-nested-ternary */
import React from 'react'
import TagsInput from 'react-tagsinput'

//import 'react-tagsinput/react-tagsinput.css'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class TagsInputField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange(value) {
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const props = this.props
    const { value } = this.state

    return (
      <WrapperField {...props}>
        <TagsInput
          value={value || []}
          onChange={val => this.onChange(val)}
          {...props.passProps}
        />
      </WrapperField>
    )
  }
}
TagsInputField.propTypes = {
  ...propTypes
}
TagsInputField.defaultProps = {
  ...defaultProps
}
