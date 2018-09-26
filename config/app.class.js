export default class App {
  constructor(data) {
    if(typeof data === "object"){
      this.name = data.name || "Contact"
      this.api = data.api || ""
    }
  }

  getAPI(field = '', id = ''){
    let url = this.api.replace(/\/$/, '')
    let uri = field != '' ? `/${field}` : ''
        uri += id != '' ? `/${id}` : ''
    return url + uri
  }
}
