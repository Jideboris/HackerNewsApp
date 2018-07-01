Overview
---------
The code was written using visual studio 2017 profesional.

The angular used is 1.0.5
The start up page is defined in index.html

Home.html is the page that displays the header stories and each story's content as when clicked by the use

The controller that drives the home.html is homecontroller.js.

The homecontroller.js is also being driven by the homeservice.js 

A style file style.css was used to do the styling just a litte bit.

Start
-------
To run the application please open in a visual studio and simply run using F5 OR button start.

Please note no configuration was done in this demo and could not have time to do the build setup with gulp.

However note to start the application ensure your homecontroller.js file is opened.

Homeservice.js
--------------
This file makes use of http to make requests to the hacker news APIs

it contains 2 functions to get the header stories and to get the each header's contents.

Note that LAZY LOADING techinique was implemented in achieving this.

Homecontroller.js
-----------------
it consists all the functions that drive the view--home.html.

functions to get the headers and associated contents when users click on a header.

It controls the view to load only 10 headers at a time.

It also enables users to reduce the number of news visible to them at a time.
