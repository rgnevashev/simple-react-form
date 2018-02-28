import React from 'react'
import PropTypes from 'prop-types'

import { objectComponentPropTypes } from './propTypes'

/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */
class ObjectComponent extends React.Component {
  getChildContext() {
    return {
      parentFieldName: this.props.fieldName
    }
  }

  getChildrenComponents() {
    if (this.props.children) {
      return this.props.children
    }
    throw new Error(`You must pass children to the object field "${this.props.fieldName}"`)
  }

  render() {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div>
          <b>{this.props.label}</b>
        </div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.getChildrenComponents()}
      </div>
    )
  }
}

ObjectComponent.propTypes = {
  ...objectComponentPropTypes
}

ObjectComponent.childContextTypes = {
  parentFieldName: PropTypes.string
}

export default ObjectComponent
