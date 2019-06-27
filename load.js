import http from "k6/http";
import { check, fail } from "k6";

export let options = { maxRedirects: 10 };

const baseURL = "http://localhost:3000/";

export default function() {
	//get index page
	for (var id = 1; id <= 20; id++) {
	  let res = http.get(baseURL);
		check(res, {
			"check": (res) => res.body!=null,
			"is status 200": (res) => res.status === 200
		});
	}
	
	//create new post
	res = http.get(baseURL+"create-post").submitForm({
	    fields: { title: "test post", short: "short description", long: "looooooooong description" }
	});

	check(res, {
		"is status 200": (res) => res.status === 200
	});
}