import styled from "styled-components";
import { User, Lock, Loader } from "react-feather";

export const CardDivision = styled.div`
	background-color: #fff;
	width: 50%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
`;

export const Card = styled.div`
	background-color: ${(props) => props.theme.colors.primary};
	border-radius: 1rem;
	overflow: hidden;
	height: 60vh;
	display: flex;
`

export const Container = styled.div`
	height: 100vh;
	padding: 20vh;
	@media screen and (max-width: 415px) {
		padding: 25vh 5vh;
		${Card} {
			height: 50vh;
		}
		${CardDivision} {
			width: 100%;
		}
	}
	@media screen and (max-width: 915px) {
		padding: 25vh 5vh;
		${Card} {
			height: 50vh;
		}
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: auto;
`;

export const Logo = styled.img`
	width: 10rem;
	height: 2.5rem;
	margin: 0 auto;
	margin-bottom: 3rem;
`;

export const Input = styled.input`
	display: block;
	margin: 0 auto;
	width: 80%;
	background-color: #eef3f6;
	color: #acb0b6;
	box-sizing: border-box;
	height: 2.5rem;
	padding: 0 2rem;
	border: 2px solid transparent;
	border-radius: 5rem;
	&:hover,
	&:focus {
		border-color: #3f4349;
		outline: none;
	}
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	color: ${(props) => props.theme.colors.text};
	padding: 1rem 0;
`;

export const UserIcon = styled(User)`
	position: absolute;
	margin-left: 2.3rem;
`;

export const LockIcon = styled(Lock)`
	position: absolute;
	margin-left: 2.3rem;
`;

export const LoadingIcon = styled(Loader)`
	left: 12px;
	top: 11px;
	color: white;
`;

export const SubmitButton = styled.button`
	background-color: #00cdff;
	border: 2px solid #00cdff;
	color: #fff;
	padding: 0.7rem 1.8rem;
	border: 2px solid transparent;
	border-radius: 2rem;
	margin: 0 auto;
	&:hover,
	&:focus {
		border-color: #3f4349;
		outline: none;
		cursor: pointer;
	}
`;

export const LoadingButton = styled.button`
	background-color: #00cdff;
	border: 2px solid #00cdff;
	color: #fff;
	padding: 0.5rem 0.8rem;
	border: 2px solid transparent;
	border-radius: 2rem;
	margin: 0 auto;
	align-items: center;
`;

export const FormFooter = styled.fieldset`
	display: flex;
	flex-direction: row;
	border: unset;
`;

export const Message = styled.p`
	font-size: 14px;
	color: red;
	padding: 0 0.2rem;
`;