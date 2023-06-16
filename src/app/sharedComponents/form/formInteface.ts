export interface IForm {
  variant: "input" | "longInput"| "select" | "imgFile"
  type: "string" | "number" | "string[]"
  name: string
  title: string
  options?: {
    name: string
    title: string
  }[],
  initialValue:any
}