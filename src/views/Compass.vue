<template>
  <v-container class="text-center">
    <v-row justify="space-between">
        <v-col cols="12"
               md="4">
            <v-form ref="form_geo"
                    v-model="valid_geo"
                    lazy-validation>
                <v-text-field v-model="address"
                              label="address"
                              required></v-text-field>

                <v-text-field v-model="city"
                              label="city"
                              required></v-text-field>

                <v-text-field v-model="country"
                              label="country"
                              required></v-text-field>

                <v-btn :disabled="!valid_geo"
                       color="success"
                       class="mr-4"
                       @click="validate_geo">
                    Get coordinates
                </v-btn>

                <v-btn color="error"
                       class="mr-4"
                       @click="reset">
                    Reset
                </v-btn>
            </v-form>
            <v-form ref="form_lat_and_lng"
                    v-model="valid_lat_and_lng"
                    lazy-validation>
                <v-text-field v-model="lat"
                              label="latitude"
                              :rules="parseLatitude"
                              required></v-text-field>

                <v-text-field v-model="lng"
                              label="longitude"
                              :rules="parseLongitude"
                              required></v-text-field>

                <v-btn :disabled="!valid_lat_and_lng"
                       color="success"
                       class="mr-4"
                       @click="validate_lat_and_lng">
                    Get nearby points
                </v-btn>
            </v-form>
        </v-col>
        <v-col cols="12"
               md="8">
            <h2>Hover over markets to get the distance from coordinates</h2>
            <gmap-map :center="center"
                      :zoom="7"
                      style="height: 500px"
                      ref="mapRef">
                <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                </gmap-info-window>
                <gmap-marker :key="index"
                             v-for="(m, index) in markers"
                             :position="m.position"
                             :name="m.label"
                             @mouseover="toggleInfoWindow(m, index)"
                             @click="center=m">
                </gmap-marker>
            </gmap-map>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: 'Calculator',

        data: () => ({
            valid_geo: true,
            address: '',
            city: '',
            country: '',
            valid_lat_and_lng: true,
            lat: 0,
            lng: 0,
			infoWindowPos: null,
			infoWinOpen: false,
			currentMidx: null,
			infoOptions: {
				content: '',
				//optional: offset infowindow so it visually sits nicely on top of our marker
				pixelOffset: {
					width: 0,
					height: -35
				}
			},
            center: { lat: 0, lng: 0 },
            parseLatitude: [
				v => !/^\s*$/.test(v) && !isNaN(v) || "Please Enter a valid number",
				v => -90 <= v && v <= 90 || "Value should be between -90 and 90",
            ],
            parseLongitude: [
                v => !/^\s*$/.test(v) && !isNaN(v) || "Please Enter a valid number",
                v => -180 <= v && v <= 180 || "Value should be between -180 and 180",
            ],
            markers: [],
        }),

        methods: {
            validate_geo() {
                // this is always going to be true
                if (this.$refs.form_geo.validate()) {
                    let payload = { address: this.address, city: this.city, country: this.country }
                    this.$http.post("geo/reverse", payload).then(function (data) { this.center_map(data.body); this.lat = data.body.lat; this.lng = data.body.lng },
                        function () { alert("Address not found!") })
                }
            },
            reset() {
                this.$refs.form_geo.reset()
            },
            validate_lat_and_lng() {
                if (this.$refs.form_lat_and_lng.validate()) {
                    let payload = { lat: parseFloat(this.lat), lng: parseFloat(this.lng) }
                    this.$http.post("geo/nearby", payload).then(function (data) { this.center_map(payload); this.markers = data.body.markers;})
                }

            },
            center_map(point) {
				console.log(point)
				this.$refs.mapRef.$mapObject.setCenter(point)
            },
            toggleInfoWindow: function (marker, idx) {
                this.infoWindowPos = marker.position
                this.infoOptions.content = marker.infoText

                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                    this.infoWinOpen = !this.infoWinOpen;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.infoWinOpen = true
                    this.currentMidx = idx

                }
            },
        },
    }
</script>