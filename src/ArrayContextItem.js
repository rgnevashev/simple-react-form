import React from 'react'
import PropTypes from 'prop-types'

class ArrayContextItem extends React.Component {
  getChildContext() {
    return {
      parentFieldName: `${this.props.fieldName}.${this.props.index}`
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

ArrayContextItem.propTypes = {
  children: PropTypes.any,
  index: PropTypes.number.isRequired,
  fieldName: PropTypes.string.isRequired
}

ArrayContextItem.childContextTypes = {
  parentFieldName: PropTypes.string
}

export default ArrayContextItem
