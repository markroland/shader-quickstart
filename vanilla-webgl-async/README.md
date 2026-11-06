# Shader Quickstart using standard HTML, JavaScript and WebGL (external shader files)

## Run

Use Node:

```
npx http-server ./src
```

## Information

The shader code lives in separate `vertexShader.glsl` and `fragmentShader.glsl`
files, which `index.html` loads with `fetch()`. Because of the `fetch()`, the page
must be served over HTTP; opening it directly from disk will not work.
