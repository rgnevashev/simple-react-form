import React from 'react'

const propTypes = {
  children: React.PropTypes.any,
  index: React.PropTypes.number.isRequired,
  fieldName: React.PropTypes.string.isRequired
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ArrayContextItem extends React.Component {
  getChildContext () {
    return {
      parentFieldName: `${this.props.fieldName}.${this.props.index}`
    }
  }

  isRN () {
    return (
      typeof navigator !== 'undefined' &&
      navigator.product === 'ReactNative'
    )
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

ArrayContextItem.propTypes = propTypes
ArrayContextItem.childContextTypes = childContextTypes
