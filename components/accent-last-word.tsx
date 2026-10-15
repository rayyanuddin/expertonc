type AccentLastWordProps = Readonly<{
  text: string;
  tone?: "blue" | "bright" | "navy" | "inherit";
}>;

const toneClass = {
  blue: "titleAccent titleAccentBlue",
  bright: "titleAccent titleAccentBright",
  navy: "titleAccent titleAccentNavy",
  inherit: "titleAccent titleAccentInherit",
} as const;

export function AccentLastWord({ text, tone = "blue" }: AccentLastWordProps) {
  const lastSpace = text.lastIndexOf(" ");
  if (lastSpace === -1) return <span className={toneClass[tone]}>{text}</span>;

  return (
    <>
      {text.slice(0, lastSpace)}{" "}
      <span className={toneClass[tone]}>{text.slice(lastSpace + 1)}</span>
    </>
  );
}
