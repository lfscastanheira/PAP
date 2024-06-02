import styled from "styled-components";

export const Edit = styled.input`
	border: 2px solid ${(props) => props.theme.colors.background};
	background-color: #fff;
	border-radius: 0.5rem;
	padding: 0 0.5rem;
	outline: none;
	color: ${(props) => props.theme.colors.primary};
	height: 2.4rem;
	&:hover, &:focus {
		border-color: ${(props) => props.theme.colors.secundary};
		color: ${(props) => props.theme.colors.primary};
	}
`;

export const FormLabel = styled.b`
	grid-column: span 1;
	font-size: 13px;
`;