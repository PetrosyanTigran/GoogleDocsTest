//@ts-nocheck
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromHTML,
  Modifier,
  ContentState,
} from 'draft-js';
import { useState, useRef, useEffect } from 'react';
import 'draft-js/dist/Draft.css';
import { useAppSelector } from '../redux/hooks';

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
  LEFT: {
    textAlign: 'left',
  },
  RIGHT: {
    textAlign: 'right',
  },
  CENTER: {
    textAlign: 'center',
  },
  JUSTIFY: {
    textAlign: 'justify',
  },
};

// const blockRenderMap = Immutable.Map({
//   'header-two': {
//     element: 'h1',
//   },
//   unstyled: {
//     element: 'h2',
//   },
// });

export const DraftEditor = () => {
  const templateName = useAppSelector(
    (state) => state.formReducer.template_name
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const h2template_name = `<h2>${templateName}</h2>`;
  const { contentBlocks, entityMap } = convertFromHTML(h2template_name);

  const contentState = Modifier.replaceWithFragment(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    ContentState.createFromBlockArray(contentBlocks, entityMap).getBlockMap()
  );

  EditorState.push(editorState, contentState, 'insert-fragment');

  const ref = useRef();

  useEffect(() => {
    const makeBold = () => {
      ref.current.props.onChange(
        RichUtils.toggleInlineStyle(ref.current.props.editorState, 'BOLD')
      );
    };

    const makeItalic = () => {
      ref.current.props.onChange(
        RichUtils.toggleInlineStyle(ref.current.props.editorState, 'ITALIC')
      );
    };

    const makeLineThrough = () => {
      ref.current.props.onChange(
        RichUtils.toggleInlineStyle(
          ref.current.props.editorState,
          'STRIKETHROUGH'
        )
      );
    };

    const makeUnderline = () => {
      ref.current.props.onChange(
        RichUtils.toggleInlineStyle(ref.current.props.editorState, 'UNDERLINE')
      );
    };

    const makeTextLeft = () => {
      ref.current.props.onChange(
        RichUtils.toggleBlockType(ref.current.props.editorState, 'LEFT')
      );
    };

    // const makeUnorderList = () => {
    //   ref.current.props.onChange(
    //     RichUtils.onTab(ref.current.props.editorState)
    //   );
    // };

    document.addEventListener('MAKE_BOLD', makeBold);
    document.addEventListener('MAKE_ITALIC', makeItalic);
    document.addEventListener('MAKE_LINE_THROUGH', makeLineThrough);
    document.addEventListener('MAKE_UNDERLINE', makeUnderline);
    document.addEventListener('MAKE_LEFT', makeTextLeft);

    return () => {
      document.removeEventListener('click', makeBold);
      document.removeEventListener('click', makeItalic);
      document.removeEventListener('click', makeLineThrough);
      document.removeEventListener('click', makeUnderline);
      document.removeEventListener('click', makeTextLeft);
    };
  }, []);

  // dispatch(() => editHTMLText(editorState));

  return (
    <Editor
      ref={ref}
      editorState={editorState}
      onChange={setEditorState}
      customStyleMap={styleMap}
      placeholder="Напишите текст..."
      textAlignment="center"
      spellCheck
      // blockRenderMap={blockRenderMap}
    />
  );
};
