import React from 'react';

class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clientCount: null,
    };
  }

  componentDidMount() {
    const url = "http://localhost:3000/api/currentcount";
    fetch(url, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => this.setState({ clientCount: data.currentCount }))
      .catch(error => window.confirm('GET Count Error', error));
  }

  handleIncrementClick = () => {
    const url = "http://localhost:3000/api/possiblecounts";
    fetch(url, {
      method: "GET",
    })
      .then(res => res.json())
      .then((data) => {
        document.querySelector('#confirm-cancel-message').innerHTML = `current count is ${data.currentCount}, next count is ${data.nextCount}`;
        this.toggleModal();
      })
      .catch(error => window.confirm('GET Count Error', error));
  }

  toggleModal = () => {
    document.querySelector(".modal").classList.toggle("show-modal");
  }

  confirmIncrementFn = () => {
    this.incrementCount();
    this.toggleModal();
  }

  incrementCount = () => {
    const url = 'http://localhost:3000/api/increment';
    fetch(url, {
      method: "POST",
    })
      .then(res => res.json())
      .then(res => this.setState({
        previousClientCount: res.currentCount,
        clientCount: res.nextCount
      }))
      .catch(error => window.confirm('POST Count Error', error));
  }

  render() {
    return (
      <div className="main">
        <button className="homepage__imaginary-button" disabled>Increment</button>
        <label className="homepage__count">Count: {this.state.clientCount}</label>
        <button className="homepage__button" onClick={this.handleIncrementClick}>Increment</button>
        <div className="modal">
          <div className="modal__content">
            <div id="confirm-cancel-message">Confirmation Message</div>
            <button className="modal__confirm-cancel-button" onClick={this.toggleModal}>Cancel</button>
            <button className="modal__confirm-cancel-button" onClick={this.confirmIncrementFn}>Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
