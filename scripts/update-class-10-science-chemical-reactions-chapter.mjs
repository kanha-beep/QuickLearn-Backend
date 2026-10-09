import assert from "node:assert/strict";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { Class } from "../Models/Class.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)), quiet: true });

const args = new Set(process.argv.slice(2));
const allowed = new Set(["--validate", "--dry-run", "--apply"]);
assert([...args].every((arg) => allowed.has(arg)), "Unknown argument");
assert(args.size <= 1, "Choose only one mode");
const mode = [...args][0] || "--validate";

const points = (items) => items.map((item, index) => `${index + 1}. ${item}`);
const subsection = (subsection_name, items, order) => ({
  subsection_name,
  subsection_content: points(items),
  order,
});
const section = (section_name, section_content, subsections, order) => ({
  section_name,
  section_content: points(section_content),
  keywords: subsections.map((item) => item.subsection_name),
  subsections,
  order,
});

const chapter = {
  chapter_name: "Chemical Reactions and Equations",
  order: 1,
  sections: [
    section("Chemical Equations", [], [
      subsection("About", [
        "A chemical reaction occurs when the nature and identity of the initial substances change.",
        "Changes such as change in state or colour, gas evolution, and temperature change can indicate a chemical reaction.",
        "Chemical equations show reactions briefly by placing reactants on the left and products on the right of an arrow.",
      ], 1),
      subsection("Writing a Chemical Equation", [
        "Chemical formulae make chemical equations concise and useful.",
        "Mg + O₂ → MgO is the skeletal equation for burning magnesium in air.",
        "An equation with unequal atom counts on its two sides is unbalanced.",
      ], 2),
      subsection("Balanced Chemical Equations", [
        "Chemical equations are balanced because mass is neither created nor destroyed in a reaction.",
        "Use coefficients to make the number of atoms of each element equal on both sides; never change a formula itself.",
        "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g) is a balanced equation with physical-state symbols.",
        "Use (s), (l), (g), and (aq) for solid, liquid, gas, and aqueous states when needed.",
      ], 3),
    ], 1),
    section("Types of Chemical Reactions", [], [
      subsection("About", [
        "Chemical reactions involve breaking and making bonds to produce new substances.",
        "Atoms do not turn into atoms of another element or disappear during a chemical reaction.",
      ], 1),
      subsection("Combination Reaction", [
        "Two or more substances combine to form a single product.",
        "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat forms slaked lime from quick lime and water.",
        "A reaction that releases heat is an exothermic reaction; respiration and burning fuels are examples.",
      ], 2),
      subsection("Decomposition Reaction", [
        "A single reactant breaks down into two or more simpler products.",
        "Heat, light, or electricity can supply the energy needed for decomposition.",
        "2AgCl(s) → 2Ag(s) + Cl₂(g) in sunlight is a photochemical decomposition reaction.",
        "Energy-absorbing reactions are endothermic reactions.",
      ], 3),
      subsection("Displacement Reaction", [
        "A more reactive element displaces a less reactive element from its compound.",
        "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s) is a displacement reaction.",
        "Iron displaces copper, making the copper sulphate solution fade and depositing copper on the iron nail.",
      ], 4),
      subsection("Double Displacement Reaction", [
        "Ions are exchanged between two reactants in a double displacement reaction.",
        "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + 2NaCl(aq) forms white barium sulphate.",
        "A reaction that produces an insoluble substance is a precipitation reaction.",
      ], 5),
      subsection("Oxidation and Reduction", [
        "A substance gaining oxygen or losing hydrogen is oxidised.",
        "A substance losing oxygen or gaining hydrogen is reduced.",
        "CuO + H₂ → Cu + H₂O is a redox reaction: copper oxide is reduced and hydrogen is oxidised.",
      ], 6),
    ], 2),
    section("Have You Observed the Effects of Oxidation Reactions in Everyday Life?", [], [
      subsection("Corrosion", [
        "Corrosion occurs when metals are attacked by moisture, acids, or other substances in their surroundings.",
        "Rusting gives iron a reddish-brown coating; silver can develop a black coating and copper a green coating.",
        "Corrosion damages metal objects such as cars, bridges, railings, and ships.",
      ], 1),
      subsection("Rancidity", [
        "Fats and oils become rancid when they are oxidised, causing changes in taste and smell.",
        "Antioxidants and airtight containers slow this oxidation.",
        "Chip packets are flushed with nitrogen to prevent oxidation of fats and oils.",
      ], 2),
    ], 3),
    section("What you have learnt", [
      "A complete chemical equation symbolically represents reactants, products, and their physical states.",
      "Chemical equations must be balanced so every element has the same number of atoms on the reactant and product sides.",
      "A combination reaction forms one new substance from two or more substances, while a decomposition reaction breaks one substance into two or more substances.",
      "Exothermic reactions release heat along with products, whereas endothermic reactions absorb energy.",
      "In displacement reactions, one element replaces another from its compound; double displacement reactions exchange ions between reactants.",
      "Precipitation reactions produce insoluble salts.",
      "Oxidation is gain of oxygen or loss of hydrogen; reduction is loss of oxygen or gain of hydrogen.",
    ], [], 4),
  ],
};

