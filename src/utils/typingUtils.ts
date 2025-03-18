export type TypingStatus = 'idle' | 'running' | 'finished';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  time: number;
}

export interface TypingLesson {
  id: string;
  title: string;
  description: string;
  text: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  type?: string;
}

export interface TypingSettings {
  textSelection: 'random' | 'sequential' | 'difficulty';
  textType: 'all' | 'lyrics' | 'quotes' | 'code' | 'prose' | 'book' | 'facts' | 'pangrams' | 'words' | 'proverbs' | 'custom';
  testTime: '30sec' | '1min' | '2min' | '3min' | '5min' | '10min' | '15min' | '20min';
  textColorHighlighting: 'normal' | 'enhanced' | 'none';
  testResetHotkey: 'all' | 'shift-enter' | 'ctrl-space' | 'ctrl-enter' | 'disabled';
  phaseShiftCorrection: boolean;
  doubleSpacingBetweenSentences: boolean;
  keyboardLayout: 'qwerty' | 'qwerty-uk' | 'dvorak' | 'colemak' | 'colemak-uk' | 'azerty' | 'qwertz' | 'qwertz-sf' | 'numpad';
}

export const defaultTypingSettings: TypingSettings = {
  textSelection: 'random',
  textType: 'all',
  testTime: '1min',
  textColorHighlighting: 'normal',
  testResetHotkey: 'all',
  phaseShiftCorrection: true,
  doubleSpacingBetweenSentences: false,
  keyboardLayout: 'qwerty'
};

export const calculateWPM = (
  totalTypedChars: number,
  correctChars: number,
  elapsedTimeInSeconds: number
): number => {
  // The standard formula: (characters typed / 5) / (time in minutes)
  // We use net WPM which accounts for errors: (all typed characters - errors) / 5 / time(min)
  const minutes = elapsedTimeInSeconds / 60;
  if (minutes === 0) return 0;
  
  // Using the standard word length of 5 characters
  return Math.round((correctChars / 5) / minutes);
};

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

