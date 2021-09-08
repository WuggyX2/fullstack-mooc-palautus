import axios from "axios";
import React, { useState, useEffect } from "react";
import { Country, CountryList, Search } from "./components/index";

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
			<Country
				countries={countriesToShow}
				renderComponent={countriesToShow.length === 1}
			/>
		</div>
	);
}

export default App;
