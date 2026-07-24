import test from "node:test";
import assert from "node:assert/strict";

import { CHAPTER_TEST_PROMPT_VERSION, generateChapterTestFromPrompt } from "../Services/ChapterTestAI.Service.js";

test("generateChapterTestFromPrompt retries and returns structured meta", async () => {
    const originalFetch = global.fetch;
    let callCount = 0;

    global.fetch = async () => {
        callCount += 1;
        if (callCount === 1) {
            throw new Error("temporary failure");
        }

        return {
            ok: true,
            async json() {
                return {
                    title: "Retry success",
                    questions: [],
                };
            },
        };
    };

    try {
        const result = await generateChapterTestFromPrompt("prompt body", {
            retries: 1,
            timeoutMs: 1000,
            promptVersion: CHAPTER_TEST_PROMPT_VERSION,
            requestId: "req-test-1",
        });

        assert.equal(callCount, 2);
        assert.equal(result.data.title, "Retry success");
        assert.equal(result.meta.promptVersion, CHAPTER_TEST_PROMPT_VERSION);
        assert.equal(result.meta.retryCount, 1);
        assert.equal(result.meta.requestId, "req-test-1");
        assert.equal(result.meta.attempts.length, 2);
    } finally {
        global.fetch = originalFetch;
    }
});

test("generateChapterTestFromPrompt surfaces timeout failures", async () => {
    const originalFetch = global.fetch;

    global.fetch = async (_url, options) =>
        new Promise((_resolve, reject) => {
            options.signal.addEventListener("abort", () => {
                const abortError = new Error("aborted");
                abortError.name = "AbortError";
                reject(abortError);
            });
        });

    try {
        await assert.rejects(
            () =>
                generateChapterTestFromPrompt("slow prompt", {
                    retries: 0,
                    timeoutMs: 10,
                    requestId: "req-timeout",
                }),
            /timed out/,
        );
    } finally {
        global.fetch = originalFetch;
    }
});
