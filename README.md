# Topology-API
Node.js API that provides the functionality to access, manage and store device topologies in JSON format

## Why Javascript
- Since JSON is derived from javascript, Parsing JSON files or converting objects to JSON format are easily done using the built-in JSON object.
- Javascript has Array class which provides various methods to easily manipulate arrays.
- Memory management and garbage collection are done automatically.

## Design choices
I decided to write synchronous code just to make the interface and usage look like other languages. However, it would be more efficient to write the code asynchronously and return promises.