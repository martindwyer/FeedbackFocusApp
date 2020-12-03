import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import formFields from './formFields'

class SurveyForm extends Component {
  renderFields () {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type='text'
          label={label}
          name={name}
        />
      )
    })
  }
  render () {
    return (
      <div class='container new-survey-display'>
        <h2>New Survey Entry</h2>
        <div class='survey-form'>
          <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
            {this.renderFields()}
            <Link to='/surveys' className='red btn-flat left white-text'>
              Cancel
            </Link>
            <button className='teal btn-flat right white-text' type='submit'>
              Next
              <i className='material-icons right'>done</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  errors.recipients = validateEmails(values.recipients || '')
  _.each(formFields, ({ name, error }) => {
    if (!values[name]) {
      errors[name] = error
    }
  })

  return errors
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)
