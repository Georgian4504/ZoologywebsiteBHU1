import { SemesterInfo, ResearchLab, Contribution } from '../types';

export const DEPARTMENT_HERO_IMAGE = '/assets/bhu_zoology_dept.jpg';
export const DEPARTMENT_HERO_IMAGE_BACKUP = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Facades_with_Pedestrians_-_Banaras_Hindu_University_-_Varanasi_-_Uttar_Pradesh_-_India_%2812519648883%29.jpg';
export const DEPARTMENT_HERO_CDN_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Facades_with_Pedestrians_-_Banaras_Hindu_University_-_Varanasi_-_Uttar_Pradesh_-_India_%2812519648883%29.jpg';

export interface DepartmentPhotoPreset {
  id: string;
  name: string;
  subtitle: string;
  url: string;
}

export const DEPARTMENT_PHOTO_PRESETS: DepartmentPhotoPreset[] = [
  {
    id: 'bhu-zoology-dept',
    name: 'BHU Heritage Academic Facade (Zoology Enclave)',
    subtitle: 'Varanasi Campus • Historic Indo-Gothic colonnade',
    url: '/assets/bhu_zoology_dept.jpg',
  },
  {
    id: 'bhu-biotech-life',
    name: 'BHU School of Biotechnology & Life Sciences',
    subtitle: 'Institute of Science • Life Science Complex',
    url: '/assets/bhu_biotech_lifescience.jpg',
  },
  {
    id: 'bhu-science-faculty',
    name: 'Faculty of Science Heritage Building',
    subtitle: 'BHU Main Campus • Arched red brick quadrangle',
    url: '/assets/bhu_science_faculty.jpg',
  },
];

export const RESEARCH_LABS: ResearchLab[] = [
  {
    id: 'lab-mol-bio',
    category: 'Molecular Biology',
    title: 'Cellular & Molecular Biology Research Laboratory',
    description: 'Investigating cellular signaling cascades, epigenetic gene regulation, apoptosis mechanisms, and recombinant DNA technology in model metazoan systems.',
    leadFaculty: 'Prof. R. K. Singh & Research Scholars',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    tags: ['PCR Amplification', 'Western Blotting', 'CRISPR-Cas9', 'RNAseq'],
    keyResearchAreas: ['Transcription factor kinetics', 'Stress-induced chromatin remodeling', 'Signal transduction pathways']
  },
  {
    id: 'lab-fish-bio',
    category: 'Fish Biology',
    title: 'Limnology, Aquaculture & Fish Endocrinology Facility',
    description: 'Dedicated to Ganges riverine biodiversity, reproductive endocrinology of teleost fishes, aquaculture biotechnology, and aquatic ecotoxicology.',
    leadFaculty: 'Prof. A. S. Srivastava & Limnology Unit',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ecotoxicology', 'Endocrine Disruption', 'River Ganga Fauna', 'Induced Breeding'],
    keyResearchAreas: ['Hypothalamo-hypophysial gonadal axis', 'Aquatic microplastic impact', 'Ichthyoplankton monitoring']
  },
  {
    id: 'lab-entomology',
    category: 'Entomology',
    title: 'Insect Physiology, Vector Biology & Chemical Ecology Lab',
    description: 'Advanced studies on vector-borne disease transmission (leishmaniasis, dengue), insect neuroendocrinology, pheromone communication, and IPM.',
    leadFaculty: 'Prof. S. B. Mishra & Vector Biology Group',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    tags: ['Vector Surveillance', 'Pheromone Traps', 'Insect Morphology', 'Neurotoxin Assays'],
    keyResearchAreas: ['Sandfly vector competency', 'Insect pest biocontrol', 'Host-parasite physiological dynamics']
  },
  {
    id: 'lab-histology',
    category: 'Histology',
    title: 'Advanced Microtomy & Histochemistry Core',
    description: 'Specialized unit equipped with rotary microtomes, cryostats, fluorescent microscopy, and enzymatic staining stations for vertebrate tissue diagnostics.',
    leadFaculty: 'Dr. V. Upadhyay & Histopathology Division',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Cryosectioning', 'Immunofluorescence', 'H&E Staining', 'Confocal Imaging'],
    keyResearchAreas: ['Organellar pathology', 'Metabolic tissue alterations', 'Comparative vertebrate organogenesis']
  },
  {
    id: 'lab-genetics',
    category: 'Genetics',
    title: 'Cytogenetics, Human Genomics & Drosophila Laboratory',
    description: 'Pioneered by legendary BHU geneticists, this lab focuses on chromosome banding, polytene chromosome puffing, oncogenomics, and population genetics.',
    leadFaculty: 'Prof. N. K. Sharma & Cytogenetics Consortium',
    imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Karyotyping', 'FISH Probes', 'Drosophila Genetics', 'Single Nucleotide Polymorphisms'],
    keyResearchAreas: ['Heat-shock locus activation', 'Chromosomal aberrations in neoplasms', 'Microbial population genetics']
  },
  {
    id: 'lab-wildlife',
    category: 'Wildlife Studies',
    title: 'Ecology, Animal Ethology & Wildlife Conservation Wing',
    description: 'Field stations and behavioral labs monitoring terrestrial mammalian conservation in Indo-Gangetic plains, avian telemetry, and bio-acoustics.',
    leadFaculty: 'Prof. D. K. Patel & Wildlife Biologists',
    imageUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Camera Trapping', 'GPS Telemetry', 'Behavioral Ethograms', 'Biodiversity Mapping'],
    keyResearchAreas: ['Wetland bird migration corridors', 'Human-carnivore conflict mitigation', 'Phylogeography of endemic reptiles']
  }
];

