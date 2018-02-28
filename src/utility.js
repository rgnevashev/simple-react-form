import MongoObject from 'mongo-object'
import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import each from 'lodash/each'
import last from 'lodash/last'
import union from 'lodash/union'
import includes from 'lodash/includes'
import filter from 'lodash/filter'

const isBasicObject = function(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

const isNullUndefinedOrEmptyString = function(val) {
  return val === void 0 || val === null || (typeof val === 'string' && val.length === 0)
}

export const cleanFields = (doc, fields) => {
  const newDoc = {}
  each(doc, (val, key) => {
    const keys = key.split('.').reduce((memo, value) => {
      const lastItem = last(memo)
      const pre = lastItem ? lastItem + '.' : ''
      return union(memo, [pre + value])
    }, [])
    let contains = false
    keys.forEach(newKey => {
      if (includes(fields, newKey)) {
        contains = true
      }
    })
    if (contains && key !== '_id') {
      newDoc[key] = val
    }
  })

  return newDoc
}

export const cleanNulls = (doc, docIsArray, keepEmptyStrings) => {
  var newDoc = docIsArray ? [] : {}
  each(doc, (val, key) => {
    if (!isArray(val) && isBasicObject(val)) {
      val = cleanNulls(val, false, keepEmptyStrings) // Recurse into plain objects
      if (!isEmpty(val)) {
        newDoc[key] = val
      }
    } else if (isArray(val)) {
      val = cleanNulls(val, true, keepEmptyStrings) // Recurse into non-typed arrays
      if (!isEmpty(val)) {
        newDoc[key] = val
      }
    } else if (!isNullUndefinedOrEmptyString(val)) {
      newDoc[key] = val
    } else if (keepEmptyStrings && typeof val === 'string' && val.length === 0) {
      newDoc[key] = val
    }
  })

  return newDoc
}

export const reportNulls = (flatDoc, keepEmptyStrings) => {
  var nulls = {}

  // Loop through the flat doc
  each(flatDoc, (val, key) => {
    // If value is undefined, null, or an empty string, report this as null so it will be unset
    if (val === null) {
      nulls[key] = ''
    } else if (val === void 0) {
      nulls[key] = ''
    } else if (!keepEmptyStrings && typeof val === 'string' && val.length === 0) {
      nulls[key] = ''
    } else if (isArray(val) && cleanNulls(val, true, keepEmptyStrings).length === 0) {
      // If value is an array in which all the values recursively are undefined, null, or an empty string, report this as null so it will be unset
      nulls[key] = ''
    }
  })

  return nulls
}

export const getPresentFields = fields => {
  return filter(fields, field => {
    const props = field.component.props
    return !props.disabled
  }).map(field => field.field)
}

export const docToModifier = (doc, options) => {
  var modifier = {}
  var mDoc
  var flatDoc
  var nulls
  options = options || {}
  mDoc = new MongoObject(doc)
  flatDoc = mDoc.getFlatObject({
    keepArrays: !!options.keepArrays
  })
  nulls = reportNulls(flatDoc, !!options.keepEmptyStrings)
  nulls = cleanFields(nulls, options.fields)
  flatDoc = cleanNulls(flatDoc, false, !!options.keepEmptyStrings)
  flatDoc = cleanFields(flatDoc, options.fields)

  if (!isEmpty(flatDoc)) {
    modifier.$set = flatDoc
  }

  if (!isEmpty(nulls)) {
    modifier.$unset = nulls
  }

  return modifier
}
