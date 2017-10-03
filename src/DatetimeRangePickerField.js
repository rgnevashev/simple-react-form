import React from 'react'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'

import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

//import 'bootstrap-daterangepicker/daterangepicker.css'

export default class DatetimeRangePickerField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  onChangeInput(event) {
    const [startDate, endDate] = event.target.value.split(' - ')
    this.onChange(event, {
      startDate: moment(startDate, 'MM/DD/YYYY h:mm A'),
      endDate: moment(endDate, 'MM/DD/YYYY h:mm A')
    })
  }

  onChange(event, picker) {
    const value = {
      startDate: picker.startDate.toDate(),
      endDate: picker.endDate.toDate()
    }
    this.setState({ value })
    this.props.onChange(value)
  }

  label(value) {
    if (value) {
      return `${moment(value.startDate).format('MM/DD/YYYY h:mm A')} - ${moment(value.endDate).format('MM/DD/YYYY h:mm A')}`
    }
    return ''
  }

  render() {
    const props = this.props
    const { value } = this.state

    return (
      <WrapperField {...props}>
        <DateRangePicker
          startDate={value && moment(value.startDate)}
          endDate={value && moment(value.endDate)}
          onApply={(event, picker) => {
            this.onChange(event, picker)
            this.refs.pickerInput.value = this.label(picker)
          }}
          {...props.passProps}
        >
          <div className="input-group">
            <input type="text" className="form-control" defaultValue={this.label(value)} onChange={event => this.onChangeInput(event)} ref="pickerInput" />
            <span className="input-group-btn">
              <button className="btn btn-default date-range-toggle">
                <i className="fa fa-calendar" />
              </button>
            </span>
          </div>
        </DateRangePicker>
      </WrapperField>
    )
  }
}
DatetimeRangePickerField.propTypes = {
  ...propTypes
}
DatetimeRangePickerField.defaultProps = {
  ...defaultProps
}
