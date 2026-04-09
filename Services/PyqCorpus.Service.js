import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PYQ_TEXT_PATH = path.resolve(__dirname, "..", "..", "pyq_extracted.txt");

const TOPIC_HEADINGS = [
    "Ancient and Medieval History",
    "Modern History",
    "Art and Culture",
    "Polity",
    "Indian Economy",
    "Environment and Ecology",
    "Geography",
    "Science and Technology",
];

const TOPIC_ALIASES = {
    "Ancient and Medieval History": [
        "ancient",
        "medieval",
        "buddhism",
        "jainism",
        "gupta",
        "maurya",
        "sangam",
        "sultanate",
        "mughal",
    ],
    "Modern History": [
        "modern",
        "freedom struggle",
        "national movement",
        "governor general",
        "revolt",
        "congress",
        "swadeshi",
        "gandhi",
        "british",
    ],
    "Art and Culture": [
        "art",
        "culture",
        "temple",
        "dance",
        "music",
        "painting",
        "architecture",
        "festival",
        "unesco",
    ],
    "Polity": [
        "polity",
        "constitution",
        "parliament",
        "judiciary",
        "federalism",
        "amendment",
        "president",
        "governor",
        "rights",
    ],
    "Indian Economy": [
        "economy",
        "banking",
        "inflation",
        "gdp",
        "fiscal",
        "monetary",
        "budget",
        "tax",
        "agriculture",
    ],
    "Environment and Ecology": [
        "environment",
        "ecology",
        "biodiversity",
        "climate",
        "species",
        "ecosystem",
        "conservation",
        "pollution",
        "forest",
    ],
    "Geography": [
        "geography",
        "river",
        "mountain",
        "monsoon",
        "soil",
        "ocean",
        "plateau",
        "mineral",
        "map",
    ],
    "Science and Technology": [
        "science",
        "technology",
        "biotechnology",
        "space",
        "quantum",
        "ai",
        "satellite",
        "semiconductor",
        "vaccine",
    ],
};

const STOP_WORDS = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "from",
    "this",
    "into",
    "their",
    "have",
    "will",
    "about",
    "chapter",
    "section",
    "subsection",
    "summary",
    "topic",
    "only",
    "under",
    "which",
    "what",
    "when",
    "where",
    "whose",
    "how",
    "your",
    "there",
    "these",
    "those",
]);

let cachedCorpus = null;

const normalizeWhitespace = (value = "") =>
    String(value)
        .replace(/\r/g, "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

const normalizeToken = (value = "") =>
    String(value)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const unique = (items = []) => Array.from(new Set(items.filter(Boolean)));

function buildKeywords({ chapterName = "", subjectName = "", sections = [] }) {
    const textParts = [
        chapterName,
        subjectName,
        ...sections.map((section) => section.section_name),
        ...sections.flatMap((section) => (section.subsections || []).map((subsection) => subsection.subsection_name)),
    ];

    return unique(
        normalizeToken(textParts.join(" "))
            .split(" ")
            .filter((token) => token.length > 2 && !STOP_WORDS.has(token))
    );
}

function inferRelevantTopics({ chapterName = "", subjectName = "", sections = [] }) {
    const combined = normalizeToken(
        [
            chapterName,
            subjectName,
            ...sections.map((section) => section.section_name),
            ...sections.flatMap((section) => (section.subsections || []).map((subsection) => subsection.subsection_name)),
            ...sections.flatMap((section) => section.section_content || []),
        ].join(" ")
    );

    const scores = TOPIC_HEADINGS.map((topic) => {
        const score = (TOPIC_ALIASES[topic] || []).reduce(
            (sum, alias) => sum + (combined.includes(alias) ? 1 : 0),
            0
        );
        return { topic, score };
    })
        .filter((item) => item.score > 0)
        .sort((left, right) => right.score - left.score);

    if (scores.length > 0) {
        return scores.slice(0, 2).map((item) => item.topic);
    }

    if (normalizeToken(subjectName).includes("history")) {
        return ["Modern History", "Ancient and Medieval History"];
    }
    if (normalizeToken(subjectName).includes("polity")) {
        return ["Polity"];
    }
    if (normalizeToken(subjectName).includes("economy")) {
        return ["Indian Economy"];
    }
    if (normalizeToken(subjectName).includes("geography")) {
        return ["Geography"];
    }
    if (normalizeToken(subjectName).includes("science")) {
        return ["Science and Technology"];
    }

    return ["Polity"];
}

function splitIntoChunks(text = "") {
    const cleaned = normalizeWhitespace(text);
    if (!cleaned) return [];

    const rawParts = cleaned
        .split(/\n(?=\s*\d+\.)/)
        .map((part) => normalizeWhitespace(part))
        .filter(Boolean);

    return rawParts.length > 0 ? rawParts : [cleaned];
}

function scoreChunk(chunk = "", keywords = []) {
    const normalizedChunk = normalizeToken(chunk);

    return keywords.reduce((score, keyword) => {
        if (!keyword) return score;
        if (normalizedChunk.includes(keyword)) return score + 3;
        return score;
    }, 0);
}

async function loadPyqCorpus() {
    if (cachedCorpus) return cachedCorpus;

    const rawText = await fs.readFile(PYQ_TEXT_PATH, "utf-8");
    const normalized = normalizeWhitespace(rawText);

    const sectionPositions = TOPIC_HEADINGS.map((heading) => ({
        heading,
        index: normalized.indexOf(`${heading}\n${heading} : PYQs Analysis`),
    })).filter((entry) => entry.index >= 0);

    const topicSections = {};

    sectionPositions.forEach((entry, index) => {
        const start = entry.index;
        const end = sectionPositions[index + 1]?.index ?? normalized.length;
        topicSections[entry.heading] = normalized.slice(start, end).trim();
    });

    cachedCorpus = {
        rawText: normalized,
        topicSections,
    };

    return cachedCorpus;
}

export async function retrieveRelevantPyqContext({ chapterName = "", subjectName = "", sections = [] }) {
    const corpus = await loadPyqCorpus();
    const keywords = buildKeywords({ chapterName, subjectName, sections });
    const topics = inferRelevantTopics({ chapterName, subjectName, sections });

    const scoredChunks = topics.flatMap((topic) => {
        const topicText = corpus.topicSections[topic] || "";
        return splitIntoChunks(topicText).map((chunk) => ({
            topic,
            chunk,
            score: scoreChunk(chunk, keywords),
        }));
    });

    const snippets = scoredChunks
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, 8)
        .map((entry) => ({
            topic: entry.topic,
            excerpt: entry.chunk.slice(0, 1400),
        }));

    return {
        matchedTopics: topics,
        snippets,
        sourcePath: PYQ_TEXT_PATH,
    };
}
