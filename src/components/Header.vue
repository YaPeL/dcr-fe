<template>
  <v-app-bar app>
	<v-toolbar-title>DCR</v-toolbar-title>
	<v-spacer></v-spacer>
    <v-btn to="/" text>
      About
      <v-icon>mdi-help-outline</v-icon>
    </v-btn>

    <v-btn to="/compass" text>
      Compass
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Header',

    data: () => ({
	//
    }),
  }
</script>
