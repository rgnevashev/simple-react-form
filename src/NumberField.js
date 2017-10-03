import React from 'react'
import CommonTextField from './CommonTextField.js'

export default class NumberField extends CommonTextField {
  constructor(props) {
    super(props)

    this.fieldType = 'number'
    this.componentClass = 'input'
  }
}
