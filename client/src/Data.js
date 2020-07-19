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

    /** 
     * GET request method retrieves a registered user from the database. 
     * @param {string} emailAddress
     * @param {string} password
     * If user exist data is sent in json format, else we return an error
     */
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
      
     /** 
     * GET request method retrieves a courses from the database. 
     * If user exist data is sent in json format, else we return an error
     */
    async getCourses() {
      const response = await this.api('/courses', 'GET', null, false, null);
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 400) {
        response.json().then(data => {
          return data.errors;
        });
      }
      else {
        throw new Error();
      }
      
    }
    /** 
     * GET request method retrieves a single course from the database. 
     * @param {string} path to the endpoint olding id parameter
     * If user exist data is sent in json format, else we return an error
     */
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
  
    /** 
     * POST request method creates a new user. 
     * @param {string} user - New user to be added
     * If user created return array, else we return an error
     */
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
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
    
    /** 
     * POST request method creates a new course. 
     * @param {string} course - New course to be added
     * @param {string} emailAddress - user credential
     * @param {string} password - user credential
     * If course created return empty array, else we return an error
     */ 
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
    
    /** 
     * PUT request method creates a new course. 
     * @param {string} path - to the endpoint olding id parameter
     * @param {string} course - New course to be added
     * @param {string} emailAddress - user credential
     * @param {string} password - user credential
     * If course updated return empty array, else we return an error
     */ 
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

    /** 
     * DELETE request method delete a course. 
     * @param {string} path - to the endpoint olding id parameter
     * @param {string} emailAddress - user credential
     * @param {string} password - user credential
     * If course deleted return empty array, else we return an error
     */ 
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