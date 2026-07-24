import test from "node:test";
import assert from "node:assert/strict";

import { evaluateChapterTest } from "../Utils/EvaluateChapterTest.js";

test("evaluateChapterTest computes score, summaries, and weak areas", () => {
    const testDoc = {
        questions: [
            {
                _id: "q1",
                number: 1,
                prompt: "Question 1",
                sectionId: "section-a",
                subsectionId: "sub-a",
                options: [{ key: "A", text: "A" }],
                correctOption: "A",
                explanation: "Because A",
                aiNote: {},
            },
            {
                _id: "q2",
                number: 2,
                prompt: "Question 2",
                sectionId: "section-b",
                subsectionId: "sub-b",
                options: [{ key: "B", text: "B" }],
                correctOption: "B",
                explanation: "Because B",
                aiNote: {},
            },
        ],
    };

    const result = evaluateChapterTest(testDoc, [
        {
            questionId: "q1",
            selectedOption: "A",
            status: "answered",
        },
        {
            questionId: "q2",
            selectedOption: "C",
            status: "review_answered",
        },
    ]);

    assert.equal(result.score, 1);
    assert.deepEqual(result.summary, {
        correct: 1,
        incorrect: 1,
        skipped: 0,
        review: 0,
    });
    assert.deepEqual(result.wrongSectionIds, ["section-b"]);
    assert.deepEqual(result.wrongSubsectionIds, ["sub-b"]);
    assert.equal(result.evaluatedAnswers[1].status, "review_incorrect");
});
