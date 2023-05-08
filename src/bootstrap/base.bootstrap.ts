export abstract class Bootstrap {
  abstract intialize(): Promise<string | Error>
}
