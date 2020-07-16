import React, { Component } from 'react';
import Form from './Form';

// Stateful Component to Create a new courses using Context after user is authenticated
export default class CreateCourse extends Component{ 
  
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

   render(){ 
    const { context } = this.props;
    const authUser = context.authenticatedUser;
   
     const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;


    return (
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <Form 
            cancel={this.cancel}
            errors={errors} 
            submit={this.submit}
            submitButtonText="Create Course"
            elements={()=> (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <input 
                    id="title" 
                    name="title" 
                    type="text" 
                    onChange={this.change}
                    className="input-title course--title--input" 
                    placeholder="Course title..." 
                    value={title} />
                  <p>By { authUser.firstName } { authUser.lastName }</p>
                  <div className="course--description">
                    <textarea id="description" name="description" onChange={this.change} placeholder="Course description..." value={description} />
                  </div>   
                </div>
              </div>
              <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <input id="estimatedTime" name="estimatedTime"  onChange={this.change} type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} />
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <textarea id="materialsNeeded" name="materialsNeeded"  onChange={this.change} placeholder="List materials..."  value={materialsNeeded} />
                      </li>
                    </ul>
                  </div>  
              </div>
            </React.Fragment>  
            )}  />
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

    // Submit user data passed down through Context to Create new Course
    submit = () => { 
        const { context } = this.props;

        const authUser = context.authenticatedUser;
        const authUserId = authUser.id;
        
        const  emailAddress  = authUser.emailAddress;
        const  password  = authUser.password;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
          } = this.state;
    
          const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            authUserId,
          };
         

        context.data.createCourse(course, emailAddress, password)
        .then( errors => {
            if(errors.length) {
              this.setState({ errors });
            }else {  
              this.props.history.push('/');
              console.log(`${title} has been successfully added!`);
            }
          })
          .catch(err => {
              console.log(err);
              this.props.history.push('/error');
          });   

    }


      cancel = () => {
        this.props.history.push('/');
      }


 
} 