import { Card, CardContent, Theme } from '@mui/material';
import { DraftEditor } from './DraftEditor';
import { makeStyles } from '@mui/styles';
import { FormIcons } from './FormIcons';
import "./../scss/TamplateEditor.scss"

export const  TemplateEditor = () => {
  return (
    <div >
    <Card id="temaplate_editor">
      <CardContent>
        <DraftEditor />
      </CardContent>
      <FormIcons />
    </Card>
    </div>
  );
};