export const longPracticeText = `
When contemplating the vast expanse of human knowledge and understanding, one cannot help but marvel at the intricate tapestry of interconnected disciplines that collectively form the foundation of our intellectual heritage. From the earliest civilizations that dotted the fertile crescents of ancient Mesopotamia and the Nile Valley to the bustling metropolises of the modern era, humanity has demonstrated an insatiable curiosity about the world and its mysteries. This inherent drive to explore, discover, and comprehend has propelled our species forward, enabling us to transcend the limitations imposed by our physical form and harness the power of abstract thought to reshape our environment and social structures.

The journey of human understanding began with simple observations of natural phenomena, gradually evolving into sophisticated theoretical frameworks that explain complex interactions between matter, energy, and consciousness. Early philosophers sought to understand the fundamental nature of reality, pondering questions about existence, knowledge, ethics, and the mind. Their contemplations laid the groundwork for systematic inquiry, eventually branching into distinct fields of study that would later become the sciences, humanities, and arts that we recognize today.

The ancient Greeks, particularly thinkers like Socrates, Plato, and Aristotle, contributed immensely to this intellectual evolution, establishing logical methods of inquiry and debate that would influence scholarly discourse for millennia. Their approach to questioning assumptions and rigorously examining ideas became the cornerstone of Western philosophical tradition, emphasizing the importance of rational thought in unraveling the complexities of the universe.

As civilizations flourished and declined, knowledge was preserved, transmitted, and transformed across cultural boundaries. The great libraries of Alexandria, Baghdad, and Timbuktu served as repositories of human wisdom, safeguarding texts on mathematics, astronomy, medicine, literature, and countless other subjects. Scholars from diverse backgrounds converged in these centers of learning, exchanging ideas and building upon the discoveries of their predecessors.

The Renaissance marked a pivotal moment in the history of human thought, characterized by a renewed interest in classical learning and a surge of innovation in arts and sciences. Visionaries like Leonardo da Vinci embodied the Renaissance ideal of the polymath, excelling in multiple disciplines and demonstrating the interconnectedness of different fields of knowledge. This period witnessed groundbreaking achievements in anatomy, physics, astronomy, and visual arts, forever changing our understanding of the natural world and our place within it.

The Scientific Revolution of the 16th and 17th centuries further transformed the intellectual landscape, introducing empirical methods and experimental approaches to the pursuit of knowledge. Figures like Galileo Galilei, Isaac Newton, and Johannes Kepler developed mathematical models to describe natural phenomena, establishing principles that would form the basis of classical physics. Their work demonstrated the power of quantitative analysis and predictive theories, setting the stage for the technological advancements that would define the modern era.

The Age of Enlightenment expanded upon these foundations, championing reason, skepticism, and individual liberty as guiding principles for social and political organization. Enlightenment thinkers questioned traditional authority and advocated for the separation of church and state, promoting ideals that would inspire democratic movements worldwide. Their emphasis on universal human rights and the potential for societal progress continues to resonate in contemporary discussions about justice, equality, and governance.

The Industrial Revolution marked another watershed moment, as theoretical knowledge was applied to develop machinery and manufacturing processes that would dramatically increase productivity and transform economic systems. Steam engines, power looms, and other innovations revolutionized production capabilities, setting in motion socioeconomic changes that would reshape communities and nations. This period highlighted the practical applications of scientific understanding, demonstrating how abstract theories could be translated into tangible technologies with profound implications for daily life.

The 20th century witnessed unprecedented scientific breakthroughs, from Einstein's theory of relativity to the discovery of quantum mechanics, challenging our most fundamental assumptions about space, time, and causality. The elucidation of DNA's structure by Watson and Crick revealed the molecular basis of heredity, inaugurating the age of molecular biology and genetic engineering. Concurrently, the development of digital computing technologies established new paradigms for information processing and communication, laying the groundwork for the digital revolution that continues to transform every aspect of contemporary society.

In the humanities and social sciences, scholars have explored the complexities of human experience, examining languages, cultures, histories, and social systems to gain insights into our collective past and present. Literary analysis, historical research, anthropological investigations, and sociological studies have enriched our understanding of cultural diversity and social dynamics, highlighting both the universal aspects of human nature and the remarkable variations in how communities organize themselves and create meaning.

The arts, from visual expressions to musical compositions, literature, and performance, have served as vehicles for emotional and aesthetic exploration, allowing individuals to communicate profound truths that transcend the limitations of ordinary language. Creative works reflect the values, anxieties, and aspirations of their times while also pushing boundaries and challenging conventional perspectives. Through artistic expression, humans have documented their lived experiences, imagined alternative possibilities, and found solace in beauty amid the trials of existence.

Philosophy continues to evolve, addressing emerging questions about technology, bioethics, environmental responsibility, and global governance. Contemporary philosophers engage with issues arising from scientific advances, cultural shifts, and geopolitical changes, offering conceptual frameworks for navigating complex moral dilemmas and existential challenges. Their work reminds us that despite our technological sophistication, fundamental questions about purpose, value, and meaning remain central to the human condition.

Education serves as the primary mechanism for transmitting accumulated knowledge to new generations, equipping young minds with the tools to understand their heritage and contribute to ongoing intellectual endeavors. Educational systems worldwide face the daunting task of balancing breadth and depth, ensuring students acquire both specialized expertise and the integrative thinking necessary to address multifaceted problems. In an era of information abundance, cultivating critical thinking skills and discernment becomes increasingly vital.

The digital age has transformed how knowledge is created, stored, and shared, democratizing access to information while also presenting new challenges related to information quality, privacy, and digital divide issues. Online resources, virtual learning environments, and collaborative platforms have expanded educational opportunities beyond traditional institutional boundaries, allowing self-directed learners to explore topics of interest regardless of geographical location or formal credentials.

Scientific research continues to push the frontiers of understanding, from the subatomic realm to the cosmic scale. Discoveries in particle physics probe the fundamental constituents of matter, while astrophysical observations reveal the vastness and complexity of our universe. Neuroscience investigates the biological basis of consciousness and cognition, offering insights into the most mysterious aspects of human experience. Environmental sciences document the interconnected systems that sustain life on Earth, informing efforts to address ecological challenges and promote sustainability.

Technological innovation proceeds at an accelerating pace, with artificial intelligence, biotechnology, nanotechnology, and renewable energy solutions promising to address longstanding problems while potentially creating new ethical dilemmas. The development of machine learning algorithms capable of recognizing patterns in massive datasets has enabled breakthroughs in various fields, from medical diagnostics to climate modeling. Genetic engineering techniques like CRISPR offer unprecedented precision in modifying DNA, raising profound questions about the boundaries of human intervention in biological processes.

Global challenges such as climate change, pandemic threats, biodiversity loss, and resource depletion necessitate interdisciplinary approaches that integrate insights from multiple domains of knowledge. Addressing these complex issues requires not only scientific understanding but also ethical reasoning, cultural sensitivity, economic analysis, and political will. The interconnected nature of these challenges highlights the limitations of narrow specialization and the importance of synthesizing diverse perspectives to develop comprehensive solutions.

The philosophy of science examines the foundations, methods, and implications of scientific inquiry, questioning assumptions about objectivity, evidence, and the social dimensions of knowledge production. Scholars in this field explore how scientific paradigms evolve over time, how research communities establish consensus, and how values influence even the most seemingly objective investigations. Their analyses remind us that science is a human endeavor, embedded in historical and cultural contexts, rather than a disembodied pursuit of absolute truth.

Language serves as both the medium through which knowledge is articulated and a subject of study in itself. Linguistics investigates the structures, functions, and evolution of human communication systems, revealing patterns that reflect cognitive processes and cultural adaptations. The diversity of languages worldwide represents different ways of categorizing experience and conceptualizing relationships, offering unique windows into how communities make sense of their environments and social interactions.

Mathematics provides a universal language for describing patterns, relationships, and transformations, serving as an essential tool across scientific disciplines. From the elegance of geometric proofs to the abstract landscapes of higher-dimensional spaces, mathematical structures offer frameworks for understanding phenomena at all scales. The remarkable effectiveness of mathematics in describing physical reality has prompted philosophical reflections on whether mathematical truths are discovered or invented, and why abstract reasoning should so perfectly capture concrete realities.

Psychology and cognitive science investigate the workings of the human mind, exploring perception, memory, decision-making, and emotional processes. These fields reveal both the remarkable capabilities and systematic biases of human cognition, helping us understand why individuals perceive and interpret experiences in particular ways. Research on cognitive development traces how mental faculties unfold from infancy through adulthood, while studies of neuroplasticity demonstrate the brain's capacity to reorganize itself in response to new experiences or injuries.

Anthropology examines human societies across time and space, documenting the remarkable diversity of cultural practices, belief systems, and social arrangements. By studying both contemporary communities and archaeological evidence, anthropologists piece together the story of human adaptation and innovation, revealing how environmental conditions, technological capabilities, and social dynamics shape collective ways of life. Their work highlights both cultural universals that appear across societies and the unique solutions different groups have developed to address common challenges.

The study of history reconstructs and interprets past events, examining primary sources to understand how societies have evolved over time. Historical analysis considers multiple perspectives, recognizing that narratives about the past always reflect particular viewpoints and priorities. By examining patterns of change and continuity, historians provide context for contemporary issues and insights into human responses to challenges across different eras. Their work reminds us that current arrangements are neither inevitable nor permanent, but rather the result of complex historical processes and choices.

Political science analyzes systems of governance, power dynamics, and decision-making processes in different societies. From democratic institutions to authoritarian regimes, diverse political structures reflect varying approaches to balancing individual rights with collective responsibilities. Comparative studies reveal how political arrangements emerge from particular historical circumstances and cultural values, while normative theories propose frameworks for evaluating the legitimacy and effectiveness of different systems. These investigations inform ongoing debates about citizenship, representation, and the proper scope of governmental authority.

Economics examines how societies allocate scarce resources, studying the production, distribution, and consumption of goods and services. Different economic models propose varying mechanisms for coordinating activities and incentivizing behaviors, from market-based approaches to centralized planning. Microeconomic analyses focus on individual choices and interactions, while macroeconomic perspectives consider aggregate trends and systemic dynamics. Economic theories inform policy decisions about trade, taxation, monetary systems, and public investments, with profound implications for social welfare and opportunity distribution.

Media studies investigates communication channels and their effects on public discourse, examining how information and narratives circulate through societies. From traditional print and broadcast formats to digital platforms and social networks, media systems shape how individuals understand their world and form opinions on complex issues. Critical analyses of media representations highlight how portrayals of different groups and topics influence public perceptions and attitudes, while studies of media economics consider how ownership structures and business models affect content production and distribution.

Environmental studies integrates insights from natural sciences, social sciences, and humanities to understand human-environment interactions and promote sustainable practices. This interdisciplinary field examines how human activities transform ecosystems, how environmental conditions influence human communities, and how societies conceptualize their relationship with the natural world. By bridging disciplinary boundaries, environmental scholars develop holistic approaches to addressing challenges like pollution, resource management, biodiversity conservation, and climate adaptation.

Religious studies examines the diverse traditions, practices, and belief systems that have provided frameworks for meaning and moral guidance throughout human history. From institutional religions with established doctrines to more fluid spiritual movements, these systems reflect fundamental human concerns about purpose, mortality, ethics, and transcendence. Comparative approaches highlight both common themes across traditions and the distinctive features of particular belief systems, while historical analyses trace how religious communities have evolved in response to changing social conditions and intellectual developments.

Legal systems establish frameworks for resolving disputes, protecting rights, and coordinating social activities within communities. The philosophy of law examines fundamental questions about justice, authority, and the relationship between legal rules and broader moral principles. Comparative legal studies reveal diverse approaches to addressing similar issues across different cultural contexts, while analysis of legal reasoning illuminates how principles and precedents guide decision-making in complex cases. These investigations inform ongoing efforts to develop legal frameworks that balance stability with adaptability to changing circumstances.

The study of architecture examines how built environments reflect and shape human experiences, considering aesthetic qualities, functional requirements, cultural symbolism, and ecological impacts. From ancient monuments to contemporary urban landscapes, architectural forms embody the values, technological capabilities, and social arrangements of their creators. Sustainable design approaches integrate traditional wisdom with modern innovations, seeking to create spaces that support human wellbeing while minimizing environmental degradation. These efforts highlight the profound influence of physical surroundings on individual experiences and collective activities.

As we navigate the complexities of the 21st century, the integration of diverse knowledge domains becomes increasingly essential. The challenges facing humanity—from climate change and pandemic threats to economic inequality and technological disruption—require solutions that draw on multiple perspectives and methodologies. Cultivating the ability to synthesize insights from different fields, recognize patterns across seemingly disparate domains, and translate abstract principles into practical applications will be crucial for addressing these multifaceted issues effectively.

The pursuit of knowledge remains a central aspect of human experience, reflecting our curiosity about ourselves and our world. Through systematic inquiry, creative expression, and collaborative exchange, we continue to expand our understanding and refine our capabilities. This ongoing intellectual journey reminds us of both the remarkable progress we have achieved and the vast territories that remain to be explored, inviting each generation to contribute to the ever-evolving tapestry of human wisdom and understanding.
`;

