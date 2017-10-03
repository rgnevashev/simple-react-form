import React from 'react'
import CommonTextField from './CommonTextField.js'

export default class PasswordField extends CommonTextField {
  constructor(props) {
    super(props)

    this.fieldType = 'password'
    this.componentClass = 'input'
  }
}
