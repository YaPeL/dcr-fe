# Degree Confluence Rebirth FrontEnd

## Project config

edit the env.development.local with the appropiate VUE_APP_GMAP_API_KEY


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### Compass app usage
* Use the form to set your current location (address, city, country), no need to fill the 3 of them, but for address I would recommend also filling city
* Or if you already know your lat and lng, you can set it up manually
* finally, when the lat and lng are set, click on the get nearby points

## Future plans, what is missing 
* As I said before, I'm not a FE dev, thus the app looks ugly
* there are no unitests (time constraint), though the project is ready to use them with jest
* I feel the compass app could be splitted into components, but to communicate between them I would need to add somthing like vuex
* when entering the compass, it could be possible to use the geolocalization capabilities of the web browser to center the map, I didn't add it because I felt it would defeat the pourpuse of the address form
* the about page with a background and a parallax scrolling effect could be nice
* using modals from vuetify instead of an alert if address is not found.
* Reset only clears the 
