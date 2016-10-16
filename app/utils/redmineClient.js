import request from 'request'
import Immutable from 'Immutable'

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
   * @return {Promise} Projects
   */
  getProjects() {
    return new Promise((resolve, reject) => {
      this.request('GET', '/projects.json', {}).then(projects => {
        // Get List of projects
        projects = projects.get('projects')

        // Transform to Map project_id => { data }
        projects = Immutable.Map(
          projects.map(v => [ v.get('id'), v ])
        )

        // Return map object
        resolve(projects)
      })
    })
  }

  /**
   * Create url to redmine.
   *
   * @param path {String} Path
   * @param params {Object} Objects
   * @return {String} New url
   */
  createUrl(path, params) {
    if (path.slice(0, 1) !== '/') {
      path = '/' + path
    }
    return this.url +
      path // + (params ? ('?' + querystring.stringify(params)) : '');
  }

  /**
   * Call request with proper method, path and params.
   *
   * @return {Promise} Promise with response.
   */
  request(method, path, params) {
    const options = {
      url: this.createUrl(path, params),
      headers: {
        'X-Redmine-API-Key': this.token
      },
      method
    };

    console.log("[Redmine] Call");
    console.log("[Redmine] URL: " + this.createUrl(path, params));

    return new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        if (err) {
          console.log("[Redmine] Error: ")
          console.log(err)
          reject(err)
        } else {
          // Response
          console.log("[Redmine] Response OK")

          // Parse body & create immutable
          body = Immutable.fromJS(JSON.parse(body))

          // Return body
          resolve(body)
        }
      })
    });
  }
}

/** Get RM instance */
export default new RedmineClient('', '');
