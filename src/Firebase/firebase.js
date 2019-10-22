import app from 'firebase/app';
import 'firebase/firestore';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';

const config = {
	apiKey: "AIzaSyDDeDXbFUtorWfIE5nBIi0d4YuB00h9-Lc",
	authDomain: "geo-firestore.firebaseapp.com",
	databaseURL: "https://geo-firestore.firebaseio.com",
	projectId: "geo-firestore",
	storageBucket: "geo-firestore.appspot.com",
	messagingSenderId: "351399318472",
	appId: "1:351399318472:web:d2f049a9bd79cd4444e6fd"
};

class Firebase{
	constructor(){
		app.initializeApp(config);
		this.db = app.firestore();
		this.geoFirestore = new GeoFirestore(this.db);
	}

	geoCollection = () => this.geoFirestore.collection('locations');

	addLocation = (name ,lat, lon) => this.geoCollection().add({
		name,
		score: 100,
		// The coordinates field must be a GeoPoint!
		coordinates: new app.firestore.GeoPoint(lat, lon)
	});

	getLocationsInRadius = (lat, lon, radius) => this.geoCollection()
		.near({
			center: new app.firestore.GeoPoint(lat, lon),
			radius
		})
		.get()
		.then(value => {
			console.log(value.docs);
		});

}

export default Firebase;
