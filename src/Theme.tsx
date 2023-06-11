import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#61828A',
		},
		secondary: {
			main: '#ABC3CD',
		},
		text: {
			primary: '#A9CCCF',
			secondary: '#DFE9EB',
			
		},
		background: {
			default: '#61828A',
			paper: '#DFE9EB'
		}
	},components: {
  	MuiPaper: {
  	  styleOverrides: {
  	    root: {
  	      color: '#61828A',
  	      padding:10,
      		alignItems: "center",
  	    }
  	  }
  	},
  	MuiGrid: {
  		styleOverrides: {
  			container :{
  				alignItems:"baseline", 
  				justifyContent: "space-evenly"
  			},
  		}
  	}
  }
});

export default theme;