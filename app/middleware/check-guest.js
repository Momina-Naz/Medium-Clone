import { useInitAuth } from "~~/stores/Auth";

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const store = useInitAuth(); // loads token from localStorage
    if (store.token) return navigateTo("/reading"); // redirect logged-in users
  }
});
