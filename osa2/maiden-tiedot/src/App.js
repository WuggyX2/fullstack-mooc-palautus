import axios from "axios";
import React, { useState, useEffect } from "react";
import { CountryList } from "./components/CountryList";
import Search from "./components/Search";

function App() {
	const [countries, setCountries] = useState([]);
	const [searchString, setSearchString] = useState("");

	const countriesToShow = countries.filter((country) => {
		return country.name.toLowerCase().includes(searchString.toLowerCase());
	});

	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then((response) => {
				setCountries(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleSearchStringChange = (event) => {
		setSearchString(event.target.value);
	};

	return (
		<div>
			<Search
				searchString={searchString}
				onChange={handleSearchStringChange}
			/>
			<CountryList
				countries={countriesToShow}
				searchTerm={searchString}
			/>
		</div>
	);
}

export default App;
