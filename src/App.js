import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, Menu, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

import HomePage from './Homepage/Homepage';
import AuctionPage from './AuctionPage/Auction';

const siteName = "English Auction Platform";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e285f',
    },
  },
});

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <div>
              <Typography variant="h4" component="div">
                {siteName}
              </Typography>
              <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: 'center' }}>
                The English Auction Platform
              </Typography>
            </div>
            <Button
              color="inherit"
              aria-controls="page-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              Pages
            </Button>
            <Menu
              id="page-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={NavLink} to="/" exact onClick={handleMenuClose}>
                Home
              </MenuItem>
              <MenuItem component={NavLink} to="/auction" onClick={handleMenuClose}>
                Auction
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Container sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/auction" component={AuctionPage} />
          </Switch>
        </Container>

        <Box
          component="footer"
          sx={{
            backgroundColor: '#f9f9f9',
            py: 2,
            px: 3,
            mt: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </Typography>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
