import { useFormContext } from "react-hook-form";
import {
	SmallContainer,
	Form,
	FormHeader,
	EnabledPrevious,
	FormLabel,
	NavigationButton,
	FormHeaderDivider,
	Next,
	FileEdit,
	UploadIcon,
} from "../../../../styles/FormsTabsStyles";

const ThirdTab = ({ previousTab }) => {
	const { register } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Documentos</FormHeaderDivider>
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
					<FormLabel>Documento de Identificação:</FormLabel>
					<FileEdit {...register("identification")} type='file' title='nig' />
					<UploadIcon size={16} />

					<FormLabel>Curriculum Vitae (CV):</FormLabel>
					<FileEdit {...register("cv")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Certificado de Habilitações:</FormLabel>
					<FileEdit {...register("drivingCertificate")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>
						Declaração da Entidade Empregadora / Recibo Vencimento:
					</FormLabel>
					<FileEdit {...register("employerDeclaration")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Comprovativo de Morada:</FormLabel>
					<FileEdit {...register("proofAddress")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Declaração de Desistência:</FormLabel>
					<FileEdit {...register("withdrawal")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>NIB / IBAN:</FormLabel>
					<FileEdit {...register("ibanf")} type='file' />
					<UploadIcon size={16} />
				</Form>
			</SmallContainer>
		</>
	);
};

export default ThirdTab;
