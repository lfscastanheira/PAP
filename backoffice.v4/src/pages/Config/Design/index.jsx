import styled from "styled-components";
import { Upload } from "react-feather";
import { useContext } from "react";
import {
	ThemeUpdateContext,
	availableColors,
} from "../../../contexts/DynamicThemeProvider";
import { Container } from "../../../styles/AdminStyles";

const Select = styled.select`
	width: 50%;
	height: 2rem;
	border: 2px solid ${(props) => props.theme.colors.text};
	border-radius: 0.5rem;
	outline: none;
	:hover,
	:focus {
		border-color: ${(props) => props.theme.colors.secundary};
		cursor: pointer;
	}
`;

const Divider = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

const Field = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 0.5rem;
	& > * {
		margin-right: 0.5rem;
	}
`;

const Design = () => {
	const changeMainColor = useContext(ThemeUpdateContext);

	const currentColor = localStorage.getItem("rfa.color");

	return (
		<>
			<Container>
				<Divider>
					<Field>
						<b>Tema:</b>
						<Select
							onChange={(e) => changeMainColor(e.target.value)}
							name='color picker'
							id=''
						>
							{Object.entries(availableColors).map(([name, color]) => {
								if (color === currentColor)
									return (
										<option key={color} selected value={color}>
											{name}
										</option>
									);
								return (
									<option key={color} value={color}>
										{name}
									</option>
								);
							})}
						</Select>
					</Field>
				</Divider>
			</Container>
		</>
	);
};

export default Design;
