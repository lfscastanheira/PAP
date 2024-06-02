import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import { jobSituation, nationality } from "../../../../selectData.json";
import {
	Selects,
	Edit,
	SmallContainer,
	Form,
	FormHeader,
	EnabledPrevious,
	FormLabel,
	FormLabelInvisible,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
} from "../../../../styles/FormsTabsStyles";

const Select = styled(Selects)`
	grid-column: span 3;
`;

const InvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 4;
`;

const BigEdit = styled(Edit)`
	grid-column: span 11;
`;

const MediumEdit = styled(Edit)`
	grid-column: span 7;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 3;
`;

const SecondTab = ({ previousTab, nextTab }) => {
	const { register, control } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>
						Contactos e Informações Financeiras
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
					<FormLabel>Email:</FormLabel>
					<MediumEdit
						{...register("email")}
						required
						placeholder='exemplo@gmail.com'
					/>

					<FormLabel>Telemóvel:</FormLabel>
					<MiniEdit {...register("phoneNumber")} placeholder='123 456 789' />

					<FormLabel>Nacionalidade:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='nationality'
						render={({ field }) => (
							<Select
								options={nationality}
								value={nationality.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Naturalidade:</FormLabel>
					<MiniEdit {...register("naturalness")} placeholder='Portuguesa' />

					<InvisibleFormLabel>You can't see me</InvisibleFormLabel>

					<FormLabel>Situação de emprego:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='jobSituation.label'
						render={({ field }) => (
							<Select
								options={jobSituation}
								value={jobSituation.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>Início situação emprego:</FormLabel>
					<MiniEdit {...register("jobSituation.date")} type='date' />

					<InvisibleFormLabel>You can't see me</InvisibleFormLabel>

					<FormLabel>Morada:</FormLabel>
					<BigEdit
						{...register("address")}
						placeholder='Rua exemplo nº5, 1ºandar'
					/>

					<FormLabel>Localidade:</FormLabel>
					<MiniEdit {...register("location")} placeholder='Canidelo' />

					<FormLabel>Concelho:</FormLabel>
					<MiniEdit {...register("hall")} placeholder='Vila Nova de Gaia' />

					<FormLabel>Código Postal:</FormLabel>
					<MiniEdit {...register("zip")} placeholder='XXXX-XXX' />
				</Form>
			</SmallContainer>
		</>
	);
};

export default SecondTab;
