import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
	Edit,
	SmallContainer,
	Form,
	FormHeader,
	EnabledPrevious,
	FormLabel,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
} from "../../../../styles/FormsTabsStyles";

const MediumEdit = styled(Edit)`
	grid-column: span 5;
`;

const SuperMiniEdit = styled(Edit)`
	grid-column: span 2;
`;

const SecondTab = ({ previousTab, nextTab }) => {
	const { register } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Contactos</FormHeaderDivider>
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
					<FormLabel>Email pessoal:</FormLabel>
					<MediumEdit
						{...register("email")}
						placeholder='exemplo@gmail.com'
						type='email'
					/>

					<FormLabel>Morada:</FormLabel>
					<MediumEdit
						{...register("address")}
						placeholder='Rua exemplo nº5, 1ºandar'
						type='text'
					/>

					<FormLabel>Localidade:</FormLabel>
					<SuperMiniEdit
						{...register("location")}
						placeholder='Canidelo'
						type='text'
					/>

					<FormLabel>Concelho:</FormLabel>
					<SuperMiniEdit
						{...register("hall")}
						placeholder='Vila Nova de Gaia'
						type='text'
					/>

					<FormLabel>Código Postal:</FormLabel>
					<SuperMiniEdit
						{...register("zip")}
						placeholder='XXXX-XXX'
						type='text'
					/>

					<FormLabel>Distrito:</FormLabel>
					<SuperMiniEdit
						{...register("district")}
						placeholder='Porto'
						type='text'
					/>

					<FormLabel>País:</FormLabel>
					<SuperMiniEdit
						{...register("country")}
						placeholder='Portugal'
						type='text'
					/>

					<FormLabel>Telemóvel:</FormLabel>
					<SuperMiniEdit
						{...register("phoneNumber")}
						placeholder='123 456 789'
						type='number'
					/>

					<FormLabel>Nacionalidade:</FormLabel>
					<SuperMiniEdit
						{...register("nationality")}
						placeholder='Portugal'
						type='text'
					/>

					<FormLabel>Naturalidade:</FormLabel>
					<SuperMiniEdit
						{...register("naturalness")}
						placeholder='Portuguesa'
						type='text'
					/>
				</Form>
			</SmallContainer>
		</>
	);
};

export default SecondTab;
