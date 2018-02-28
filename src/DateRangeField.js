/* eslint-disable no-nested-ternary */
import React from 'react'
import moment from 'moment'
import _ from 'underscore'
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import FormControl from 'react-bootstrap/lib/FormControl'
import DateRange from 'react-date-range/lib/DateRange'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

const defaultRanges = {
  'Last Year': {
    startDate: now => now.subtract(1, 'year').startOf('year'),
    endDate: now => now.subtract(1, 'year').endOf('year')
  },
  'Last 6 Months': {
    startDate: now => now.subtract(6, 'month').startOf('month'),
    endDate: now => now.subtract(1, 'month').endOf('month')
  },
  'Last 3 Months': {
    startDate: now => now.subtract(3, 'month').startOf('month'),
    endDate: now => now.subtract(1, 'month').endOf('month')
  },
  'Last Month': {
    startDate: now => now.subtract(1, 'month').startOf('month'),
    endDate: now => now.subtract(1, 'month').endOf('month')
  },
  'Past 30 Days': {
    startDate: now => now.subtract(29, 'days'),
    endDate: now => now
  },
  'Past 7 Days': {
    startDate: now => now.subtract(6, 'days'),
    endDate: now => now
  },
  Yesterday: {
    startDate: now => now.subtract(1, 'days'),
    endDate: now => now.subtract(1, 'days')
  },
  Today: {
    startDate: now => now,
    endDate: now => now
  },
  'This Month': {
    startDate: now => now.startOf('month'),
    endDate: now => now.endOf('month')
  },
  'This Year': {
    startDate: now => now.startOf('year'),
    endDate: now => now.endOf('year')
  },
  'Next 7 Days': {
    startDate: now => now,
    endDate: now => now.add(7, 'days')
  },
  'Next 30 Days': {
    startDate: now => now,
    endDate: now => now.add(30, 'days')
  },
  'Next Month': {
    startDate: now => now.add(1, 'month').startOf('month'),
    endDate: now => now.add(1, 'month').endOf('month')
  },
  'Next 3 Months': {
    startDate: now => now.add(1, 'month').startOf('month'),
    endDate: now => now.add(3, 'month').endOf('month')
  },
  'Next 6 Months': {
    startDate: now => now.add(1, 'month').startOf('month'),
    endDate: now => now.add(6, 'month').endOf('month')
  }
}

const DateRangeToggle = ({ onClick, children }) => (
  <a
    href="#"
    onClick={event => {
      event.preventDefault()
      onClick(event)
    }}
  >
    {children}
  </a>
)
DateRangeToggle.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any
}

export default class DateRangeField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || props.defaultDates
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange(range) {
    const value = {
      startDate: range.startDate.toDate(),
      endDate: range.endDate.toDate()
    }
    this.setState({ value })
    this.props.onChange(value)
  }

  valueFormatted(value) {
    if (value) {
      return [value.startDate, value.endDate]
        .filter(date => !!date)
        .map(date => date && moment(date).format('DD/MM/YYYY'))
        .join(' - ')
    }
    return ''
  }

  render() {
    const { placeholder, disabled, inputProps, dropdownProps, rangeKeys, passProps, fieldName } = this.props
    const { value } = this.state

    return (
      <WrapperField {...this.props}>
        <Dropdown id={fieldName} {...dropdownProps}>
          <DateRangeToggle bsRole="toggle">
            <FormControl type="text" componentClass="input" value={this.valueFormatted(value)} placeholder={placeholder} disabled={disabled} {...inputProps} />
          </DateRangeToggle>
          <Dropdown.Menu style={{ maxWidth: 'none', padding: 0 }}>
            <DateRange
              startDate={value && moment(value.startDate)}
              endDate={value && moment(value.endDate)}
              onInit={range => this.onChange(range)}
              onChange={range => this.onChange(range)}
              ranges={_.pick(defaultRanges, rangeKeys)}
              theme={{
                PredefinedRanges: { padding: '10px' },
                PredefinedRangesItem: { padding: '5px 8px' }
              }}
              {...passProps}
            />
          </Dropdown.Menu>
        </Dropdown>
      </WrapperField>
    )
  }
}

DateRangeField.propTypes = {
  ...propTypes,
  inputProps: PropTypes.object,
  dropdownProps: PropTypes.object,
  rangeKeys: PropTypes.array,
  defaultDates: PropTypes.object
}

DateRangeField.defaultProps = {
  ...defaultProps,
  rangeKeys: ['Last 6 Months', 'Last 3 Months', 'Last Month', 'Yesterday', 'Today', 'This Month', 'This Year', 'Next Month'],
  defaultDates: {
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  },
  dropdownProps: {
    pullRight: true
  },
  inputProps: {
    className: 'w-200'
  }
}
