import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Retrieves all Courses.
 * @class - stateful component to retrieve courses using data methods and context
 */
export default class Courses extends Component {
 
   state ={
     courses: [],
   }
    
     componentDidMount(){
      const { context } = this.props;
      context.data.getCourses()
        .then(courses => {
          this.setState({ 
            courses
          }) 
         })
        .catch(err => {  
             console.log(err);
             this.props.history.push('/error');
        });
      
      }

    render() {
      const courses = this.state.courses;
      let allcourses = courses.map(course => 
          <div className="grid-33" key={course.id} >
              <Link className="course--module course--link" to={`/courses/${course.id}`} >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{ course.title }</h3>
              </Link>
          </div>
          );

      return (
        <React.Fragment>
          <hr></hr>
            <div className="bounds">
               { allcourses }
        
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="courses/create">
                    <h3 className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                    </Link>
                </div>
            </div>   
        </React.Fragment>
        );
    }
  }

