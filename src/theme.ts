import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    whiteColor: "#ffffff",
    mainBgColor: "#f7f1e3",
    subBgColor: "#d1ccc0",
    btnColor: "#f1f2f6",
    accentColorPurple: "#706fd3",
    accentColorDarkPurple: "#40407a",
  },
  shadow: {
    noneClickBtn:
      "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
    clickedBtn:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",
  },
  font: {
    basicFont: "MaruBuri-Regular",
  },
  fontSize: {
    header: "20px",
  },
};
