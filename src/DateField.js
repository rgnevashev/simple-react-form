import React from 'react'
import CommonTextField from './CommonTextField.js'

export default class DateField extends CommonTextField {
  constructor(props) {
    super(props)

    this.fieldType = 'date'
    this.componentClass = 'input'
  }
}
