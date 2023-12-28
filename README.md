# React Pomodoro App - 25+5 Clock

React Pomodoro App, developed by Bade Ozgule on CodePen, is on trend after being picked by the CodePen team on 27.12.2023! 🎉
Original URL: [https://codepen.io/badeozgule/pen/yLRXPpy](https://codepen.io/badeozgule/pen/yLRXPpy).

# Build Process

This package allows you to transform raw code into a browser-ready preview offline. It includes the original code in the `src/` directory and a custom build script with processors.

## Installation

Make sure you have a recent version of [Yarn](https://yarnpkg.com/en/docs/install) or [Node.js and npm](https://nodejs.org/en/download/) installed.

Navigate to the project directory in the terminal and install the necessary packages:

```
# Using Yarn
yarn install

# Using npm
npm install
```

## Build

To build for distribution:

```
# Using Yarn
yarn run build

# Using npm
npm run build
```

All of the final output will be dropped into the [/dist/](./dist) folder.

## Server

Run a local server that will automatically compile your code & refresh when you save a change!

```
# Using Yarn
yarn run serve

# Using npm
npm run serve
```

---

## Folder Structure

```
/exported-item/
|-- /build/ - Build scripts
|  |-- gulpfile.js - The tasks for the main build process
|  |-- util.js - Utilities used by the tasks
|
|-- /src/ - Your code
|  |-- index.template.html - The wrapper around your compiled HTML that includes any external stylesheets and scripts
|  |-- index.partial.(html|pug|haml|...) - The raw HTML input or preprocessor equivalent
|  |-- style.(css|scss|less|...) - The raw CSS input, or preprocessor equivalent
|  |-- script.(js|ts|coffee|...) - The raw JavaScript input, or preprocessor equivalent
|
|-- /dist/ - The compiled output after running `npm run build`
|  |-- index.html
|  |-- script.js
|  |-- style.css
```
