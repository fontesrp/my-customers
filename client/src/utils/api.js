const PROTOCOL = "http";
const DOMAIN = "localhost";
const PORT = "3001";
const BASE_URL = `${PROTOCOL}://${DOMAIN}:${PORT}`;

class Api {
  static headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  static get(path) {
    return this.xhr(path, null, "GET");
  }

  static put(path, params) {
    return this.xhr(path, params, "PUT");
  }

  static post(path, params) {
    return this.xhr(path, params, "POST");
  }

  static delete(path, params) {
    return this.xhr(path, params, "DELETE");
  }

  static async xhr(path, params, verb) {
    const url = `${BASE_URL}${path}`;

    const options = {
      headers: Api.headers(),
      method: verb
    };

    if (params) {
      options.body = JSON.stringify(params);
    }

    let response;
    let json;

    try {
      response = await fetch(url, options);
      json = await response.json();
    } catch (e) {
      console.error(e);
      json = { errors: ["request error"] };
    }

    return json;
  }
}

export default Api;