function validate(data) {
  assert.equal(data.sections.length, 4, "Expected three chapter sections plus What you have learnt");
  data.sections.forEach((item, index) => {
    assert.equal(item.order, index + 1);
    assert.deepEqual(item.keywords, item.subsections.map((sub) => sub.subsection_name));
    if (item.subsections.length) assert.equal(item.section_content.length, 0, "Sections with subsections use About for introductory content");
    else assert(item.section_content.length > 0, "Explanation-only sections need content");
    item.subsections.forEach((sub, subIndex) => {
      assert.equal(sub.order, subIndex + 1);
      assert(sub.subsection_content.every((line, pointIndex) => line.startsWith(`${pointIndex + 1}. `)));
    });
  });
}

validate(chapter);
if (mode === "--validate") {
  console.log(JSON.stringify({ mode, chapter: chapter.chapter_name, sections: chapter.sections.length }, null, 2));
  process.exit(0);
}

if (!process.env.MONGO_URL) throw new Error("MONGO_URL is missing from server/.env");
await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 20_000 });
try {
  const classCandidates = await Class.find({ class_name: /^(?:class[_\\s-]*)?(?:10|10th|x)$/i }).lean();
  assert.equal(classCandidates.length, 1, "Expected exactly one Class 10 record");
  const classroom = classCandidates[0];
  const subjects = await Single_Subject.find({ class_of_subject: classroom._id, subject_name: /^chemistry$/i }).lean();
  assert.equal(subjects.length, 1, "Expected exactly one Chemistry subject for Class 10");
  const subject = subjects[0];
  const scope = { class_of_chapter: classroom._id, subject_of_chapter: subject._id };
  const matches = await Chapters.find({ ...scope, chapter_name: /^chemical reactions and equations$/i }).lean();
  assert(matches.length <= 1, "Duplicate Chemical Reactions and Equations chapters found");

  if (mode === "--dry-run") {
    console.log(JSON.stringify({ mode, className: classroom.class_name, subjectName: subject.subject_name, existingChapter: Boolean(matches[0]), sections: chapter.sections.length }, null, 2));
    process.exit(0);
  }

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      let target = matches[0] ? await Chapters.findById(matches[0]._id).session(session).orFail() : null;
      if (!target) target = new Chapters({ ...scope, chapter_name: chapter.chapter_name, sections: [], order: chapter.order });
      const existingSections = await Sections.find({ chapter_of_section: target._id }).session(session);
      if (existingSections.length) await Sections.deleteMany({ _id: { $in: existingSections.map((item) => item._id) } }).session(session);
      const created = await Sections.insertMany(chapter.sections.map((item) => ({
        ...item, chapter_of_section: target._id, subject_of_section: subject._id, class_of_section: classroom._id,
      })), { session });
      target.chapter_name = chapter.chapter_name;
      target.order = chapter.order;
      target.sections = created.map((item) => item._id);
      await target.save({ session });
      await Single_Subject.updateOne({ _id: subject._id }, { $addToSet: { chapters: target._id } }, { session });
    });
  } finally {
    await session.endSession();
  }
  const savedChapter = await Chapters.findOne({ ...scope, chapter_name: chapter.chapter_name }).lean();
  assert(savedChapter, "Stored chapter was not found after update");
  const savedSections = await Sections.find({ chapter_of_section: savedChapter._id }).sort({ order: 1 }).lean();
  assert.deepEqual(savedSections.map((item) => item.section_name), chapter.sections.map((item) => item.section_name), "Stored section names do not match");
  assert.deepEqual(savedSections.map((item) => item.keywords), chapter.sections.map((item) => item.keywords), "Stored subsection names do not match");
  console.log(JSON.stringify({ mode, chapter: chapter.chapter_name, applied: true, verified: true, sections: savedSections.length }, null, 2));
} finally {
  await mongoose.disconnect();
}
