import React from 'react'
import PropTypes from 'prop-types'
import DotObject from 'dot-object'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'
import isFunction from 'lodash/isFunction'
import omit from 'lodash/omit'
import keys from 'lodash/keys'

import ArrayComponent from './ArrayComponent'
import ObjectComponent from './ObjectComponent'
import { docToModifier, getPresentFields, cleanFields } from './utility'
import { formPropTypes } from './propTypes'

class Form extends React.Component {
  constructor(props) {
    super(props)
    const state = props.state || props.doc || {}
    this.state = {
      doc: cloneDeep(state),
      changes: {},
      validationContext: this.getSchema(props) ? this.getSchema(props).newContext() : null,
      errorMessages: props.errorMessages
    }
    this.fields = []
    this.autoSave = debounce(this.submit.bind(this), props.autoSaveWaitTime)
    this.errorMessages = props.errorMessages
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }

  getChildContext() {
    return {
      schema: this.getSchema(),
      doc: this.state.doc,
      onChange: this.onValueChange,
      errorMessages: this.state.errorMessages,
      form: this
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.replaceOnChange || this.props.formId !== nextProps.formId) {
      const state = this.props.state || this.props.doc || {}
      const nextState = nextProps.state || nextProps.doc || {}
      if (!isEqual(state, nextState)) {
        this.setState({ doc: cloneDeep(nextState), changes: {} })
      }
    }

    if (!isEqual(nextProps.errorMessages, this.props.errorMessages)) {
      this.setState({ errorMessages: nextProps.errorMessages })
      this.errorMessages = nextProps.errorMessages
    }
  }

  getSchema(props) {
    props = props || this.props
    if (props.schema) {
      return props.schema
    } else if (props.collection) {
      return props.collection.simpleSchema()
    } else {
      //console.log('no schema was specified.')
    }
  }

  /*
   * This is necesarry to allow the form to filter the fields when updating
   */
  registerComponent({ field, component }) {
    this.fields.push({ field, component })
  }

  unregisterComponent(fieldName) {
    const index = findIndex(this.fields, ({ field }) => field === fieldName)
    this.fields.splice(index, 1)
  }

  callChildFields({ method, input }) {
    this.fields.map((field) => {
      if (isFunction(field.component[method])) {
        field.component[method](input)
      }
    })
  }

  onCommit(error, docId) {
    this.setState({ errorMessages: {} })
    if (error) {
      if (error.reason === 'INVALID') {
        this.handleServerError(error)
      } else {
        this.handleError()
      }
      if (this.props.logErrors) {
        console.log(`[form-${this.props.formId}-error]`, error)
      }

      if (this.props.onError) {
        this.props.onError(error)
      }
    } else {
      this.callChildFields({ method: 'onSuccess' })
      if (isFunction(this.props.onSuccess)) {
        this.props.onSuccess(docId)
      }
      if (this.props.clearOnSuccess) {
        this.clearForm()
      } else {
        // if clearOnSuccess is false, we still need to clear the changes
        this.setState({ changes: {} })
      }
    }
  }

  getValidationOptions() {
    return {
      validationContext: this.props.formId,
      filter: this.props.filter,
      autoConvert: this.props.autoConvert,
      removeEmptyStrings: this.props.removeEmptyStrings,
      trimStrings: this.props.trimStrings
    }
  }

  onFormSubmit(event) {
    event.preventDefault()
    return this.submit()
  }

