const defaultSettings = { method: 'GET', mode: 'cors', redirect: 'follow' };

export function get(url, token) {
  return fetch(new Request("/api/" + url, action("GET", token)));
}

export function put(url, token, content) {
  return fetch(new Request("/api/" + url, action("PUT", token, content)));
}

export function del(url, token) {
  return fetch(new Request("/api/" + url, action("DELETE", token)));
}

export function ws(url) {
  console.log(window.location.protocol)
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return new WebSocket('ws://localhost:8080/api/' + url)
  return new WebSocket(protocol + "://" + window.location.host + '/api/' + url)
}

function action(method, token, content) {
  if (token)
    return {
      ...defaultSettings,
      body: content,
      method: method,
      credentials: 'include',
      headers: new Headers({
        "Authorization": "Bearer " + token,
        "Content-type": "application/json"
      })
    }
  else
    return {
      ...defaultSettings,
      method: method
    };
}