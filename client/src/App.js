import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => ( 
      <Router>
        <div> 
          <HeaderWithContext />
          
        <Switch>  
            <Route exact path="/" component={ CoursesWithContext } /> 
            
            <PrivateRoute path="/courses/create" component={ CreateCourseWithContext } />
            <PrivateRoute path="/courses/:id/update" component={ UpdateCourseWithContext } />
           
            <Route path="/courses/:id" component={ CourseDetailWithContext } /> 
            <Route path="/signin" component={ UserSignInWithContext } />
            <Route path="/signup" component={ UserSignUpWithContext } />
            <Route path="/signout" component={ UserSignOutWithContext } />
            
            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/error" component={UnhandledError} />
            <Route component={NotFound} />
            
        </Switch>
        </div>
      </Router>


);
