import React, { Component } from 'react'
import "./friendsList.css"



export default class AddFriend extends Component {

    state = {

       friends: this.props.friends,
       users: this.props.users
    };



    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
      };



    addNewFriend = evt =>{
        evt.preventDefault();
        const friendship = {
            userId:
            otherId:

        }
        this.props.addFriend(friendship)

        .then(()=> this.props.history.push("/friends"))


    };



   render() {
      console.log(this.state)
      let x =(this.state.usd)/(this.props.prices[0])
      let y = this.props.prices[1]
      console.log(y)
      console.log(x)


        return (

            <React.Fragment>

            <form className="buyForm">

            <div>Current Price of Bitcoin: ${this.props.prices[0]}</div>
            <div className="form-group">
            <label htmlFor="name">$</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="name"
              placeholder="Enter Amount"/>


          </div>



          <div className="form-group">

            <input
              type="checkbox"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="btc"
              value= {x} />




            <label htmlFor="btc">Check the box and press the 'Submit' button to purchase {x} Bitcoin</label>
          </div>




              <button
                type="submit"
                onClick={this.buildNewTxn}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </React.Fragment>


        );
    }

}
