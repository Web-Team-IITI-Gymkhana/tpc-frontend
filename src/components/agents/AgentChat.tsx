"use client";

import {
  CSSProperties,
  useContext,
  FormEvent,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Bot, Send, Trash2, X } from "lucide-react";
import { useAuthUser } from "@/helpers/authUtils";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { askAgent } from "@/helpers/agents/api";
import MarkdownMessage from "./MarkdownMessage";

type Message = {
  id: number;
  sender: "user" | "assistant" | "error";
  text: string;
  requestId?: string | null;
};

export default function AgentChat() {
  const { user } = useAuthUser();
  const { isOpen: isSidebarOpen } = useContext(ToggleContext);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [chatWidth, setChatWidth] = useState(500);
  const [maxChatWidth, setMaxChatWidth] = useState(900);
  const [chatHeight, setChatHeight] = useState(691);
  const [maxChatHeight, setMaxChatHeight] = useState(800);
  const nextId = useRef(0);
  const sending = useRef(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const resizeStart = useRef<{
    pointerId: number;
    x: number;
    y: number;
    width: number;
    height: number;
    horizontal: boolean;
    vertical: boolean;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isSending, isOpen]);

  useEffect(() => {
    const updateMaxSize = () => {
      const desktop = window.innerWidth >= 768;
      const sidebarWidth = desktop ? (isSidebarOpen ? 288 : 80) : 0;
      setMaxChatWidth(Math.max(200, window.innerWidth - sidebarWidth - (desktop ? 36 : 32)));
      setMaxChatHeight(Math.max(240, window.innerHeight - 48));
    };
    updateMaxSize();
    window.addEventListener("resize", updateMaxSize);
    return () => window.removeEventListener("resize", updateMaxSize);
  }, [isSidebarOpen]);

  if (!user) return null;

  const close = () => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  };

  const clampChatWidth = (width: number) => {
    return Math.max(Math.min(320, maxChatWidth), Math.min(width, maxChatWidth));
  };

  const clampChatHeight = (height: number) => {
    return Math.max(Math.min(300, maxChatHeight), Math.min(height, maxChatHeight));
  };

  const beginResize = (
    event: ReactPointerEvent<HTMLDivElement>,
    horizontal: boolean,
    vertical: boolean,
  ) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      width: chatWidth,
      height: chatHeight,
      horizontal,
      vertical,
    };
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery || sending.current) return;

    sending.current = true;
    setIsSending(true);
    setQuery("");
    setMessages((previous) => [
      ...previous,
      { id: nextId.current++, sender: "user", text: trimmedQuery },
    ]);

    try {
      const data = await askAgent(trimmedQuery);
      const requestId =
        typeof data?.request_id === "string" ? data.request_id : null;
      const message: Omit<Message, "id"> =
        typeof data?.response === "string"
          ? { sender: "assistant", text: data.response }
          : {
              sender: "error",
              text:
                !data ||
                data.statusCode === 401 ||
                data.error === "Unauthorized"
                  ? "Your session has ended. Please sign in again."
                  : typeof data.error === "string"
                    ? data.error
                    : "The assistant could not answer right now. Please try again.",
              requestId,
            };
      setMessages((previous) => [
        ...previous,
        { id: nextId.current++, ...message },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          id: nextId.current++,
          sender: "error",
          text: "Could not connect to the assistant. Please try again.",
        },
      ]);
    } finally {
      sending.current = false;
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <>
      {isOpen && (
        <aside
          id="placement-assistant-panel"
          aria-label="Placement assistant"
          className="fixed bottom-4 right-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl sm:bottom-6 sm:right-6"
          style={
            {
              width: `min(${chatWidth}px, calc(100vw - 2rem))`,
              maxWidth: `${maxChatWidth}px`,
              height: `min(${chatHeight}px, calc(100dvh - 3rem))`,
            } as CSSProperties
          }
          onPointerMove={(event) => {
            const start = resizeStart.current;
            if (start?.pointerId !== event.pointerId) return;
            if (start.horizontal)
              setChatWidth(
                clampChatWidth(start.width + start.x - event.clientX),
              );
            if (start.vertical)
              setChatHeight(
                clampChatHeight(start.height + start.y - event.clientY),
              );
          }}
          onPointerUp={() => {
            resizeStart.current = null;
          }}
          onPointerCancel={() => {
            resizeStart.current = null;
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
        >
          <div
            role="separator"
            aria-label="Resize chat sidebar"
            aria-orientation="vertical"
            aria-valuemin={320}
            aria-valuemax={maxChatWidth}
            aria-valuenow={Math.min(chatWidth, maxChatWidth)}
            tabIndex={0}
            className="group absolute inset-y-0 left-0 z-10 w-2 cursor-col-resize touch-none"
            onPointerDown={(event) => beginResize(event, true, false)}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                setChatWidth((width) =>
                  clampChatWidth(
                    width + (event.key === "ArrowLeft" ? 20 : -20),
                  ),
                );
              }
            }}
          >
            <span className="absolute left-0.5 top-1/2 h-10 w-1 -translate-y-1/2 rounded-full bg-slate-300 group-hover:bg-blue-500 group-focus-visible:bg-blue-500" />
          </div>
          <div
            role="separator"
            aria-label="Resize chat height"
            aria-orientation="horizontal"
            aria-valuemin={300}
            aria-valuemax={maxChatHeight}
            aria-valuenow={Math.min(chatHeight, maxChatHeight)}
            tabIndex={0}
            className="absolute inset-x-0 top-0 z-10 h-2 cursor-row-resize touch-none"
            onPointerDown={(event) => beginResize(event, false, true)}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                event.preventDefault();
                setChatHeight((height) =>
                  clampChatHeight(
                    height + (event.key === "ArrowUp" ? 20 : -20),
                  ),
                );
              }
            }}
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 z-20 h-5 w-5 cursor-nwse-resize touch-none"
            onPointerDown={(event) => beginResize(event, true, true)}
          />
          <header className="flex min-h-16 items-center justify-between bg-slate-800 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-sm font-semibold">Placement assistant</h2>
                <p className="hidden text-xs text-slate-300 sm:block">
                  Ask about placements and the portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([])}
                disabled={isSending || messages.length === 0}
                aria-label="Clear conversation"
                title="Clear conversation"
                className="rounded-lg p-2 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-40"
              >
                <Trash2 aria-hidden="true" size={17} />
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close placement assistant"
                className="rounded-lg p-2 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X aria-hidden="true" size={19} />
              </button>
            </div>
          </header>

          <div
            aria-live="polite"
            aria-relevant="additions"
            ref={messagesRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
          >
            {messages.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-600">
                Ask a question about placement rules, applications, or using the
                portal. Each question is answered separately, so include the
                details you need. Answers can be incomplete, so check important
                details with the TPC team.
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-xl px-3 py-2 text-sm shadow-sm ${
                  message.sender === "user"
                    ? "ml-auto max-w-[90%] bg-blue-600 text-white"
                    : message.sender === "error"
                      ? "max-w-[90%] border border-red-200 bg-red-50 text-red-900"
                      : "w-full border border-slate-200 bg-white text-slate-800"
                }`}
              >
                {message.sender === "assistant" ? (
                  <MarkdownMessage text={message.text} />
                ) : (
                  <p className="whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                )}
                {message.requestId && (
                  <p className="mt-2 break-all text-xs opacity-70">
                    Request ID: {message.requestId}
                  </p>
                )}
              </div>
            ))}
            {isSending && <p className="text-sm text-slate-500">Thinking...</p>}
          </div>

          <form
            onSubmit={submit}
            className="border-t border-slate-200 bg-white p-3"
          >
            <label htmlFor="agent-query" className="sr-only">
              Ask the placement assistant
            </label>
            <div className="flex items-end gap-2">
              <textarea
                id="agent-query"
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                maxLength={1000}
                rows={2}
                placeholder="Type your question..."
                className="max-h-28 min-h-12 flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={isSending || !query.trim()}
                aria-label="Send question"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send aria-hidden="true" size={18} />
              </button>
            </div>
            <p className="mt-1 text-right text-xs text-slate-500">
              {query.length}/1000
            </p>
          </form>
        </aside>
      )}
      {!isOpen && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open placement assistant"
          aria-expanded={false}
          title="Open placement assistant"
          className="fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-400 bg-slate-800 text-white shadow-lg shadow-slate-900/25 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:bottom-6 sm:right-6"
        >
          <Bot aria-hidden="true" size={28} strokeWidth={2} />
        </button>
      )}
    </>
  );
}
