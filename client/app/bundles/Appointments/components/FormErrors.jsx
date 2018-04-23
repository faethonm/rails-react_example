import React, { PropTypes } from 'react';

export const FormErrors = ({formErrors}) =>
  <div>
    {Object.keys(formErrors).map((key) => {
      return (
        formErrors[key].map((error) => {
          return (
            <p> {key} {error} </p>
          )
        })
      )
    })}
  </div>


FormErrors.propTypes = {
  formErrors: React.PropTypes.object
}
