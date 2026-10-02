var B = require('./engine.js'), pass = 0, fail = 0;
function eq(n, a, b, t) { if (Math.abs(a - b) <= (t || 0.01)) pass++; else { fail++; console.log('FAIL', n, a, b); } }
function ok(n, c) { if (c) pass++; else { fail++; console.log('FAIL', n); } }
// Astronomics worked examples
eq('7x50 exit', B.exitPupil(7, 50), 7.14, 0.05);
eq('7x50 exit rounds 7.1', Math.round(B.exitPupil(7, 50) * 10) / 10, 7.1);
eq('4mm rel brightness', B.relBrightness(8, 32), 16);
eq('20x80 exit', B.exitPupil(20, 80), 4);
eq('20x80 rel brightness', B.relBrightness(20, 80), 16);
eq('8x32 twilight', B.twilight(8, 32), 16);
eq('20x80 twilight', B.twilight(20, 80), 40);
eq('10x40 twilight', B.twilight(10, 40), 20);
eq('7x42 twilight', B.twilight(7, 42), 17.1, 0.05);
eq('8x30 twilight', B.twilight(8, 30), 15.49);
eq('50 vs 35 area', B.lightArea(50) / B.lightArea(35), 2.04, 0.01);
eq('80 vs 32 area (625%)', B.lightArea(80) / B.lightArea(32), 6.25);
eq('7x28 exit 4', B.exitPupil(7, 28), 4);
// pupil by age anchors
eq('age 15', B.eyePupil(15), 7); eq('age 20', B.eyePupil(20), 7); eq('age 40', B.eyePupil(40), 5.5); eq('age 50', B.eyePupil(50), 5);
eq('age 30', B.eyePupil(30), 6.25); eq('age 70', B.eyePupil(70), 4.5);
ok('bad age', B.eyePupil(3) === null && B.eyePupil(NaN) === null);
// conditions
eq('day pupil young', B.condPupil('day', 25), 3);
eq('dark pupil age 60 capped', B.condPupil('dark', 60), 4.75);
eq('dusk pupil age 60', B.condPupil('dusk', 60), 4.75);
// 7x50 daylight wastes light: exit 7.14 vs 3 pupil
var a = B.analyze(7, 50, 'day', 30);
eq('7x50 day wasted', a.wasted, 1 - 9 / (50 / 7 * 50 / 7), 0.001); ok('7x50 day over', a.verdict === 'over'); eq('7x50 day effective', a.effective, 9);
// 7x50 vs 7x28 same effective brightness in day
eq('7x28 day effective', B.analyze(7, 28, 'day', 30).effective, 9);
var d = B.analyze(8, 42, 'dusk', 30); eq('8x42 dusk exit', d.exit, 5.25); ok('8x42 dusk match', d.verdict === 'match'); eq('8x42 dusk eff', d.effective, 25);
var e = B.analyze(10, 25, 'dusk', 30); ok('10x25 dusk under', e.verdict === 'under'); eq('no waste', e.wasted, 0);
var m = B.analyze(10, 50, 'dusk', 30); ok('10x50 dusk match', m.verdict === 'match');
// older eye: 7x50 vs 7x42 at dusk age 60 same effective
eq('age 60 7x50 dusk eff', B.analyze(7, 50, 'dusk', 60).effective, 4.75 * 4.75); eq('age 60 7x42 dusk eff', B.analyze(7, 42, 'dusk', 60).effective, 4.75 * 4.75);
ok('bad input', B.analyze(0, 40, 'day', 30) === null && B.analyze(8, 5, 'day', 30) === null && B.analyze(8, 40, 'x', 30) === null && B.analyze(8, 40, 'day', 2) === null);
// field of view: 8 deg = 420 ft at 1000 yd (Astronomics)
eq('fov 8deg at 1000yd in ft', B.fieldWidth(8, 914.4) / 0.3048, 420, 1.5);
eq('fov 8deg at 100yd ft', B.fieldWidth(8, 91.44) / 0.3048, 42, 0.2);
eq('fov 5deg 15ft inches', B.fieldWidth(5, 15 * 0.3048) / 0.0254, 15.7, 0.1);
console.log(pass + '/' + (pass + fail) + ' pass'); process.exit(fail ? 1 : 0);
