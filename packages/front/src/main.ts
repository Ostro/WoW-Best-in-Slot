import { createApp, provide, h } from 'vue';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';
import App from './App.vue';
import localState from './localState';
import { selectedCharacterQuery, selectedGearListQuery } from './localState/queries';
import router from './router';
import { getAuthHeader } from './utils/auth';

const cache = new InMemoryCache({});
cache.writeQuery({ query: selectedCharacterQuery, data: { selectedCharacter: '' } });
cache.writeQuery({ query: selectedGearListQuery, data: { selectedGearList: '' } });

const authenticationMiddleware = setContext(() => ({ headers: getAuthHeader() }));
const httpLink = authenticationMiddleware.concat(createHttpLink({
  uri: 'http://localhost:3000/graphql',
}));

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs: localState.typeDefs,
  resolvers: localState.resolvers,
  connectToDevTools: true,
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render() {
    return h(App);
  },
})
  .use(router)
  .mount('#app');
