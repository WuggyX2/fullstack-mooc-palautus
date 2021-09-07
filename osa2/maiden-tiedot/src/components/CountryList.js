export const CountryList = ({ countries, searchTerm }) => {
	if (searchTerm) {
		if (countries.length < 10) {
			return (
				<div>
					{countries.map((country) => {
						return (
							<div key={country.alpha3Code}>{country.name}</div>
						);
					})}
				</div>
			);
		}
		return <div>Too many matches, specify another filter</div>;
	}

	return <div></div>;
};
