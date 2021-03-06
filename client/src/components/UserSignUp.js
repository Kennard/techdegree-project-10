import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
 
/**
 * Stateful Component to create a new user using context
 * @class - stateful component to render a sign up form 
 */
export default class UserSignUp extends Component { 

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmpassword: '', 
    errors: [],
  }

  render() {

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmpassword,
      errors,
    } = this.state;

      return ( 
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors} 
                    submit={this.submit}
                    submitButtonText="Sign Up"
                    elements={()=> (
                  <React.Fragment>
                    <input id="firstName" name="firstName" value={firstName} onChange={this.change} type="text" placeholder="First Name"  />
                    <input id="lastName" name="lastName" value={lastName} onChange={this.change} type="text" placeholder="Last Name"  />
                    <input id="emailAddress" name="emailAddress" value={emailAddress} onChange={this.change} type="text" placeholder="Email Address"  />
                    <input id="password" name="password" value={password} onChange={this.change} type="password" placeholder="Password"  />
                    <input id="confirmpassword" name="confirmpassword" value={confirmpassword} onChange={this.change} type="password" placeholder="Confirm Password" />
                  </React.Fragment>
                )} /> 
              <p>&nbsp;</p>
              <p>Already have a user account? <Link to="/signin">Click here</Link>  to sign in!</p> 
            </div>
          </div>
          );
    }

    //Load form data on change updates const values state
    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }
  // Submit user data via POST request and sign the user in via Sign in method passed from Context
  submit = () => {
      const { context } = this.props;
        
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmpassword,
      } = this.state;

             
    if(password === confirmpassword){

      const user = {
            firstName, lastName, emailAddress, password
          };
              
          context.data.createUser(user)
          .then( errors => {
              if (errors.length) {
                this.setState({ errors });
              }
              else { 
                context.actions.signIn(emailAddress, password)
                .then(() => {
                  this.props.history.push('/');
                })
                console.log(`${firstName} is successfully signed up and authenticated!`);
              }

            })
            .catch( err => {
              console.log(err);
              this.props.history.push('/error');
            });

          } else {
            this.setState(() => {
              return { errors: [ 'Passwords did not match! Please enter the same password.' ] };
            });  
          }
        }

      cancel = () => {
        this.props.history.push('/');
      }
      
}