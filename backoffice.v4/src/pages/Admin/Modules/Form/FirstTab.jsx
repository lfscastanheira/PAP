import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
	SmallContainer,
	Form,
	Area,
	FormHeader,
	Previous,
	Edit,
	FormLabel,
	FormLabelInvisible,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
} from "../../../../styles/FormsTabsStyles";

const InvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 4;
`;

const BigInvisibleFormLabel = styled(InvisibleFormLabel)`
	grid-column: span 12;
`;

const AreaEdit = styled(Area)`
	grid-column: span 5;
`;

const MediumEdit = styled(Edit)`
	grid-column: span 7;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 3;
`;

const FirstTab = ({ nextTab }) => {
	const { register } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Definições do Módulo</FormHeaderDivider>
					<FormHeaderDivider>
						<NavigationButton disabled={true}>
							<Previous size={24} />
						</NavigationButton>
						<NavigationButton onClick={nextTab}>
							<EnabledNext size={24} />
						</NavigationButton>
					</FormHeaderDivider>
				</FormHeader>
				<Form>
					<FormLabel>Designação:</FormLabel>
					<MediumEdit
						{...register("designation")}
						required
						placeholder='Nome do módulo'
					/>

					<InvisibleFormLabel />

					<FormLabel>Abreviatura:</FormLabel>
					<MiniEdit {...register("abbreviation")} required placeholder='ABC1' />

					<FormLabel>Horas Monitoragem:</FormLabel>
					<MiniEdit {...register("monitoringHours")} type='number' />

					<FormLabel>Horas Formando:</FormLabel>
					<MiniEdit {...register("studentHours")} type='number' />

					<FormLabel>Descrição:</FormLabel>
					<AreaEdit rows='4' {...register("description")} />

					<FormLabel>Objetivos:</FormLabel>
					<AreaEdit rows='4' {...register("objectivs")} />

					<BigInvisibleFormLabel />

					<FormLabel>Recursos:</FormLabel>
					<AreaEdit rows='4' {...register("resources")} />

					<FormLabel>Conteúdo programático:</FormLabel>
					<AreaEdit rows='4' {...register("content")} />
				</Form>
			</SmallContainer>
		</>
	);
};

export default FirstTab;
