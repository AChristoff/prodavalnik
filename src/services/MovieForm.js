import React, { Component } from 'react'

export default class MovieForm extends Component {
  state = {
    text: '',
  }

  render() {
    const {submitForm} = this.props;
    const {text}= this.state;


    return (
      <form 
        data-testid="movie-form" 
        onSubmit={
          () => submitForm({
            text
          })
      }>
        <input type="text"/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
