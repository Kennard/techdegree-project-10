import React, { Component } from 'react';
import Form from './Form';

/**
 * Updates a Course.
 * @class - stateful component to Update a new courses using data methods and context
 */
 
export default class UpdateCourse extends Component{

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
    owner: '',
  }

  componentDidMount(){
    const { context } = this.props;
    const id = this.props.match.params.id;
    const path = `/courses/${id}`;

    const authUser = context.authenticatedUser;
    const authid = authUser.id;

  
    context.data.getCourse(path)
      .then(course => {
        if(course == null){
          this.props.history.push('/notfound');
        }else{
          this.setState({ 
            title: course.course.title,
            description:course.course.description,
            estimatedTime: course.course.estimatedTime,
            materialsNeeded: course.course.materialsNeeded,
            owner: course.course.userId
            })
          if(this.state.owner !== authid){
            this.props.history.push('/forbidden');
          }  
        }  

      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });

   }

  render() {
    const { context } = this.props;  
    const authUser = context.authenticatedUser;

     const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
 

    return (
          <div className="bounds course--detail">
            <h1>Update Course</h1>    
             
             <Form 
                cancel={this.cancel}
                errors={errors} 
                submit={this.submit}
                submitButtonText="Update Course"
                elements={()=> ( 
                  <React.Fragment> 
                   <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      
                      <input id="title" 
                        name="title" 
                        type="text" 
                        onChange={this.change}
                        className="input-title course--title--input" 
                        placeholder="Course title..." 
                        value={title} />
                      
                     <p>By {authUser.firstName} {authUser.lastName}</p> 
                    
                      <div className="course--description">
                        <textarea id="description" name="description"  value={description} placeholder="Course description..."  onChange={this.change} />  
                      </div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list"> 
                        <li>
                          <h4>Estimated Time</h4>
                         <input id="estimatedTime" name="estimatedTime"  value={estimatedTime} type="text" className="course--time--input"
                            placeholder="Hours" onChange={this.change} /> 
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                        <textarea id="materialsNeeded" name="materialsNeeded"  value={materialsNeeded} placeholder="List materials..." onChange={this.change}  />
                        </li>
                        </ul>
                      </div>
                    </div>
                  </React.Fragment>
                )} />
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
  // Submit user data passed down through Context to Update a Course
  submit = () => { 
    
    const { context } = this.props;
    const authUser = context.authenticatedUser;

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
        materialsNeeded
      };
 
    const id = this.props.match.params.id;
    const path = `/courses/${id}/update`;

    context.data.updateCourse(path, course, emailAddress, password)
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
 // If user doesn't update the course the Cancel method will return 
 // the user to the route we push onto the history stack location property

  cancel = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/courses/${id}`);
  }

} 