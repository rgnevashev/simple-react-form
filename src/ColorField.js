/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import * as ColorPickers from 'react-color'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class ColorField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayColorPicker: false,
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange(value) {
    this.setState({ value })
  }

  handleChangeComplete(value) {
    this.setState({ value })
    this.props.onChange(value)
    this.handleClose()
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose() {
    this.setState({ displayColorPicker: false })
  }

  render() {
    const { value, displayColorPicker } = this.state
    const styles = {
      color: {
        width: '40px',
        height: '16px',
        borderRadius: '2px',
        backgroundColor: value
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }
    const props = {
      ...this.props.passProps,
      color: value,
      disabled: this.props.disabled,
      onChange: ({ hex }) => this.onChange(hex),
      onChangeComplete: ({ hex }) => this.handleChangeComplete(hex)
    }

    return (
      <WrapperField {...this.props}>
        <div>
          <div style={styles.swatch} onClick={() => this.handleClick()}>
            <div style={styles.color} />
          </div>
          {displayColorPicker &&
            <div style={styles.popover}>
              <div style={styles.cover} onClick={() => this.handleClose()} />
              {React.createElement(ColorPickers[this.props.component], props)}
            </div>
          }
        </div>
      </WrapperField>
    )
  }
}
ColorField.propTypes = {
  ...propTypes,
  component: PropTypes.string
}
ColorField.defaultProps = {
  ...defaultProps,
  component: 'SwatchesPicker'
}
