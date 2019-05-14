import React, {Component} from 'react';
import './App.css';
import { GoogleLogout } from 'react-google-login';
import Welcome from './components/Welcome.js'

class App extends Component {

constructor(){
  super()
  this.state = {
    name: ""
  }
}


updateState = (name) => {
  console.log('inside updateState')
  this.setState({name: name})
}

logout = () => {
  this.setState({name: ""})
}

  render (){
    if (this.state.name) {
      return <GoogleLogout buttonText='Logout' onLogoutSuccess={this.logout}/>
    } else {
      return (
         <div>
         <Welcome updateState={this.updateState}/> <br/> <br/>
         </div>
       )
    }

  }

}

export default App;
