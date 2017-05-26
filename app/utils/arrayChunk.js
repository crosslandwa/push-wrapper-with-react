export default (data, size = 2) => data
  .reduce(([l, r]) => [l.concat([r.slice(0, size)]), r.slice(size)], [[], data])[0]
  .filter(a => a.length)
