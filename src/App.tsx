import { Grid } from '@mui/material';
import { FormPanel } from './components/FormPanel';
import { MainForm } from './components/MainForm';
import { TemplateEditor } from './components/TemplateEditor';

function App() {
  return (
    <Grid container>
      <Grid item md={6} sm={12}>
        <FormPanel />
        <TemplateEditor />
      </Grid>
      <Grid item md={1} sm={12} />
      <Grid item md={5} sm={12}>
        <MainForm />
      </Grid>
    </Grid>
  );
}

export default App;
