import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component{

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  componentDidMount(){
    const { context } = this.props;
    const id = this.props.match.params.id;
    const path = `/courses/${id}`;

    context.data.getCourse(path)
      .then(course => {
        this.setState({ 
         title: course.course.title,
         description:course.course.description,
         estimatedTime: course.course.estimatedTime,
         materialsNeeded: course.course.materialsNeeded
        })
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });

    }

  render() {
    const { context } = this.props;  
    const authUser = context.authenticatedUser;
      
    //const course = this.state.course;
      
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

  change = (event) => {
    
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

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

  cancel = () => {
    this.props.history.push('/');
  }

} 