import styled from "styled-components";
import { Link } from "react-router-dom";
import { Edit2, Star, Trash } from "react-feather";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 10px;
	padding: 1rem;
	height: 100%;
	overflow: hidden;
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

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	color: white;
	background-color: ${(props) => props.theme.colors.primary};
	border-radius: 10px 10px 0 0;
	top: 0;
	position: sticky;
	z-index: 1;
`;

export const HeaderDivider = styled.div`
	height: 5vh;
	padding-top: 1.5vh;
	text-align: center;
	box-sizing: border-box;
	text-overflow: ellipsis;
`;

export const TableIconContainer = styled.div`
	display: flex;
	flex-direction: row;
	visibility: hidden;
	padding: 0 0.5rem;
`;

export const TableRow = styled.tr`
	flex-wrap: nowrap;
	height: 5vh;
	background-color: ${(props) => props.theme.colors.background};
	align-items: center;
	&:hover {
		${TableIconContainer} {
			visibility: visible;
		}
	}
	:last-child {
		td:first-child {
			border-bottom-left-radius: 10px;
		}
		td:last-child {
			border-bottom-right-radius: 10px;
		}
	}
`;

export const TableField = styled.td`
	text-align: center;
	align-items: center;
	max-height: 5vh;
	box-sizing: border-box;
	position: relative;
`;

export const Search = styled.input`
	border: 2px solid ${(props) => props.theme.colors.primary};
	border-radius: 0.5rem;
	padding: 0 0.5rem;
	outline: none;
	color: ${(props) => props.theme.colors.text};
	height: 2rem;
	width: 50%;
	&:hover,
	&:focus {
		border-color: ${(props) => props.theme.colors.secundary};
		color: ${(props) => props.theme.colors.primary};
	}
`;

export const Add = styled(Link)`
	text-decoration: unset;
	font-size: 14px;
	color: ${(props) => props.theme.colors.primary};
	border: 2px solid ${(props) => props.theme.colors.primary};
	border-radius: 1.5rem;
	padding: 0.2rem 0.5rem;
	padding-top: 0.4rem;
	text-align: center;
	height: 20px;
	&:hover {
		color: ${(props) => props.theme.colors.secundary};
		border-color: ${(props) => props.theme.colors.secundary};
	}
`;

export const Edit = styled(Link)`
position: absolute;
	&:hover {
		& > * {
			color: ${(props) => props.theme.colors.secundary};
		}
	}
`;

export const Delete = styled(Link)`
position: absolute;
margin-left: 1rem;
	&:hover {
		& > * {
			color: ${(props) => props.theme.colors.secundary};
		}
	}
`;

export const StarContainer = styled(Link)`
	position: absolute;
	margin-left: 1.5rem;
`;

export const EditIcon = styled(Edit2)`
	color: ${(props) => props.theme.colors.primary};
	align-self: center;
	transform: rotate(-90deg);	
`;

export const DeleteIcon = styled(Trash)`
	color: ${(props) => props.theme.colors.primary};
	align-self: center;	
`;

export const StarIconGold = styled(Star)`
	color: gold;
	align-self: center;	
`;

export const SmallContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	border-radius: 0.5rem;
	overflow-y: auto;
	@media screen and (max-width: 415px) {
		${HeaderDivider}{
			height: 4vh;
			padding-top: 1vh;
		}
	}
`;