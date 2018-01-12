import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from 'react-bootstrap/lib/Button'

import ArrayComponent from './ArrayComponent.js'
import { propTypes, defaultProps } from './propTypes.js'
import WrapperField from './WrapperField.js'

export default class ArrayField extends ArrayComponent {

  renderChildrenItem({ children, index }) {
    const id = (new Date()).getTime().toString(36) + index
    if (this.props.renderChildrenItem) {
      return this.props.renderChildrenItem(children, index, id)
    }

    return (
      <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`} data-id={`${id}`}>
        <div className="col-sm-11">
          {this.renderChildrenItemWithContext({ children, index })}
        </div>
        <div className="col-sm-1 text-right">
          {!this.props.disabled &&
            <Button bsStyle="danger" onClick={() => this.removeItem(index)}>
              <i className="fa fa-minus" />
              {this.props.btnRemoveText && <span>{this.props.btnRemoveText}</span>}
            </Button>
          }
        </div>
      </div>
    )
  }

  render() {
    const { parentClassName, showAddButton, disabled, btnAddText } = this.props

    return (
      <WrapperField {...this.props}>
        <div className={classNames('sortable-container', parentClassName)}>
          {this.renderChildren()}
        </div>
        <div>
          {showAddButton && !disabled &&
            <Button bsStyle="primary" onClick={() => this.addItem()}>
              <i className="fa fa-plus" />
              {btnAddText && <span>{btnAddText}</span>}
            </Button>
          }
        </div>
      </WrapperField>
    )
  }
}
ArrayField.propTypes = {
  ...propTypes,
  ...ArrayComponent.propTypes,
  btnAddText: PropTypes.string,
  btnRemoveText: PropTypes.string,
  parentClassName: PropTypes.string,
  childrenClassName: PropTypes.string,
  renderChildrenItem: PropTypes.func,
  renderItem: PropTypes.func
}
ArrayField.defaultProps = {
  ...defaultProps,
  ...ArrayComponent.defaultProps,
  childrenClassName: 'row m-b-10'
}
