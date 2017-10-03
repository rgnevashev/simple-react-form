import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import Toggle from 'react-toggle'

//import 'react-toggle/style.css'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class CheckboxField extends React.Component {
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
    const props = {
      ...this.props,
      componentClass: 'checkbox'
    }
    const { value } = this.state

    return (
      <WrapperField {...props}>
        {props.toggle ?
          <label className="checkbox" style={{ display: 'flex', alignItems: 'center' }}>
            {props.labelOff &&
              <span className={classNames('labelOff', { 'not-active': !!value })} style={{ marginRight: 5 }}>
                {props.labelOff}
              </span>
            }
            <Toggle
              checked={!!value}
              disabled={props.disabled}
              onChange={event => this.onChange(event.target.checked)}
              icons={{
                unchecked: false,
                checked: false
              }}
              {...props.passProps}
            />
            {props.label && !props.labelOn && <span style={{ marginLeft: 5 }}>{props.label}</span>}
            {props.labelOn &&
              <span className={classNames('labelOn', { 'not-active': !value })} style={{ marginLeft: 5 }}>
                {props.labelOn}
              </span>
            }
          </label> :
          <Checkbox
            defaultChecked={value}
            disabled={props.disabled}
            inline={props.inline}
            onChange={event => this.onChange(event.target.checked)}
            {...props.passProps}
          >
            {props.label}
          </Checkbox>
        }
      </WrapperField>
    )
  }
}
CheckboxField.propTypes = {
  ...propTypes,
  inline: PropTypes.bool,
  toggle: PropTypes.bool,
  labelOn: PropTypes.string,
  labelOff: PropTypes.string
}
CheckboxField.defaultProps = {
  ...defaultProps
}
