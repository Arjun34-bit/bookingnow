const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  minTime: 200,
});

export function fetchData(url, method, data = {}, config = {}) {
  return limiter.schedule(() => axios({ url, method, data, config }));
}
