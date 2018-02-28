import React from 'react'

import {
  Form,
  Field,
  TextField,
  NumberField,
  EmailField,
  PasswordField,
  DateField,
  TextareaField,
  CheckboxField,
  CheckboxesField,
  SelectField,
  RadioField,
  DatetimeField,
  DateRangeField,
  PhoneField,
  TagsField,
  ColorField,
  TextareaAutosizeField,
  ArrayField
} from './lib'

import { User } from './schemas'

import MongoObject from 'mongo-object'

const data = {
  sections: [{ type: 'html', backgrounColor: 'white', color: 'black' }, { type: 'html', backgrounColor: 'white', color: 'black' }]
}
/*
const doc = new MongoObject(data)
console.log(doc)
//console.log(doc.getPositionForKey('a.b.0.c'))
//console.log(doc.getPositionsForGenericKey('a.b.$'))
//console.log(doc.getValueForKey('a.b.0'))
//console.log(doc.getFlatObject())
//console.log(MongoObject.expandObj(doc.getFlatObject()))
console.log(MongoObject.docToModifier(data, { keepArrays: true }))*/

export const pageSectionTypeOptions = [
  { label: 'HTML/Formatted Text', value: 'html' },
  { label: 'Video', value: 'video' },
  { label: 'Image', value: 'image' },
  { label: 'Button', value: 'button' },
  { label: 'Testimonial', value: 'testimonial' },
  { label: 'Countdown', value: 'countdown' },
  { label: 'Files / Downloads', value: 'files' },
  { label: 'Pricing Table', value: 'pricing-table' }
]

