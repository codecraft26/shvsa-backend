export default function catchAsyncErrors(fn) {
  return function(req, res, next) {
      fn(req, res, next).catch(next);
  }
}