  submit() {
    const data = this.props.commitOnlyChanges ? this.state.changes : this.state.doc
    if (this.props.type === 'insert') {
      const doc = DotObject.object(DotObject.dot(this.state.doc))
      this.props.collection.insert(doc, this.getValidationOptions(), this.onCommit.bind(this))
    } else if (this.props.type === 'update') {
      const presentFields = getPresentFields(this.fields)
      const modifier = docToModifier(data, { keepArrays: this.props.keepArrays, fields: presentFields })
      if (!isEqual(modifier, {})) {
        this.props.collection.update(this.state.doc._id, modifier, this.getValidationOptions(), this.onCommit.bind(this))
      } else {
        this.callChildFields({ method: 'onSuccess' })
        if (isFunction(this.props.onSuccess)) {
          this.props.onSuccess()
        }
      }
    } else if (this.props.type === 'function') {
      const presentFields = getPresentFields(this.fields)
      let doc = DotObject.object(DotObject.dot(cleanFields(DotObject.dot(data), presentFields)))
      let isValid = true
      if (this.props.validate && this.getSchema()) {
        isValid = this.getSchema().namedContext(this.getValidationOptions().validationContext).validate(doc)
      }
      if (isValid) {
        if (!isFunction(this.props.onSubmit)) {
          throw new Error('You must pass a onSubmit function or set the form type to insert or update')
        }
        if (data._id) {
          doc = docToModifier(data, { keepArrays: this.props.keepArrays, fields: presentFields })
        }
        const success = this.props.onSubmit(doc)
        if (success === false) {
          this.onCommit('onSubmit error')
        } else {
          this.onCommit()
        }
        return success
      }
      this.onCommit('Validation error')
      return false
    }
  }

  cleanErrorMessages() {
    this.errorMessages = {}
    this.setState({ errorMessages: {} })
  }

  clearForm() {
    this.setState({ doc: {}, changes: {} })
  }

  setErrorMessage(fieldName, message) {
    const errorMessages = cloneDeep(this.errorMessages)
    errorMessages[fieldName] = message
    this.errorMessages = errorMessages
    this.setState({ errorMessages })
  }

  setErrorsWithContext(context) {
    const validationErrors = context.validationErrors ? context.validationErrors() : context.invalidKeys()
    const errorMessages = {}
    validationErrors.map((field) => {
      errorMessages[field.name] = context.keyErrorMessage(field.name)
    })

    if (this.props.logErrors) {
      console.log(`[form-${this.props.formId}-error-messages]`, errorMessages)
    }

    if (this.props.onError) {
      this.props.onError(errorMessages)
    }

    this.errorMessages = errorMessages
    this.setState({ errorMessages })
  }

  handleError() {
    const context = this.getSchema().namedContext(this.getValidationOptions().validationContext)
    this.setErrorsWithContext(context)
  }

  handleServerError(error) {
    const errors = JSON.parse(error.details)
    const errorMessages = {}
    errors.forEach((fieldError) => {
      errorMessages[fieldError.name] = this.getSchema().messageForError(fieldError.type, fieldError.name, null, fieldError.value)
    })
    if (this.props.logErrors) {
      console.log(`[form-${this.props.formId}-error-messages]`, errorMessages)
    }

    if (this.props.onError) {
      this.props.onError(error)
    }

    this.errorMessages = errorMessages
    this.setState({ errorMessages })
  }

  onValueChange(fieldName, newValue) {
    //  newValue = typeof newValue === 'undefined' ? null : newValue
    DotObject.del(fieldName, this.state.doc)
    const doc = DotObject.str(`val.${fieldName}`, newValue, { val: this.state.doc }).val
    DotObject.del(fieldName, this.state.changes)
    const changes = DotObject.str(`val.${fieldName}`, newValue, { val: this.state.changes }).val
    this.setState({ doc, changes })

    if (this.props.autoSave) {
      this.autoSave()
    }

    if (isFunction(this.props.onChange)) {
      this.props.onChange(this.state.doc, this.state.changes)
    }
  }

  render() {
    const domProps = omit(this.props, keys(formPropTypes))

    if (this.props.useFormTag) {
      return (
        <form {...domProps} onSubmit={this.onFormSubmit}>
          {this.props.children}
        </form>
      )
    }
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

Form.propTypes = {
  ...formPropTypes
}

Form.defaultProps = {
  type: 'function',
  keepArrays: true,
  autoSave: false,
  removeEmptyStrings: true,
  trimStrings: true,
  autoConvert: true,
  filter: true,
  replaceOnChange: true,
  clearOnSuccess: false,
  formId: 'defaultFormId',
  arrayComponent: ArrayComponent,
  objectComponent: ObjectComponent,
  logErrors: true,
  commitOnlyChanges: false,
  autoSaveWaitTime: 500,
  omit: [],
  validate: true,
  useFormTag: true,
  errorMessages: {}
}

Form.childContextTypes = {
  schema: PropTypes.object,
  doc: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errorMessages: PropTypes.object,
  form: PropTypes.any.isRequired
}

export default Form
