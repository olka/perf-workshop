# node-express-workshop-complete

This is borrowed from Jed Watson implementation for the node-express-workshop with some performance quirks to fix.

The outcome is a simple blog website using:

* [Node.js](https://nodejs.org/) v7.6+
* [Express](http://expressjs.com/) for the web server
* [EJS](http://ejs.co/) for templates
* [Bootstrap](https://v4-alpha.getbootstrap.com/) for styling
* [LevelDB](https://github.com/Level/levelup) to store content

The website includes:

* A home page that displays all blog posts
* A view that displays the full content of a post
* A create post form that lets you add a new post to the database
* Simple 404 (not found) and error handlers

## Setup

First, make sure you have Node.js v7.6 or higher installed. Then clone or fork this repository.

Then install the dependencies by running:

```sh
npm install
```

To start the website, run:

```sh
node server
```

Then visit [localhost:3000](http://localhost:3000) to view the blog.

If you want to reset the content database, you can do that by running:

```sh
node server --reset
```
===========Other notes: ==================
Intall k6: https://docs.k6.io/docs/installation

Monitoring:
npm install -g pm2
pm2 start server.js

Execute load tests:
k6 run load.js --duration 60s --vus 10


Profiling:
pm2 start server.js --node-args="--inspect --perf-basic-prof" //default is 127.0.0.1:9229 On linux\prod you may start inspect session by sending SIGUSR1 signal to a process like kill -SIGUSR1 PID but there is NO CUSTOM SIGNALS IN WINDOWS 
chrome://inspect    (https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)

Extra (flame graphs): 
https://www.ebayinc.com/stories/blogs/tech/igniting-node-js-flames/
https://github.com/jlfwong/chrome2calltree
https://github.com/cimi/d3-flame-graphs


Execute k6 tests
k6 run load.js --duration 120s --vus 10

What profiling types should we use?

Links
https://www.ebayinc.com/stories/blogs/tech/igniting-node-js-flames/
https://nodejs.org/de/docs/guides/debugging-getting-started
https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference
http://www.brendangregg.com/flamegraphs.html
https://addyosmani.com/blog/devtools-flame-charts/
https://medium.com/netflix-techblog/node-js-in-flames-ddd073803aa4
https://medium.com/yld-engineering-blog/cpu-and-i-o-performance-diagnostics-in-node-js-c85ea71738eb




## License

MIT License. Copyright (c) 2017 Jed Watson.
