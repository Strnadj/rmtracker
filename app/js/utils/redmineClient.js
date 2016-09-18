import request from 'request'

/**
 * Redmine Client is singleton class.
 */
export default class RedmineClient {
  static instance

  /**
   * Create Redmine Client instance (return singleton).
   *
   * @param url [String] Redmine url
   * @param token [String] Redmine Api-key
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
   * @param token [String] Token
   *
   */
  setToken(token) {
    this.token = token
  }

  /**
   * Set url into client.
   *
   * @param url [String] Url
   *
   */
  setUrl(url) {
    this.url = url
  }

  /**
   * Return user object from redmine.
   *
   * @return [Object] User data
   *
   */
  getUserInfo() {
    this.request('GET', '/user.json', {})
  }

  /**
   * Return an array of available projects.
   *
   * @return [Array] Projects
   */
  getProjects() {
    this.request('GET', '/projects.json', {})
  }

  createUrl(path, params) {
    if (path.slice(0, 1) !== '/') {
      path = '/' + path
    }
    return this.url +
      path // + (params ? ('?' + querystring.stringify(params)) : '');
  }

  request(method, path, params) {
    console.log(`${method} - ${path} - ${params}`);

    const options = {
      url: this.createUrl(path, params),
      headers: {
        'X-Redmine-API-Key': this.token
      },
      method
    };

    request(options, function(err, res, body) {
      console.log("Recv:")
      console.log(err)
      console.log(res)
      console.log(body)
    });
  }
}
