import { createGlobalStyle, ThemeProvider } from "styled-components";
import AppRouter from "./Router";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  font-family: 'Black Han Sans', sans-serif;

}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
  box-sizing: border-box;
}
a{
  text-decoration: none
}
li{
  list-style:none;
}
button{
  outline:none;
  border:none;
}
h1{
  font-size:5vw;
}
h2{
  font-size:3.5vw;
}
h3{
  font-size:3vw;
}
span,li,h4{
  font-size:2.5vw;
  line-height:130%;
}
@media screen and (min-width :500px){
  h1{
  font-size:20px;
}
h2{
  font-size:16px;
}
h3{
  font-size:12px;
}
span,li,h4{
  font-size:10px;
  line-height:130%;
}
}
`;

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </div>
  );
};

export default App;
