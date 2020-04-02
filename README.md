# U. Minho 2020 React Class

This repository hosts the stages that we will be following in the live coding part of the class.

## Dependencies

To start, install [node](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install).

It is also recommended to use [Visual Studio Code](https://code.visualstudio.com/) as your editor, as it has great JavaScript Intellisence and plugin support.

## Stages

### 00 / master - Create react app bootstrap project

This branch was created with [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) by running:

```bash
npx create-react-app uminho-2020-react-class
```
If you want to create a starter application on your computer instead of cloning this repository, you can run the same command.

If you cloned this repository you need to run:

```bash
yarn install
```

Then, to start the application run:

```bash
yarn start
```

### 01 - Add linter and formatter

A linter is a code static analyser helps us by finding problems in our code. Here we will be adding eslint as our code linter.

A formatter formats our code in order for it to be consistent, helping with readability. For this we will be using PrettierJS. You can install the prettier extension for VS Code and enable "format on save" on the settings to keep your code formatted.

```bash
git checkout 01-add-linter-and-formatter
yarn install
yarn start
```

### 02 - Add fetch and listing of interest points

A mock server (using miragejs) was added to simulate a backend server.
The contract for the API will be:

```
GET /interest-points => { interestPoints: [{ title: String, latitude: Number, longitude: Number }, ...]}
```

Then we will use the react lifecycles and state to present the results to the user.

```bash
git checkout 02-fetch-interest-points
yarn install
yarn start
```

### 03 - Draw points on interactive map

To draw an interactive map we are going to use [Leaflet](https://leafletjs.com/).
We will also use custom map tiles from [MapBox](https://www.mapbox.com/), so an access token from mapbox is necessary.
You can create yours by signing in for a free account, or use other free maps.


```bash
git checkout 03-draw-points-on-map
yarn install
yarn start
```

### 04 - Add new interest points

The backend contract to create new interest point will be:
```
POST /interest-points body: { title: String, latitude: Number, longitude: Number } => { interestPoint: [{ title: String, latitude: Number, longitude: Number, id: Number }, ...]}
```

To define a new point on the UI we will be using the Leaflet's map api that allows us to add click listening events.
We will then interpret a click on the map as if a new Interest Point is to be added on that location.
We will also need to collect the Interest Point title in order to finally create in on the backend.

```bash
git checkout 04-add-points-on-map
yarn install
yarn start
```

### 05 - Revamp UI using a UI Components library

Using a design system allows us to have a consistent UI across our application.
The fastest way to get started is to use existing design systems that provide us the components to use, like bootstrap or the one that we will be using, Semantic UI.

```bash
git checkout 05-add-semantic-ui
yarn install
yarn start
```

### 06 - [Challenge] Jump to Interest Point Location

Here we want to add a feature that allows the user to click on one of the items in the interest points list, and center the map on that location.

To set the list as clickable we can use the prop [selection from Semantic UI](https://react.semantic-ui.com/elements/list/#variations-selection) and then set a onClick handler for each list item.
That function should eventually change the viewport state so that the map is re-rendered with a new center.

```bash
git checkout 06-center-map-on-point
yarn install
yarn start
```

### 07 - [Challenge] Remove Interest Point

The backend contract to remove a interest point will be:
```
DELETE /interest-points/:id => 204 No content
```

Here we will be adding a button in each item on the list that allows the user to remove that specific item.

We need to bind the click on the new button with an API call, and change the state of the application, in this case removing the correct marker from the markers list, to re-render the application.

```bash
git checkout 07-remove-interest-point
yarn install
yarn start
```
