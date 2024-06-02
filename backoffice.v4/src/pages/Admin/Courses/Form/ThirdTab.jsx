import styled from "styled-components";
import { api } from "../../../../api/api";
import { useEffect, useState } from "react";
import { useRef } from "react";
import {
	Selects,
	SmallContainer,
	FormHeader,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
	EnabledPrevious,
	Remove,
	RemoveButton,
	AddingForm,
	ModulesList,
	Module,
} from "../../../../styles/FormsTabsStyles";

const Select = styled(Selects)`
	width: 50%;
`;

const ThirdTab = ({
	previousTab,
	nextTab,
	resetModules,
	fields,
	append,
	remove,
	duration,
	setDuration,
}) => {
	const [modules, setModules] = useState();

	const selectRef = useRef();

	useEffect(() => {
		api.get("/modules").then((result) => {
			setModules(result.data);

			if (resetModules && !fields.length) {
				result.data.forEach((module) => {
					if (resetModules.includes(module._id)) {
						setDuration((duration) => duration + module.totalTime);
						append(module);
					}
				});
			}
		});
	}, []);

	const filteredModules = modules
		? modules.filter(
				(module) => !fields.some((field) => module._id === field._id)
		  )
		: [];

	const addModule = (module) => {
		if (module === null) return;
		append(module);
		setDuration((duration) => duration + module.totalTime);
	};

	const removeMoudle = (index, module) => {
		remove(index);
		setDuration((duration) => duration - module.totalTime);
	};

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Módulos do Curso</FormHeaderDivider>
					<FormHeaderDivider>
						<NavigationButton onClick={previousTab}>
							<EnabledPrevious size={24} />
						</NavigationButton>
						<NavigationButton onClick={nextTab}>
							<EnabledNext size={24} />
						</NavigationButton>
					</FormHeaderDivider>
				</FormHeader>
				<AddingForm>
					<Select
						ref={selectRef}
						value={null}
						options={filteredModules}
						onChange={addModule}
						defaultOptions
						placeholder='Procurar e adicionar'
						getOptionLabel={(option) => option.designation}
						getOptionValue={(option) => option._id}
						menuPortalTarget={document.body}
					/>
					<ModulesList>
						{fields.map((field, index) => (
							<Module key={field._id}>
								<RemoveButton onClick={() => removeMoudle(index, field)}>
									<Remove size={16} />
								</RemoveButton>
								<span>{field.designation}</span>
							</Module>
						))}
					</ModulesList>
				</AddingForm>
				{/* Isto precisa de ser um input disable, qual? Eu nao sei, é contigo*/}
				Module duration: {duration}
			</SmallContainer>
		</>
	);
};

export default ThirdTab;
