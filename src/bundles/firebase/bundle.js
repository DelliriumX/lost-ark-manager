export default config => ({
  name: 'firebase',
  actions: {
    log: () => console.log('hi hi'),
  },
  reducer: () => ({ a: config.path }),
})
