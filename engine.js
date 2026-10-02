(function (root) {
  'use strict';
  // Formulas from Astronomics, "Some Binocular Specifications" (exit pupil, relative brightness,
  // twilight factor, pupil vs age, field of view).
  var COND = { day: { label: 'Bright daylight', pupil: 3 }, overcast: { label: 'Overcast or shade', pupil: 3.5 }, dusk: { label: 'Dawn or dusk', pupil: 5 }, dark: { label: 'Deep woods or night', pupil: 7 } };
  var AGE = [[20, 7.0], [40, 5.5], [50, 5.0]];
  function exitPupil(mag, obj) { return obj / mag; }
  function relBrightness(mag, obj) { var e = exitPupil(mag, obj); return e * e; }
  function twilight(mag, obj) { return Math.sqrt(mag * obj); }
  function lightArea(obj) { return obj * obj; }
  function eyePupil(age) {
    if (!(age >= 5 && age <= 100)) return null;
    if (age <= 20) return 7.0;
    for (var i = 1; i < AGE.length; i++) {
      if (age <= AGE[i][0]) { var a = AGE[i - 1], b = AGE[i]; return a[1] + (b[1] - a[1]) * (age - a[0]) / (b[0] - a[0]); }
    }
    return 5.0 - 0.25 * (age - 50) / 10;
  }
  // diameter of the eye pupil in a given condition, capped by what the eye can open to at this age
  function condPupil(cond, age) {
    var c = COND[cond]; var max = eyePupil(age);
    if (!c || max === null) return null;
    return Math.min(c.pupil, max);
  }
  function analyze(mag, obj, cond, age) {
    if (!(mag >= 1 && mag <= 100 && obj >= 10 && obj <= 200)) return null;
    var ep = condPupil(cond, age); if (ep === null) return null;
    var e = exitPupil(mag, obj), used = Math.min(e, ep);
    var wasted = e > ep ? 1 - (ep * ep) / (e * e) : 0;
    var verdict = e > ep * 1.05 ? 'over' : (e < ep * 0.95 ? 'under' : 'match');
    return { mag: mag, obj: obj, exit: e, rel: e * e, twilight: twilight(mag, obj), eyePupil: ep, used: used, effective: used * used, wasted: wasted, verdict: verdict, area: lightArea(obj) };
  }
  // width of the view (metres) at distance d metres for a field of view in degrees
  function fieldWidth(fovDeg, dM) { return 2 * dM * Math.tan(fovDeg * Math.PI / 360); }
  root.BinoPick = { COND: COND, exitPupil: exitPupil, relBrightness: relBrightness, twilight: twilight, lightArea: lightArea, eyePupil: eyePupil, condPupil: condPupil, analyze: analyze, fieldWidth: fieldWidth };
  if (typeof module !== 'undefined') module.exports = root.BinoPick;
})(typeof window !== 'undefined' ? window : globalThis);
