import PropTypes from 'prop-types'

export const fieldTypePropTypes = {
  /**
   * The current value of the field
   */
  value: PropTypes.any,

  /**
   * Field label
   */
  label: PropTypes.any,

  /**
   * The error message if there is a error
   */
  errorMessage: PropTypes.string,

  /**
   * Call this function when the value changes
   */
  onChange: PropTypes.func.isRequired,

  /**
   * If the input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * The schema for the field
   */
  fieldSchema: PropTypes.object,

  /**
   * The schema for the object
   */
  schema: PropTypes.object,

  /**
   * Use hint instead of label
   */
  useHint: PropTypes.bool,

  /**
   * Form
   */
  form: PropTypes.object.isRequired,

  /**
   * The name of the field
   */
  fieldName: PropTypes.string.isRequired,

  /**
   * The props that must be passed to the child component
   */
  passProps: PropTypes.object
}

export const fieldPropTypes = {
  /**
   * The label of the field.
   */
  label: PropTypes.any,

  /**
   * The name of the field in the object.
   */
  fieldName: PropTypes.string.isRequired,

  /**
   * Should show label
   */
  showLabel: PropTypes.bool,

  /**
   * Use hint instead of label.
   */
  useHint: PropTypes.bool,

  /**
   * The field should be read only mode.
   */
  disabled: PropTypes.bool,

  /**
   * The type of the input. It can be a component
   */
  type: PropTypes.any,

  /**
   * Pass a error message
   */
  errorMessage: PropTypes.string
}

export const formPropTypes = {
  /**
   * The object that has the values of the form.
   */
  state: PropTypes.object,
  /**
   * Alias of state
   */
  doc: PropTypes.object,

  /**
   * A callback that fires when the form value changes.
   * The argument will be the value.
   */
  onChange: PropTypes.func,

  /**
   * The Mongo Collection for the form.
   */
  collection: PropTypes.object,

  /**
   * The simple schema for the form.
   */
  schema: PropTypes.object,

  /**
   * The type of the form. insert or update.
   */
  type: PropTypes.oneOf(['insert', 'update', 'function']),

  /**
   * Set to true to enable automatic form submission for a type="update" form.
   * When the form change event is emitted, the change will be automatically
   * saved to the database.
   */
  autoSave: PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep empty string values when
   * cleaning the form document.
   */
  removeEmptyStrings: PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip filtering out unknown
   * properties when cleaning the form document.
   */
  filter: PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep leading and trailing
   * spaces for string values when cleaning the form document.
   */
  trimStrings: PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip autoconverting property
   * values when cleaning the form document.
   */
  autoConvert: PropTypes.bool,

  /**
   * Replace the current document if the one in the props changes.
   */
  replaceOnChange: PropTypes.bool,

  /**
   * Clear the form after a successful insert.
   * Only works on insert and function types.
   */
  clearOnSuccess: PropTypes.bool,

  /**
   * Keep arrays when updating.
   */
  keepArrays: PropTypes.bool,

  /**
   * A function that is called when the form action finished with success.
   */
  onSuccess: PropTypes.func,

  /**
   * A function that is called when the form action error.
   */
  onError: PropTypes.func,
  /**
   * A function that is called when the form is submitted.
   */
  onSubmit: PropTypes.func,

  /**
   * Id of the form.
   */
  formId: PropTypes.string,

  /**
   * The component for the array wrapper
   */
  arrayComponent: PropTypes.any,

  /**
   * The component for the object wrapper
   */
  objectComponent: PropTypes.any,

  /**
   * Show errors in the console
   */
  logErrors: PropTypes.bool,

  /**
   * Commit only changes
   */
  commitOnlyChanges: PropTypes.bool,

  /**
   * Minimum wait time between auto saves
   */
  autoSaveWaitTime: PropTypes.number,

  /**
   * Fields to be omited
   */
  omit: PropTypes.arrayOf(PropTypes.string),

  /**
   * Validate schema. Only for onSubmit
   */
  validate: PropTypes.bool,

  /**
   * The child components
   */
  children: PropTypes.any,

  /**
   * Render form tag
   */
  useFormTag: PropTypes.bool,

  /**
   * Pass error messages
   */
  errorMessages: PropTypes.object
}

export const objectComponentPropTypes = {
  ...fieldTypePropTypes,

  /**
   * Each item component
   */
  children: PropTypes.any
}

export const arrayComponentPropTypes = {
  ...fieldTypePropTypes,

  /**
   * The add button label
   */
  addLabel: PropTypes.string,

  /**
   * Show the add button
   */
  showAddButton: PropTypes.bool,

  /**
   * Show the remove button
   */
  showRemoveButton: PropTypes.bool,

  /**
   * The remove label
   */
  removeLabel: PropTypes.string,

  /**
   *
   */
  autoAddItem: PropTypes.bool,

  /**
   * The label for the field
   */
  label: PropTypes.string,

  /**
   * Each item component
   */
  children: PropTypes.any,

  /**
   * Pass a function that returns the children components for the current item.
   * The inputs of the function will be value and index.
   * This is useful when you want to change the view of a item in the array depending
   * on the current value.
   */
  renderItem: PropTypes.func
}

export const propTypes = {
  ...fieldTypePropTypes,
  bsSize: PropTypes.string, // FormGroup one of: "lg", "large", "sm", "small"
  validationState: PropTypes.string, // FormGroup one of: 'success', 'warning', 'error', null
  fieldType: PropTypes.string, // FormControl:type Only relevant if componentClass is 'input'
  htmlFor: PropTypes.string, // ControlLabel
  srOnly: PropTypes.bool, // ControlLabel
  labelCol: PropTypes.number, // ControlLabel
  leftInputGroupAddon: PropTypes.any, // InputGroup.Addon
  leftInputGroupButton: PropTypes.any, // InputGroup.Button
  leftInputGroup: PropTypes.any, // InputGroup
  rightInputGroupAddon: PropTypes.any, // InputGroup.Addon
  rightInputGroupButton: PropTypes.any, // InputGroup.Button
  rightInputGroup: PropTypes.any, // InputGroup
  inputGroup: PropTypes.bool, // InputGroup
  helpText: PropTypes.any, // HelpBlock
  labelText: PropTypes.any,
  placeholder: PropTypes.any, // FormControl
  statical: PropTypes.bool,
  feedback: PropTypes.bool,
  noLabel: PropTypes.bool,
  changeOnKeyDown: PropTypes.bool
}

export const defaultProps = {
  validationState: null,
  srOnly: false,
  labelCol: 0,
  inputGroup: false,
  statical: false,
  feedback: false,
  noLabel: false,
  changeOnKeyDown: true
}
