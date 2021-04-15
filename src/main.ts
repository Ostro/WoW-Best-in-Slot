import { createApp, provide, h } from 'vue';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import localState from './localState';
import { selectedCharacterQuery, selectedGearListQuery } from './localState/queries';

const cache = new InMemoryCache({});
cache.writeQuery({ query: selectedCharacterQuery, data: { selectedCharacter: '' } });
cache.writeQuery({ query: selectedGearListQuery, data: { selectedGearList: '' } });

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
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
}).mount('#app');
