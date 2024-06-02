import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
	Div,
	PageName,
	Icons,
	SearchIcon,
	SearchBar,
	SearchContainer,
} from "./TopbarStyles";

const Topbar = ({ name }) => {
	const [query, setQuery] = useState("");

	const navigate = useNavigate();

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			navigate(`/search/${query}`);
			setQuery("");
		}
	};

	return (
		<Div>
			<div>
				<PageName>{name}</PageName>
			</div>
			<Icons>
				<SearchContainer>
					<SearchIcon size={24} />
					<SearchBar
						type='text'
						placeholder='Procurar'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</SearchContainer>
			</Icons>
		</Div>
	);
};

export default Topbar;
