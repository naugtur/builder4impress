builder4impress
==============
A tool that builds impress.js presentations


Current usage instructions
---------

Stop the mouse pointer over a step to see the controls. Draggable controls let you set position, rotation and scale of the selected step. Caution: element is being redrawn when you stop the mouse, not all the time. I did that for your CPU ;)
`Edit` opens up a textarea with html contents of the step.
`Wrap` toggles the style of a classic slide.

Top left corner has some more buttons:
 - Add new - creates a new step in presentation. The new step glows until you change its text.
 - Overview - switches you from looking at a particular slide to the overview.
 - Get file - downloads the resulting presentation
 - style.css - downloads style.css file that needs to be next to the presentation.html (it's for you to edit)

You can download the presentation, but not push it back.

Plans and issues [notes to self, but tips are appreciated ;)]
---------

Make it follow the mouse more closely (there are some fractions lost in vector rotation or it's just an issue of responsiveness)

Add:
 - rearrange steps
 - delete steps
 - save work to localStorage ?
 - load presentation file ?

License
---------
MIT License

