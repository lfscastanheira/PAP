import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
	SmallContainer,
	Form,
	FormHeader,
	Edit,
	FormLabel,
	NavigationButton,
	FormHeaderDivider,
	Next,
	EnabledPrevious,
} from "../../../../styles/FormsTabsStyles";

const BiggerFormLabel = styled(FormLabel)`
	grid-column: span 2;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 3;
`;

const InvisibleMiniEdit = styled(MiniEdit)`
	visibility: hidden;
`;

const SecondTab = ({ previousTab }) => {
	const { register } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Carga Horária</FormHeaderDivider>
					<FormHeaderDivider>
						<NavigationButton onClick={previousTab}>
							<EnabledPrevious size={24} />
						</NavigationButton>
						<NavigationButton disabled={true}>
							<Next size={24} />
						</NavigationButton>
					</FormHeaderDivider>
				</FormHeader>
				<Form>
					<FormLabel>Teórica:</FormLabel>
					<MiniEdit
						{...register("times.theoretical", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<BiggerFormLabel>Prática Simulada:</BiggerFormLabel>
					<MiniEdit
						{...register("times.simulatedPractice", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<InvisibleMiniEdit type='number' />

					<FormLabel>Síncrona (Teórica):</FormLabel>
					<MiniEdit
						{...register("times.syncTheoretical", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<BiggerFormLabel>Síncrona (Prática Simulada):</BiggerFormLabel>
					<MiniEdit
						{...register("times.syncSimulatedPractice", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<InvisibleMiniEdit type='number' />

					<FormLabel>Assíncrona (Teórica):</FormLabel>
					<MiniEdit
						{...register("times.asyncTheoretical", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<BiggerFormLabel>Assíncrona (Prática Simulada):</BiggerFormLabel>
					<MiniEdit
						{...register("times.asyncSimulatedPractice", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<InvisibleMiniEdit />

					<FormLabel>Estrangeiro</FormLabel>
					<MiniEdit
						{...register("times.foreigner", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<BiggerFormLabel>Autónoma:</BiggerFormLabel>
					<MiniEdit
						{...register("times.autonomous", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<InvisibleMiniEdit type='number' />

					<FormLabel>Estágio:</FormLabel>
					<MiniEdit
						{...register("times.internship", {
							valueAsNumber: true,
						})}
						type='number'
					/>

					<BiggerFormLabel>Contexto de Trabalho:</BiggerFormLabel>
					<MiniEdit
						{...register("times.workContext", {
							valueAsNumber: true,
						})}
						type='number'
					/>
				</Form>
			</SmallContainer>
		</>
	);
};

export default SecondTab;
