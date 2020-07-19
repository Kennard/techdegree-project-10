import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

/**
 * Provides Course detail via params id.
 * @class - stateful component to rtrieve courses details using data methods and context
 */
export default class CourseDetail extends Component {

      state ={
        course: '',
        owner: '',
      }
      
        componentDidMount(){
         const { context } = this.props;
         const id = this.props.match.params.id;
         const path = `/courses/${id}`;

         context.data.getCourse(path)
           .then(course => {
             this.setState({ 
               course: course.course,
               owner: course.course.owner
             })
           })
           .catch(err => {
             console.log(err);
             this.props.history.push('/error');
           });
   
         }
       

    render() {
      const course = this.state.course;
      const owner = this.state.owner;
    

      const { context } = this.props;
      const auth = context.authenticatedUser;
      const ownerId = owner.id;

   
      return (  
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                       {auth && auth.id === ownerId ? 
                            <React.Fragment>  
                            <span>
                                <Link className="button" to={`${course.id}/update`} >Update Course</Link>
                                <Link className="button" to={`${course.id}`} onClick={this.deleteId}>Delete Course </Link>
                                <Link className="button button-secondary" to="/">Return to List</Link>
                            </span>
                            </React.Fragment> 
                            : 
                            <React.Fragment> 
                              <Link className="button button-secondary" to="/">Return to List</Link>
                            </React.Fragment>
                        }
                        </div>
                    </div>
                </div>

              <React.Fragment> 
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title"> {course.title } </h3>
                            <p>By {owner.firstName} {owner.lastName} </p>
                        </div>
                        <div class="course--description"> 
                          <ReactMarkdown>                
                            { course.description } 
                         </ReactMarkdown>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                        <ReactMarkdown> 
                                         {course.materialsNeeded} 
                                        </ReactMarkdown>    
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> 
              </React.Fragment>
          </div>     
        );
      }

  
      // Create a new method like submit to execute the delete course function 
      // that return a promise. Set event to OnClick to execute delete method 
      // using Context to submit values from state. 
      deleteId = (event) => { 
        event.preventDefault();

        const { context } = this.props;
        const authUser = context.authenticatedUser;
        
        const  emailAddress  = authUser.emailAddress;
        const  password  = authUser.password;

          
        const id = this.props.match.params.id;
        const path = `/courses/${id}`;
    
        context.data.deleteCourse(path, emailAddress, password)
        .then( errors => {
            if(errors.length) {
              this.setState({ errors });
            }else {  
              this.props.history.push('/');
              console.log(`has been successfully deleted!`);
            }
          })
          .catch(err => {
              console.log(err);
              this.props.history.push('/error');
          });   

      }


  }

