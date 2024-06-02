import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
	SmallContainer,
	Form,
	FormHeader,
	Edit,
	FormLabel,
	FormLabelInvisible,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
	EnabledPrevious,
} from "../../../../styles/FormsTabsStyles";

const InvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 3;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 2;
`;

const SecondTab = ({ previousTab, nextTab, duration }) => {
	const { register } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>
						Durações e Configurações Financeiras
					</FormHeaderDivider>
					<FormHeaderDivider>
						<NavigationButton onClick={previousTab}>
							<EnabledPrevious size={24} />
						</NavigationButton>
						<NavigationButton onClick={nextTab}>
							<EnabledNext size={24} />
						</NavigationButton>
					</FormHeaderDivider>
				</FormHeader>
				<Form>
					<FormLabel>Horas Monitoragem</FormLabel>
					{/* TODO mexer isto para a thirdtab */}
					<MiniEdit readOnly value={duration} required />

					<FormLabel>Horas / Formando</FormLabel>
					<MiniEdit
						{...register("duration.studentTime", { valueAsNumber: true })}
						required
					/>

					{/* TODO mexer isto para a thirdtab */}
					<FormLabel>Horas / Mediação</FormLabel>
					<MiniEdit readOnly value={duration} required />

					<InvisibleFormLabel />

					<FormLabel>Preço de Inscrição</FormLabel>
					<MiniEdit
						{...register("registrationPrice", { valueAsNumber: true })}
						required
					/>

					<FormLabel>Preço/hora Formadores</FormLabel>
					<MiniEdit
						{...register("priceHourFormer", { valueAsNumber: true })}
						required
					/>

					<InvisibleFormLabel />

					<InvisibleFormLabel />

					<FormLabel>Assiduidade Mínima</FormLabel>
					<MiniEdit
						{...register("minimumAttendance", { valueAsNumber: true })}
						required
					/>

					<FormLabel>Máximo de Faltas Justificadas</FormLabel>
					<MiniEdit
						{...register("maximumExcusedAbsences", { valueAsNumber: true })}
						required
					/>
				</Form>
			</SmallContainer>
		</>
	);
};

export default SecondTab;
