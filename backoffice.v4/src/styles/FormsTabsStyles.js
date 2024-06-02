import styled from "styled-components";
import Goofy from "react-select";
import { ChevronRight, ChevronLeft, X,  PlusCircle, Upload} from "react-feather";

/* COMPONENTS */

export const Selects = styled(Goofy)`
	.css-13cymwt-control,
	.css-t3ipsp-control {
		border: 2px solid ${(props) => props.theme.colors.background};
		border-radius: 0.5rem;
	}
	.css-13cymwt-control:hover,
	.css-t3ipsp-control:hover {
		border-color: ${(props) => props.theme.colors.secundary};
		cursor: pointer;
	}
	.css-t3ipsp-control {
		box-shadow: none;
	}
	.css-1nmdiq5-menu {
		max-height: 10rem;
		overflow-y: auto;
	}
`;

export const AddingFormSelect = styled(Selects)`
	width: 50%;
`;

export const SmallContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	border-radius: 0.5rem;
	height: 100%;
	overflow-y: auto;
`;

export const Form = styled.div`
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
	grid-template-rows: repeat(6, minmax(0, 1fr));
	align-items: center;
	height: 100%;
	padding: 1rem;
	overflow-y: auto;
	background-color: ${(props) => props.theme.colors.background};
	padding: 0rem 2.5rem;
	column-gap: 2rem;
`;

export const FormHeader = styled.div`
	padding: 1rem 2rem;
	display: flex;
	flex-direction: row;
	background-color: ${(props) => props.theme.colors.background};
`;

export const FormHeaderDivider = styled.span`
	font-size: 20px;
	width: 50%;
	padding: 0.5rem 0;
	border-bottom: 2px solid ${(props) => props.theme.colors.text};
	:last-child {
		justify-content: right;
		display: flex;
		flex-direction: row;
		a:first-child {
			visibility: hidden;
		}
	}
`;

export const FormLabel = styled.b`
	grid-column: span 1;
	font-size: 13px;
`;

export const FormLabelInvisible = styled(FormLabel)`
	visibility: hidden;
`;

export const Edit = styled.input`
	border: 2px solid transparent;
	background-color: #fff;
	border-radius: 0.5rem;
	padding: 0 0.5rem;
	outline: none;
	color: ${(props) => props.theme.colors.text};
	height: 2.4rem;
	color: ${(props) => props.theme.colors.primary};
	&:hover {
		border-color: ${(props) => props.theme.colors.secundary};
		&:disabled {
			border-color: transparent;
			color: ${(props) => props.theme.colors.text};
			cursor: default;
		}
	}
	&:focus {
		border-color: ${(props) => props.theme.colors.secundary};
	}
`;

export const FileEdit = styled(Edit)`
	grid-column: span 2;
	box-sizing: border-box;
	padding: 0.5rem 1rem;
	&:hover {
		cursor: pointer;
		color: ${(props) => props.theme.colors.secundary};
	}
	::before {
		content: "Importar";
		margin-right: 7rem;
	}
	::-webkit-file-upload-button {
		display: none;
	}
`;

export const Area = styled.textarea`
	resize: none;
	border: 2px solid transparent;
	background-color: #fff;
	border-radius: 0.5rem;
	padding: 0.5rem;
	outline: none;
	color: ${(props) => props.theme.colors.text};
	color: ${(props) => props.theme.colors.primary};
	&:hover {
		border-color: ${(props) => props.theme.colors.secundary};
		&:disabled {
			border-color: transparent;
			color: ${(props) => props.theme.colors.text};
			cursor: default;
		}
	}
	&:focus {
		border-color: ${(props) => props.theme.colors.secundary};
	}
`;

export const AddingForm = styled.div`
	display: flex;
	flex-direction: column;
	height: 60vh;
	padding: 1rem;
	overflow-y: auto;
	background-color: ${(props) => props.theme.colors.background};
	padding: 0rem 2.5rem;
`;

export const ModulesList = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 2rem;
	overflow-y: auto;
	max-height: 45vh;
`;

export const Module = styled.div`
	display: flex;
	flex-direction: row;
	border: 2px dashed transparent;
	border-left: unset;
	border-right: unset;
	align-items: center;
	padding: 0 0.5rem;
	outline: none;
	color: ${(props) => props.theme.colors.text};
	min-height: 2.4rem;
	user-select: none;
	&:hover {
		border-color: ${(props) => props.theme.colors.secundary};
		color: ${(props) => props.theme.colors.primary};
	}
`;

/* ------------------- */

/* ICONS */

export const Next = styled(ChevronRight)`
	color: ${(props) => props.theme.colors.text};
	margin: 0 0.5rem;
	align-self: center;
	padding: 0 0.5rem;
`;

export const EnabledNext = styled(Next)`
	color: ${(props) => props.theme.colors.primary};
	&:hover {
		color: ${(props) => props.theme.colors.secundary};
		cursor: pointer;
	}
`;

export const Previous = styled(ChevronLeft)`
	color: ${(props) => props.theme.colors.text};
	margin: 0 0.5rem;
	align-self: center;
	padding: 0 0.5rem;
`;

export const EnabledPrevious = styled(Previous)`
	color: ${(props) => props.theme.colors.primary};
	&:hover {
		color: ${(props) => props.theme.colors.secundary};
		cursor: pointer;
	}
`;

export const Remove = styled(X)`
	color: ${(props) => props.theme.colors.text};
`;

export const Add = styled(PlusCircle)`
	color: ${(props) => props.theme.colors.text};
`;

export const UploadIcon = styled(Upload)`
	margin-left: -4rem;
	color: ${(props) => props.theme.colors.primary};
	align-self: center;
	&:hover {
		cursor: pointer;
	}
`;

/* ------------------- */

/* BUTTONS */

export const NavigationButton = styled.button`
	border: unset;
	outline: unset;
	background-color: unset;
`;

export const RemoveButton = styled.button`
	background-color: unset;
	margin-right: 1rem;
	border: unset;
	outline: unset;
	padding-top: 0.2rem;
	&:hover {
		cursor: pointer;
		${Remove} {
			color: ${(props) => props.theme.colors.secundary};
			cursor: pointer;
		}
	}
`;

export const AddButton = styled.button`
	background-color: unset;
	border: unset;
	outline: unset;
	padding-top: 0.2rem;
	&:hover {
		cursor: pointer;
		${Add} {
			color: ${(props) => props.theme.colors.secundary};
			cursor: pointer;
		}
	}
`;

/* ------------------- */
