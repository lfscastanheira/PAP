import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import { typesOfRoom } from "../../../../selectData.json";

import {
	Selects,
	Edit,
	SmallContainer,
	Form,
	FormHeader,
	FormLabel,
	Area,
	FormHeaderDivider,
} from "../../../../styles/FormsTabsStyles";

const Select = styled(Selects)`
	grid-column: span 4;
`;

const LongFormLabel = styled(FormLabel)`
	grid-column: span 4;
`;

const MediumEdit = styled(Edit)`
	grid-column: span 7;
`;

const MiniEdit = styled(Edit)`
	grid-column: span 3;
`;

const SuperMiniEdit = styled(Edit)`
	grid-column: span 2;
`;

const Checkbox = styled.input`
	margin-left: 2rem;
	&:hover {
		cursor: pointer;
	}
`;

const AreaEdit = styled(Area)`
	grid-column: span 7;
	grid-row: span 2;
`;

const FirstTab = () => {
	const { register, control } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Dados</FormHeaderDivider>
					<FormHeaderDivider />
				</FormHeader>

				<Form>
					<FormLabel>Designação:</FormLabel>
					<MediumEdit
						{...register("designation")}
						type='text'
						placeholder='Nome da sala'
					/>

					<FormLabel>Código:</FormLabel>
					<MiniEdit
						{...register("code")}
						type='text'
						placeholder='Código da sala'
					/>

					<FormLabel>Tipo de sala:</FormLabel>
					<Controller
						control={control}
						defaultValue=''
						name='typeOfRoom'
						render={({ field }) => (
							<Select
								options={typesOfRoom}
								value={typesOfRoom.find((val) => val.value === field.value)}
								onChange={(val) => field.onChange(val.value)}
								isSearchable={false}
								isClearable
							/>
						)}
					/>

					<FormLabel>lotation:</FormLabel>
					<SuperMiniEdit {...register("lotation")} type='number' />

					<LongFormLabel>
						Ativa: <Checkbox {...register("isActive")} type='checkbox' />
					</LongFormLabel>

					<FormLabel>Observações:</FormLabel>
					<AreaEdit {...register("observations")} rows='6' />
				</Form>
			</SmallContainer>
		</>
	);
};

export default FirstTab;
