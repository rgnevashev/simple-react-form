/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import DateTime from 'react-datetime'
import moment from 'moment'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class DatetimeField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      timezone: nextProps.timezone
    })
  }

  onChange(date) {
    const value = _.isString(date) ? moment(date).toDate() : date.toDate()
    this.setState({ value })
    this.props.onChange(value)
  }

  convertToTz(date, timezone) {
    return date && timezone ? moment(date).tz(timezone) : moment(date)
  }

  render() {
    const props = this.props
    const { value } = this.state

    return (
      <WrapperField {...props}>
        <DateTime
          defaultValue={this.convertToTz(value, props.timezone)}
          dateFormat={props.dateFormat}
          timeFormat={props.timeFormat}
          timeConstraints={props.timeConstraints}
          value={this.convertToTz(value, props.timezone)}
          onChange={date => this.onChange(date)}
          onBlur={() => props.onChange(value)}
          inputProps={{
            placeholder: props.placeholder || props.passProps.placeholder
          }}
          {...props.passProps}
        />
      </WrapperField>
    )
  }
}

DatetimeField.propTypes = {
  ...propTypes,
  dateFormat: PropTypes.oneOf(PropTypes.string, PropTypes.bool),
  timeFormat: PropTypes.oneOf(PropTypes.string, PropTypes.bool),
  timeConstraints: PropTypes.object,
  timezone: PropTypes.any
}

DatetimeField.defaultProps = {
  ...defaultProps,
  dateFormat: 'ddd Do MMM YYYY',
  timeFormat: 'h:mma',
  timezone: false,
  timeConstraints: {
    minutes: {
      step: 5
    }
  }
}
