"use client";

import { Highlight, themes } from "prism-react-renderer";
import styles from "./CodeBlock.module.scss";

type Props = {
  code: string;
  language?: string;
};

export default function CodeBlock({ code, language = "jsx" }: Props) {
  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className={styles.pre} style={{ ...style, background: "#1d1d1f" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
