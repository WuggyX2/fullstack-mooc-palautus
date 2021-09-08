const LanguageList = ({ languages }) => {
	return (
		<div>
			{languages.map((language) => {
				return <li key={language.iso639_1}>{language.name}</li>;
			})}
		</div>
	);
};

export default LanguageList;
