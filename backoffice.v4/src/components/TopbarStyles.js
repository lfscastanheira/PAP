import styled from "styled-components";
import { Search } from "react-feather";

export const PageName = styled.span`
	text-align: center;
	line-height: 3rem;
	font-size: 40px;
	margin-right: 1rem;
`;

export const Icons = styled.div`
	display: flex;
	background-color: ${(props) => props.theme.colors.primary};
	align-items: center;
	padding: 0 0.25rem;
	& > * {
		color: ${(props) => props.theme.colors.background};
		margin: 0 0.5rem;
	}
	& > *:hover {
		color: ${(props) => props.theme.colors.secundary};
		cursor: pointer;
	}
	border-radius: 10px !important;
`;

export const SearchIcon = styled(Search)`
	position: absolute;
	color: white;
	pointer-events: none;
	margin-left: 0.25rem;
`;

export const SearchBar = styled.input`
	transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
	border-radius: 10px;
	outline: none;
	color: ${(props) => props.theme.colors.text};
	::placeholder {
		color: ${(props) => props.theme.colors.text};
	}
	width: 0;
	padding: 0rem 1rem;
	background-color: ${(props) => props.theme.colors.primary};
	border: 2px solid transparent;
`;

export const SearchContainer = styled.div`
	display: flex;
	overflow: hidden;
	flex-direction: row;
	align-items: center;
	caret-color: transparent;
	&:focus ${SearchBar}, &:hover ${SearchBar} {
		padding: 0.2rem 1.5rem;
		outline: none;
		border-color: ${(props) => props.theme.colors.secundary};
		background-color: ${(props) => props.theme.colors.background};
		caret-color: ${(props) => props.theme.colors.primary};
		width: 100%;
	}
	&:hover ${SearchIcon} {
		color: ${(props) => props.theme.colors.text};
		width: 14px;
		margin-top: 0;
	}
`;

export const Div = styled.div`
	height: 4rem;
	margin-left: 17%;
	box-sizing: border-box;
	justify-content: right;
	padding: 0.5rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	@media screen and (max-width: 415px) {
		margin-left: 4rem;
		${PageName}{
			font-size: 25px;
		}
	}
`;