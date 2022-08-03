import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    colors: {
      gray: string;
      blue: string;
      white: string;
      red: string;
    };
  }
}
