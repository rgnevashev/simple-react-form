import React from 'react'
import PropTypes from 'prop-types'
import Radio from 'react-bootstrap/lib/Radio'

import { propTypes, defaultProps } from './propTypes.js'
import withOptions from './withOptions.js'
import WrapperField from './WrapperField.js'

class RadioField extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)

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

  renderOption({ props, value, option, index }) {
    if (props.renderOption) {
      return props.renderOption({ props, value, option, index, onChange: this.onChange })
    }

    return (
      <Radio
        key={`${option.label}-${option.value}-${index}`}
        name={props.fieldName}
        defaultValue={option.value}
        onChange={event => this.onChange(event.target.value)}
        checked={option.value == value}
        disabled={props.disabled}
        inline={props.inline}
        className={option.value == value && 'checked'}
        {...props.passProps}
      >
        {option.label}
      </Radio>
    )
  }

  render() {
    const props = this.props
    const { value } = this.state

    return (
      <WrapperField {...props}>
        <div className={props.parentClassName}>{this.getOptions().map((option, index) => this.renderOption({ props, value, option, index }))}</div>
      </WrapperField>
    )
  }
}
RadioField.propTypes = {
  ...propTypes,
  parentClassName: PropTypes.string,
  options: PropTypes.any,
  inline: PropTypes.bool,
  renderOption: PropTypes.func
}
RadioField.defaultProps = {
  ...defaultProps
}

export default withOptions(RadioField)
