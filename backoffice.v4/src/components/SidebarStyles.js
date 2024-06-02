import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarLogoContainer = styled.div`
	height: fit-content;
	background-color: ${(props) => props.theme.colors.background};
	border-radius: 10px !important;
	padding: 1.5rem 0;
	box-sizing: border-box;
`;

export const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	padding: 0.5rem;
	background-color: ${(props) => props.theme.colors.primary};
	width: 100%;
`;

export const PageContainer = styled.ul`
	list-style-type: none;
	display: flex;
	flex-direction: column;
	padding: 1rem 0;
	height: 100%;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 1rem;
	padding: 0.5rem 0;
	font-weight: normal;
`;

export const Page = styled.li`
	color: ${(props) => props.theme.colors.text};
	font-weight: bold;
	padding: 0.5rem;
	align-items: center;
	display: flex;
	border-radius: 10px;
	&:hover {
		background-color: ${(props) => props.theme.colors.secundary};
		color: #fff;
		cursor: pointer;
	}
	&:focus {
		color: ${(props) => props.theme.colors.secundary};
		cursor: pointer;
	}
	& > * {
		margin-right: 1rem;
	}
`;

export const Ref = styled(Link)`
	text-decoration: none;
`;

export const LogoButton = styled.a`
	box-sizing: border-box;
	&:hover {
		cursor: pointer;
	}
`;

export const Logo = styled.svg`
	display: block;
	margin: 0 auto;
	max-width: 60%;
`;

export const MenuButton = styled.div`
	margin-bottom: 1rem;
	padding: 0 0.25rem;
	padding-top: 0.25rem;
	display: none;
	svg{
		display: block;
		margin: 0 auto;
		color: #fff;
	}
`

export const SidebarFooter = styled.div`
	display: flex;
	flex-direction: column;
	height: 10vh;
	border-top: 2px solid #eef3f630;
	padding: 0.8rem 0;
	box-sizing: border-box;
`;

export const Div = styled.div`
	position: absolute;
	display: flex;
	background-color: ${(props) => props.theme.colors.background};
	padding: 0.5rem;
	width: 17%;
	height: 100%;
	transition: all 0.2s ease-in-out;
	box-sizing: border-box;
	z-index:2;
	@media screen and (max-width: 415px) {
		height: ${(props) => (props.open ? "100%" : "4rem")};
		width: ${(props) => (props.open ? "50%" : "")};
		${Buttons} {
			display: none;
		}
		${Page} {
			font-size: 13px;
		}
		${Logo} {
			max-width: 50%;
		}
		${SidebarLogoContainer}, ${PageContainer}, ${SidebarFooter} {
			display: ${(props) => (props.open ? "" : "none")};
			transition: all 0.2s ease-in-out;
		}
		${MenuButton} {
			display: unset;
			svg{
				display: ${(props) => (props.open ? "unset" : "")};
				margin: ${(props) => (props.open ? "unset" : "")};
			}
		}
	}
`;

export const Profile = styled.div`
	display: flex;
	margin: 0 auto;
	flex-direction: row;
	text-decoration: none;
	text-align: center;
`;

export const Img = styled.img`
	width: 3.5rem;
	height: 3.5rem;
	object-fit: contain;
	background-color: #fff;
	padding: 0;
	border-radius: 2rem;
`;

export const Name = styled(Link)`
	padding: 0;
	font-size: 15px;
	color: ${(props) => props.theme.colors.text};
	text-align: left;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;

export const Logout = styled.button`
	border: unset;
	padding: 0;
	font-size: 12px;
	font-weight: normal;
	color: ${(props) => props.theme.colors.error};
	margin-top: 0.2rem;
	background-color: transparent;
	white-space: nowrap;
	&:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;

export const Accordion = styled.div`
	margin-left: 0.5rem;
	max-height: ${(props) => (props.open ? "220px" : "0")};
	transition: all 0.2s ease-in-out;
	overflow: hidden;
	background-color: ${(props) => props.theme.colors.primary};
`;
