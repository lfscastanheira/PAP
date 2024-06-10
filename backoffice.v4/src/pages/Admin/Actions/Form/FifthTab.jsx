import { useEffect, useState } from "react";
import { api } from "../../../../api/api";
import {
	AddingFormSelect,
	SmallContainer,
	FormHeader,
	Next,
	EnabledPrevious,
	NavigationButton,
	FormHeaderDivider,
	Remove,
	RemoveButton,
	AddingForm,
	ModulesList,
	Module,
} from "../../../../styles/FormsTabsStyles";

const FifthTab = ({ previousTab, courseModules, fields, append, remove }) => {
	const [teachers, setTeachers] = useState();

	useEffect(() => {
		api.get("/teachers").then((result) => {
			setTeachers(result.data);

			if (courseModules && !fields.length) {
				result.data.forEach((teacher) => {
					if (
						courseModules.some(
							(courseModule) => teacher._id === courseModule._id
						)
					)
						append(teacher);
				});
			}
		});
	}, []);

	const filteredTeachers = teachers
		? teachers.filter(
				(teacher) => !fields?.some((field) => teacher._id === field._id)
		  )
		: [];

	const selectTeacher = (teacher) => {
		append(teacher);
	};

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Formadores</FormHeaderDivider>
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
					<AddingFormSelect
						options={filteredTeachers}
						onChange={selectTeacher}
						defaultOptions
						placeholder='Procurar e adicionar'
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option._id}
						menuPortalTarget={document.body}
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

export default FifthTab;
