# electron-screencap

Based on [Fireship's tutorial on Electron](https://www.youtube.com/watch?v=3yqDxhR2XxE).

The tutorial is probably outdated since I had to fix some bugs while developing this. Fireship's tutorial was written in one `render.js` file where the render and main process modules were accessed in one place. I had to develop mine with the recommended practice of using the IPC modules to communicate between the two processes with events. It's a very fun build. 💯

## 🔧 How to Run On Your Computer

Clone this repository and do the following:

1. Install Dependencies

```console
// npm
npm install

// yarn
yarn
```

2. Run Forge

```console
// npm
npm run start

// yarn
yarn start
```

3. You can also create an **executable** with electron-forge compatible for your machine.

```console
// npm
npm run make

// yarn
yarn make
```
