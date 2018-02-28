import React from 'react'
import PropTypes from 'prop-types'
import ArrayContextItem from './ArrayContextItem'
import isArray from 'lodash/isArray'
import without from 'lodash/without'

import { arrayComponentPropTypes } from './propTypes'

class ArrayComponent extends React.Component {
  getChildContext() {
    return {
      parentFieldName: this.props.fieldName
    }
  }

  addItem(itemValue = {}) {
    let newArray = this.props.value
    if (isArray(newArray)) {
      newArray.push(itemValue)
    } else {
      newArray = [itemValue]
    }

    this.props.onChange(newArray)
  }

  removeItem(index) {
    const value = this.props.value || []
    const newArray = without(value, value[index])
    this.props.onChange(newArray)
  }

  getChildrenComponents(item, index) {
    if (this.props.renderItem) {
      return this.props.renderItem(item, index)
    }
    if (this.props.children) {
      return this.props.children
    }
    throw new Error(`You must pass children to the array field "${this.props.fieldName}"`)
  }

  renderChildren() {
    const value = this.props.value || []
    if (this.props.autoAddItem && !this.props.disabled && value.length === 0) {
      value.push({})
      this.props.onChange(value)
    }
    return value.map((item, index) => {
      const children = this.getChildrenComponents(item, index)
      return this.renderChildrenItem({ index, children })
    })
  }

  renderChildrenItem({ index, children }) {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }} key={`${this.props.fieldName}.${index}`}>
        {this.renderChildrenItemWithContext({ index, children })}
        {this.props.showRemoveButton ? (
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <button type="button" onClick={() => this.removeItem(index)}>
              {this.props.removeLabel}
            </button>
          </div>
        ) : null}
      </div>
    )
  }

  renderChildrenItemWithContext({ index, children }) {
    return (
      <ArrayContextItem index={index} fieldName={this.props.fieldName}>
        {children}
      </ArrayContextItem>
    )
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <div>
          <b>{this.props.label}</b>
        </div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
        {this.props.showAddButton ? (
          <div style={{ marginTop: 10 }}>
            <button type="button" onClick={() => this.addItem()}>
              {this.props.addLabel}
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}

ArrayComponent.propTypes = {
  ...arrayComponentPropTypes
}

ArrayComponent.defaultProps = {
  addLabel: 'Add',
  removeLabel: 'Remove',
  showLabel: true,
  errorMessages: {},
  autoAddItem: false,
  showAddButton: true,
  showRemoveButton: true
}

ArrayComponent.childContextTypes = {
  parentFieldName: PropTypes.string
}

export default ArrayComponent
