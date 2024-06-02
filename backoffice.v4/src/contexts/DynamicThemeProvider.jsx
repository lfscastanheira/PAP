import { useState, createContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";

export const availableColors = {
	Blue: "#00cdff",
	Black: "#000000",
	Fuschia: "#f10768",
};

export const IconsStyle = {
	color: (props) => props.theme.colors.text,
	"aspect-ratio": " 1 / 1",
	width: "24px",
	"&: hover": {
		color: (props) => props.theme.colors.secundary,
	},
};

export const theme = {
	colors: {
		primary: "#3f4349",
		secundary: availableColors.Blue,
		background: "#eef3f6",
		text: "#9ca0a6",
		error: "#ee4b2b",
		button: "#dce1e4",
	},
};

export const ThemeUpdateContext = createContext();

const DynamicThemeProvider = ({ children }) => {
	const [mainTheme, setMainTheme] = useState(theme);

	useEffect(() => {
		const color = localStorage.getItem("rfa.color");
		if (color) changeMainColor(color);
	}, []);

	const changeMainColor = (color) => {
		setMainTheme({
			...theme,
			colors: {
				...theme.colors,
				secundary: color,
			},
		});
		localStorage.setItem("rfa.color", color);
	};

	return (
		<ThemeProvider theme={mainTheme}>
			<ThemeUpdateContext.Provider value={changeMainColor}>
				{children}
			</ThemeUpdateContext.Provider>
		</ThemeProvider>
	);
};

export default DynamicThemeProvider;
