/* eslint-disable no-nested-ternary */
import React from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-autosize-textarea'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class TextareaAutosizeField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  onChange(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    const props = this.props

    return (
      <WrapperField {...props}>
        <TextareaAutosize
          defaultValue={this.props.value}
          onChange={event => this.onChange(event)}
          onBlur={event => this.onChange(event)}
          className={classNames('form-control', this.props.className)}
          style={{ minHeight: 20 }}
          {...props.passProps}
        />
      </WrapperField>
    )
  }
}
TextareaAutosizeField.propTypes = {
  ...propTypes
}
TextareaAutosizeField.defaultProps = {
  ...defaultProps
}