export const SEMESTER_DATA: SemesterInfo[] = [
  {
    semester: 1,
    name: 'Semester I (Foundational Core)',
    description: 'Core concepts in evolutionary taxonomy, invertebrate organizational diversity, modern molecular cell architecture, and mammalian physiological regulation.',
    totalCredits: 24,
    paperCount: 6,
    papers: [
      {
        id: 'sem1-p101',
        code: 'ZOOL-101',
        title: 'Biosystematics, Taxonomy & Organic Evolution',
        credits: 4,
        type: 'Core Theory',
        semester: 1,
        description: 'Comprehensive study of principles of zoological classification, modern ICZN rules, numerical phenetics, speciation models, and molecular phylogenetics.',
        units: [
          {
            unitNumber: 1,
            title: 'Principles and Methods of Biosystematics',
            topics: ['Concepts of species and infraspecific categories', 'Typological, nominalistic, and biological species concepts', 'Chemotaxonomy, cytotaxonomy, and molecular approaches', 'ICZN international code of zoological nomenclature']
          },
          {
            unitNumber: 2,
            title: 'Taxonomic Procedures & Cladistics',
            topics: ['Taxonomic collections, preservation, and curation methods', 'Taxonomic keys: dichotomous, indented, and bracketed', 'Phylogenetic systematics: apomorphies, plesiomorphies, and synapomorphies', 'Constructing cladograms with parsimony algorithms']
          },
          {
            unitNumber: 3,
            title: 'Theories and Evidences of Evolution',
            topics: ['Neo-Darwinism and the Modern Synthetic Theory', 'Hardy-Weinberg equilibrium and microevolutionary forces', 'Neutral theory of molecular evolution (Kimura model)', 'Natural selection modes: stabilizing, directional, and disruptive']
          },
          {
            unitNumber: 4,
            title: 'Speciation & Macroevolution',
            topics: ['Isolating mechanisms: pre-mating and post-mating', 'Allopatric, sympatric, and parapatric models of speciation', 'Punctuated equilibrium versus phyletic gradualism', 'Mass extinction events and evolutionary radiations']
          }
        ],
        resources: [
          {
            id: 'res-101-1',
            title: 'Complete Lecture Notes on Molecular Phylogenetics & Cladistics',
            type: 'Notes',
            format: 'PDF',
            author: 'Prof. R. Sharma (BHU Faculty Review)',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem1_101',
            size: '4.8 MB',
            verified: true,
            downloads: 342
          },
          {
            id: 'res-101-2',
            title: 'Solved Previous Year Question Papers (2018 - 2024)',
            type: 'PYQ',
            format: 'PDF',
            author: 'Student Academic Council',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem1_pyq',
            size: '8.2 MB',
            verified: true,
            downloads: 620
          },
          {
            id: 'res-101-3',
            title: 'Principles of Systematic Zoology - Ernst Mayr Summary Booklet',
            type: 'Reference Book',
            format: 'Drive Folder',
            author: 'BHU Zoology Reading Shelf',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_mayr_summary',
            size: '14.1 MB',
            verified: true,
            downloads: 219
          }
        ]
      },
      {
        id: 'sem1-p102',
        code: 'ZOOL-102',
        title: 'Structure & Function of Invertebrates',
        credits: 4,
        type: 'Core Theory',
        semester: 1,
        description: 'Comparative functional morphology, hydrostatic skeletal dynamics, excretion, respiration, and nervous system evolution across non-chordate phyla.',
        units: [
          {
            unitNumber: 1,
            title: 'Locomotion & Coelom Dynamics',
            topics: ['Acoelomate, pseudocoelomate, and coelomate organization', 'Hydrostatic skeleton in Annelids and Nematodes', 'Amoeboid, flagellar, and ciliary movements in Protozoa', 'Metamerism and tagmatization in Arthropoda']
          },
          {
            unitNumber: 2,
            title: 'Nutrition and Digestive Specializations',
            topics: ['Filter-feeding mechanisms in Polychaetes, Bivalves, and Ascidians', 'Intracellular versus extracellular digestion pathways', 'Feeding adaptations in predatory and parasitic non-chordates', 'Mouthparts morphology in terrestrial insects']
          },
          {
            unitNumber: 3,
            title: 'Respiration and Osmoregulation',
            topics: ['Gills, book lungs, and tracheal respiratory systems', 'Respiratory pigments and oxygen transport efficiency', 'Flame cells, metanephridia, and Malpighian tubules', 'Osmoregulation in freshwater versus marine invertebrates']
          },
          {
            unitNumber: 4,
            title: 'Invertebrate Nervous & Sensory Integration',
            topics: ['Primitive nerve nets in Cnidaria to cephalization in Cephalopods', 'Statocysts, compound eyes, and tactile receptors', 'Neurosecretory control of ecdysis in Crustacea and Insects', 'Larval forms across invertebrate phyla and phylogenetic significance']
          }
        ],
        resources: [
          {
            id: 'res-102-1',
            title: 'Comparative Diagrams & Hand-sketched Dissection Guides',
            type: 'Notes',
            format: 'PDF',
            author: 'Vikramaditya & Sem-I Batch',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem1_102',
            size: '12.4 MB',
            verified: true,
            downloads: 512
          },
          {
            id: 'res-102-2',
            title: 'Invertebrate Zoology Master Flashcards & PYQs',
            type: 'PYQ',
            format: 'PDF',
            author: 'MSc Zoology Peer Group',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem1_102_pyq',
            size: '6.1 MB',
            verified: true,
            downloads: 430
          }
        ]
      },
      {
        id: 'sem1-p103',
        code: 'ZOOL-103',
        title: 'Molecular Cell Biology & Genetics',
        credits: 4,
        type: 'Core Theory',
        semester: 1,
        description: 'Biomembrane architecture, protein trafficking, organelle biogenesis, cell cycle checkpoints, Mendelian extensions, and gene linkage analysis.',
        units: [
          {
            unitNumber: 1,
            title: 'Biomembranes & Vesicular Trafficking',
            topics: ['Lipid bilayer thermodynamics and lipid rafts', 'Active and passive ion transport, ABC transporters', 'Signal peptide hypothesis and ER import', 'Golgi apparatus sorting and COP-I / COP-II / clathrin coated vesicles']
          },
          {
            unitNumber: 2,
            title: 'Mitochondrial Bioenergetics & Cytoskeleton',
            topics: ['Chemiosmotic ATP synthesis and proton gradients', 'Microtubules, actin microfilaments, and intermediate filaments', 'Molecular motors: kinesin, dynein, and myosin kinetics', 'Nuclear pore complexes and nucleocytoplasmic transport']
          },
          {
            unitNumber: 3,
            title: 'Cell Cycle Dynamics, Apoptosis & Cancer',
            topics: ['Cyclins, CDKs, and cell cycle checkpoints (G1/S, G2/M)', 'Extrinsic and intrinsic apoptotic signaling cascades (Caspases, Bcl-2)', 'Proto-oncogenes, tumor suppressors (p53, Rb)', 'Telomeres and cellular senescence']
          },
          {
            unitNumber: 4,
            title: 'Classical & Transmission Genetics',
            topics: ['Non-Mendelian inheritance and gene interactions (epistasis)', 'Linkage mapping, three-point testcross, and interference', 'Sex-linked inheritance and dosage compensation in mammals and Drosophila', 'Extra-nuclear mitochondrial and maternal inheritance']
          }
        ],
        resources: [
          {
            id: 'res-103-1',
            title: 'Lodish & Alberts Chapter-wise Digest on Cell Signaling',
            type: 'Notes',
            format: 'PDF',
            author: 'Cell Biology Study Circle',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem1_103',
            size: '15.6 MB',
            verified: true,
            downloads: 710
          },
          {
            id: 'res-103-2',
            title: 'Genetics Numerical Problems with Step-by-Step Solutions',
            type: 'Notes',
            format: 'PDF',
            author: 'Prof. N. K. Sharma Lecture Series',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_genetics_numericals',
            size: '3.9 MB',
            verified: true,
            downloads: 825
          }
        ]
      },
      {
        id: 'sem1-p104',
        code: 'ZOOL-104',
        title: 'General Physiology & Endocrinology',
        credits: 4,
        type: 'Core Theory',
        semester: 1,
        description: 'Mammalian organ systems, neural transmission, muscular contraction, cardiac cycle, endocrine regulatory axes, and metabolic homeostasis.',
        units: [
          {
            unitNumber: 1,
            title: 'Neurophysiology & Muscle Mechanics',
            topics: ['Action potential ionic basis (Hodgkin-Huxley model)', 'Synaptic transmission, neurotransmitters, and neuromuscular junction', 'Sliding filament mechanism, troponin-tropomyosin complex', 'Sarcoplasmic reticulum and calcium transients']
          },
          {
            unitNumber: 2,
            title: 'Cardiovascular & Renal Physiology',
            topics: ['Cardiac electrophysiology, pacemaker currents, and ECG', 'Blood pressure regulation: baroreceptors and RAAS system', 'Glomerular filtration rate and countercurrent multiplier mechanism', 'Acid-base balance and buffer systems of blood']
          },
          {
            unitNumber: 3,
            title: 'Endocrine Glands & Hormone Biochemistry',
            topics: ['Hypothalamic-pituitary axis and feedback loops', 'Thyroid and parathyroid hormones in metabolic rate and calcium homeostasis', 'Adrenal cortical and medullary stress hormones', 'Endocrine pancreas and glucose homeostasis regulation']
          },
          {
            unitNumber: 4,
            title: 'Reproductive Endocrinology & Thermoregulation',
            topics: ['Spermatogenesis, oogenesis, and ovarian steroidogenesis', 'Estrous and menstrual cycles hormonal regulation', 'Thermoregulation in poikilotherms and homeotherms', 'Torpor, hibernation, and brown adipose tissue thermogenesis']
          }
        ],
        resources: [
          {
            id: 'res-104-1',
            title: 'Guyton & Hall Concise Human Physiology Flowcharts',
            type: 'Notes',
            format: 'PDF',
            author: 'Physiology Lab Team',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem1_104',
            size: '9.3 MB',
            verified: true,
            downloads: 490
          }
        ]
      },
      {
        id: 'sem1-p105',
        code: 'ZOOL-105',
        title: 'Practical - I: Systematics & Invertebrate Lab',
        credits: 4,
        type: 'Core Practical',
        semester: 1,
        description: 'Hands-on identification of invertebrate fauna, museum specimens, temporary and permanent slide preparations, and dissection simulations.',
        units: [
          {
            unitNumber: 1,
            title: 'Specimen Identification & Taxonomic Keys',
            topics: ['Museum identification of Porifera, Coelenterata, and Helminthes', 'Arthropod, Mollusc, and Echinoderm collection methods', 'Preparation of dichotomous identification keys']
          },
          {
            unitNumber: 2,
            title: 'Dissections and Mountings',
            topics: ['Digestive and nervous system of prawn / squilla / sepia', 'Mounting of hastate plate, statocyst, and radula', 'Observation of living protozoan cultures']
          }
        ],
        resources: [
          {
            id: 'res-105-1',
            title: 'Lab Manual: Non-Chordata Practical Protocol (BHU 2018 Edition)',
            type: 'Practical Manual',
            format: 'PDF',
            author: 'Department of Zoology Practical Committee',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem1_practical_1',
            size: '18.5 MB',
            verified: true,
            downloads: 670
          }
        ]
      },
      {
        id: 'sem1-p106',
        code: 'ZOOL-106',
        title: 'Practical - II: Cell Biology, Genetics & Physiology Lab',
        credits: 4,
        type: 'Core Practical',
        semester: 1,
        description: 'Microscopy calibration, mitotic squash preparation, Drosophila culture handling, polytene chromosome preparation, and hematological tests.',
        units: [
          {
            unitNumber: 1,
            title: 'Cell Biology & Cytogenetics Protocols',
            topics: ['Onion root tip mitotic squash preparation and mitotic index calculation', 'Drosophila salivary gland polytene chromosome squash', 'Identification of mutant Drosophila strains (white eye, vestigial wing)']
          },
          {
            unitNumber: 2,
            title: 'Physiological & Biochemical Experiments',
            topics: ['Total RBC and WBC count with hemocytometer', 'Hemoglobin estimation by Sahli method and blood group typing', 'Effect of temperature on salivary amylase activity']
          }
        ],
        resources: [
          {
            id: 'res-106-1',
            title: 'Staining Protocols & Microscopy Practical Manual',
            type: 'Practical Manual',
            format: 'PDF',
            author: 'Chitrangada Lab Instructors',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem1_practical_2',
            size: '11.2 MB',
            verified: true,
            downloads: 580
          }
        ]
      }
    ]
  },
  {
    semester: 2,
    name: 'Semester II (Organismal & Developmental Systems)',
    description: 'Comparative chordate anatomy, embryology, environmental toxicological frameworks, and modern biostatistical methodologies.',
    totalCredits: 24,
    paperCount: 6,
    papers: [
      {
        id: 'sem2-p201',
        code: 'ZOOL-201',
        title: 'Comparative Anatomy of Vertebrates',
        credits: 4,
        type: 'Core Theory',
        semester: 2,
        description: 'In-depth evolutionary transitions in vertebrate integument, skeletal arches, aortic arcs, urogenital organization, and encephalon specialization.',
        units: [
          {
            unitNumber: 1,
            title: 'Integument and Skeletal Architecture',
            topics: ['Evolution of dermis and epidermis, epidermal glands, scales, feathers, and hair', 'Visceral arches evolution from fish to mammals', 'Vertebral column and girdle modifications in tetrapods']
          },
          {
            unitNumber: 2,
            title: 'Digestive and Respiratory Modifications',
            topics: ['Evolution of dentition, stomach compartmentalization in ruminants', 'Branchial, cutaneous, and pulmonary gas exchange adaptations', 'Air sacs in birds and swim bladder evolution in bony fishes']
          },
          {
            unitNumber: 3,
            title: 'Circulatory and Urogenital Transformations',
            topics: ['Aortic arches transformation from primitive gill arches to tetrapod arches', 'Evolution of the single vs double circuit hearts (amphibian to mammalian)', 'Pronephros, mesonephros, and metanephros evolutionary succession', 'Urinary and genital duct connections']
          },
          {
            unitNumber: 4,
            title: 'Nervous System & Sense Organs',
            topics: ['Comparative brain morphology: olfactory bulbs, cerebral cortex, and cerebellum', 'Cranial nerves in anamniotes versus amniotes', 'Lateral line system and ampullae of Lorenzini', 'Evolution of vertebrate eye and ear ossicles']
          }
        ],
        resources: [
          {
            id: 'res-201-1',
            title: 'Comparative Vertebrate Anatomy Diagrams & Colored Plates',
            type: 'Notes',
            format: 'PDF',
            author: 'Kardong Comparative Anatomy Summary',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem2_201',
            size: '16.8 MB',
            verified: true,
            downloads: 410
          }
        ]
      },
      {
        id: 'sem2-p202',
        code: 'ZOOL-202',
        title: 'Developmental Biology & Embryology',
        credits: 4,
        type: 'Core Theory',
        semester: 2,
        description: 'Gametogenesis, fertilization signaling, morphogen gradients, axis formation in chick and frog, organogenesis, and stem cell biology.',
        units: [
          {
            unitNumber: 1,
            title: 'Fertilization and Early Embryonic Cleavage',
            topics: ['Chemotaxis, acrosome reaction, and blocks to polyspermy (fast and slow)', 'Cleavage patterns: radial, spiral, discoidal, and superficial', 'Mid-blastula transition and activation of embryonic genome', 'Gastrulation cell movements: epiboly, invagination, and involution']
          },
          {
            unitNumber: 2,
            title: 'Primary Embryonic Induction & Axis Formation',
            topics: ["Spemann-Mangold organizer experiment and dorsal lip induction", 'Wnt, BMP, Chordin, and Noggin molecular signaling cascades', 'Anteroposterior axis establishment and Hox gene expression', 'Dorsoventral specification in Amphibia and Chick']
          },
          {
            unitNumber: 3,
            title: 'Organogenesis and Morphogenesis',
            topics: ['Neurulation and neural crest cell differentiation pathways', 'Eye development: reciprocal induction between optic vesicle and lens', 'Limb bud development: AER, ZPA, and FGF/Sonic hedgehog signaling', 'Extraembryonic membranes in amniotes and placentation']
          },
          {
            unitNumber: 4,
            title: 'Post-embryonic Development & Stem Cells',
            topics: ['Metamorphosis in amphibians: hormonal trigger by thyroid axis', 'Insect metamorphosis and ecdysone-juvenile hormone interplay', 'Pluripotent embryonic stem cells versus adult stem cell niches', 'Regeneration mechanisms: epimorphosis in salamanders and morphallaxis in Hydra']
          }
        ],
        resources: [
          {
            id: 'res-202-1',
            title: 'Gilbert Developmental Biology Comprehensive Study Notes',
            type: 'Notes',
            format: 'PDF',
            author: 'Dr. V. Upadhyay Lecture Notes',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem2_202',
            size: '13.5 MB',
            verified: true,
            downloads: 580
          }
        ]
      },
      {
        id: 'sem2-p203',
        code: 'ZOOL-203',
        title: 'Environmental Biology & Wildlife Management',
        credits: 4,
        type: 'Core Theory',
        semester: 2,
        description: 'Ecosystem dynamics, biogeochemical cycles, population ecology, conservation biology, wildlife sanctuaries, and environmental impact assessments.',
        units: [
          {
            unitNumber: 1,
            title: 'Ecosystem Dynamics & Bioenergetics',
            topics: ['Trophic levels, energy flow models, and ecological efficiencies', 'Biogeochemical cycles: Nitrogen, Phosphorus, and Carbon fluxes', 'Primary productivity measurement in aquatic and terrestrial ecosystems', 'Ecological succession: mechanisms and climax community models']
          },
          {
            unitNumber: 2,
            title: 'Population & Community Ecology',
            topics: ['Population growth models: Exponential vs Logistic (r and K selection)', 'Lotka-Volterra predator-prey equations and competition models', 'Niche theory: Hutchinsonian hypervolume, fundamental vs realized niche', 'Keystone species and trophic cascades in Indian habitats']
          },
          {
            unitNumber: 3,
            title: 'Wildlife Conservation & Legislation in India',
            topics: ['Wildlife Protection Act 1972 and amendments', 'Project Tiger, Project Elephant, and Project Crocodile', 'National parks, wildlife sanctuaries, and biosphere reserves in Uttar Pradesh', 'IUCN Red List categories and criteria']
          },
          {
            unitNumber: 4,
            title: 'Ecotoxicology and Climate Change',
            topics: ['Biomagnification and bioaccumulation of persistent organic pollutants', 'Heavy metal toxicity in the river Ganga basin', 'Greenhouse gases and ocean acidification impacts on marine fauna', 'Environmental Impact Assessment (EIA) protocols']
          }
        ],
        resources: [
          {
            id: 'res-203-1',
            title: 'Indian Wildlife Act, Sanctuaries & Ecology Lecture Manual',
            type: 'Notes',
            format: 'PDF',
            author: 'BHU Wildlife Conservation Forum',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem2_203',
            size: '8.4 MB',
            verified: true,
            downloads: 390
          }
        ]
      },
      {
        id: 'sem2-p204',
        code: 'ZOOL-204',
        title: 'Tools & Techniques in Biology and Biostatistics',
        credits: 4,
        type: 'Core Theory',
        semester: 2,
        description: 'Spectrophotometry, chromatography, electrophoresis, centrifugation, electron microscopy, parametric/non-parametric tests, and ANOVA.',
        units: [
          {
            unitNumber: 1,
            title: 'Microscopy and Spectroscopy',
            topics: ['Brightfield, phase contrast, differential interference contrast (DIC)', 'Confocal laser scanning microscopy and fluorescence microscopy', 'Transmission and Scanning Electron Microscopy (TEM, SEM)', 'UV-Visible spectrophotometry and Beer-Lambert law principles']
          },
          {
            unitNumber: 2,
            title: 'Separation Techniques & Centrifugation',
            topics: ['Thin-layer chromatography, Ion-exchange, Gel filtration, and HPLC', 'Agarose gel electrophoresis and SDS-PAGE', 'Differential centrifugation and sucrose density gradient centrifugation', 'Mass spectrometry (MALDI-TOF) for protein identification']
          },
          {
            unitNumber: 3,
            title: 'Radioisotope Techniques & Histochemistry',
            topics: ['Radioisotopes in biology (32P, 35S, 3H) and scintillation counting', 'Autoradiography principles and applications', 'Fixation, paraffin embedding, and rotary microtomy', 'Histochemical detection of carbohydrates, proteins, and lipids']
          },
          {
            unitNumber: 4,
            title: 'Biostatistics and Experimental Design',
            topics: ['Measures of central tendency and dispersion (standard deviation, standard error)', 'Probability distributions: Normal, Binomial, and Poisson', 'Hypothesis testing: Student t-test, Chi-square test for goodness of fit', 'One-way and two-way Analysis of Variance (ANOVA)']
          }
        ],
        resources: [
          {
            id: 'res-204-1',
            title: 'Biostatistics Solved Question Bank with Formulas & R-codes',
            type: 'Notes',
            format: 'PDF',
            author: 'Biometry Faculty Wing',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem2_204',
            size: '5.1 MB',
            verified: true,
            downloads: 530
          }
        ]
      },
      {
        id: 'sem2-p205',
        code: 'ZOOL-205',
        title: 'Practical - III: Vertebrate Anatomy & Embryology Lab',
        credits: 4,
        type: 'Core Practical',
        semester: 2,
        description: 'Skeletal systems of lower and higher vertebrates, chick embryo whole mounts, frog embryology slides, and microtome sectioning.',
        units: [
          {
            unitNumber: 1,
            title: 'Osteology and Anatomical Demonstrations',
            topics: ['Skull of varanus, python, bird, and mammal comparative study', 'Pectoral and pelvic girdle comparison across classes']
          },
          {
            unitNumber: 2,
            title: 'Developmental Biology Observations',
            topics: ['Chick embryo incubation and windowing techniques', 'Identification of 24h, 33h, 48h, and 72h chick embryo stages', 'Paraffin wax block preparation and microtome ribbon cutting']
          }
        ],
        resources: [
          {
            id: 'res-205-1',
            title: 'Practical Manual - III: Chordata & Embryology Staging',
            type: 'Practical Manual',
            format: 'PDF',
            author: 'Anatomy Lab Instructors',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem2_p3',
            size: '14.3 MB',
            verified: true,
            downloads: 480
          }
        ]
      },
      {
        id: 'sem2-p206',
        code: 'ZOOL-206',
        title: 'Practical - IV: Ecology, Tools & Biostatistics Lab',
        credits: 4,
        type: 'Core Practical',
        semester: 2,
        description: 'Water quality analysis of the river Ganga (DO, BOD, alkalinity), spectrophotometric estimation, SDS-PAGE running, and statistical calculations.',
        units: [
          {
            unitNumber: 1,
            title: 'Ecological & Water Quality Analysis',
            topics: ['Winkler method for dissolved oxygen (DO) and biochemical oxygen demand (BOD)', 'Estimation of chlorides, total alkalinity, and pH in freshwater ecosystems', 'Quadrat sampling method for species diversity and density indices']
          },
          {
            unitNumber: 2,
            title: 'Biophysical Instrumentation and Statistics',
            topics: ['Protein estimation by Bradford and Lowry methods', 'Running SDS-PAGE for serum protein profiling', 'Calculation of mean, standard deviation, and t-test using real dataset']
          }
        ],
        resources: [
          {
            id: 'res-206-1',
            title: 'Limnology & Environmental Chemistry Lab Guide',
            type: 'Practical Manual',
            format: 'PDF',
            author: 'Ganga Action Plan Lab Instructors',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem2_p4',
            size: '9.7 MB',
            verified: true,
            downloads: 410
          }
        ]
      }
    ]
  },
  {
    semester: 3,
    name: 'Semester III (Specialization & Molecular Frontiers)',
    description: 'Advanced biochemistry, neuroethology, major elective streams (Fish Biology, Entomology, Endocrinology, Genetics), and core lab research.',
    totalCredits: 24,
    paperCount: 6,
    papers: [
      {
        id: 'sem3-p301',
        code: 'ZOOL-301',
        title: 'Biochemistry & Molecular Biology',
        credits: 4,
        type: 'Core Theory',
        semester: 3,
        description: 'Enzyme kinetics (Michaelis-Menten), DNA replication in prokaryotes and eukaryotes, transcription, translation, and gene regulation mechanisms.',
        units: [
          {
            unitNumber: 1,
            title: 'Proteins and Enzyme Kinetics',
            topics: ['Protein secondary, tertiary, and quaternary structures (Ramachandran plot)', 'Michaelis-Menten kinetics, Lineweaver-Burk plots, and Km determination', 'Enzyme inhibition: competitive, non-competitive, and uncompetitive', 'Allosteric enzymes and cooperative binding models']
          },
          {
            unitNumber: 2,
            title: 'DNA Replication and Repair Mechanisms',
            topics: ['Enzymology of replication in E. coli and eukaryotes', 'Okazaki fragments synthesis and end-replication problem (Telomerase)', 'DNA mismatch repair, base excision repair (BER), nucleotide excision repair (NER)', 'Homologous recombination (Holliday model) and SOS response']
          },
          {
            unitNumber: 3,
            title: 'Transcription and Post-transcriptional Modifications',
            topics: ['Prokaryotic RNA polymerase and sigma factors', 'Eukaryotic RNA Pol I, II, III and basal transcription factors (TFIID, TFIIH)', '5 prime capping, 3 prime polyadenylation, and spliceosome-mediated splicing', 'Alternative splicing and RNA editing']
          },
          {
            unitNumber: 4,
            title: 'Translation and Operon Models',
            topics: ['Genetic code degeneracy, tRNA charging, and ribosome structure', 'Initiation, elongation, and termination factors in prokaryotes and eukaryotes', 'Lac and Trp operon regulation (induction and attenuation)', 'miRNA and siRNA mediated RNA interference (RNAi)']
          }
        ],
        resources: [
          {
            id: 'res-301-1',
            title: 'Lehninger Principles of Biochemistry Master Summary Notes',
            type: 'Notes',
            format: 'PDF',
            author: 'Biochemistry Research Group',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem3_301',
            size: '21.0 MB',
            verified: true,
            downloads: 890
          },
          {
            id: 'res-301-2',
            title: 'Molecular Biology PYQs with Model Answers (BHU & CSIR-NET)',
            type: 'PYQ',
            format: 'PDF',
            author: 'NET/JRF Zoology Forum',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem3_pyq',
            size: '7.8 MB',
            verified: true,
            downloads: 1040
          }
        ]
      },
      {
        id: 'sem3-p302',
        code: 'ZOOL-302',
        title: 'Animal Behavior (Ethology) & Neurobiology',
        credits: 4,
        type: 'Core Theory',
        semester: 3,
        description: 'Fixed action patterns, neuroendocrine behavioral control, circadian rhythms, mating systems, altruism, kin selection, and sociobiology.',
        units: [
          {
            unitNumber: 1,
            title: 'Innate and Learned Behaviors',
            topics: ['Tinbergen four questions of ethology', 'Sign stimuli, releasers, and Fixed Action Patterns (FAPs)', 'Classical conditioning (Pavlovian) versus operant conditioning (Skinnerian)', 'Imprinting in precocial birds (Lorenz model)']
          },
          {
            unitNumber: 2,
            title: 'Chronobiology & Navigation Mechanisms',
            topics: ['Circadian, circalunar, and circannual biological clocks', 'Suprachiasmatic nucleus (SCN) and melatonin secretion', 'Sun compass, polarized light, and geomagnetism navigation in migratory birds', 'Bee dance language (waggle and round dance)']
          },
          {
            unitNumber: 3,
            title: 'Social Structure, Communication & Altruism',
            topics: ['Auditory, visual, tactile, and chemical pheromonal signaling', 'Hamilton rule of kin selection (rB > C) and inclusive fitness', 'Reciprocal altruism and evolutionary stable strategies (ESS)', 'Eusociality in Hymenoptera and Isoptera']
          },
          {
            unitNumber: 4,
            title: 'Mating Systems and Sexual Selection',
            topics: ['Monogamy, polygyny, polyandry, and promiscuity', 'Bateman principle and parental investment theory', 'Intrasexual competition (male-male combat) vs Intersexual mate choice', 'Handicap principle and runaway sexual selection']
          }
        ],
        resources: [
          {
            id: 'res-302-1',
            title: 'Alcock Animal Behavior Illustrated Lecture Notes',
            type: 'Notes',
            format: 'PDF',
            author: 'Ethology Research Unit',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem3_302',
            size: '11.8 MB',
            verified: true,
            downloads: 470
          }
        ]
      },
      {
        id: 'sem3-p303',
        code: 'ZOOL-303',
        title: 'Special Paper - I (Fish Biology / Entomology / Endocrinology / Genetics)',
        credits: 4,
        type: 'Major Elective',
        semester: 3,
        description: 'Specialized advanced elective theory stream selected by postgraduate scholars under department specialization allotment.',
        units: [
          {
            unitNumber: 1,
            title: 'Stream A: Advanced Ichthyology & Fish Anatomy',
            topics: ['Classification of Teleosts and Elasmobranchs', 'Swim bladder acoustic mechanics and Weberian apparatus', 'Migration patterns of anadromous (Hilsa) and catadromous (Anguilla) fishes']
          },
          {
            unitNumber: 2,
            title: 'Stream B: Advanced Insect Physiology & Systematics',
            topics: ['Cuticle biochemistry and sclerotization process', 'Digestive adaptations in sap-sucking and wood-boring insects', 'Pheromones and juvenile hormones in pest regulation']
          },
          {
            unitNumber: 3,
            title: 'Stream C: Cellular & Molecular Endocrinology',
            topics: ['Receptor tyrosine kinases and G-protein coupled receptors', 'Steroid hormone nuclear receptors and zinc fingers', 'Thyroid peroxidase biochemistry and autoimmune thyroid diseases']
          },
          {
            unitNumber: 4,
            title: 'Stream D: Human Genetics & Medical Genomics',
            topics: ['Pedigree analysis of autosomal and X-linked genetic disorders', 'Trisomy 21, Klinefelter, and Turner syndrome cytogenetics', 'Next Generation Sequencing (NGS) in clinical diagnosis']
          }
        ],
        resources: [
          {
            id: 'res-303-1',
            title: 'Special Paper - I Comprehensive Compilation (All 4 Streams)',
            type: 'Notes',
            format: 'PDF',
            author: 'Specialization Faculty Committee',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem3_303',
            size: '24.5 MB',
            verified: true,
            downloads: 650
          }
        ]
      },
      {
        id: 'sem3-p304',
        code: 'ZOOL-304',
        title: 'Special Paper Theory - II (Applied Specialization)',
        credits: 4,
        type: 'Major Elective',
        semester: 3,
        description: 'Application-oriented research methodologies within the candidate designated elective domain.',
        units: [
          {
            unitNumber: 1,
            title: 'Applied Aquaculture / Vector Management / Endocrine Assays / Gene Therapy',
            topics: ['Intensive fish farming techniques and induced spawning protocols', 'Vector surveillance and insecticide resistance mechanisms', 'ELISA, RIA, and chemiluminescence hormone quantification', 'Gene therapy vectors: retroviral and CRISPR knock-ins']
          },
          {
            unitNumber: 2,
            title: 'Experimental Case Studies and Regulatory Frameworks',
            topics: ['Aquaculture bio-security protocols', 'World Health Organization guidelines for vector control', 'Institutional Animal Ethics Committee (IAEC) regulations']
          }
        ],
        resources: [
          {
            id: 'res-304-1',
            title: 'Elective Laboratory Handbook & Methodologies',
            type: 'Notes',
            format: 'PDF',
            author: 'Specialization Mentors',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem3_304',
            size: '13.0 MB',
            verified: true,
            downloads: 380
          }
        ]
      },
      {
        id: 'sem3-p305',
        code: 'ZOOL-305',
        title: 'Practical - V: Core Biochemistry & Molecular Lab',
        credits: 4,
        type: 'Core Practical',
        semester: 3,
        description: 'Genomic DNA extraction, agarose gel analysis, restriction digestion, PCR amplification, and enzyme assay kinetics.',
        units: [
          {
            unitNumber: 1,
            title: 'Molecular Biology Hands-on',
            topics: ['Isolation of genomic DNA from mammalian blood / liver tissue', 'Quantification of DNA by diphenylamine (DPA) method and nanodrop', 'Agarose gel electrophoresis and ethidium bromide visualization']
          },
          {
            unitNumber: 2,
            title: 'Biochemical Assays',
            topics: ['Determination of Km and Vmax for alkaline phosphatase enzyme', 'Effect of heavy metals on enzyme inhibition profiles']
          }
        ],
        resources: [
          {
            id: 'res-305-1',
            title: 'Molecular Biology Protocol Sheet (Sambrook & Russell SOPs)',
            type: 'Practical Manual',
            format: 'PDF',
            author: 'Prof. R. K. Singh Lab',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem3_p5',
            size: '8.9 MB',
            verified: true,
            downloads: 620
          }
        ]
      },
      {
        id: 'sem3-p306',
        code: 'ZOOL-306',
        title: 'Practical - VI: Specialization Lab - I',
        credits: 4,
        type: 'Core Practical',
        semester: 3,
        description: 'Hands-on practical training in the student designated specialization lab (Fish / Entomology / Endocrinology / Genetics).',
        units: [
          {
            unitNumber: 1,
            title: 'Specialization Specific Benchwork',
            topics: ['Histopathology slide preparation of endocrine organs', 'Pituitary gland dissection in teleosts / Induced spawning protocols', 'Taxonomic keys for pest insect identification', 'Polymerase Chain Reaction (PCR) amplification of candidate loci']
          }
        ],
        resources: [
          {
            id: 'res-306-1',
            title: 'Advanced Specialization Lab Manual (Streamwise SOP)',
            type: 'Practical Manual',
            format: 'PDF',
            author: 'Department Specialization Staff',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem3_p6',
            size: '15.4 MB',
            verified: true,
            downloads: 410
          }
        ]
      }
    ]
  },
  {
    semester: 4,
    name: 'Semester IV (Applied Biotechnology, Immunology & Dissertation)',
    description: 'Applied zoological biotechnology, immunology & immunotechnology, major dissertation research project, and master comprehensive defense.',
    totalCredits: 24,
    paperCount: 6,
    papers: [
      {
        id: 'sem4-p401',
        code: 'ZOOL-401',
        title: 'Applied Zoology & Animal Biotechnology',
        credits: 4,
        type: 'Core Theory',
        semester: 4,
        description: 'Sericulture, apiculture, lac culture, pearl culture, transgenic animal development, stem cell therapies, and bioprocess technology.',
        units: [
          {
            unitNumber: 1,
            title: 'Commercial Insects and Culture Practices',
            topics: ['Sericulture: Mulberry cultivation, silkworm rearing (Bombyx mori), and silk reeling', 'Apiculture: Honey bee species, bee communication, and disease management', 'Lac culture: Host plants, life cycle of Kerria lacca, and commercial processing']
          },
          {
            unitNumber: 2,
            title: 'Aquaculture and Pearl Culture',
            topics: ['Freshwater pearl culture in India (Lamellidens marginalis)', 'Feed formulation and pond fertilization in fish hatcheries', 'Prawn culture (Macrobrachium rosenbergii) and disease control']
          },
          {
            unitNumber: 3,
            title: 'Transgenic Animals and Bioreactors',
            topics: ['Microinjection, embryonic stem cell transfer, and retroviral vector methods', 'Transgenic mice, sheep, and pigs as molecular bioreactors', 'Biosafety guidelines and ethical clearance for recombinant animal models']
          },
          {
            unitNumber: 4,
            title: 'Animal Tissue Culture & Cryopreservation',
            topics: ['Primary cell cultures, continuous cell lines, and culture media components', 'Cryopreservation of gametes and embryos, vitrification techniques', 'In vitro fertilization (IVF) and intracytoplasmic sperm injection (ICSI)']
          }
        ],
        resources: [
          {
            id: 'res-401-1',
            title: 'Animal Biotechnology & Applied Zoology Comprehensive Handout',
            type: 'Notes',
            format: 'PDF',
            author: 'Biotechnology Core Team',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem4_401',
            size: '17.2 MB',
            verified: true,
            downloads: 510
          }
        ]
      },
      {
        id: 'sem4-p402',
        code: 'ZOOL-402',
        title: 'Immunology & Immunotechnology',
        credits: 4,
        type: 'Core Theory',
        semester: 4,
        description: 'Innate and adaptive immunity, antibody structure, MHC molecules, complement system, hypersensitivity, vaccines, and hybridoma technology.',
        units: [
          {
            unitNumber: 1,
            title: 'Innate & Adaptive Immunity Architecture',
            topics: ['Anatomical barriers, phagocytosis, and Toll-Like Receptors (TLRs)', 'Primary lymphoid organs (bone marrow, thymus) and secondary lymphoid organs (spleen, lymph nodes)', 'B-cell receptor (BCR) and T-cell receptor (TCR) somatic recombination (V(D)J recombination)', 'Immunoglobulin classes (IgG, IgM, IgA, IgE, IgD) structural domains and functions']
          },
          {
            unitNumber: 2,
            title: 'Antigen Presentation & Complement Pathways',
            topics: ['Major Histocompatibility Complex: MHC Class I vs MHC Class II antigen processing', 'Cytotoxic T-cell activation and helper T-cell subsets (Th1, Th2, Th17)', 'Classical, alternative, and lectin pathways of complement activation', 'Membrane Attack Complex (MAC) assembly and regulation']
          },
          {
            unitNumber: 3,
            title: 'Immune Pathology and Tolerance',
            topics: ['Type I, II, III, and IV hypersensitivity reactions and clinical manifestations', 'Central and peripheral immune tolerance mechanisms', 'Autoimmune disorders (Rheumatoid arthritis, Systemic Lupus Erythematosus)', 'Primary and acquired immunodeficiencies (SCID, HIV-AIDS pathophysiology)']
          },
          {
            unitNumber: 4,
            title: 'Immunotechniques & Vaccinology',
            topics: ['Monoclonal antibody production via hybridoma technology (Kohler & Milstein)', 'Enzyme-Linked Immunosorbent Assay (ELISA: direct, indirect, sandwich)', 'Flow cytometry and Fluorescence-Activated Cell Sorting (FACS)', 'Vaccine types: live attenuated, recombinant subunit, mRNA, and conjugate vaccines']
          }
        ],
        resources: [
          {
            id: 'res-402-1',
            title: 'Kuby Immunology Master Lecture Slides and Flowcharts',
            type: 'Notes',
            format: 'PDF',
            author: 'Immunology Research Wing',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem4_402',
            size: '22.4 MB',
            verified: true,
            downloads: 910
          }
        ]
      },
      {
        id: 'sem4-p403',
        code: 'ZOOL-403',
        title: 'Special Paper Theory - III (Frontier Specialization)',
        credits: 4,
        type: 'Major Elective',
        semester: 4,
        description: 'Advanced frontiers in molecular fish breeding, forensic entomology, neuroendocrinology, or cancer genomics.',
        units: [
          {
            unitNumber: 1,
            title: 'Current Breakthroughs and Literature Review',
            topics: ['High-throughput transcriptomics in life sciences', 'CRISPR base-editing in zoological systems', 'Emerging zoonotic pandemics and one-health paradigms']
          }
        ],
        resources: [
          {
            id: 'res-403-1',
            title: 'Advanced Seminar Papers & Literature Compilation',
            type: 'Notes',
            format: 'PDF',
            author: 'Postgraduate Research Colloquium',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem4_403',
            size: '14.1 MB',
            verified: true,
            downloads: 320
          }
        ]
      },
      {
        id: 'sem4-p404',
        code: 'ZOOL-404',
        title: 'M.Sc. Dissertation & Field Research Project',
        credits: 6,
        type: 'Dissertation',
        semester: 4,
        description: 'Original semester-long research project under assigned faculty supervisor, including literature survey, lab/field experiments, statistical analysis, and thesis compilation.',
        units: [
          {
            unitNumber: 1,
            title: 'Research Methodology & Hypothesis Formulation',
            topics: ['Literature indexing (PubMed, Web of Science, Scopus)', 'Formulation of research aim and objective milestones', 'Experimental design, control setups, and statistical power estimation']
          },
          {
            unitNumber: 2,
            title: 'Thesis Formatting & Academic Integrity',
            topics: ['Department standard thesis template and citation formats (APA / Harvard)', 'Plagiarism limits (UGC guidelines < 10% similarity index)', 'Oral presentation preparation and graphical abstracts']
          }
        ],
        resources: [
          {
            id: 'res-404-1',
            title: 'BHU MSc Zoology Official Thesis Template & Guidelines',
            type: 'Notes',
            format: 'PDF',
            author: 'Department Academic Council',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_dissertation_template',
            size: '3.4 MB',
            verified: true,
            downloads: 730
          }
        ]
      },
      {
        id: 'sem4-p405',
        code: 'ZOOL-405',
        title: 'Practical - VII: Applied Zoology & Immunology Lab',
        credits: 4,
        type: 'Core Practical',
        semester: 4,
        description: 'Ouchterlony double diffusion, rocket immunoelectrophoresis, ELISA demonstration, silk gland dissection, and sperm cryopreservation protocol.',
        units: [
          {
            unitNumber: 1,
            title: 'Immunological Assays',
            topics: ['Ouchterlony double immunodiffusion test for antibody-antigen precipitin line', 'Radial immunodiffusion (Mancini method) for antigen quantification', 'Sandwich ELISA protocol for cytokine estimation']
          },
          {
            unitNumber: 2,
            title: 'Applied Zoology Demonstrations',
            topics: ['Dissection of silk gland of silkworm larva (Bombyx mori)', 'Identification of commercial bee caste morphology (queen, drone, worker)', 'Observation of pearl oyster shell histology and mantle tissue']
          }
        ],
        resources: [
          {
            id: 'res-405-1',
            title: 'Immunology Practical Protocol & Safety SOP Sheet',
            type: 'Practical Manual',
            format: 'PDF',
            author: 'Immunology Laboratory Staff',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem4_p7',
            size: '7.9 MB',
            verified: true,
            downloads: 540
          }
        ]
      },
      {
        id: 'sem4-p406',
        code: 'ZOOL-406',
        title: 'Comprehensive Viva-Voce & Research Seminar',
        credits: 2,
        type: 'Dissertation',
        semester: 4,
        description: 'Departmental comprehensive defense evaluated by internal and external examiners across all four postgraduate semesters.',
        units: [
          {
            unitNumber: 1,
            title: 'Comprehensive Department Defense',
            topics: ['Defense of dissertation findings before faculty committee', 'Oral examination covering Core Semesters I to IV zoological disciplines']
          }
        ],
        resources: [
          {
            id: 'res-406-1',
            title: 'Previous Years Comprehensive Viva Question Repository',
            type: 'PYQ',
            format: 'PDF',
            author: 'Alumni Association BHU Zoology',
            driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_sem4_viva',
            size: '4.2 MB',
            verified: true,
            downloads: 880
          }
        ]
      }
    ]
  }
];

