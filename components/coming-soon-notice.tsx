import { Smartphone } from "lucide-react";

export function ComingSoonNotice({
  compact = false,
  prominent = false,
}: {
  compact?: boolean;
  prominent?: boolean;
}) {
  const className = [
    "comingSoonNotice",
    compact && "comingSoonNoticeCompact",
    prominent && "comingSoonNoticeProminent",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <span className="comingSoonIcon" aria-hidden="true">
        <Smartphone size={compact ? 17 : 20} strokeWidth={1.8} />
      </span>
      <span className="comingSoonCopy">
        {prominent ? (
          <strong>APP COMING SOON</strong>
        ) : (
          <>
            <strong>Coming soon</strong>
            <span>to iOS and Android</span>
          </>
        )}
      </span>
      {!compact || prominent ? (
        <span className="comingSoonPlatforms" aria-label="Platforms: iOS and Android">
          <span>iOS</span>
          <span>Android</span>
        </span>
      ) : null}
    </div>
  );
}
