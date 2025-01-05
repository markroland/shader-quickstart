# Shader Quickstart using Shadertoy.com

[Shadertoy](https://www.shadertoy.com) is a popular online platform for creating and sharing WebGL
shaders.

Go to [https://www.shadertoy.com/new](https://www.shadertoy.com/new), paste in the following code, and run:

```
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    fragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}
```

## License

Please see https://www.shadertoy.com/terms