class App extends React.Component {
  render() {
    return (
      <div className="container" style={{ marginTop: 40, marginBottom: 40 }}>
        <Form state={data} className="form" onSubmit={doc => console.log(doc)}>
          <Field fieldName="name" type={TextField} label="Name" placeholder="Name" />
          <Field fieldName="name2" type={TextField} label="Name2" placeholder="Name2" noLabel />
          <Field fieldName="number" type={NumberField} label="Number" placeholder="0" />
          <Field fieldName="textarea" type={TextareaField} label="Textarea" placeholder="Textarea" />
          <Field fieldName="email" type={EmailField} label="Email" placeholder="Email" />
          <Field fieldName="password" type={PasswordField} label="Password" placeholder="Password" />
          <Field fieldName="date1" type={DateField} label="DateField" placeholder="DateField" />
          <Field fieldName="check1" type={CheckboxField} label="Checkbox" placeholder="Checkbox" />
          <Field fieldName="check2" type={CheckboxField} label="Checkbox2" placeholder="Checkbox2" toggle />
          <Field fieldName="radio1" type={RadioField} label="RadioField1" options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]} />
          <Field fieldName="radio2" type={RadioField} label="RadioField2" options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]} inline />
          <Field fieldName="select1" type={SelectField} label="SelectField1" options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]} />
          <Field
            fieldName="select2"
            type={SelectField}
            label="SelectField2"
            placeholder="SelectField2"
            options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]}
            selectable
          />
          <Field fieldName="select3" type={SelectField} label="SelectField3" options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]} selectable multi />
          <Field fieldName="select4" type={SelectField} label="SelectField4" options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]} createable />
          <Field fieldName="select5" type={SelectField} label="SelectField5" options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]} createable multi />
          <Field fieldName="checkboxes1" type={CheckboxesField} label="CheckboxesField1" options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]} />
          <Field
            fieldName="checkboxes2"
            type={CheckboxesField}
            label="CheckboxesField2"
            options={[{ label: '1', value: 1 }, { label: '2', value: 2 }]}
            inline
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
        <hr />
        <Form className="form form-horizontal" onSubmit={doc => console.log(doc)}>
          <Field fieldName="labelCol" type={TextField} label="labelCol" placeholder="labelCol" labelCol={2} />
          <Field
            fieldName="inputGroup1"
            type={TextField}
            label="inputGroup1"
            placeholder="inputGroup1"
            labelCol={2}
            leftInputGroupAddon={<i className="fa fa-check" />}
            inputGroup
          />
          <Field
            fieldName="inputGroup2"
            type={TextField}
            label="inputGroup2"
            placeholder="inputGroup2"
            labelCol={2}
            rightInputGroupAddon={<i className="fa fa-check" />}
            inputGroup
          />
          <Field
            fieldName="inputGroup3"
            type={TextField}
            label="inputGroup3"
            placeholder="inputGroup3"
            labelCol={2}
            rightInputGroupAddon={<i className="fa fa-check" />}
            leftInputGroupAddon={<i className="fa fa-check" />}
            inputGroup
          />
          <Field
            fieldName="inputGroup4"
            type={TextField}
            label="inputGroup4"
            placeholder="inputGroup4"
            labelCol={2}
            leftInputGroupButton={
              <button className="btn btn-default" type="button">
                Go!
              </button>
            }
            inputGroup
          />
          <Field
            fieldName="inputGroup5"
            type={TextField}
            label="inputGroup5"
            placeholder="inputGroup5"
            labelCol={2}
            rightInputGroupButton={
              <button className="btn btn-default" type="button">
                Go!
              </button>
            }
            inputGroup
          />
          <Field
            fieldName="inputGroup6"
            type={TextField}
            label="inputGroup6"
            placeholder="inputGroup6"
            labelCol={2}
            rightInputGroupButton={
              <button className="btn btn-default" type="button">
                Go!
              </button>
            }
            leftInputGroupButton={
              <button className="btn btn-default" type="button">
                Go!
              </button>
            }
            inputGroup
          />
          <Field
            fieldName="inputGroup7"
            type={TextField}
            label="inputGroup7"
            placeholder="inputGroup7"
            labelCol={2}
            rightInputGroupButton={
              <button className="btn btn-default" type="button">
                Go!
              </button>
            }
            leftInputGroupButton={
              <button className="btn btn-default" type="button">
                Go!
              </button>
            }
            inputGroup
            noLabel
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
        <hr />
        <Form className="form" onSubmit={doc => console.log(doc)}>
          <Field fieldName="date1" type={DatetimeField} label="DateField" placeholder="DateField" />
          <Field fieldName="range" type={DateRangeField} label="DateRangeField" placeholder="DateRangeField" />
          <Field fieldName="phone" type={PhoneField} label="PhoneField" placeholder="PhoneField" />
          <Field fieldName="tags" type={TagsField} label="TagsField" placeholder="TagsField" />
          <Field fieldName="color1" type={ColorField} label="ColorField1" placeholder="ColorField1" />
          <Field fieldName="textarea2" type={TextareaAutosizeField} label="TextareaAutosizeField1" placeholder="TextareaAutosizeField1" />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
        <hr />
        <Form className="form" doc={{ _id: 1, name: 'Test' }} schema={User} onSubmit={doc => console.log(doc)}>
          <Field fieldName="name" type={TextField} label="Name" placeholder="Name" />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
        {/*<hr />
        <Form state={data} className="form" onSubmit={doc => console.log(doc)}>
          <Field fieldName="sections" type={ArrayField} label="Sections">
            <Field fieldName="type" type={SelectField} options={pageSectionTypeOptions} placeholder="Choose Type" />
          </Field>
          <button className="btn btn-primary" type="submit">Submit</button>
        </Form>*/}
        <hr />
        <Form state={data} className="form" onSubmit={doc => console.log(doc)}>
          <Field
            fieldName="sections"
            type={ArrayField}
            label="Sections"
            renderItem={(section, index) => (
              <div>
                <Field fieldName="type" type={SelectField} options={pageSectionTypeOptions} placeholder="Choose Type" />
              </div>
            )}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
        <hr />
        <Form className="form" onSubmit={doc => console.log(doc)}>
          <Field fieldName="agent.phones" type={ArrayField} label="Agent Contact (Phone)" autoAddItem>
            <Field fieldName="phone" type={PhoneField} />
          </Field>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
      </div>
    )
  }
}

export default App
