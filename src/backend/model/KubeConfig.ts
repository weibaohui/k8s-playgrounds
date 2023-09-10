export class Context {
  cluster?: string
  name?: string
  user?: string
}

export class Cluster {
  caData?: string
  name?: string
  server?: string
  skipTLSVerify?: boolean
}

export class User {
  certData?: string
  keyData?: string
  name?: string
}

export class KubeConfig {
  contexts?: Context[]
  clusters?: Cluster[]
  users?: User[]
  currentContext?: string
}
