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
const subsection = (subsection_name, items, order) => ({ subsection_name, subsection_content: points(items), order });
const section = (section_name, section_content, subsections, order) => ({
  section_name, section_content: points(section_content), keywords: subsections.map((item) => item.subsection_name), subsections, order,
});

const chapter = {
  chapter_name: "Acids, Bases and Salts",
  order: 2,
  sections: [
    section("UNDERSTANDING THE CHEMICAL PROPERTIES OF ACIDS AND BASES", [], [
      subsection("Acids and Bases in the Laboratory", ["Acids are sour and turn blue litmus red, while bases are bitter and turn red litmus blue.", "Litmus, turmeric, phenolphthalein and methyl orange indicate acids and bases by colour change.", "Onion, vanilla and clove are olfactory indicators because their odour changes in acidic or basic media."], 1),
      subsection("How do Acids and Bases React with Metals?", ["Acids react with metals such as zinc to form a salt and hydrogen gas.", "Hydrogen forms bubbles in soap solution and burns with a pop sound.", "Zinc also reacts with sodium hydroxide to form sodium zincate and hydrogen gas."], 2),
      subsection("How do Metal Carbonates and Metal Hydrogencarbonates React with Acids?", ["Metal carbonates and hydrogencarbonates react with acids to form salt, carbon dioxide and water.", "Carbon dioxide turns lime water milky due to calcium carbonate formation.", "Excess carbon dioxide dissolves calcium carbonate to form soluble calcium hydrogencarbonate."], 3),
      subsection("How do Acids and Bases React with each other?", ["An acid and a base cancel each other's effects.", "Their reaction forms salt and water.", "This reaction is called neutralisation."], 4),
      subsection("Reaction of Metallic Oxides with Acids", ["Metallic oxides react with acids to form salt and water.", "Copper oxide reacts with hydrochloric acid to form blue-green copper(II) chloride solution.", "Metallic oxides are basic oxides."], 5),
      subsection("Reaction of a Non-metallic Oxide with Base", ["Carbon dioxide reacts with calcium hydroxide to form salt and water.", "Non-metallic oxides are acidic in nature."], 6),
    ], 1),
    section("WHAT DO ALL ACIDS AND ALL BASES HAVE IN COMMON?", [], [
      subsection("About", ["Acids have similar chemical properties because they form hydrogen ions in water.", "Acid solutions conduct electricity because ions carry electric current.", "Glucose and alcohol contain hydrogen but do not produce ions or show acidic behaviour."], 1),
      subsection("What Happens to an Acid or a Base in a Water Solution?", ["Hydrogen ions are produced from acids only in the presence of water.", "Hydrogen ions combine with water molecules to form hydronium ions.", "Bases generate hydroxide ions in water, and water-soluble bases are called alkalis.", "Mixing concentrated acids or bases with water is highly exothermic.", "Adding acid slowly to water prevents splashing and burns.", "Dilution decreases the concentration of hydronium or hydroxide ions per unit volume."], 2),
    ], 2),
    section("HOW STRONG ARE ACID OR BASE SOLUTIONS?", [], [
      subsection("About", ["Universal indicator shows different colours at different hydrogen ion concentrations.", "The pH scale runs from 0 to 14 and indicates the acidic or basic nature of a solution.", "A neutral solution has pH 7; acids have pH below 7 and bases have pH above 7.", "Higher hydronium ion concentration gives a lower pH value.", "Strong acids and bases produce more hydrogen ions and hydroxide ions respectively."], 1),
      subsection("Importance of pH in Everyday Life", ["Living organisms and plants need a suitable pH range for healthy survival and growth.", "Rainwater with pH below 5.6 is acid rain and can harm aquatic life.", "Antacids such as magnesium hydroxide neutralise excess stomach acid.", "Tooth decay begins when mouth pH falls below 5.5; basic toothpaste neutralises acids.", "Baking soda gives relief from acidic bee stings, while nettle stings contain methanoic acid."], 2),
    ], 3),
    section("MORE ABOUT SALTS", [], [
      subsection("About", ["Salts are formed in reactions including neutralisation.", "Their preparation, properties and uses are important in daily life."], 1),
      subsection("Family of Salts", ["Salts with the same positive or negative radical belong to a family.", "Sodium chloride and sodium sulphate are sodium salts.", "Sodium chloride and potassium chloride are chloride salts."], 2),
      subsection("pH of Salts", ["Salts of a strong acid and strong base are neutral with pH 7.", "Salts of a strong acid and weak base are acidic with pH below 7.", "Salts of a strong base and weak acid are basic with pH above 7."], 3),
      subsection("Chemicals from Common Salt", ["Common salt is sodium chloride, formed from hydrochloric acid and sodium hydroxide.", "Sodium chloride is obtained from seawater and rock salt deposits.", "Common salt is a raw material for sodium hydroxide, baking soda, washing soda and bleaching powder."], 4),
      subsection("Sodium hydroxide", ["Electrolysis of brine produces sodium hydroxide, chlorine and hydrogen.", "This is called the chlor-alkali process.", "Chlorine is released at the anode, hydrogen at the cathode, and sodium hydroxide forms near the cathode."], 5),
      subsection("Bleaching powder", ["Bleaching powder is produced by passing chlorine over dry slaked lime.", "It is used to bleach textiles, wood pulp and washed clothes.", "It acts as an oxidising agent and disinfects drinking water."], 6),
      subsection("Baking soda", ["Baking soda is sodium hydrogencarbonate and is a mild, non-corrosive basic salt.", "On heating, it forms sodium carbonate, water and carbon dioxide.", "It is used in baking powder, antacids and soda-acid fire extinguishers."], 7),
      subsection("Washing soda", ["Washing soda is sodium carbonate decahydrate.", "It is obtained by recrystallising sodium carbonate.", "It is used in glass, soap and paper industries, as a cleaning agent, and to remove permanent hardness of water."], 8),
      subsection("Are the Crystals of Salts really Dry?", ["Some salts contain a fixed number of water molecules called water of crystallisation.", "Heating hydrated copper sulphate removes water of crystallisation and changes blue crystals to white.", "Adding water restores the blue colour of copper sulphate crystals."], 9),
      subsection("Plaster of Paris", ["Heating gypsum at 373 K forms calcium sulphate hemihydrate, called Plaster of Paris.", "When mixed with water, Plaster of Paris changes back to gypsum and hardens.", "It is used to support fractured bones and to make toys, decorations and smooth surfaces."], 10),
    ], 4),
    section("What you have learnt", ["Acid-base indicators identify the presence of acids and bases.", "Acids form H⁺ ions and bases form OH⁻ ions in aqueous solution.", "Acids react with metals to form salt and hydrogen gas.", "Acids react with metal carbonates or hydrogencarbonates to form salt, carbon dioxide and water.", "Acids and bases neutralise each other to form salt and water.", "The pH scale measures hydrogen ion concentration from 0 to 14.", "Water of crystallisation is the fixed number of water molecules in one formula unit of a salt."], [], 5),
  ],
};

