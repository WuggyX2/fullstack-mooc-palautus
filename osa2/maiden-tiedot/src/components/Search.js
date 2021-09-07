import React from "react";

const Search = ({ searchString, onChange }) => {
	return (
		<div>
			find countries <input value={searchString} onChange={onChange} />
		</div>
	);
};

export default Search;
