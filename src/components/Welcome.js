import React, {Component} from 'react';
import reactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';

export default class Welcome extends Component {


  responseGoogle = (response) => {
    console.log(response)
    var profile = response.getBasicProfile();

    let userObj = {}
    userObj.email = profile.getEmail()
    userObj.full_name = profile.getName()
    userObj.first_name = response.profileObj.givenName
    userObj.image = profile.getImageUrl()
    userObj.token = response.Zi.id_token
    this.googleAPI(userObj)
    console.log(userObj)
  }

  googleAPI = (userObj) => {
    let url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${userObj.token}`
    fetch(url)
      .then(resp => resp.json())
      .then(data => {if (data.email_verified) {
        this.checkUser(userObj)
      } else {
        console.log('error')
      }})
  }

  checkUser = (userObj) => {
    console.log('inside check user')
    let url = 'http://localhost:3001/users'
    let config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userObj)
    }

    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        console.log('line 52')
        this.props.updateState(data.first_name)
      })
  }

  render(){
    return (
      <GoogleLogin clientId="364004183801-0cqfjmfp7b9ujtfs0ue07m49rv3tvq7u.apps.googleusercontent.com" buttonText="Login" onSuccess={this.responseGoogle} onFailure={this.responseGoogle} cookiePolicy={'single_host_origin'}/>
    )
  }
}
