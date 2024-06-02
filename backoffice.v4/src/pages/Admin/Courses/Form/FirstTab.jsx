import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import {
	areaOfFormation,
	evalScale,
	levels,
	literaryQualifications,
	professionalQualifications,
} from "../../../../selectData.json";
import {
	Selects,
	SmallContainer,
	Form,
	FormHeader,
	Previous,
	Edit,
	FormLabel,
	FormLabelInvisible,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
} from "../../../../styles/FormsTabsStyles";

const Select = styled(Selects)`
	grid-column: span 3;
`;

const BigSelect = styled(Select)`
	grid-column: span 8;
`;

const InvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 1;
`;

const BigEdit = styled(Edit)`
	grid-column: span 11;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 2;
`;

const FirstTab = ({ nextTab }) => {
	const { register, control } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Definições Básicas</FormHeaderDivider>
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
					<FormLabel>Nome:</FormLabel>
					<BigEdit {...register("name")} required placeholder='Nome do curso' />

					<FormLabel>Código do curso:</FormLabel>
					<MiniEdit
						{...register("code")}
						required
						placeholder='Código do curso'
					/>

					<FormLabel>Área de Formação:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='area'
						render={({ field }) => (
							<BigSelect
								options={areaOfFormation}
								value={areaOfFormation.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
							/>
						)}
					/>

					<FormLabel>Escala de avaliação:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='evalScale'
						render={({ field }) => (
							<Select
								options={evalScale}
								value={evalScale.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Nível Inicial:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='startLevel'
						render={({ field }) => (
							<Select
								options={levels}
								value={levels.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Nível Final:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='finalLevel'
						render={({ field }) => (
							<Select
								options={levels}
								value={levels.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Qualificações Mínimas:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='minimumLiteraryQualifications'
						render={({ field }) => (
							<Select
								options={literaryQualifications}
								value={literaryQualifications.find(
									(val) => val.value === field.value
								)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Escala de avaliação:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='evalScale'
						render={({ field }) => (
							<Select
								options={evalScale}
								value={evalScale.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Nível Inicial:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='startLevel'
						render={({ field }) => (
							<Select
								options={levels}
								value={levels.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Nível Final:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='finalLevel'
						render={({ field }) => (
							<Select
								options={levels}
								value={levels.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Qualificações Mínimas:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='minimumLiteraryQualifications'
						render={({ field }) => (
							<Select
								options={literaryQualifications}
								value={literaryQualifications.find(
									(val) => val.value === field.value
								)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Qualificações Máximas:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='maximumLiteraryQualifications'
						render={({ field }) => (
							<Select
								options={literaryQualifications}
								value={literaryQualifications.find(
									(val) => val.value === field.value
								)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Qualificações Profissionais:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='professionalQualifications'
						render={({ field }) => (
							<Select
								options={professionalQualifications}
								value={professionalQualifications.find(
									(val) => val.value === field.value
								)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Idade mínima:</FormLabel>
					<MiniEdit
						{...register("minimumAge", { valueAsNumber: true })}
						required
					/>

					<InvisibleFormLabel />

					<FormLabel>Idade máxima:</FormLabel>
					<MiniEdit
						{...register("maximumAge", { valueAsNumber: true })}
						required
					/>
				</Form>
			</SmallContainer>
		</>
	);
};

export default FirstTab;
