import "dotenv/config";
import crypto from "node:crypto";

const PYTHON_AI_URL = process.env.PYTHON_AI_URL || "http://127.0.0.1:8000";
const DEFAULT_TIMEOUT_MS = Number(process.env.AI_REQUEST_TIMEOUT_MS || 12000);
const DEFAULT_RETRIES = Number(process.env.AI_REQUEST_RETRIES || 2);
export const CHAPTER_TEST_PROMPT_VERSION = "chapter-test-v2";

const wait = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));

const buildPromptHash = (prompt) =>
    crypto.createHash("sha256").update(String(prompt || "")).digest("hex");

const logPromptRun = (payload) => {
    console.log(
        JSON.stringify({
            scope: "chapter-test-ai",
            ...payload,
        })
    );
};

export async function generateChapterTestFromPrompt(prompt, options = {}) {
    const timeoutMs = Number(options.timeoutMs || DEFAULT_TIMEOUT_MS);
    const retries = Number(options.retries ?? DEFAULT_RETRIES);
    const promptVersion = options.promptVersion || CHAPTER_TEST_PROMPT_VERSION;
    const requestId = options.requestId || crypto.randomUUID();
    const promptHash = buildPromptHash(prompt);
    const promptLength = String(prompt || "").length;
    const attempts = [];
    let lastError = null;

    for (let attempt = 1; attempt <= retries + 1; attempt += 1) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        const startedAt = new Date();

        try {
            const response = await fetch(`${PYTHON_AI_URL}/generate-test`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt, promptVersion, requestId }),
                signal: controller.signal,
            });

            clearTimeout(timer);

            if (!response.ok) {
                const error = await response.json().catch(() => ({ detail: "AI service request failed" }));
                throw new Error(error.detail || "AI service request failed");
            }

            const data = await response.json();
            const finishedAt = new Date();
            attempts.push({
                attempt,
                status: "success",
                startedAt: startedAt.toISOString(),
                finishedAt: finishedAt.toISOString(),
                durationMs: finishedAt.getTime() - startedAt.getTime(),
            });

            const meta = {
                requestId,
                promptVersion,
                promptHash,
                promptLength,
                retryCount: attempt - 1,
                timeoutMs,
                generatedAt: finishedAt.toISOString(),
                attempts,
            };

            logPromptRun(meta);
            return { data, meta };
        } catch (error) {
            clearTimeout(timer);
            const finishedAt = new Date();
            const normalizedMessage = error?.name === "AbortError"
                ? `AI service timed out after ${timeoutMs}ms`
                : error?.cause?.code === "ECONNREFUSED"
                    ? `Python AI service is not running at ${PYTHON_AI_URL}. Start it before generating a test.`
                    : `Unable to reach Python AI service: ${error.message}`;

            attempts.push({
                attempt,
                status: "failed",
                startedAt: startedAt.toISOString(),
                finishedAt: finishedAt.toISOString(),
                durationMs: finishedAt.getTime() - startedAt.getTime(),
                message: normalizedMessage,
            });
            lastError = new Error(normalizedMessage);

            if (attempt <= retries) {
                await wait(attempt * 250);
            }
        }
    }

    logPromptRun({
        requestId,
        promptVersion,
        promptHash,
        promptLength,
        retryCount: retries,
        timeoutMs,
        attempts,
        failed: true,
    });
    throw lastError || new Error("AI service request failed");
}
