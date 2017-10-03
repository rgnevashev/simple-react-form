import React from 'react'
import FormControl from 'react-bootstrap/lib/FormControl'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class CommonTextField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.props.onChange(this.state.value)
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value })
    if (this.props.changeOnKeyDown) {
      this.props.onChange(event.target.value)
    }
  }

  childProps() {
    const fieldType = this.props.fieldType || this.fieldType || 'text'
    const componentClass = this.componentClass || 'input'
    const props = {
      ...this.props,
      fieldType,
      componentClass
    }
    return props
  }

  render() {
    const props = this.childProps()

    return (
      <WrapperField {...props}>
        <FormControl
          ref="input"
          value={this.state.value || ''}
          type={props.fieldType}
          placeholder={props.placeholder || props.passProps.placeholder}
          disabled={props.disabled}
          componentClass={props.componentClass}
          onChange={event => this.onChange(event)}
          onKeyDown={event => this.onKeyDown(event)}
          onBlur={() => props.onChange(this.state.value)}
          {...props.passProps}
        />
      </WrapperField>
    )
  }
}

CommonTextField.propTypes = propTypes
CommonTextField.defaultProps = defaultProps
