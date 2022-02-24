import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      whiteColor: string;
      mainBgColor: string;
      subBgColor: string;
      btnColor: string;
      accentColorPurple: string;
      accentColorDarkPurple: string;
    };
  }
}
