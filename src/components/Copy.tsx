
import { useState, useRef } from 'react';
import {
  IconButton,
  Input,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ImageIcon from '@mui/icons-material/Image';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import B from "./assets/icons/B.svg" 
import I from "./assets/icons/I.svg" 
import S from "./assets/icons/S.svg" 
import U from "./assets/icons/U.svg" 
import LeftAlign from "./assets/icons/LeftAlign.svg" 
import CenteredAlign from "./assets/icons/CenteredAlign.svg" 
import RightAlign from "./assets/icons/RightAlign.svg" 
import WidthAlign from "./assets/icons/WidthAlign.svg" 
import PointStep from "./assets/icons/PointStep.svg" 
import NumberStep from "./assets/icons/NumberStep.svg" 
import Image from "./assets/icons/Image.svg" 
import LeftArrow from "./assets/icons/LeftArrow.svg" 
import RightArrow from "./assets/icons/RightArrow.svg" 


import { styled, makeStyles } from '@mui/styles';

const buttonStyles = {
  width: '30px',
  height: '30px',
  // borderRadius: '4px',
  // padding: '10px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
};

const StyledIconButton = styled(IconButton)(buttonStyles);
const StyledToggleButton = styled(ToggleButton)(buttonStyles);

const CUSTOM_BOLD_EVENT = new CustomEvent('MAKE_BOLD');
const CUSTOM_ITALIC_EVENT = new CustomEvent('MAKE_ITALIC');
const CUSTOM_LINE_THROUGH_EVENT = new CustomEvent('MAKE_LINE_THROUGH');
const CUSTOM_UNDERLINE_EVENT = new CustomEvent('MAKE_UNDERLINE');
const CUSTOM_LEFT_EVENT = new CustomEvent('MAKE_LEFT');

const useStyles = makeStyles({
  input: {
    width: '52px',
    height: '24px',
    border: '1px solid #E2E2E2',
    boxSizing: 'border-box',
    borderRadius: '4px',
    marginLeft: '0.5rem',
  },
});

export const EditIcons = () => {
  const [formats, setFormats] = useState<Array<string> | []>(() => []);
  const [alignment, setAlignment] = useState<string | null>('');
  const [lists, setLists] = useState<string | null>('');

  const classes = useStyles();
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const handleLists = (
    event: React.MouseEvent<HTMLElement>,
    newList: string | null
  ) => {
    setLists(newList);
  };

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  const handleClick = () => {
    hiddenFileInput.current!.click();
  };


  //TODO implement the functionality of this
  // const handleChange = (event: Event) => {
  //   const target = event.target as HTMLInputElement;
  //   const file: File = (target.files as FileList)[0];
  //   console.log(file);
  //   / do something with the file /
  // };
return (
  <>
    <ToggleButtonGroup
    style={{display: "flex", alignItems: "center"}}
      value={formats}
      onChange={handleFormat}
      color="primary"
    >
      <StyledToggleButton
        value="bold"
        onClick={() => document.dispatchEvent(CUSTOM_BOLD_EVENT)}
      >
        <img src={B} alt=""/>
      </StyledToggleButton>
      <StyledToggleButton
        value="italic"
        onClick={() => document.dispatchEvent(CUSTOM_ITALIC_EVENT)}
      >
                  <img src={I} alt=""/>

      </StyledToggleButton>
      <StyledToggleButton
        value="clear"
        onClick={() => document.dispatchEvent(CUSTOM_LINE_THROUGH_EVENT)}
      >
        <img src={S} alt=""/>
        
      </StyledToggleButton>
      <StyledToggleButton
        value="underlined"
        onClick={() => document.dispatchEvent(CUSTOM_UNDERLINE_EVENT)}
      >
        <img src={U} alt=""/>
      </StyledToggleButton>
    </ToggleButtonGroup>
    <ToggleButtonGroup
    style={{display: "flex", alignItems: "center"}}

      exclusive
      value={alignment}
      onChange={handleAlignment}
      color="primary"
      sx={{ ml: 1 }}
    >
      <StyledToggleButton
        value="left"
        onClick={() => document.dispatchEvent(CUSTOM_LEFT_EVENT)}
      >
                 <img src={LeftAlign} alt=""/>
      </StyledToggleButton>
      <StyledToggleButton value="center">
      <img src={CenteredAlign} alt=""/>
      </StyledToggleButton>
      <StyledToggleButton value="right">
      <img src={RightAlign} alt=""/>
      </StyledToggleButton>
      <StyledToggleButton value="justify">
      <img src={WidthAlign} alt=""/>
      </StyledToggleButton>
    </ToggleButtonGroup>
    <ToggleButtonGroup
    style={{display: "flex", alignItems: "center"}}

      value={lists}
      exclusive
      onChange={handleLists}
      color="primary"
      sx={{ mx: 1 }}
    >
      <StyledToggleButton value="ulist">
      <img src={PointStep} alt=""/>
      </StyledToggleButton>
      <StyledToggleButton value="olist">
      <img src={NumberStep} alt=""/>
      </StyledToggleButton>
    </ToggleButtonGroup>
    
    <div style={{display: "flex", alignItems: "center"}}>
    <ToggleButtonGroup 
       color="primary"
       sx={{ mx: 1 }}
      >
      <StyledToggleButton  value="primary" onClick={handleClick}>
      <img src={Image} alt="" />
      </StyledToggleButton>
      </ToggleButtonGroup>
      <input
        type="file"
        ref={hiddenFileInput}
        style={{ display: 'none' }}
      />
    <ToggleButtonGroup style={{marginLeft: "10px"}}   color="primary"> 
    <StyledToggleButton value="back">
    <img src={LeftArrow} alt=""/>
    </StyledToggleButton>
    <StyledToggleButton value="forward">
    <img src={RightArrow} alt=""/>
    </StyledToggleButton>
    </ToggleButtonGroup>
    <Input
      className={classes.input}
      type="number"
      defaultValue={24}
      inputProps={{
        min: 1,
        max: 32,
      }}
    />
    
    </div>
  </>
);
};