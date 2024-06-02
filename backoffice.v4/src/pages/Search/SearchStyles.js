import styled from "styled-components";
import { Link } from "react-router-dom";
import { User, PenTool, Book, Bookmark, BookOpen } from "react-feather";

export const HeaderSpan = styled.span`
	font-size: 24px;
	& > * {
		color: ${(props) => props.theme.colors.secundary};
	}
`;

export const SearchDivision = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem;
	border-bottom: 2px solid ${(props) => props.theme.colors.text};
	margin-bottom: 1rem;
`;

export const DivisionTitle = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 18px;
	align-items: center;
`;

export const UserIcon = styled(User)`
	color: ${(props) => props.theme.colors.primary};
	margin: 0 0.5rem;
`;

export const TeacherIcon = styled(PenTool)`
	color: ${(props) => props.theme.colors.primary};
	margin: 0 0.5rem;
`;

export const ModuleIcon = styled(Book)`
	color: ${(props) => props.theme.colors.primary};
	margin: 0 0.5rem;
`;

export const CourseIcon = styled(Bookmark)`
	color: ${(props) => props.theme.colors.primary};
	margin: 0 0.5rem;
`;

export const ActionIcon = styled(BookOpen)`
	color: ${(props) => props.theme.colors.primary};
	margin: 0 0.5rem;
`;

export const DivisionResults = styled.span`
	font-size: 12px;
	margin-left: 0.5rem;
`;

export const DivisionBody = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 0.5rem;
`;

export const BodyRow = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0rem 2rem;
`;

export const SearchedItem = styled(Link)`
	width: 33.3%;
	align-items: center;
	padding: 0.5rem 0.7rem;
	border-radius: 10px;
	color: ${(props) => props.theme.colors.text};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-decoration: none;
	&:hover {
		cursor: pointer;
		text-decoration: underline;
		color: ${(props) => props.theme.colors.secundary};
	}
`;
