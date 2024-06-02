import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderDivider = styled.div`
	height: 5vh;
	box-sizing: border-box;
	align-items: center;
	width: 40%;
	:nth-child(2) {
		width: 60%;
		text-align: center;
	}
	:first-child {
		padding-top: 1.5vh;
	}
	:last-child {
		text-align: right;
	}
`;

export const HeaderDividerTitle = styled.span`
	font-size: 26px;
`;

export const ContainerHeader = styled.div`
	width: 100%;
	font-size: 14px;
	margin-bottom: 0.2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: fit-content;
`;

export const SubmitButton = styled.input`
	padding: 0.5rem;
	border: 2px solid ${(props) => props.theme.colors.text};
	border-radius: 1.5rem;
	background-color: #fff;
	color: ${(props) => props.theme.colors.text};
	text-decoration: none;
	&:hover,
	&:focus {
		cursor: pointer;
		border-color: ${(props) => props.theme.colors.secundary};
		color: ${(props) => props.theme.colors.secundary};
	}
	&:focus {
		background-color: ${(props) => props.theme.colors.secundary};
		color: #fff;
	}
`;

export const CancelButton = styled(Link)`
	padding: 0.5rem;
	border: 2px solid ${(props) => props.theme.colors.primary};
	border-radius: 1.5rem;
	background-color: ${(props) => props.theme.colors.primary};
	color: white;
	text-decoration: none;
	&:hover,
	&:focus {
		cursor: pointer;
	}
	&:focus {
		background-color: ${(props) => props.theme.colors.secundary};
		border-color: ${(props) => props.theme.colors.secundary};
	}
`;

export const Form = styled.form`
	height: 74vh;
`;