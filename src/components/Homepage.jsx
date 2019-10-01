import React from 'react';

class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  incrementCount = () => {
    console.log('hello')
  }

  render() {
    return (
      <div className='homepage'>
        <label className="homepage__count">Count: 0</label>
        <button className="homepage__button" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

export default Homepage;
