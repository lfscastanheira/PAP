import styled from "styled-components";
import { useEffect } from "react";
import { api } from "../../../../api/api";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
	Selects,
	SmallContainer,
	Form,
	FormHeader,
	Previous,
	Area,
	Edit,
	FormLabel,
	FormLabelInvisible,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
} from "../../../../styles/FormsTabsStyles";

const Select = styled(Selects)`
	grid-column: span 7;
`;

const AreaEdit = styled(Area)`
	grid-column: span 8;
	grid-row: span 2;
`;

const InvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 4;
`;

const BigInvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 6;
`;

const SmallInvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 3;
`;

const MediumEdit = styled(Edit)`
	grid-column: span 5;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 2;
`;

const FirstTab = ({ nextTab, resetModules, courseName }) => {
	const [modules, setModules] = useState({});

	const { register, getValues } = useFormContext();

	useEffect(() => {
		api.get("/courses").then((result) => {
			setModules(result.data);
		});
	}, []);

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Definições</FormHeaderDivider>
					<FormHeaderDivider>
						<NavigationButton disabled={true}>
							<Previous size={24} />
						</NavigationButton>
						1/5
						<NavigationButton onClick={nextTab}>
							<EnabledNext size={24} />
						</NavigationButton>
					</FormHeaderDivider>
				</FormHeader>

				<Form>
					<FormLabel>Curso:</FormLabel>
					<Select
						options={modules}
						onChange={resetModules}
						value={Object.values(modules).filter(
							(module) => module._id === getValues("courseId")
						)}
						placeholder={"Encontrar"}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => option._id}
					/>

					<InvisibleFormLabel />

					<FormLabel>Código ação formação:</FormLabel>
					<MiniEdit {...register("code")} required placeholder='Código' />

					<FormLabel>Nº previsto formandos:</FormLabel>
					<MiniEdit {...register("studentsCount")} type='number' />

					<BigInvisibleFormLabel />

					<FormLabel>Local de realização:</FormLabel>
					<MediumEdit {...register("location")} required placeholder='Morada' />

					<FormLabel>Código Postal:</FormLabel>
					<MiniEdit {...register("zip")} placeholder='xxxx-xxx' />

					<FormLabel>Telefone:</FormLabel>
					<MiniEdit {...register("phoneNumber")} placeholder='123456789' />

					<FormLabel>Data Início:</FormLabel>
					<MiniEdit {...register("startingDate")} type='date' />

					<FormLabel>Data Fim:</FormLabel>
					<MiniEdit {...register("finishDate")} type='date' />

					<FormLabel>Horas semanais:</FormLabel>
					<MiniEdit {...register("weeklyHours")} type='number' />

					<SmallInvisibleFormLabel />

					<FormLabel>Tipo de Horário:</FormLabel>
					<AreaEdit {...register("typeOfSchedule")} rows='6' />
				</Form>
			</SmallContainer>
		</>
	);
};

export default FirstTab;
