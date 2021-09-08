export const CountryList = ({ countries, searchTerm, buttonClickHandler }) => {
	if (searchTerm && countries.length !== 1) {
		if (countries.length < 10) {
			return (
				<div>
					{countries.map((country) => {
						return (
							<div key={country.alpha3Code}>
								{country.name}{" "}
								<button
									value={country.name}
									onClick={buttonClickHandler}
								>
									Show
								</button>
							</div>
						);
					})}
				</div>
			);
		}
		return <div>Too many matches, specify another filter</div>;
	}

	return <div></div>;
};
