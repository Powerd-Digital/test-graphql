import { OTLPHttpJsonTraceExporter, registerOTel } from "@vercel/otel";

// For local logs, clone and run this repo locally
// clone this repo - https://github.com/vercel/opentelemetry-collector-dev-setup

export function register() {
  if (process.env.NODE_ENV === "development") {
    registerOTel({
      serviceName: "token2-next",
    });
  } else if (process.env.HIGHLIGHT_PROJECT_ID) {
    registerOTel({
      serviceName: process.env.VERCEL_BRANCH_URL ?? "token2-next",
      instrumentationConfig: {
        fetch: {
          propagateContextUrls: ["*"],
        },
      },
      attributes: {
        "highlight.project_id": process.env.HIGHLIGHT_PROJECT_ID,
        "highlight.source": "backend",
      },
      traceExporter: new OTLPHttpJsonTraceExporter({
        url: "https://otel.highlight.io:4318/v1/traces",
      }),
    });
  }
}
