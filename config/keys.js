export default (async () => {
  if (process.env.NODE_ENV === 'production') {
    return (await import('./prod')).default;
  } else {
    return (await import('./dev')).default;
  }
})();
