// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    sidebarWidth: string;
    colorBg2: string;
    colorBg3: string;
    borderColor2: string;
    colorGrey3: string;
    colorGrey0: string;
    activeNavLinkHover: string;
    colorGreenDark: string;
    colorIcons: string;
    colorIcons2: string;
    activeNavLink: string;

    // add any other theme values here
  }
}