### Impt
1. env is defined in webpack.config.js
2. Typescript is transpiled to js
3. webpack has 2 ways of transpiling 
3.1. for client (web)
3.2. for server (node)


## HOW THINGS WORK
### CLIENT
1. npm run build:client all typescript transpiled to js
2. extension.js activate function called by extension
3. registers the commands
4. when command tagged to launching panel is started, panel is created



### Server
1. TRPC server - main router defined in index.ts which will associate subrouters
2. runs in the background listening for a message from the webview
3. replies as a windows event

### Flow (By right lol)
1. Client posts a message to backend with a method name
2. Attach a event listener to listen for reply
3. Extension sees a message and calls the routes server side
4. Server replies by posting event to webview
5. webview parses response, takes down event listener



client webview <-- MESSAGE defined by vs api --> extension.ts <-- TRPC methods server side calls --> server