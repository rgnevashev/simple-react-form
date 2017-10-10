import React from 'react'
import PropTypes from 'prop-types'
import _ from 'underscore'

const withOptions = (component) => {
  component.propTypes = {
    ...component.propTypes,
    options: PropTypes.any
  }

  return class extends component {

    getOptions() {
      let options = []
      if (this.props.options) {
        if (typeof this.props.options === 'function') {
          options = this.props.options()
        } else {
          options = this.props.options
        }
      } else if (this.props.fieldSchema && this.props.fieldSchema.allowedValues) {
        let allowedValues = this.props.fieldSchema.allowedValues
        if (typeof allowedValues === 'function') {
          allowedValues = this.props.fieldSchema.allowedValues()
        }
        options = allowedValues.map(allowedValue => (
          { label: allowedValue, value: allowedValue }
        ))
      }
      if (options && options.length && options.map) {
        options = options.map((option) => {
          if (_.isString(option)) {
            return { label: option, value: option }
          }
          return option
        })
      }
      if (this.props.createable) {
        const { value } = this.state
        if (value && value.length && value.forEach) {
          value.forEach((val) => {
            if (_.isString(val)) {
              if (!_.contains(_.pluck(options || [], 'value'), val)) {
                options.push({ label: val, value: val })
              }
            } else {
              if (!_.contains(_.pluck(options || [], 'value'), val.value)) {
                options.push(val)
              }
            }
          })
        }
      }
      if (this.props.placeholder && !this.props.passProps.multi) {
        if (!options || !options.length || options[0].value) {
          options.unshift({ label: this.props.placeholder, value: '' })
        }
      }
      if (!options) {
        console.error('You must set the options for the select field')
      }
      return options
    }
  }
}

export default withOptions
