## Day001 - sprite animations

This is a animation project using JavaScript and HTML5 canvas. It features a shadow dog character that can run, jump,
and fall. The user can change the animation state of the character using a dropdown menu.

### Preview

[Image](images/preview.png)

### Instructions

To run the project, simply open the `index.html` file in a web browser. You can then use the dropdown menu to change the
animation state of the character.

### How it works

The animation is created by drawing a different frame of the character image to the canvas on each frame of the
animation loop. The frame of the image that is drawn is determined by the current animation state and the game frame
counter.

### Animation states

The following animation states are available:

* `idle`: The character is standing still.
* `jump`: The character is jumping.
* `fall`: The character is falling.
* `run`: The character is running.
* `dizzy`: The character is dizzy.
* `sit`: The character is sitting.
* `roll`: The character is rolling.
* `bite`: The character is biting.
* `ko`: The character is knocked out.
* `getHit`: The character is getting hit.

### Stagger frames

The stagger frames value determines how many frames to wait between drawing each frame of the animation. A higher
stagger frames value will result in a slower animation.

### License

This project is licensed under the MIT License.
