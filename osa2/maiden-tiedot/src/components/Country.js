import LanguageList from "./LanguageList";

const Country = ({ countries, renderComponent }) => {
	if (renderComponent) {
		const country = countries[0];
		const flagAltText = `${country.demonym} flag`;
		return (
			<div>
				<h1>{country.name}</h1>
				<div>capital {country.capital}</div>
				<div>population {country.population}</div>
				<h2>languages</h2>
				<LanguageList languages={country.languages} />
				<br />
				<img
					alt={flagAltText}
					src={country.flag}
					width="150"
					height="100"
				/>
			</div>
		);
	}
	return <div></div>;
};

export default Country;
