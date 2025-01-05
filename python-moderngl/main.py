import moderngl
import glfw
from OpenGL.GL import glGetString, GL_VERSION
import numpy as np

# Initialize GLFW
if not glfw.init():
    raise Exception("GLFW can't be initialized")

# Set the desired OpenGL version and profile
glfw.window_hint(glfw.CONTEXT_VERSION_MAJOR, 3)
glfw.window_hint(glfw.CONTEXT_VERSION_MINOR, 3)
glfw.window_hint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)
glfw.window_hint(glfw.OPENGL_FORWARD_COMPAT, 1)

# Create a windowed mode window and its OpenGL context
window = glfw.create_window(400, 400, "ModernGL Shader", None, None)
if not window:
    glfw.terminate()
    raise Exception("GLFW window can't be created")

# Make the window's context current
glfw.make_context_current(window)

# Check the OpenGL version
version = glGetString(GL_VERSION)
print(f"OpenGL version: {version}")

# Create a ModernGL context
ctx = moderngl.create_context()

# Vertex shader
vertex_shader_source = """
#version 330
in vec2 in_position;
out vec2 frag_position;

void main() {
    frag_position = in_position;
    gl_Position = vec4(in_position, 0.0, 1.0);
}
"""

# Fragment shader
fragment_shader_source = """
#version 330
in vec2 frag_position;
out vec4 fragColor;

void main() {
    // Use the fragment position to determine the color
    fragColor = vec4(frag_position.x * 0.5 + 0.5, frag_position.y * 0.5 + 0.5, 0.5, 1.0);
}
"""

# Compile shaders and create a program
prog = ctx.program(
    vertex_shader=vertex_shader_source,
    fragment_shader=fragment_shader_source,
)

# Define the rectangle vertices (two triangles)
vertices = np.array([
    -1.0, -1.0,  # First triangle
     1.0, -1.0,
    -1.0,  1.0,
     1.0, -1.0,  # Second triangle
     1.0,  1.0,
    -1.0,  1.0,
], dtype='f4')

# Create a buffer and upload the data
vbo = ctx.buffer(vertices.tobytes())

# Create a vertex array object
vao = ctx.simple_vertex_array(prog, vbo, 'in_position')

# Main loop
while not glfw.window_should_close(window):

    # Clear the screen
    ctx.clear(0.0, 0.0, 0.0, 1.0)

    # Render the triangle
    vao.render(moderngl.TRIANGLES)

    # Swap front and back buffers
    glfw.swap_buffers(window)

    # Poll for and process events
    glfw.poll_events()

glfw.terminate()