export const typingLessons: TypingLesson[] = [
  {
    id: 'long-practice',
    title: 'Comprehensive Typing Practice',
    description: 'A long practice text covering various topics',
    text: longPracticeText,
    level: 'advanced',
    type: 'Article'
  },
  {
    id: 'creep',
    title: 'Creep',
    description: 'Popular song by Radiohead',
    text: 'When you were here before, couldn\'t look you in the eye. You\'re just like an angel, your skin makes me cry. You float like a feather in a beautiful world. I wish I was special, you\'re so very special.',
    level: 'intermediate',
    author: 'Radiohead',
    type: 'Lyrics'
  },
  {
    id: 'home-row',
    title: 'Home Row Keys',
    description: 'Master the home row keys (ASDF JKL;)',
    text: 'asdf jkl; asdf jkl; asdf jkl; asdf j;lk fdsa j;lk fdsa asdf jkl; fdsa j;lk',
    level: 'beginner'
  },
  {
    id: 'common-words',
    title: 'Common Words',
    description: 'Practice typing the most common English words',
    text: 'the quick brown fox jumps over the lazy dog. a fast black cat runs past the white house. she sells sea shells by the sea shore.',
    level: 'beginner'
  },
  {
    id: 'pangrams',
    title: 'Pangrams',
    description: 'Sentences that use every letter of the alphabet',
    text: 'The five boxing wizards jump quickly. How vexingly quick daft zebras jump! Pack my box with five dozen liquor jugs.',
    level: 'intermediate'
  },
  {
    id: 'code-syntax',
    title: 'Code Syntax',
    description: 'Practice typing programming symbols and syntax',
    text: 'function calculateSum(a, b) { return a + b; } const result = calculateSum(5, 10); console.log(`The sum is: ${result}`);',
    level: 'advanced',
    type: 'Code'
  },
  {
    id: 'numbers-symbols',
    title: 'Numbers & Symbols',
    description: 'Master the number row and common symbols',
    text: '1234567890 !@#$%^&*() 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) 1234 !@#$ 5678 %^&* 90 ()',
    level: 'intermediate'
  }
];

// Time mapping from settings to seconds
export const timeMapping = {
  '30sec': 30,
  '1min': 60,
  '2min': 120,
  '3min': 180,
  '5min': 300,
  '10min': 600,
  '15min': 900,
  '20min': 1200,
};
