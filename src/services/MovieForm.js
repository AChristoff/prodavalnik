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
            text,
          })
      }>
    
        <label htmlFor="text">Label</label>
        <input type="text" id="text" onChange={e => this.setState({text: e.target.value})}></input>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
