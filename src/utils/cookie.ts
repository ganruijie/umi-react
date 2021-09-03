import Cookie from 'js-cookie';
export function setItem(key: string, value: string, days: number): void {
  if (window.localStorage) {
    localStorage.setItem(key, value);
  } else {
    Cookie.set(key, value, { expires: days });
  }
}

export function getItem(key: string): string | undefined {
  if (window.localStorage) {
    return localStorage.getItem(key) || '';
  } else {
    return Cookie.get(key);
  }
}

export function removeItem(key: string): void {
  if (window.localStorage) {
    localStorage.removeItem(key);
  } else {
    Cookie.set(key, '', { expires: -1 });
  }
}

export function clear(): void {
  if (window.localStorage) {
    localStorage.clear();
  } else {
    // 使用原生
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf('=');
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
    if (cookies.length > 0) {
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf('=');
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        let domain = location.host.substr(location.host.indexOf('.'));
        document.cookie =
          name +
          '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' +
          domain;
      }
    }
  }
}
