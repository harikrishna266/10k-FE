# Front-end Style Guide

## Theme
  - you can import the theme in any component
    ```
      @use "theme" as *;
    ```


## Layout
The design was created for the following screen resolutions:
  - Desktop: 1440px
  - Mobile: 375px

## Guidelines for naming a class
    https://sparkbox.com/foundry/bem_by_example
### Remember to design Mobile first and then convert to Desktop
     
## Support for dark and Light theme
System will try to get the operating system "prefers-color-scheme" and use that. However, the user can Toggle between 
  - Dark theme
  - Light Theme.


#### Dark Theme
- Toggle: linear gradient hsl(210, 78%, 56%) to hsl(146, 68%, 55%)
- Very Dark Blue (BG): hsl(230, 17%, 14%)
- Very Dark Blue (Top BG Pattern): hsl(232, 19%, 15%)
- Dark Desaturated Blue (Card BG): hsl(228, 28%, 20%)
- Desaturated Blue (Text): hsl(228, 34%, 66%)
- White (Text): hsl(0, 0%, 100%)
#### Light Theme
- Toggle: hsl(230, 22%, 74%)
- White (BG): hsl(0, 0%, 100%)
- Very Pale Blue (Top BG Pattern): hsl(225, 100%, 98%)
- Light Grayish Blue (Card BG): hsl(227, 47%, 96%)
- Dark Grayish Blue (Text): hsl(228, 12%, 44%)
- Very Dark Blue (Text): hsl(230, 17%, 14%)


## Typography

### Body Copy

- Font size (Overview Card Headings): 14px


### Font

- Family: [Inter](https://fonts.google.com/specimen/Inter)
- Weights: 400, 700
