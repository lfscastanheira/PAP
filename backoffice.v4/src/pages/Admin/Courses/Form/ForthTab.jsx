import styled from "styled-components";
import { useRef } from "react";
import {
	Edit,
	SmallContainer,
	FormHeader,
	NavigationButton,
	FormHeaderDivider,
	Next,
	EnabledPrevious,
	Remove,
	RemoveButton,
	Add,
	AddButton,
	AddingForm,
	ModulesList,
	Module,
} from "../../../../styles/FormsTabsStyles";

const Field = styled(Edit)`
	width: 30%;
`;

const MiniField = styled(Field)`
	width: 3%;
	text-align: center;
`;

const Divider = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	& > * {
		margin-right: 2rem;
	}
`;

const ForthTab = ({ previousTab, fields, append, remove }) => {
	const fieldRef = useRef();
	const percentFieldRef = useRef();

	const addCriteriaToFields = (e) => {
		e.preventDefault();
		append({
			name: `${fieldRef.current.value} ( ${percentFieldRef.current.value}% )`,
		});
		fieldRef.current.value = "";
		percentFieldRef.current.value = "";
	};

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Critérios de Avaliação</FormHeaderDivider>
					<FormHeaderDivider>
						<NavigationButton onClick={previousTab}>
							<EnabledPrevious size={24} />
						</NavigationButton>
						<NavigationButton disabled={true}>
							<Next size={24} />
						</NavigationButton>
					</FormHeaderDivider>
				</FormHeader>
				<AddingForm>
					<Divider>
						<Field ref={fieldRef} placeholder='Introduzir nome do critério' />
						<MiniField ref={percentFieldRef} placeholder='%' />
						<AddButton onClick={addCriteriaToFields}>
							<Add size={20} />
						</AddButton>
					</Divider>
					<ModulesList>
						{fields.map((field, index) => {
							return (
								<Module key={index}>
									<RemoveButton
										onClick={(e) => {
											e.preventDefault();
											remove(index);
										}}
									>
										<Remove size={16} />
									</RemoveButton>
									{field.name}
								</Module>
							);
						})}
					</ModulesList>
				</AddingForm>
			</SmallContainer>
		</>
	);
};

export default ForthTab;