export const INITIAL_CONTRIBUTIONS: Contribution[] = [
  {
    id: 'contrib-1',
    title: 'Cell Signaling & GPCR Pathways Handwritten Notes with Diagrams',
    semester: 1,
    paperCode: 'ZOOL-103',
    resourceType: 'Notes',
    driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_student_notes_1',
    contributorName: 'Priya Sharma (MSc 2023-25)',
    studentRollNo: '23ZOOL014',
    description: 'Neatly organized lecture diagrams covering cAMP, IP3-DAG, and RTK cascade based on Prof. RK Singh lectures.',
    status: 'approved',
    submittedAt: '2025-10-14'
  },
  {
    id: 'contrib-2',
    title: 'Solved Question Bank 2019-2024 with Marking Rubric',
    semester: 2,
    paperCode: 'ZOOL-201',
    resourceType: 'PYQ',
    driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_student_notes_2',
    contributorName: 'Vikramaditya (MSc Zoology)',
    studentRollNo: '22ZOOL008',
    description: 'Fully compiled answers for aortic arches evolution, mammalian skull osteology, and cranial nerves tables.',
    status: 'approved',
    submittedAt: '2025-11-02'
  },
  {
    id: 'contrib-3',
    title: 'Winkler Titration & Water Quality Experimental Data Sheet',
    semester: 2,
    paperCode: 'ZOOL-206',
    resourceType: 'Practical Manual',
    driveUrl: 'https://drive.google.com/drive/folders/1bhu_zoology_student_notes_3',
    contributorName: 'Aditya Verma (Research Scholar)',
    studentRollNo: '24ZOOLRS03',
    description: 'Includes titration calculations, Ganga river sample data points at Assi Ghat, and DO formula sheets.',
    status: 'approved',
    submittedAt: '2026-01-20'
  }
];
