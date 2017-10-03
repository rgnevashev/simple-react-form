import React from 'react'
import CommonTextField from './CommonTextField.js'

export default class TextareaField extends CommonTextField {
  constructor(props) {
    super(props)

    this.fieldType = 'text'
    this.componentClass = 'textarea'
  }
}
