### Impt
1. env is defined in webpack.config.js
2. currently typescript is compiled to js


## HOW THINGS WORK
### CLIENT
1. npm run build:client all typescript transpiled to js
2. extension.js activate function called by extension
3. registers the commands
4. when command tagged to launching panel is started, panel is created



### server
1. DEFINE MODEL structure as a wit file
2. npm run generate:model; this uses a tool and define an api where ts clients can call
3. npm run build:server; this compiles all rust server code into web assembly



### what is being ran?
1. client: all js code in dist/*
2. server: all target/*