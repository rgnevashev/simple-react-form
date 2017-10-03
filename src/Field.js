import React from 'react'
import PropTypes from 'prop-types'
import DotObject from 'dot-object'
import omit from 'lodash/omit'
import has from 'lodash/has'
import keys from 'lodash/keys'
import pick from 'lodash/pick'

import { fieldTypePropTypes, fieldPropTypes } from './propTypes'

class Field extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.registerField()
  }

  componentWillUnmount() {
    this.unregisterField()
  }

  unregisterField() {
    this.context.form.unregisterComponent(this.getFieldName())
  }

  registerField() {
    this.context.form.registerComponent({
      field: this.getFieldName(),
      component: this.element
    })
  }

  getFieldName() {
    if (this.context.parentFieldName) {
      return this.props.fieldName ? `${this.context.parentFieldName}.${this.props.fieldName}` : this.context.parentFieldName
    }
    return this.props.fieldName
  }

  onChange(value) {
    this.context.onChange(this.getFieldName(), value)
  }

  getSchema() {
    return this.context.schema
  }

  getFieldSchema() {
    return this.getSchema() ? this.getSchema().schema(this.getFieldName()) : null
  }

  getLabel() {
    if (has(this.props, 'label')) {
      return this.props.label
    } else if (this.getSchema()) {
      return this.getSchema().label(this.getFieldName())
    }
    return ''
  }

  getComponent() {
    if (this.props.type) {
      return this.props.type
    }
    throw new Error(`You have no field type "${this.getFieldName()}".`)
  }

  getValue() {
    return this.context.doc ? DotObject.pick(this.getFieldName(), this.context.doc) : undefined
  }

  getErrorMessage() {
    const errorMessages = this.context.errorMessages || {}
    return this.props.errorMessage || errorMessages[this.getFieldName()]
  }

  getChildProps() {
    /**
     * This gets the props that are defined in the propTypes of the registered component.
     */
    const fieldComponent = this.getComponent()
    const propOptions = omit(this.props, keys(fieldPropTypes))
    const schemaOptions = (this.getFieldSchema() && this.getFieldSchema().srf) || {}
    const totalOptions = { ...schemaOptions, ...propOptions }
    const allowedKeys = keys({ ...fieldTypePropTypes, ...fieldComponent.propTypes })
    const onlyAllowedOptions = pick(totalOptions, allowedKeys)

    /**
     * Options that are not registered in the propTypes are passed separatly.
     * This options are in the variable this.passProps of the component, they should be
     * passed to the main component of it.
     */
    allowedKeys.push('type')
    const notDefinedOptions = omit(totalOptions, allowedKeys)

    const props = {
      value: this.getValue(),
      label: this.props.showLabel ? this.getLabel() : null,
      useHint: this.props.useHint,
      onChange: this.onChange,
      errorMessage: this.getErrorMessage(),
      fieldSchema: this.getFieldSchema(),
      fieldName: this.getFieldName(),
      schema: this.getSchema(),
      form: this.context.form,
      disabled: this.props.disabled,
      passProps: notDefinedOptions,
      ref: 'input',
      ...onlyAllowedOptions
    }

    return props
  }

  render() {
    const component = this.getComponent()
    this.element = React.createElement(component, this.getChildProps())
    return this.element
  }
}

Field.propTypes = {
  ...fieldPropTypes
}

Field.defaultProps = {
  showLabel: true,
  useHint: false,
  disabled: false
}

Field.contextTypes = {
  schema: PropTypes.object,
  doc: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errorMessages: PropTypes.object,
  form: PropTypes.any.isRequired,
  parentFieldName: PropTypes.string
}

export default Field
