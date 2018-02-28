/* eslint-disable no-nested-ternary */
import React from 'react'
import classNames from 'classnames'
import Col from 'react-bootstrap/lib/Col'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'

import { propTypes, defaultProps } from './propTypes.js'

const WrapperField = ({
  children,
  bsSize,
  labelCol,
  errorMessage,
  feedback,
  validationState,
  placeholder,
  noLabel,
  componentClass,
  htmlFor,
  srOnly,
  label,
  labelText,
  value,
  statical,
  inputGroup,
  leftInputGroupAddon,
  leftInputGroupButton,
  leftInputGroup,
  rightInputGroupAddon,
  rightInputGroupButton,
  rightInputGroup,
  helpText
}) => (
  <FormGroup bsSize={bsSize} validationState={errorMessage ? 'error' : value && feedback ? null : validationState}>
    {componentClass !== 'checkbox' &&
      (label || placeholder) &&
      !noLabel &&
      (labelCol ? (
        <Col sm={labelCol} componentClass={ControlLabel}>
          {label || placeholder || ''}
        </Col>
      ) : (
        <ControlLabel htmlFor={htmlFor} srOnly={srOnly}>
          {label || placeholder || ''}
        </ControlLabel>
      ))}
    {labelText && <HelpBlock style={{ marginTop: -5 }}>{labelText}</HelpBlock>}
    <div className={classNames({ [`col-sm-${12 - labelCol}`]: labelCol > 0 })}>
      {inputGroup ? (
        <InputGroup>
          {leftInputGroupAddon ? (
            <InputGroup.Addon>{leftInputGroupAddon}</InputGroup.Addon>
          ) : leftInputGroupButton ? (
            <InputGroup.Button>{leftInputGroupButton}</InputGroup.Button>
          ) : (
            <span>{leftInputGroup}</span>
          )}
          <div>{children}</div>
          {rightInputGroupAddon ? (
            <InputGroup.Addon>{rightInputGroupAddon}</InputGroup.Addon>
          ) : rightInputGroupButton ? (
            <InputGroup.Button>{rightInputGroupButton}</InputGroup.Button>
          ) : (
            <span>{rightInputGroup}</span>
          )}
        </InputGroup>
      ) : statical ? (
        <FormControl.Static>{value}</FormControl.Static>
      ) : (
        <div>{children}</div>
      )}
      {errorMessage && <HelpBlock>{errorMessage}</HelpBlock>}
      {feedback && <FormControl.Feedback />}
      {helpText && <HelpBlock>{helpText}</HelpBlock>}
    </div>
  </FormGroup>
)

WrapperField.propTypes = {
  ...propTypes
}
WrapperField.defaultProps = {
  ...defaultProps
}

export default WrapperField
