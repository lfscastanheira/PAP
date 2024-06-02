import { useEffect, useState } from "react";
import { api } from "../../../../api/api";
import {
	AddingFormSelect,
	SmallContainer,
	FormHeader,
	EnabledNext,
	EnabledPrevious,
	NavigationButton,
	FormHeaderDivider,
	Remove,
	RemoveButton,
	AddingForm,
	ModulesList,
	Module,
} from "../../../../styles/FormsTabsStyles";

const ThirdTab = ({
	previousTab,
	nextTab,
	courseModules,
	fields,
	append,
	remove,
}) => {
	const [modules, setModules] = useState([]);

	useEffect(() => {
		api.get("/modules").then((result) => {
			setModules(result.data);

			if (courseModules && !fields.length) {
				result.data.forEach((module) => {
					if (
						courseModules.some(
							(courseModule) => module._id === courseModule._id
						)
					)
						append(module);
				});
			}
		});
	}, []);

	const filteredModules = modules
		? modules.filter(
				(module) => !fields?.some((field) => module._id === field._id)
		  )
		: [];

	const selectModule = (module) => {
		append(module);
	};

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Módulos</FormHeaderDivider>
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
					<AddingFormSelect
						options={filteredModules}
						onChange={selectModule}
						defaultOptions
						placeholder='Procurar e adicionar'
						getOptionLabel={(option) => option.designation}
						getOptionValue={(option) => option._id}
						menuPortalTarget={document.body}
						required
					/>
					<ModulesList>
						{fields?.map((field, index) => (
							<Module key={field._id}>
								<RemoveButton onClick={() => remove(index)}>
									<Remove size={16} />
								</RemoveButton>
								<span>{field.designation}</span>
							</Module>
						))}
					</ModulesList>
				</AddingForm>
			</SmallContainer>
		</>
	);
};

export default ThirdTab;