function validate(data) {
  assert.equal(data.sections.length, 5, "Expected five chapter sections");
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
if (mode === "--validate") { console.log(JSON.stringify({ mode, chapter: chapter.chapter_name, sections: chapter.sections.length }, null, 2)); process.exit(0); }
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
  const matches = await Chapters.find({ ...scope, chapter_name: /^acids, bases and salts$/i }).lean();
  assert(matches.length <= 1, "Duplicate Acids, Bases and Salts chapters found");
  if (mode === "--dry-run") { console.log(JSON.stringify({ mode, className: classroom.class_name, subjectName: subject.subject_name, existingChapter: Boolean(matches[0]), sections: chapter.sections.length }, null, 2)); process.exit(0); }
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      let target = matches[0] ? await Chapters.findById(matches[0]._id).session(session).orFail() : null;
      if (!target) target = new Chapters({ ...scope, chapter_name: chapter.chapter_name, sections: [], order: chapter.order });
      const existingSections = await Sections.find({ chapter_of_section: target._id }).session(session);
      if (existingSections.length) await Sections.deleteMany({ _id: { $in: existingSections.map((item) => item._id) } }).session(session);
      const created = await Sections.insertMany(chapter.sections.map((item) => ({ ...item, chapter_of_section: target._id, subject_of_section: subject._id, class_of_section: classroom._id })), { session });
      target.chapter_name = chapter.chapter_name; target.order = chapter.order; target.sections = created.map((item) => item._id);
      await target.save({ session });
      await Single_Subject.updateOne({ _id: subject._id }, { $addToSet: { chapters: target._id } }, { session });
    });
  } finally { await session.endSession(); }
  const savedChapter = await Chapters.findOne({ ...scope, chapter_name: chapter.chapter_name }).lean();
  assert(savedChapter, "Stored chapter was not found after update");
  const savedSections = await Sections.find({ chapter_of_section: savedChapter._id }).sort({ order: 1 }).lean();
  assert.deepEqual(savedSections.map((item) => item.section_name), chapter.sections.map((item) => item.section_name));
  assert.deepEqual(savedSections.map((item) => item.keywords), chapter.sections.map((item) => item.keywords));
  console.log(JSON.stringify({ mode, chapter: chapter.chapter_name, applied: true, verified: true, sections: savedSections.length }, null, 2));
} finally { await mongoose.disconnect(); }
