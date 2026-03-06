"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

const CHUNK_RELOAD_FLAG = "__studio_chunk_reloaded_once__";

function extractErrorMessage(reason: unknown) {
  if (reason instanceof Error) {
    return reason.message;
  }

  if (typeof reason === "string") {
    return reason;
  }

  if (reason && typeof reason === "object" && "message" in reason) {
    const message = (reason as { message?: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
  }

  return "";
}

function isChunkLoadFailure(reason: unknown) {
  const message = extractErrorMessage(reason).toLowerCase();
  return message.includes("loading chunk") || message.includes("chunkloaderror");
}

export default function StudioClient() {
  const [chunkError, setChunkError] = useState(false);

  useEffect(() => {
    function handleChunkFailure(reason: unknown) {
      if (!isChunkLoadFailure(reason)) {
        return;
      }

      if (sessionStorage.getItem(CHUNK_RELOAD_FLAG) !== "1") {
        sessionStorage.setItem(CHUNK_RELOAD_FLAG, "1");
        window.location.reload();
        return;
      }

      setChunkError(true);
    }

    function onWindowError(event: ErrorEvent) {
      handleChunkFailure(event.error ?? event.message);
    }

    function onUnhandledRejection(event: PromiseRejectionEvent) {
      handleChunkFailure(event.reason);
    }

    window.addEventListener("error", onWindowError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onWindowError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  if (chunkError) {
    return (
      <main style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
        <h1 style={{ marginBottom: 8 }}>Studio refresh required</h1>
        <p style={{ marginBottom: 16 }}>
          A JS chunk failed to load. Click reload to retry.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            border: "1px solid #111827",
            borderRadius: 8,
            padding: "8px 12px",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Reload Studio
        </button>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
