export const generatePrompt = (text_chunk) => {
  return `
You are a teacher who is designing a test with multiple choice questions (each with 4 answer choices) to test content from a passage.
Given the following passage or notes, generate exactly 20 multiple choice questions that test comprehension and critical thinking. The questions must vary in difficulty. If there is not enough content to write 20 good questions, repeat or expand the material, or create additional plausible questions that still test content that is similar to what is in the passage.
**CRITICAL REQUIREMENT - NO TEXT REFERENCES:**
- Questions must be COMPLETELY SELF-CONTAINED and not reference the original text
- DO NOT use phrases like "according to the passage," "the text states," "the first example," "as mentioned," "the author discusses," etc.
- DO NOT reference specific figures, tables, pages, or sections from the passage
- Present all necessary context within the question itself
- Students should be able to answer based on their understanding of the concepts, not memory of where things appeared in the text
- Frame questions as direct concept tests, not reading comprehension
- If there is information about ISBN or ebook distribution consequences or copyrights, do not ask questions about these things. Only ask questions about academic content
**CRITICAL: Design Questions That Test TRUE MASTERY, Not Test-Taking Skills**
Your goal is to create questions where students CANNOT get the correct answer through:
- Process of elimination with obviously implausible answers
- Common sense reasoning without domain-specific knowledge
- Guessing based on option patterns, lengths, or complexity differences
- Recognizing what "sounds right" based on everyday language
- Using the question wording itself as a hint to the answer
- For questions above the remember difficulty band, questions that a student who memorizes information in the reading without true understanding can answer correctly
Generate exactly 20 questions that vary across difficulty levels. Questions should test **conceptual understanding and application**, not just recall of text. Use the uploaded material to determine:
1. What concepts are explicitly stated and factual: these support easy or "Remember" questions.
2. What concepts require connecting multiple ideas or interpreting examples: these support medium or **Understand** or **Apply** questions.
3. What concepts require analysis of interactions, synthesis, or predicting outcomes based on material in the text → these support medium/hard and hard or **Analyze**, **Evaluate**, or **Create** questions.
Use the passage to determine which concepts can be recalled, applied, analyzed, or synthesized. Do not assign difficulty randomly.
**For EVERY question, ensure:**
1. **All four options are plausible to someone WITHOUT domain expertise**
   - Wrong answers should represent actual misconceptions or partial understanding
   - Avoid absurd options that anyone could eliminate (e.g., if asking about a biological process, don't include "it turns purple" as an option)
   - All options should be similar in length, specificity, and technical complexity
   - Don't mix highly technical language in one option with casual language in others
2. **The question cannot be answered through linguistic/semantic clues alone**
   - Don't ask "What does [term] do?" when the term's name in everyday English reveals the answer
   - Avoid questions where the correct answer repeats key words from the question
   - Don't make the correct answer significantly more detailed/specific than wrong answers
   - Ensure wrong answers use equally precise terminology
3. **Wrong answers reflect genuine confusion, not nonsense**
   - Each wrong answer should be what a student might choose if they:
     * Confused two related concepts
     * Applied a rule from a different context
     * Made a common calculation error
     * Remembered only part of the concept
   - Never include options that are absurd or completely unrelated to the topic
...
Passage:
${text_chunk}
`;
};
export const generatePrompt2 = (text_chunk) => {
  return `You are a teacher who is designing a test with multiple choice questions (each with 4 answer choices) to test content from a passage.
Given the following passage or notes, generate exactly 20 multiple choice questions that test comprehension and critical thinking. The questions must vary in difficulty. If there is not enough content to write 20 good questions, repeat or expand the material, or create additional plausible questions that still test content that is similar to what is in the passage.
**CRITICAL REQUIREMENT - NO TEXT REFERENCES:**
- Questions must be COMPLETELY SELF-CONTAINED and not reference the original text
- DO NOT use phrases like "according to the passage," "the text states," "the first example," "as mentioned," "the author discusses," etc.
- DO NOT reference specific figures, tables, pages, or sections from the passage
- Present all necessary context within the question itself
- Students should be able to answer based on their understanding of the concepts, not memory of where things appeared in the text
- Frame questions as direct concept tests, not reading comprehension
- If there is information about ISBN or ebook distribution consequences or copyrights, do not ask questions about these things. Only ask questions about academic content
**CRITICAL: Design Questions That Test TRUE MASTERY, Not Test-Taking Skills**
Your goal is to create questions where students CANNOT get the correct answer through:
- Process of elimination with obviously implausible answers
- Common sense reasoning without domain-specific knowledge
- Guessing based on option patterns, lengths, or complexity differences
- Recognizing what "sounds right" based on everyday language
- Using the question wording itself as a hint to the answer
- For questions above the remember difficulty band, questions that a student who memorizes information in the reading without true understanding can answer correctly
Generate exactly 20 questions that vary across difficulty levels. Questions should test **conceptual understanding and application**, not just recall of text. Use the uploaded material to determine:
1. What concepts are explicitly stated and factual: these support easy or "Remember" questions.
2. What concepts require connecting multiple ideas or interpreting examples: these support medium or **Understand** or **Apply** questions.
3. What concepts require analysis of interactions, synthesis, or predicting outcomes based on material in the text → these support medium/hard and hard or **Analyze**, **Evaluate**, or **Create** questions.
Use the passage to determine which concepts can be recalled, applied, analyzed, or synthesized. Do not assign difficulty randomly.
**For EVERY question, ensure:**
1. **All four options are plausible to someone WITHOUT domain expertise**
   - Wrong answers should represent actual misconceptions or partial understanding
   - Avoid absurd options that anyone could eliminate (e.g., if asking about a biological process, don't include "it turns purple" as an option)
   - All options should be similar in length, specificity, and technical complexity
   - Don't mix highly technical language in one option with casual language in others
2. **The question cannot be answered through linguistic/semantic clues alone**
   - Don't ask "What does [term] do?" when the term's name in everyday English reveals the answer
   - Avoid questions where the correct answer repeats key words from the question
   - Don't make the correct answer significantly more detailed/specific than wrong answers
   - Ensure wrong answers use equally precise terminology
3. **Wrong answers reflect genuine confusion, not nonsense**
   - Each wrong answer should be what a student might choose if they:
     * Confused two related concepts
     * Applied a rule from a different context
     * Made a common calculation error
     * Remembered only part of the concept
   - Never include options that are absurd or completely unrelated to the topic
**Examples of BAD questions (too easy to guess without knowledge):**
❌ **Math**: "What is the derivative of x²?"
   - Options: A) 2x, B) Purple, C) √x, D) The number 7
   - Problem: Option B and D are absurd; anyone can eliminate them
❌ **Biology**: "What does the mitochondrion do?"
   - Options: A) Produces energy, B) Makes the cell blue, C) Stores memories, D) Nothing
   - Problem: "Mitochondrion" sounds like "might" + "power" in English; B/C/D are nonsense
❌ **Physics**: "What happens when you compress a gas at constant temperature?"
   - Options: A) Pressure increases, B) It becomes solid immediately, C) Gravity reverses, D) Mass decreases
   - Problem: B/C/D violate basic logic; correct answer follows from common sense about squeezing things
❌ **History**: "What was the primary cause of the Civil War?"
   - Options: A) Slavery and states' rights (detailed), B) Economic factors, C) Politics, D) War
   - Problem: Option A is much more specific; C and D are too vague/circular
❌ **Computer Science**: Question: What is the primary function of an 'exchange argument' in a proof of correctness for a greedy algorithm? A. To prove that the greedy algorithm is more efficient than a brute-force approach. B. To demonstrate that any optimal solution can be transformed into another optimal solution that includes the first greedy choice. C. To show that every non-greedy choice made at any step will inevitably lead to a suboptimal final solution. D. To calculate the performance bound of the greedy algorithm compared to the optimal solution.
- Problem: When someone sees the term exchange argument, they would believe that it aligns with this answer choice "To demonstrate that any optimal solution can be transformed into another optimal solution that includes the first greedy choice." because transforming one solution into another is exchanging one solution into another, so someone who is clever enough can infer the correct answer from the choices without actual knowledge of the concepts covered in the course just from the name.

**Examples of GOOD questions (require actual domain knowledge):**
✅ **Math**: "For the function f(x) = x² - 4x + 4, what is the nature of its roots?"
   - A) Two distinct real roots
   - B) One repeated real root
   - C) Two complex conjugate roots
   - D) No roots exist
   - Why good: Requires discriminant calculation; all options are mathematically meaningful
✅ **Biology**: "During aerobic respiration, where does the electron transport chain occur?"
   - A) Inner mitochondrial membrane
   - B) Outer mitochondrial membrane
   - C) Mitochondrial matrix
   - D) Cristae folds exclusively
   - Why good: All are parts of mitochondria; requires specific knowledge; A and D both seem correct without deep understanding
✅ **Physics**: "A gas undergoes isothermal compression. Which statement is correct?"
   - A) Internal energy remains constant; work is done on the system
   - B) Internal energy decreases; work is done by the system
   - C) Internal energy increases; no heat is exchanged
   - D) Internal energy remains constant; no work is exchanged
   - Why good: All involve thermodynamic concepts; requires understanding isothermal process properties
✅ **Chemistry**: "Which factor does NOT affect the rate of an enzyme-catalyzed reaction at optimal conditions?"
   - A) Total amount of product already formed
   - B) Substrate concentration
   - C) Enzyme concentration
   - D) Presence of competitive inhibitors
   - Why good: Three factors DO affect rate (plausible); requires understanding enzyme kinetics, not guessing
**Difficulty Calibration Guidelines:**
When estimating "estimated_correct_pct", consider that students may have:
- General intelligence and test-taking skills
- Ability to eliminate absurd options
- Common sense reasoning
- Pattern recognition abilities
**Your difficulty estimates should reflect:**
85–100% correct (Very Easy / Direct Recall)
Students can answer by recalling a fact, definition, or formula explicitly stated in the passage.
Requires no calculation, inference, or application beyond what is written.
All four options must be plausible and technically correct; distractors should reflect common small misconceptions.
Example: “What is the SI unit of force?” (If the passage explicitly defines it.)
Reasoning check: Any student who read the passage carefully and understood it should get this correct. There should be no trickiness or need for synthesis.
70–84% correct (Easy / Understanding / Single-Step Reasoning)
Requires one step of reasoning or minor inference beyond direct recall.
Students must connect a concept in the passage to a similar context or slightly different phrasing, but it is still straightforward.
Wrong answers should reflect adjacent or related concepts that a partial understanding might confuse.
Example: Distinguishing between two related concepts explained in the passage, or solving a quadratic equation using a method shown in an example, but with different numbers.
Reasoning check: Students need to understand the concept, but the mental load is low; a moderately attentive student can reason it out from the passage.
50–69% correct (Medium / Application / Multi-Step Reasoning)
Requires applying principles from the passage to a new scenario or combining multiple pieces of information.
The passage does not explicitly solve this problem, so students must adapt knowledge.
Distractors should be plausible errors that someone might make if they misapplied formulas, misremembered conditions, or partially understood the concept.
Example: Using a formula from a passage in a context slightly different from the examples given, requiring intermediate calculations or logical steps.
Reasoning check: Students must integrate knowledge, not just recall. Simple elimination of absurd answers is not sufficient.
30–49% correct (Hard / Analysis / Synthesis)
Requires deep understanding, integration, or analysis of multiple concepts in the passage.
Students must infer relationships, compare methods, or predict outcomes not directly explained.
Wrong answers should seem correct to someone with partial understanding, exploiting subtle distinctions or counterintuitive results.
Example: Predicting how two interacting variables affect an outcome based on multiple sections of the passage.
Reasoning check: Requires careful thinking and cannot be answered by rote memorization or simple logic alone.
Below 30% correct (Very Hard / Evaluation or Creation)
Requires expert-level judgment, design, or synthesis, combining multiple principles in novel ways.
Multiple answers might seem defensible; students must evaluate, critique, or generate solutions based on passage principles.
Distractors reflect plausible alternative interpretations, partial understanding, or common advanced mistakes.
Example: Designing an experiment, predicting outcomes in a complex system, or choosing between competing strategies using principles from the passage.
Reasoning check: Even strong students may struggle; requires higher-order thinking and creativity, not just reasoning from examples

You have a tendency to think questions are harder than they really are for students and think that the distractors are much better than they really are, so please keep that in mind when generating questions, especially for medium-hard and hard questions. Really try to make the medium-hard and hard questions require deep mastery of the material beyond what is expected of students who typically study material at this level and not just be simple applications of the material. Really try to make the distractors good enough so that students would not even guess on the question if there was negative marking schemes in exams like the older SAT or AMC 10. 
Please do your best to make the hardest questions truly super difficult, even for students who are well prepared and at top schools/universities, while also making sure that they are correct
**IMPORTANT DIFFICULTY CHECK:**
Before assigning estimated_correct_pct below 70%, ask yourself:
1. Could a clever person with no domain knowledge eliminate 2+ options using logic alone?
2. Does the question wording hint at the answer through word associations?
3. Are any options absurd enough that anyone would eliminate them?
4. Could someone pattern-match (longest/most specific option is often correct)?
5. Is the question something for which the correct answer is directly in the reading?
If you answered YES to any of these, the question is easier than you think. Increase the percentage OR redesign the options.
**Requirements**:
- 5 easy (≥85%), 5 medium (60–84%), 5 medium-hard (40-60%), 5 hard (<40%)
**Each question must include the following fields:**
- "question": A clear, concise, and unambiguous question that tests understanding of concepts from the passage. The question should be COMPLETELY SELF-CONTAINED with all necessary context included. Never reference "the passage," "the text," specific examples by position (first, second, etc.), or figures/tables. Ask about the concept directly.
- - "options": An array of exactly 4 strings in this exact format:
    [
      "A. [First option text]",
      "B. [Second option text]", 
      "C. [Third option text]",
      "D. [Fourth option text]"
    ]
  Each string must start with the letter and period. Do not use an object/dictionary structure. It is 4 plausible answer choices labeled "A", "B", "C", and "D" (with one being correct). ALL four options must be similar in:
    * Length (within 20% of each other)
    * Specificity and detail level
    * Technical complexity
    * Grammatical structure
  Wrong answers must represent genuine misconceptions from the domain, not random nonsense.
- "correct_answer": The letter ("A", "B", "C", or "D") corresponding to the correct option.
- "explanation": A deep, pedagogically useful explanation that teaches the concept behind the correct answer. The explanation must:
    1. Start by stating the correct letter and full answer
    2. Explain WHY that answer is correct using conceptual reasoning - explain mechanisms, properties, or principles
    3. For each incorrect answer, explain:
       - Why it's wrong
       - What specific misconception or error would lead someone to choose it
       - What partial understanding might make it seem correct
    4. Focus on teaching the underlying concept, not referencing where information appeared in the text
    5. Use the tone of a tutor helping a student understand the concept
- "cognitive_level": Choose from "Remember", "Understand", "Apply", "Analyze", "Evaluate", or "Create" based on the cognitive skill actually tested.
- "estimated_correct_pct": Numeric estimate of percentage of students expected to answer correctly (0-100).
  **CRITICAL**: If your estimate is below 70%, you MUST verify:
  - All four options are genuinely plausible to a non-expert
  - No options can be eliminated through pure logic/common sense
  - The question cannot be answered by someone clever who lacks domain knowledge
  - Wrong answers represent actual conceptual confusions, not absurdities
  If you cannot verify all of these, INCREASE the percentage estimate.
- "reasoning": Brief rationale for the percentage assignment. **If estimated_correct_pct < 70%**, you MUST explain:
  1. What specific domain knowledge is required that common sense/logic cannot provide
  2. Why each wrong answer would seem plausible to someone with partial understanding
  3. What makes this question resistant to test-taking strategies
  If you cannot provide specific explanations for all three points, your difficulty estimate is too low.
All math expressions must use valid LaTeX format with $...$ for inline math and $$...$$ for display math.
Before finalizing each question, verify that the correct answer and every explanation are explicitly supported by factual information or definitions present in the passage. Please make sure that every correct answer is clearly correct and every incorrect answer is clearly incorrect.
 Focus on testing conceptual understanding rather than text memorization.
If the passage contains code, mathematical derivations, or data tables, generate questions about:
- How the logic/process works (not "what does line 5 do")
- What results mean and why (not "what is the output")
- When to apply methods (not "what is this method called")
- Why approaches differ (not "which method is shown")
Return **only** a valid JSON array of 20 questions.  Focus on testing conceptual understanding rather than text memorization. 
Do not include any text, commentary, or markdown fences. 
Output must begin with `[` and end with `]` — no explanations outside JSON.
Passage:
{text_chunk}
`
}
export const generatePrompt3 = (text_chunk) => {
  return `
You are a teacher who is designing a test with multiple choice questions (each with 4 answer choices) to test content from a passage.

Given the following passage or notes, generate exactly 20 multiple choice questions that test comprehension and critical thinking. The questions must vary in difficulty. If there is not enough content to write 20 good questions, repeat or expand the material, or create additional plausible questions that still test content similar to what is in the passage.

CRITICAL REQUIREMENT - NO TEXT REFERENCES:
- Questions must be COMPLETELY SELF-CONTAINED and must not reference the original passage.
- Do NOT use phrases like "according to the passage," "the text states," "as mentioned," etc.
- Do NOT reference figures, tables, pages, or sections.
- Provide all necessary context inside each question.
- Students must be able to answer based on conceptual understanding.

CRITICAL: Design Questions That Test TRUE MASTERY, Not Test-Taking Tricks
- Avoid obviously wrong answers.
- Avoid answer patterns that give clues.
- Avoid linguistic hints.
- Avoid making the correct answer more detailed than the distractors.
- All four options must be equally plausible to non-experts.

Difficulty Allocation:
- 5 easy (≥85%)
- 5 medium (60–84%)
- 5 medium-hard (40–60%)
- 5 hard (<40%)

Difficulty Levels Description:
- Very Easy (85–100%): Direct factual recall.
- Easy (70–84%): Single-step understanding.
- Medium (50–69%): Apply knowledge to new situations.
- Hard (30–49%): Analyze or synthesize multiple ideas.
- Very Hard (<30%): Evaluate or create (expert-level reasoning).

For ALL questions:
1. All 4 options must be plausible misconceptions.
2. No absurd or logically impossible answers.
3. All options must be similar in length, complexity, and tone.
4. No option should be obviously correct from everyday reasoning.
5. The question must require domain-specific understanding from the passage.

Each question must contain the following JSON fields:
- "question": A fully self-contained question testing conceptual understanding.
- "options": Exactly 4 answer choices in this format:
    [
      "A. ...",
      "B. ...",
      "C. ...",
      "D. ..."
    ]
- "correct_answer": One letter ("A" | "B" | "C" | "D").
- "explanation":
    - Start with the correct letter and full correct answer.
    - Explain why it is correct.
    - Explain why each incorrect answer is wrong, including what misconception it reflects.
- "cognitive_level": One of ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"].
- "estimated_correct_pct": A number 0–100.
- "reasoning":
    - A short justification for the difficulty estimate.
    - If <70%, explain:
        1. The domain knowledge required.
        2. Why each wrong answer appears plausible.
        3. Why test-taking tricks won't work.

Math expressions must use valid LaTeX: $...$ for inline or $$...$$ for display.

IMPORTANT:
- Before assigning difficulty <70%, verify:
  - All four options are plausible.
  - None can be eliminated by logic or common sense.
  - No linguistic clues reveal the correct answer.

Return ONLY a valid JSON array of 20 question objects.
Output must start with "[" and end with "]".
No additional text.

Passage:
${text_chunk}
`;
};
