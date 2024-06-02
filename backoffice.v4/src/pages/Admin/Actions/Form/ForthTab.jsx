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

const ForthTab = ({
	previousTab,
	courseModules,
	nextTab,
	fields,
	append,
	remove,
}) => {
	const [students, setStudents] = useState();

	useEffect(() => {
		api.get("/students").then((result) => {
			setStudents(result.data);

			if (courseModules && !fields.length) {
				result.data.forEach((student) => {
					if (
						courseModules.some(
							(courseModule) => student._id === courseModule._id
						)
					)
						append(student);
				});
			}
		});
	}, []);

	const filteredStudents = students
		? students.filter(
				(student) => !fields?.some((field) => student._id === field._id)
		  )
		: [];

	const selectStudent = (student) => {
		append(student);
	};

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Formandos inscritos</FormHeaderDivider>
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
						options={filteredStudents}
						onChange={selectStudent}
						defaultOptions
						placeholder='Procurar e adicionar'
						getOptionLabel={(option) => option.name}
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
								<span>{field.name}</span>
							</Module>
						))}
					</ModulesList>
				</AddingForm>
			</SmallContainer>
		</>
	);
};

export default ForthTab;
