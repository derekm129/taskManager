// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    sidebarWidth: string;
    colorBg2: string;
    borderColor2: string;
    // add any other theme values here
  }
}