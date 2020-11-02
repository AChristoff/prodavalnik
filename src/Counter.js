import React, { Component } from 'react'
import ThemeSwitch from './components/shared/switch/Switch';

export default class Counter extends Component {

    state = {
        count: 0
    }

    count = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1,
        }));
    }

    render() {
        const {count} = this.state;

        return (
            <div>
                <button data-testid='counter-btn' onClick={this.count}>
                    {count}
                </button>
            </div>
        )
    }
}
