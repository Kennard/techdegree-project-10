import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {

   // Initalize state. Pass in props to use this.props Set local state objects to empty arrays 
    constructor(props){
        super(props);
        this.state = {
         course: [],
         owner: []
        };
      }
     

    // Use compoenentDidMount to load data from our API
     componentDidMount(){
        const id =  this.props.match.params.id; 

        fetch(`http://localhost:5000/api/courses/${id}`, {
          method: 'GET', 
          headers: {
          'Content-Type': 'application/json; charset=utf-8'}
        })
        .then(response => response.json())
        .then(responseData => {
          this.setState({ 
            course: responseData.course,
            owner: responseData.course.owner
          })
        })
        .catch(error  => {
          console.log('Error fetching and parsing data', error);
        });

      }

    render() {
        // Assign variable to our objects that hold our data 
        const course = this.state.course;
        const owner = this.state.owner;

        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const ownerId = this.state.owner.id;

        return (  
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                        {authUser && authUser.id === ownerId ? 
                            <React.Fragment>  
                            <span>
                                <Link className="button" to={`${course.id}/update`} >Update Course</Link>
                                <Link className="button" to={`${course.id}`}>Delete Course</Link>
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
                            <h3 className="course--title"> { course.title } </h3>
                            <p>By {owner.firstName} {owner.lastName} </p>
                        </div>
                        <div class="course--description"> 
                          <p>                
                            { this.state.course.description } 
                         </p>
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
                                    <ul>
                                        <li>{course.materialsNeeded}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> 
              </React.Fragment>
          </div>     
        );
      }
  }

