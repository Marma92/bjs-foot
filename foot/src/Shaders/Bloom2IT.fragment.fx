uniform sampler2D textureSampler;
uniform sampler2D originalSampler;

varying vec2 vUV;

void main()
{
    vec4 blur = texture2D(textureSampler, vUV); // blur
    vec4 original = texture2D(originalSampler, vUV);

    gl_FragColor = blur + original;
}
