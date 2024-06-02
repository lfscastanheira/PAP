import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import {
	qualifications,
	documentOfIdentificationType,
	sex,
} from "../../../../selectData.json";
import {
	Selects,
	Edit,
	SmallContainer,
	Form,
	FormHeader,
	Previous,
	FormLabel,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
} from "../../../../styles/FormsTabsStyles";

const Select = styled(Selects)`
	grid-column: span 3;
`;

const MediumEdit = styled(Edit)`
	grid-column: span 7;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 3;
`;

const FirstTab = ({ nextTab }) => {
	const { register, control } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Dados Pessoais</FormHeaderDivider>
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
					<MiniEdit
						{...register("name")}
						type='text'
						placeholder='Nome Completo'
					/>

					<FormLabel>Nome profissional:</FormLabel>
					<MediumEdit
						{...register("professionalName")}
						type='text'
						placeholder='Nome Profissional'
					/>

					<FormLabel>Abreviatura:</FormLabel>
					<MiniEdit
						{...register("abbreviation")}
						type='text'
						placeholder='Abreviatura'
					/>

					<FormLabel>NIF:</FormLabel>
					<MiniEdit {...register("nif")} type='text' placeholder='NIF' />

					<FormLabel>Qualificações:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='academicQualification'
						render={({ field }) => (
							<Select
								options={qualifications}
								value={qualifications.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Tipo de identificação:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='documentOfIdentification.type'
						render={({ field }) => (
							<Select
								options={documentOfIdentificationType}
								value={documentOfIdentificationType.find(
									(val) => val.value === field.value
								)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
							/>
						)}
					/>

					<FormLabel>Nº do documento:</FormLabel>
					<MiniEdit
						{...register("documentOfIdentification.number")}
						placeholder='1234567890'
					/>

					<FormLabel>Validade:</FormLabel>
					<MiniEdit
						{...register("documentOfIdentification.validDate")}
						type='date'
					/>

					<FormLabel>Género:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='sex'
						render={({ field }) => (
							<Select
								options={sex}
								value={sex.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>
					<FormLabel>Nascimento:</FormLabel>
					<MiniEdit {...register("birthdate")} type='date' />

					<FormLabel>IBAN:</FormLabel>
					<MiniEdit {...register("iban")} placeholder='xxxxxxxxx' type='text' />

					<FormLabel>NISS:</FormLabel>
					<MiniEdit {...register("niss")} placeholder='xxxxxxxxx' type='text' />

					<FormLabel>BIC:</FormLabel>
					<MiniEdit
						{...register("bicCode")}
						placeholder='xxxxxxxxx'
						type='text'
					/>
				</Form>
			</SmallContainer>
		</>
	);
};

export default FirstTab;
