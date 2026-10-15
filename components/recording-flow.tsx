import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

const waveform = [18, 28, 40, 24, 34, 18, 42, 30, 20, 36, 26];

export function RecordingFlow() {
  return (
    <div
      className="recordingFlow"
      role="group"
      aria-label="ExpertOnc consultation recording and AI visit summary screens"
    >
      <div className="recordingFlowPanel recordingFlowRecord">
        <p className="recordingFlowLabel">Record consultation</p>
        <div className="phone recordingFlowPhone">
          <Image
            src="/screens/record.jpg"
            width={860}
            height={1864}
            sizes="(max-width: 600px) 34vw, 180px"
            alt="ExpertOnc recording screen showing the consent notice and recording controls"
          />
        </div>
      </div>

      <div className="recordingFlowConnector" aria-hidden="true">
        <span className="recordingFlowWave">
          {waveform.map((height, index) => (
            <i key={index} style={{ "--wave-height": `${height}%` } as CSSProperties} />
          ))}
        </span>
        <ArrowRight size={20} />
      </div>

      <div className="recordingFlowPanel recordingFlowSummary">
        <p className="recordingFlowLabel">AI visit summary</p>
        <div className="phone recordingFlowPhone">
          <Image
            src="/screens/summary.jpg"
            width={860}
            height={1864}
            sizes="(max-width: 600px) 34vw, 180px"
            alt="ExpertOnc AI visit summary screen with key points and next steps"
          />
        </div>
      </div>
    </div>
  );
}
