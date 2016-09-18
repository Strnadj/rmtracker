import fs from 'fs'

export default class SettingsStorage {

  static get(key, defaultValue = null) {
    const data = this.readData()

    if (key in data) {
      return data[key]
    }

    return defaultValue
  }

  static write(key, values) {
    const data = this.readData()
    data[key] = values
    return this.writeData(data)
  }

  static writeData(data) {
    const path = `${this.getUserHome()}/settings`
    const ret = fs.writeFileSync(path, JSON.stringify(data))
    if (process.platform !== 'win32') {
      fs.chmodSync(path, '600')
    }
    return ret
  }

  static readData() {
    const path = `${this.getUserHome()}/settings`

    if (!fs.existsSync(path)) {
      return {}
    }

    return JSON.parse(fs.readFileSync(path, 'utf-8'))
  }

  static getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
  }
}
