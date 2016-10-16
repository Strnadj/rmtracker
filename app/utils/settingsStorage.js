import storage from 'electron-json-storage'

export default class SettingsStorage {

  /**
   * Get value for key.
   *
   * @param key {String}
   * @param defaults {Object}
   * @return {Promise}
   *
   */
  static get(key, defaults = null) {
    return new Promise((resolve, reject) => {
      this._has(key).then(val => {
        if (val) {
          // Return loaded value
          return _get(key)
        } else {
          // Return default value
          return resolve(defaults)
        }
      })
    })
  }


  /**
   * Override methods to return promise
   * instead of call cb*/

  static _get(key) {
    return new Promise((resolve, reject) => {
      storage.get(key, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }

  static _has(key) {
    return new Promise((resolve, reject) => {
      storage.has(key, (error, hasKey) => {
        if (error) {
          reject(error)
        } else {
          resolve(hasKey)
        }
      })
    })
  }

  static _set(key, value) {
    return new Promise((resolve, reject) => {
      storage.set(key, value, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}
