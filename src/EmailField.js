import React from 'react'
import CommonTextField from './CommonTextField.js'

export default class EmailField extends CommonTextField {
  constructor(props) {
    super(props)

    this.fieldType = 'email'
    this.componentClass = 'input'
  }
}
