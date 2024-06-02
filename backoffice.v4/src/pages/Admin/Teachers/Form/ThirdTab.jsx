import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
	Edit,
	SmallContainer,
	Form,
	FormHeader,
	EnabledPrevious,
	NavigationButton,
	FormHeaderDivider,
	EnabledNext,
	FormLabelInvisible,
} from "../../../../styles/FormsTabsStyles";

const Checkbox = styled.input`
	&:hover {
		cursor: pointer;
	}
`;

const FormLabel = styled.b`
	display: flex;
	flex-direction: row;
	grid-column: span 2;
	font-size: 13px;
	align-items: center;
	${Checkbox} {
		margin-left: 2rem;
	}
`;

const InvisibleFormLabel = styled(FormLabelInvisible)`
	grid-column: span 3;
`;

const SuperMiniEdit = styled(Edit)`
	grid-column: span 2;
`;

const ThirdTab = ({ previousTab, nextTab }) => {
	const { register, watch } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Informações Financeiras</FormHeaderDivider>
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
					<FormLabel>Não dívida à Segurança Social:</FormLabel>
					<SuperMiniEdit
						{...register("socialSecurityDeclartionValidDate")}
						type='date'
					/>

					<FormLabel>Não dívida às finanças:</FormLabel>
					<SuperMiniEdit
						{...register("financeDeclartionValidDate")}
						type='date'
					/>

					<InvisibleFormLabel />

					<FormLabel>Seguro de trabalho:</FormLabel>
					<SuperMiniEdit {...register("workInsuranceValidDate")} type='date' />

					<FormLabel>Registo criminal:</FormLabel>
					<SuperMiniEdit
						{...register("criminalRecordDeclarationValidDate")}
						type='date'
					/>

					<InvisibleFormLabel />

					<FormLabel>
						Taxa de IVA: <Checkbox {...register("iva")} type='checkbox' />
					</FormLabel>
					<SuperMiniEdit
						{...register("ivaTax")}
						disabled={!watch("iva")}
						placeholder='0%'
						type='number'
					/>

					<FormLabel>
						Taxa de IRS: <Checkbox {...register("irs")} type='checkbox' />
					</FormLabel>
					<SuperMiniEdit
						{...register("irsTax")}
						disabled={!watch("irs")}
						placeholder='0%'
						type='number'
					/>

					<InvisibleFormLabel />

					<FormLabel>
						Independente:{" "}
						<Checkbox {...register("independent")} type='checkbox' />
					</FormLabel>
					<SuperMiniEdit
						{...register("independentNumber")}
						disabled={!watch("independent")}
						placeholder='Nº independente'
						type='number'
					/>
				</Form>
			</SmallContainer>
		</>
	);
};

export default ThirdTab;
