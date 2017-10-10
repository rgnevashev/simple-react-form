import React from 'react'
import PropTypes from 'prop-types'
import FormControl from 'react-bootstrap/lib/FormControl'
import Select from 'react-select/lib/Select'
import Creatable from 'react-select/lib/Creatable'
import Async from 'react-select/lib/Async'
import AsyncCreatable from 'react-select/lib/AsyncCreatable'

//import 'react-select/dist/react-select.css'

import withOptions from './withOptions.js'
import CommonTextField from './CommonTextField.js'
import WrapperField from './WrapperField.js'

@withOptions
export default class SelectField extends CommonTextField {
  constructor(props) {
    super(props)

    this.fieldType = 'select'
    this.componentClass = 'select'
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange(event) {
    const value = (this.props.selectable || this.props.async || this.props.createable) ?
      (!this.props.async ? (this.props.passProps.multi ? event.map(item => item.value) : event && event.value) : event) :
      event.target.value
    this.setState({ value })
    this.props.onChange(this.props.singleValue && typeof value === 'object' ? value.value : value)
  }

  loadOptions(input, done) {
    Meteor.call(this.props.method, input, (err, options) => (
      done(err, {
        options,
        complete: false,
        cache: false
      })
    ))
  }

  render() {
    const props = this.childProps()
    const { value } = this.state

    return (
      <WrapperField {...props}>
        {props.selectable ?
          <Select
            value={value}
            disabled={props.disabled}
            placeholder={props.placeholder}
            options={this.getOptions()}
            onChange={changes => this.onChange(changes)}
            {...props.passProps}
          /> :
          props.async && props.createable ?
            <AsyncCreatable
              value={value}
              disabled={props.disabled}
              placeholder={props.placeholder}
              options={this.getOptions()}
              onChange={changes => this.onChange(changes)}
              loadOptions={(input, dode) => this.loadOptions(input, dode)}
              {...props.passProps}
            /> :
            props.async ?
              <Async
                value={value}
                disabled={props.disabled}
                placeholder={props.placeholder}
                options={this.getOptions()}
                onChange={changes => this.onChange(changes)}
                loadOptions={(input, dode) => this.loadOptions(input, dode)}
                {...props.passProps}
              /> :
              props.createable ?
                <Creatable
                  value={value}
                  disabled={props.disabled}
                  placeholder={props.placeholder}
                  options={this.getOptions()}
                  onChange={changes => this.onChange(changes)}
                  {...props.passProps}
                /> :
                <FormControl
                  value={props.value}
                  type={props.fieldType}
                  placeholder={props.placeholder}
                  disabled={props.disabled}
                  componentClass={props.componentClass}
                  onChange={event => this.onChange(event)}
                  onKeyDown={event => this.onKeyDown(event)}
                  onBlur={() => props.onChange(value)}
                  {...props.passProps}
                >
                  {this.getOptions().map(item => <option key={`${item.label}-${item.value}`} value={item.value}>{item.label}</option>)}
                </FormControl>
        }
      </WrapperField>
    )
  }
}
SelectField.propTypes = {
  ...SelectField.propTypes,
  async: PropTypes.bool,
  createable: PropTypes.bool,
  selectable: PropTypes.bool,
  method: PropTypes.string,
  singleValue: PropTypes.bool
}
SelectField.defaultProps = {
  ...SelectField.defaultProps,
  async: false,
  createable: false,
  selectable: false,
  singleValue: false
}
