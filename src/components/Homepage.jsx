import React from 'react';

class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nextCount: null
    };
  }

  componentDidMount() {
    const url = 'http://localhost:3000/api/users/currentcounts';
    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => this.setState({ nextCount: data.currentCount }))
  }

  handleClick = () => {
    const url = 'http://localhost:3000/api/possiblecounts';
    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then((data) => {
        if (window.confirm(`current count is ${data.currentCount}, next count is ${data.nextCount}`)) {
          this.incrementCount()
        }
      })
  }

  incrementCount = () => {
    const url = 'http://localhost:3000/api/increment';
    fetch(url, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => this.setState({
        currentCount: res.currentCount,
        nextCount: res.nextCount
      }))
  }

  render() {
    return (
      <div className='homepage'>
        <label className="homepage__count">Count: {this.state.nextCount}</label>
        <button className="homepage__button" onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

export default Homepage;
