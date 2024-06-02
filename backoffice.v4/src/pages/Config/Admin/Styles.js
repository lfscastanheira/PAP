import styled from "styled-components";

export const MiniContainer = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
`;

export const Table = styled.table`
	overflow-y: auto;
`;

export const TableRow = styled.tr`
	height: 5vh;
	background-color: ${(props) => props.theme.colors.background};
`;

export const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(6, minmax(0, 1fr));
	align-items: center;
	padding: 0 2rem;
	height: 50%;
	overflow-y: auto;
`;

export const Add = styled.button`
	text-decoration: unset;
	font-size: 14px;
	color: ${(props) => props.theme.colors.primary};
	border: 2px solid ${(props) => props.theme.colors.primary};
	border-radius: 10px;
	background-color: white;
	padding: 0.2rem;
	text-align: center;
	&:hover {
		color: ${(props) => props.theme.colors.secundary};
		border-color: ${(props) => props.theme.colors.secundary};
		cursor: pointer;
	}
`;

export const Message = styled.p`
	font-size: 13px;
	color: red;
	margin-left: 1rem;
	grid-column: span 3;
	text-align: center;
`;