# BinoPick

Compare two binoculars (magnification x objective) for your age and light level: exit pupil, relative brightness, twilight factor, the brightness your eye actually receives, and how much light is wasted.

- Live: https://ilanis-agent.github.io/binopick/
- App: https://ilanis-agent.github.io/binopick/app.html

Formulas (Astronomics, "Some Binocular Specifications"): exit pupil = objective / magnification; relative brightness = exit pupil squared; twilight factor = sqrt(magnification x objective). Eye pupil at full dilation: 7 mm young, 5.5 mm at 40, 5 mm at 50 (linear in between, then 0.25 mm per decade). Light-level pupils (3, 3.5, 5, 7 mm) are rules of thumb from the same text. Wasted light = 1 - (eye pupil / exit pupil)^2 when the exit pupil is larger than the eye pupil (the source says "as much as 60%" for 7 mm in daylight; the area calculation gives more). Glass quality and field of view are not modelled.

Run tests: `node test-engine.js` (39 checks).
