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
assert([...args].every((arg) => ["--validate", "--dry-run", "--apply"].includes(arg)), "Unknown argument");
assert(args.size <= 1, "Choose only one mode");
const mode = [...args][0] || "--validate";

const points = (items) => items.map((item, index) => `${index + 1}. ${item}`);
const subsection = (subsection_name, items, order) => ({ subsection_name, subsection_content: points(items), order });
const section = (section_name, content, subsections, order) => ({
  section_name,
  section_content: points(content),
  keywords: subsections.map((item) => item.subsection_name),
  subsections,
  order,
});

const chapter = {
  chapter_name: "Metals and Non-metals",
  order: 3,
  sections: [
    section("PHYSICAL PROPERTIES", [], [
      subsection("About", ["Metals and non-metals can be compared using their physical properties.", "Physical properties alone cannot classify every element because some elements are exceptions."], 1),
      subsection("Metals", ["Pure metals have a shining surface called metallic lustre.", "Metals are generally hard, malleable and ductile.", "They are good conductors of heat and electricity and are sonorous.", "Most metals have high melting points; mercury is liquid at room temperature."], 2),
      subsection("Non-metals", ["Non-metals include carbon, sulphur, iodine, oxygen and hydrogen.", "They occur as solids or gases; bromine is a liquid.", "Iodine is lustrous, diamond is very hard, and graphite conducts electricity."], 3),
    ], 1),
    section("CHEMICAL PROPERTIES OF METALS", [], [
      subsection("About", ["Most metals form basic oxides, whereas most non-metals form acidic oxides in water.", "Chemical properties give a clearer basis for classifying metals and non-metals."], 1),
      subsection("What happens when Metals are burnt in Air?", ["Metals combine with oxygen to form metal oxides.", "Most metal oxides are basic; aluminium oxide and zinc oxide are amphoteric.", "Potassium and sodium react vigorously with oxygen and are stored in kerosene.", "Aluminium develops a protective oxide layer; silver and gold do not react with oxygen even at high temperature."], 2),
      subsection("What happens when Metals react with Water?", ["Metals can react with water to form metal oxides or hydroxides and hydrogen gas.", "Potassium and sodium react violently with cold water, while calcium reacts less violently.", "Magnesium reacts with hot water; aluminium, zinc and iron react with steam.", "Lead, copper, silver and gold do not react with water."], 3),
      subsection("What happens when Metals react with Acids?", ["Metals above hydrogen in the activity series react with dilute acids to form salt and hydrogen gas.", "Copper, mercury, silver and gold do not displace hydrogen from dilute acids.", "Nitric acid usually does not give hydrogen with metals because it is a strong oxidising agent."], 4),
      subsection("How do Metals react with Solutions of other Metal Salts?", ["A more reactive metal displaces a less reactive metal from its salt solution.", "Copper displaces silver from silver nitrate solution.", "Zinc displaces iron from iron sulphate solution."], 5),
      subsection("The Reactivity Series", ["The reactivity series arranges metals in decreasing order of reactivity.", "It predicts reactions with water and acids and displacement from salt solutions.", "Potassium is highly reactive, while gold is among the least reactive metals."], 6),
    ], 2),
    section("HOW DO METALS AND NON-METALS REACT?", [], [
      subsection("About", ["Atoms react to obtain a completely filled valence shell.", "Metals lose electrons to form positive ions and non-metals gain electrons to form negative ions.", "Oppositely charged ions attract strongly to form ionic or electrovalent compounds.", "Sodium chloride and magnesium chloride form by transfer of electrons from metals to chlorine."], 1),
      subsection("Properties of Ionic Compounds", ["Ionic compounds are generally hard solids with high melting and boiling points.", "They are generally soluble in water and insoluble in kerosene and petrol.", "They conduct electricity in molten state or aqueous solution, but not in solid state because ions cannot move freely."], 2),
    ], 3),
    section("OCCURRENCE OF METALS", [], [
      subsection("About", ["The earth's crust is the main source of metals, and seawater contains soluble salts.", "Naturally occurring elements or compounds are minerals; minerals from which metal can be extracted profitably are ores."], 1),
      subsection("Extraction of Metals", ["Low-reactivity metals can occur in the free state, whereas highly reactive metals occur as compounds.", "The method of extraction depends on a metal's position in the activity series.", "High-reactivity metals are extracted by electrolysis, medium-reactivity metals by reduction with carbon, and low-reactivity metals may be found native."], 2),
      subsection("Enrichment of Ores", ["Ores contain unwanted impurities called gangue, such as soil and sand.", "Gangue is removed before extraction using differences in the physical or chemical properties of ore and impurities."], 3),
      subsection("Extracting Metals Low in the Activity Series", ["Oxides of very unreactive metals can be reduced by heating alone.", "Mercury is obtained by heating cinnabar, and copper can be obtained from copper sulphide by heating in air."], 4),
      subsection("Extracting Metals in the Middle of the Activity Series", ["Sulphide ores are converted to oxides by roasting in excess air; carbonate ores are converted by calcination in limited air.", "Metal oxides are reduced using carbon or another suitable reducing agent.", "The thermit reaction uses aluminium to reduce iron(III) oxide and is used to join railway tracks."], 5),
      subsection("Extracting Metals towards the Top of the Activity Series", ["Highly reactive metals cannot be extracted by reducing their compounds with carbon.", "Sodium, magnesium and calcium are obtained by electrolysis of molten chlorides.", "Aluminium is obtained by electrolytic reduction of aluminium oxide."], 6),
      subsection("Refining of Metals", ["Metals obtained by reduction contain impurities and need refining.", "In electrolytic refining, impure metal is the anode and pure metal is the cathode.", "Pure metal deposits on the cathode, while insoluble impurities collect as anode mud."], 7),
    ], 4),
    section("CORROSION", [], [
      subsection("About", ["Corrosion is the damage of metals by substances in their surroundings.", "Silver blackens due to silver sulphide, copper develops a green coating, and iron forms rust in moist air.", "Iron rusts only when both water and air are present."], 1),
      subsection("Prevention of Corrosion", ["Iron can be protected by painting, oiling, greasing, galvanising, chrome plating, anodising or alloying.", "Galvanisation protects steel and iron with a thin zinc coating.", "Alloys are homogeneous mixtures of metals, or of a metal and a non-metal, made to improve properties.", "Stainless steel is an alloy of iron, nickel and chromium that resists rusting."], 2),
    ], 5),
    section("What you have learnt", ["Metals are lustrous, malleable, ductile and good conductors, while non-metals usually have opposite physical properties.", "Metals form positive ions by losing electrons; non-metals form negative ions by gaining electrons.", "A more reactive metal displaces a less reactive metal from its salt solution.", "Metallurgy includes extraction of metals from ores and their refining.", "An alloy is a homogeneous mixture of metals, or of a metal and a non-metal.", "Corrosion is the damage of metals exposed to moist air or other substances."], [], 6),
  ],
};

function validate(data) {
  assert.equal(data.sections.length, 6, "Expected six chapter sections");
  data.sections.forEach((item, index) => {
    assert.equal(item.order, index + 1);
    assert.deepEqual(item.keywords, item.subsections.map((sub) => sub.subsection_name));
    if (item.subsections.length) assert.equal(item.section_content.length, 0, "Sections with subsections must use About");
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
  const matches = await Chapters.find({ ...scope, chapter_name: /^metals and non-metals$/i }).lean();
  assert(matches.length <= 1, "Duplicate Metals and Non-metals chapters found");

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
      const created = await Sections.insertMany(chapter.sections.map((item) => ({ ...item, chapter_of_section: target._id, subject_of_section: subject._id, class_of_section: classroom._id })), { session });
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
  assert.deepEqual(savedSections.map((item) => item.section_name), chapter.sections.map((item) => item.section_name));
  assert.deepEqual(savedSections.map((item) => item.keywords), chapter.sections.map((item) => item.keywords));
  console.log(JSON.stringify({ mode, chapter: chapter.chapter_name, applied: true, verified: true, sections: savedSections.length }, null, 2));
} finally {
  await mongoose.disconnect();
}
