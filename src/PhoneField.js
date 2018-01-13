/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-number-input'

//import 'react-phone-number-input/rrui.css'
//import 'react-phone-number-input/style.css'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class PhoneField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange(value, country) {
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const { value } = this.state

    return (
      <WrapperField {...this.props}>
        <PhoneInput
          value={value}
          country={this.props.country.toUpperCase()}
          className="form-control"
          onChange={(phone, country) => this.onChange(phone, country)}
		  placeholder={this.props.placeholder}
          {...this.props.passProps}
        />
      </WrapperField>
    )
  }
}
PhoneField.propTypes = {
  ...propTypes,
  country: PropTypes.string
}
PhoneField.defaultProps = {
  ...defaultProps,
  country: 'US'
}
