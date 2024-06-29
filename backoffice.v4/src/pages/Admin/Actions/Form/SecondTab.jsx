import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";
import { workingHours } from "../../../../selectData.json";
import {
	Selects,
	SmallContainer,
	Form,
	FormHeader,
	EnabledNext,
	EnabledPrevious,
	Edit,
	FormLabel,
	FormLabelInvisible,
	NavigationButton,
	FormHeaderDivider,
} from "../../../../styles/FormsTabsStyles";

const Select = styled(Selects)`
	grid-column: span 5;
`;

const InvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 6;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 2;
`;

const SecondTab = ({ previousTab, nextTab, course }) => {
	const { register, control } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Regras de Funcionamento</FormHeaderDivider>
					<FormHeaderDivider>
						<NavigationButton onClick={previousTab}>
							<EnabledPrevious size={24} />
						</NavigationButton>
						2/5
						<NavigationButton onClick={nextTab}>
							<EnabledNext size={24} />
						</NavigationButton>
					</FormHeaderDivider>
				</FormHeader>
				<Form>
					<FormLabel>Assiduidade Mínima:</FormLabel>
					<MiniEdit
						value={course.minimumAttendance}
						readOnly
						placeholder='00.00%'
					/>

					<FormLabel>Máximo Faltas Justificadas:</FormLabel>
					<MiniEdit
						value={course.minimumExcusedAbsences}
						readOnly
						placeholder='00.00%'
					/>

					<InvisibleFormLabel />

					<FormLabel>Bolsa de Formação:</FormLabel>
					<MiniEdit {...register("scholarship")} placeholder='00.00%' />

					<FormLabel>Subsídio de Alimentação</FormLabel>
					<MiniEdit {...register("foodSubsidy")} placeholder='00.00%' />

					<FormLabel>Horário Laboral:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='workingHours'
						render={({ field }) => (
							<Select
								options={workingHours}
								required
								value={workingHours.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
							/>
						)}
					/>

					<FormLabel>Código curso/UFCD:</FormLabel>
					<MiniEdit value={course.code || ""} readOnly />

					<FormLabel>Duração(h):</FormLabel>
					<MiniEdit value={course.duration?.monitoringTime} readOnly />

					<FormLabel>Área de Formação:</FormLabel>
					<MiniEdit value={course.area} readOnly />

					<FormLabel>Escala de avaliação:</FormLabel>
					<MiniEdit value={course.evalScale} readOnly />
				</Form>
			</SmallContainer>
		</>
	);
};

export default SecondTab;
