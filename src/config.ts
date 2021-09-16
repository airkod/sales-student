export const Config = {
  api: {
    endpoint: '',
    cache: false
  },
  cache: {
    enabled: true,
    namespace: '_cache',
    lifetime: 3600000 // 1 час
  },
  firebase: {
    config: {
      apiKey: "",
      projectId: "",
      messagingSenderId: "",
      appId: ""
    },
    vapid: ''
  },
  fs: {
    url: '',
    path: '/user-files'
  },
  payment: {
    defaultSum: 100,
    minimumSum: 1
  }
};
