uniform sampler2D textureSampler;
uniform float threshold;

varying vec2 vUV;

void main()
{
    vec4 color = texture2D(textureSampler, vUV);

    if (length(color.rgb) < threshold)
        color.rgb = vec3(0.0);

    gl_FragColor = color;
}
