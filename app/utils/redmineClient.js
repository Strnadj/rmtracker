import request from 'request';
import Immutable from 'Immutable';
import querystring from 'querystring';

/**
 * Redmine Client is singleton class.
 */
class RedmineClient {
  static instance

  /**
   * Create Redmine Client instance (return singleton).
   *
   * @param url {String} Redmine url
   * @param token {String} Redmine Api-key
   *
   */
  constructor(url, token) {
    let inst

    if (this.instance) {
      inst = this.instance
    } else {
      this.instance = this
      inst = this
    }

    // 'Override' variables
    inst.url = url
    inst.token = token

    return inst
  }

  /**
   * Set token into client.
   *
   * @param token {String} Token
   *
   */
  setToken(token) {
    this.token = token
  }

  /**
   * Set url into client.
   *
   * @param url {String} Url
   *
   */
  setUrl(url) {
    this.url = url
  }

  /**
   * Return user object from redmine.
   *
   * @return {Promise} User data
   *
   */
  getUserInfo() {
    return this.request('GET', '/user.json', {})
  }

  /**
   * Return an array of available projects.
   *
   * @param query {Object} Query
   * @return {Promise} Projects
   */
  getProjects(data = null) {
    // Prepare query
    // "set_filter"=>"1", "f"=>["status_id", "subject", ""], "op"=>{"status_id"=>"o", "subject"=>"~"}, "v"=>{"subject"=>["Ahoj"]}
    //let query = {
      //page: 1
    //};

    //if (data.name) {
      //query.set_filter = 1;
      //query['f[]'] = [ 'name' ]
      //query.op = { 'name': '~' }
      //query.v  = { 'name[]': [ data.name ] }
    //}

    //console.log(query);

    // return new promise
    return new Promise((resolve, reject) => {
      this.request('GET', '/projects.json', {}).then(projects => {
        // Get List of projects
        const limit = projects.get('limit');
        const totalCount = projects.get('total_count');

        // Total pages
        const pages = 10; // (totalCount / limit) + 1;

        // Promises for page
        const promises = [];

        for (let i = 1; i < pages; i++) {
          promises.push(
            this.request('GET', '/projects.json', { page: i })
          );
        }

        // Wait for all
        Promise.all(promises).then(arr => {
          // Map & flatten
          arr = _.map(arr, project => project.get('projects').toArray());
          arr = _.flatten(arr);

          // There are arr projects
          let projects = Immutable.Map(
            _.map(arr, project => [ project.get('id'), project ])
          );

          resolve(projects);
        });
      }, error => reject(error))
    })
  }

  /**
   * Call request with proper method, path and params.
   *
   * @return {Promise} Promise with response.
   */
  request(method, path, params) {
    // Generate options
    const options = {
      baseUrl: this.url,
      url: path,
      headers: {
        'X-Redmine-API-Key': this.token
      },
      method
    };

    // Add query string
    if (params && method == 'GET') {
      options.qs = params;
    }

    // Generate url
    console.log(`[Redmine] [${method}] ${this.url}${path}`);

    return new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        // Parse body
        let parsedBody = null;

        try {
          parsedBody = JSON.parse(body);
        } catch (e) {
          if (!err) {
            err = e;
          }
        }

        if (err) {
          console.log("[Redmine] Error: ")
          console.log(err)
          reject(err)
        } else {
          // Response
          console.log("[Redmine] Response OK")
          console.log(parsedBody);

          // Parse body & create immutable
          body = Immutable.fromJS(parsedBody)

          // Return body
          resolve(body)
        }
      })
    });
  }
}

/** Get RM instance */
export default new RedmineClient('', '');
