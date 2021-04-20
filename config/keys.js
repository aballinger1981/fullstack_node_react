export default (async () => {
  if (process.env.NODE_ENV === 'production') {
    return (await import('./prod')).default;
  }
  return (await import('./dev')).default;
});
