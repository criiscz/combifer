import Cookie from "universal-cookie";

export function concatClassNames(...args: Array<string|boolean|null|undefined>)
  : string {
  return args.filter(item => !!item).join(' ');
}

export function getToken(name: string = 'userToken') {
  return new Cookie().get(name);
}