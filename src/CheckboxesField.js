import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'react-bootstrap/lib/Checkbox'

import { propTypes, defaultProps } from './propTypes.js'
import withOptions from './withOptions.js'
import WrapperField from './WrapperField.js'

@withOptions
export default class CheckboxesField extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)

    this.state = {
      value: this.formater(props.value)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: this.formater(nextProps.value) })
  }

  onChange({ checked, value }) {
    const { value: val } = this.state
    const values = checked ? (val || []).concat(value) : (val || []).filter(v => v !== value)
    this.setState({ value: values })
    this.props.onChange(values)
  }

  formater(values) {
    return (values && values.length && values.map(val => val.toString())) || values
  }

  renderOption({ props, value, option, index }) {
    if (props.renderOption) {
      return props.renderOption({ props, value, option, index, onChange: this.onChange })
    }

    return (
      <Checkbox
        key={`${option.label}-${option.value}-${index}`}
        name={props.fieldName}
        defaultValue={option.value}
        onChange={event => this.onChange(event.target)}
        checked={(value || []).includes(option.value.toString())}
        disabled={props.disabled}
        inline={props.inline}
        className={(value || []).includes(option.value.toString()) && 'checked'}
        {...props.passProps}
      >
        {option.label}
      </Checkbox>
    )
  }

  render() {
    const props = this.props
    const { value } = this.state

    return (
      <WrapperField {...props}>
        <div className={props.parentClassName}>
          {this.getOptions().map((option, index) => this.renderOption({ props, value, option, index }))}
        </div>
      </WrapperField>
    )
  }
}
CheckboxesField.propTypes = {
  ...propTypes,
  parentClassName: PropTypes.string,
  options: PropTypes.any,
  inline: PropTypes.bool,
  renderOption: PropTypes.func
}
CheckboxesField.defaultProps = {
  ...defaultProps
}
