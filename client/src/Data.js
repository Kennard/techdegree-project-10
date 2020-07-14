import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
      const url = config.apiBaseUrl + path;
    
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
      }
  
      if (requiresAuth) {    
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }
  
      return fetch(url, options);
    }

    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
      }
      
    // Get all the courses 
    async getCourses() {
      const response = await this.api('/courses', 'GET', null, false, null);
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
          return null;
      }
      else {
        throw new Error();
      }
    }
    
    async getCourse(path) {
      const response = await this.api(path, 'GET', null, false, null);
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
          return null;
      }
      else {
        throw new Error();
      }
    }
  
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 401) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
      }

    async createCourse(course, emailAddress, password) {
      const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
      if (response.status === 201) {
        return [];
      }
      else if (response.status === 401) {
        return response.json().then(data => {
          return data.errors;
        });
      }
      else {
        throw new Error();
      }
    }
 
    
 
    async updateCourse(path, course, emailAddress, password) {
     const response = await this.api(path, 'PUT', course, true, { emailAddress, password });
      if (response.status === 204) { 
        return [];
      }
      else if (response.status === 400) {
        return response.json().then(data => {
          return data.errors;
        });
      }
      else {
        throw new Error();
      }
    }

    async deleteCourse(path, emailAddress, password) {
      const response = await this.api(path, 'DELETE', null, true, { emailAddress, password });
       if (response.status === 204) { 
         return [];
       }
       else if (response.status === 400) {
         return response.json().then(data => {
           return data.errors;
         });
       }
       else {
         throw new Error();
       }
     }


}