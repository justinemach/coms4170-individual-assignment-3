import assert from 'node:assert/strict';
import { createServer } from 'vite';

// Exercise the actual exported functions, including input boundaries.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { validate } = await server.ssrLoadModule('/src/components/RsvpForm.jsx');
  const { matchesSearch } = await server.ssrLoadModule('/src/App.jsx');
  const { events } = await server.ssrLoadModule('/src/data/events.js');
  const { loadEvents, SIMULATE_FAILURE, SIMULATE_EMPTY } = await server.ssrLoadModule('/src/data/loadEvents.js');
  assert.deepEqual(Object.keys(validate({name:'   ',email:'',guests:'0'})).sort(), ['email','name']);
  assert.ok(validate({name:'Ada',email:'missing-at',guests:'0'}).email);
  for (const guests of ['-1','4','not-a-number']) assert.ok(validate({name:'Ada',email:'ada@example.test',guests}).guests);
  for (const guests of ['0','1','2','3']) assert.deepEqual(validate({name:'Ada',email:'ada@example.test',guests}), {});
  const upcoming = events.filter(event => !event.isPast);
  for (const [query, count] of [['f',2],['fr',1],['FRIDAY',1],[' friday ',1],['zzz',0],['',3]]) {
    assert.equal(upcoming.filter(event => matchesSearch(event,query)).length,count);
  }
  assert.equal(events.filter(event => event.isPast && matchesSearch(event,'mixer')).length,1);
  assert.equal(new Set(events.map(event => event.id)).size,events.length);
  assert.equal(SIMULATE_FAILURE,false);
  assert.equal(SIMULATE_EMPTY,false);
  assert.equal((await loadEvents()).length,events.length);
  console.log('Passed validation boundaries, search cases, stable IDs, and restored loader defaults.');
} finally {
  await server.close();
}
