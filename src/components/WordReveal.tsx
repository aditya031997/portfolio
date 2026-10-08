/**
 * Splits text into words that rise in one after another. Pure CSS, so it starts on first paint
 * without waiting for JavaScript (keeps LCP fast). Words between *asterisks* use the italic serif.
 */
export function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  let inSerif = false;
  return (
    <>
      {words.map((raw, i) => {
        if (raw.startsWith("*")) inSerif = true;
        const serif = inSerif;
        if (raw.replace(/[.,!?]$/, "").endsWith("*")) inSerif = false;
        const word = raw.replace(/\*/g, "");
        return (
          <span key={i} className="word-mask">
            <span
              className={`word${serif ? " serif grad-text" : ""}`}
              style={{ "--d": `${delay + i * 0.06}s` } as React.CSSProperties}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        );
      })}
    </>
  );
}
