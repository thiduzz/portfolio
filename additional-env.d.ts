import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';

interface Window {
    location: any;
    klaro: any;
    klaroConfig: any;
}

SyntaxHighlighter.registerLanguage('typescript',typescript)
SyntaxHighlighter.registerLanguage('tsx',typescript)