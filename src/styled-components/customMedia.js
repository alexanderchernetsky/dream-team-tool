import { generateMedia } from "styled-media-query";

// screen sizes
export const screenDesktop = 992;
export const screenTablet = 768;
export const screenPhone = 480;


export const customMedia = generateMedia({
  desktop: `${screenDesktop}px`,
  tablet: `${screenTablet}px`,
  mobile: `${screenPhone}px`
});
