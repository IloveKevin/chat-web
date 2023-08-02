<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import websocketInstance from './network/websocket';
import { getToken } from './local';
export default {
  name: 'App',
  created() {
    let token = getToken();
    if (token.login) {
      websocketInstance.init();
    }
  }
}
</script>
<style></style>
