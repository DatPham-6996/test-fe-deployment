'use client';

import { useLocale } from '@/locale/intl-provider-wrapper';
import { useCallback, useEffect, useRef, useState } from 'react';
import RichTextEditor, {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  Emoji,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,
  Image,
  Indent,
  Italic,
  LineHeight,
  Link,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  TextAlign,
  Underline,
  locale as editorLocale,
  TableOfContents,
  TextDirection,
} from 'reactjs-tiptap-editor';

import debounce from 'lodash.debounce';

import 'reactjs-tiptap-editor/style.css';

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  TextDirection,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
  }),
  Blockquote.configure({ spacer: true }),
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: 'dracula' }),
  Iframe,
];

const DEFAULT_VALUE = '';

interface TextEditorProps {
  value: string;
  setValue: (value: string) => void;
  defaultValue?: string;
}

export default function TextEditor({ value, setValue, defaultValue = DEFAULT_VALUE }: TextEditorProps) {
  const { locale } = useLocale();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('rerender');
  }, []);

  useEffect(() => {
    editorLocale.setLang(locale);
    setIsLoading(false);
  }, [locale]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeContent = useCallback(
    debounce((value: string) => {
      setValue(value);
    }, 300),
    []
  );

  if (isLoading) return null;

  return (
    <div>
      <RichTextEditor output="html" content={value} onChangeContent={onChangeContent} extensions={extensions} />
    </div>
  );
}
