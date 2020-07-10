import React, { Component } from 'react';

export default class UpdateCourse extends Component{
 // Initalize state. Pass in props to use this.props Set local state objects to empty arrays 
 constructor(props){
    super(props);
    this.state = {
      updateCourse: [],
      owner: []
    };
  }

// Use compoenentDidMount to load data from our API
  componentDidMount(){

    const id =  this.props.match.params.id; 

    fetch(`http://localhost:5000/api/courses/${id}`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({ 
        updateCourse: responseData.course,
         owner: responseData.course.owner
      })
    })
    .catch(error  => {
      console.log('Error fetching and parsing data', error);
    });

  }

  render() {

   const update = this.state.updateCourse;
   const owner = this.state.owner;



    console.log(update);

    return (
        <React.Fragment>
          <hr></hr>
          <div className="bounds course--detail">
            <h1>Update Course</h1>    
            <div>
             <form>
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                         value={`${update.title}`} 
                        />
                        </div>
                     <p>By {owner.firstName} {owner.lastName}</p> 
                </div>
                <div className="course--description">
                    <div>
                    { <textarea id="description" name="description" className="" placeholder="Course description..." value={update.description} />  }
                    </div>
                </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                         <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                            placeholder="Hours" value={`${update.estimatedTime}`} /> </div>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."  value={update.materialsNeeded}  /></div>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onclick="event.preventDefault(); location.href='course-detail.html';">Cancel</button>
                </div>                     
             </form>
            </div>
          </div>   
        </React.Fragment>
    );
  }
} 