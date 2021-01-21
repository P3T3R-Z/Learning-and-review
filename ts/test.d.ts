declare module "test" {
  export let a: number;
  export function b(): number;
  export namespace c {
    let cd: string;
  }
}

declare var D2: number

declare namespace mySpace {
  interface itest {
    id: string,
    [propname:string]: any
  }
}
