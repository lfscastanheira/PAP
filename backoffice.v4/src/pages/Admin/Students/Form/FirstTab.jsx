import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import {
	qualifications,
	documentOfIdentificationType,
	regime,
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

const BigEdit = styled(Edit)`
	grid-column: span 11;
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
					<BigEdit {...register("name")} required placeholder='Nome completo' />

					<FormLabel>Tipo de identificação:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='documentOfIdentification.type'
						render={({ field }) => (
							<Select
								options={documentOfIdentificationType}
								required
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
						{...register("documentOfIdentification.number", {
							valueAsNumber: true,
						})}
						placeholder='XXX XXX XX'
						required
					/>

					<FormLabel>Validade:</FormLabel>
					<MiniEdit
						{...register("documentOfIdentification.validDate")}
						type='date'
						required
					/>

					<FormLabel>NIF:</FormLabel>
					<MiniEdit {...register("nif")} required placeholder='XXX XXX XXX' />

					<FormLabel>Género:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='sex'
						render={({ field }) => (
							<Select
								required
								options={sex}
								value={sex.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

{/* 					<FormLabel>Nascimento:</FormLabel>
					<MiniEdit {...register("birthdate")} required type='date' /> */}

					<FormLabel>Qualificações:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='academicQualification'
						render={({ field }) => (
							<Select
								required
								options={qualifications}
								value={qualifications.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Regime:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='regime'
						render={({ field }) => (
							<Select
								required
								options={regime}
								value={regime.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Nascimento:</FormLabel>
					<MiniEdit {...register("birthdate")} required type='date' />

{/* 					<FormLabel>Qualificações:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='academicQualification'
						render={({ field }) => (
							<Select
								required
								options={qualifications}
								value={qualifications.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/> */}
{/* 
					<FormLabel>Regime:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='regime'
						render={({ field }) => (
							<Select
								required
								options={regime}
								value={regime.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>
 */}
					<FormLabel>País de origem:</FormLabel>
					<MiniEdit
						{...register("countryOfbirth")}
						required
						placeholder='Portugal'
					/>

					<FormLabel>IBAN:</FormLabel>
					<MiniEdit {...register("iban")} required placeholder='xxxxxxxxx' />

					<FormLabel>NISS:</FormLabel>
					<MiniEdit {...register("niss")} required placeholder='xxxxxxxxx' />

					<FormLabel>BIC:</FormLabel>
					<MiniEdit {...register("bicCode")} required placeholder='xxxxxxxxx' />
				</Form>
			</SmallContainer>
		</>
	);
};

export default FirstTab;