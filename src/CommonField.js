import React from 'react'
import PropTypes from 'prop-types'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class CommonField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange(value) {
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const { value } = this.state

    const children = React.cloneElement(this.props.children, {
      defaultValue: value,
      onChange: (...args) => this.onChange(this.props.children.props.onChange(...args))
    })

    return <WrapperField {...this.props}>{children}</WrapperField>
  }
}

CommonField.propTypes = {
  ...propTypes,
  children: PropTypes.any
}

CommonField.defaultProps = {
  ...defaultProps
}

/*
<Field fieldName="text" type={CommonField} >
  <input
    type="text"
    className="form-control"
    onChange={event => event.target.value}
  />
</Field>
*/
