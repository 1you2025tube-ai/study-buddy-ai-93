// Mock Data for MedPrep AI Application

// User types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  plan: 'free' | 'pro_monthly' | 'pro_annual';
  tokens: number;
  university?: string;
  memberSince: string;
  streak: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  figureUrl?: string;
  figureCaption?: string;
  options: {
    letter: string;
    text: string;
    explanation: string;
    isCorrect: boolean;
  }[];
  professorsLogic: string;
  topic: string;
}

export interface QuizResult {
  id: string;
  date: string;
  topic: string;
  score: number;
  total: number;
  mode: 'tutor' | 'exam';
  questions: QuizQuestion[];
  userAnswers: { [questionId: string]: string };
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  topic: string;
  nextReview: Date;
  interval: number;
  easeFactor: number;
}

export interface Transaction {
  id: string;
  date: string;
  activity: string;
  model: string;
  tokensUsed: number;
  systemCost: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  type: 'review' | 'quiz';
  topic?: string;
}

// Mock User
export const mockUser: User = {
  id: '1',
  email: 'alex.müller@university.edu',
  fullName: 'Alex Müller',
  role: 'Medical Student',
  plan: 'free',
  tokens: 47,
  university: 'Ludwig-Maximilians-Universität',
  memberSince: '2024',
  streak: 7,
};

// Anatomy topics for random selection
export const anatomyTopics = [
  'Brachial Plexus',
  'Thoracic Wall',
  'Heart Anatomy',
  'Cranial Nerves',
  'Upper Limb Muscles',
  'Lower Limb Vasculature',
  'Abdominal Viscera',
  'Pelvic Floor',
  'Spinal Cord',
  'Autonomic Nervous System',
  'Head and Neck',
  'Respiratory System',
  'Digestive System',
  'Urogenital System',
  'Endocrine Glands',
];

// Mock Quiz Questions
export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'A 45-year-old patient presents with weakness in shoulder abduction and lateral rotation. EMG shows denervation of the supraspinatus and infraspinatus muscles. Which nerve is most likely injured?',
    options: [
      { letter: 'A', text: 'Axillary nerve', explanation: 'The axillary nerve innervates the deltoid and teres minor, not supraspinatus/infraspinatus.', isCorrect: false },
      { letter: 'B', text: 'Suprascapular nerve', explanation: 'Correct! The suprascapular nerve (C5-C6) innervates both supraspinatus and infraspinatus muscles.', isCorrect: true },
      { letter: 'C', text: 'Long thoracic nerve', explanation: 'The long thoracic nerve innervates serratus anterior, causing winged scapula when damaged.', isCorrect: false },
      { letter: 'D', text: 'Thoracodorsal nerve', explanation: 'The thoracodorsal nerve innervates latissimus dorsi.', isCorrect: false },
      { letter: 'E', text: 'Subscapular nerve', explanation: 'The subscapular nerves innervate subscapularis and teres major.', isCorrect: false },
    ],
    professorsLogic: 'The key clinical finding is weakness in BOTH abduction initiation (supraspinatus) AND lateral rotation (infraspinatus). Only the suprascapular nerve supplies both muscles. Remember: the suprascapular nerve passes through the suprascapular notch under the superior transverse scapular ligament.',
    topic: 'Brachial Plexus',
  },
  {
    id: 'q2',
    text: 'During a radical mastectomy, the long thoracic nerve is accidentally injured. Which clinical finding would you expect?',
    options: [
      { letter: 'A', text: 'Winged scapula', explanation: 'Correct! The long thoracic nerve innervates serratus anterior. When paralyzed, the medial border of the scapula protrudes posteriorly (winged scapula), especially when pushing against a wall.', isCorrect: true },
      { letter: 'B', text: 'Weakness of arm abduction above 90°', explanation: 'This would result from trapezius weakness (accessory nerve injury).', isCorrect: false },
      { letter: 'C', text: 'Loss of sensation over the deltoid', explanation: 'This indicates axillary nerve injury.', isCorrect: false },
      { letter: 'D', text: 'Weakness of elbow flexion', explanation: 'This would indicate musculocutaneous nerve injury.', isCorrect: false },
      { letter: 'E', text: 'Claw hand deformity', explanation: 'This results from ulnar nerve injury.', isCorrect: false },
    ],
    professorsLogic: 'The long thoracic nerve (C5-C7) runs on the surface of serratus anterior and is vulnerable during axillary surgery. Serratus anterior holds the scapula against the chest wall and rotates it for overhead arm movement.',
    topic: 'Brachial Plexus',
  },
  {
    id: 'q3',
    text: 'A patient cannot extend their wrist and fingers after falling asleep with their arm over a chair (Saturday night palsy). Which nerve is compressed?',
    options: [
      { letter: 'A', text: 'Median nerve', explanation: 'Median nerve injury causes weakness of forearm pronation, wrist flexion, and thenar muscles.', isCorrect: false },
      { letter: 'B', text: 'Ulnar nerve', explanation: 'Ulnar nerve injury causes weakness of intrinsic hand muscles and hypothenar muscles.', isCorrect: false },
      { letter: 'C', text: 'Radial nerve', explanation: 'Correct! The radial nerve spirals around the humerus in the radial groove and is vulnerable to compression there. It innervates all wrist and finger extensors.', isCorrect: true },
      { letter: 'D', text: 'Musculocutaneous nerve', explanation: 'Musculocutaneous nerve injury causes weakness of elbow flexion.', isCorrect: false },
      { letter: 'E', text: 'Axillary nerve', explanation: 'Axillary nerve injury causes weakness of shoulder abduction and lateral rotation.', isCorrect: false },
    ],
    professorsLogic: 'Saturday night palsy is a classic presentation of radial nerve compression in the spiral groove of the humerus. The characteristic finding is wrist drop due to paralysis of wrist and finger extensors. Sensory loss occurs over the anatomical snuffbox.',
    topic: 'Brachial Plexus',
  },
  {
    id: 'q4',
    text: 'Which structure passes through the foramen ovale of the skull?',
    options: [
      { letter: 'A', text: 'Maxillary nerve (V2)', explanation: 'V2 passes through the foramen rotundum.', isCorrect: false },
      { letter: 'B', text: 'Mandibular nerve (V3)', explanation: 'Correct! The mandibular division of the trigeminal nerve exits the skull through the foramen ovale.', isCorrect: true },
      { letter: 'C', text: 'Ophthalmic nerve (V1)', explanation: 'V1 passes through the superior orbital fissure.', isCorrect: false },
      { letter: 'D', text: 'Middle meningeal artery', explanation: 'The middle meningeal artery passes through the foramen spinosum.', isCorrect: false },
      { letter: 'E', text: 'Internal carotid artery', explanation: 'The internal carotid passes through the carotid canal.', isCorrect: false },
    ],
    professorsLogic: 'Remember the mnemonic for structures through skull foramina. Foramen Ovale = "O"val for "O"ne nerve = V3 (mandibular). Foramen Rotundum = "R"ound for V2 (maxillary "R"ound).',
    topic: 'Cranial Nerves',
  },
  {
    id: 'q5',
    text: 'A patient presents with ptosis, miosis, and anhidrosis on the left side of the face. This triad is known as:',
    options: [
      { letter: 'A', text: 'Bell palsy', explanation: 'Bell palsy affects the facial nerve (CN VII), causing facial muscle paralysis.', isCorrect: false },
      { letter: 'B', text: 'Horner syndrome', explanation: 'Correct! Horner syndrome results from disruption of sympathetic innervation to the face. Ptosis (mild, from superior tarsal muscle), miosis (from dilator pupillae), and anhidrosis (from sweat glands).', isCorrect: true },
      { letter: 'C', text: 'Marcus Gunn pupil', explanation: 'This is a relative afferent pupillary defect seen in optic nerve lesions.', isCorrect: false },
      { letter: 'D', text: 'Argyll Robertson pupil', explanation: 'These pupils accommodate but do not react to light (neurosyphilis).', isCorrect: false },
      { letter: 'E', text: 'Holmes-Adie syndrome', explanation: 'This causes a dilated, poorly reactive pupil with absent deep tendon reflexes.', isCorrect: false },
    ],
    professorsLogic: 'Horner syndrome is caused by disruption anywhere along the three-neuron sympathetic pathway: hypothalamus → C8-T2 (ciliospinal center) → superior cervical ganglion → target organs. Common causes include Pancoast tumor, carotid dissection, and brainstem stroke.',
    topic: 'Autonomic Nervous System',
  },
  {
    id: 'q6',
    text: 'The coronary sinus drains into which chamber of the heart?',
    options: [
      { letter: 'A', text: 'Left atrium', explanation: 'The left atrium receives oxygenated blood from the pulmonary veins.', isCorrect: false },
      { letter: 'B', text: 'Right atrium', explanation: 'Correct! The coronary sinus, which collects venous blood from the heart wall, drains into the right atrium between the opening of the inferior vena cava and the tricuspid valve.', isCorrect: true },
      { letter: 'C', text: 'Left ventricle', explanation: 'The left ventricle pumps blood into the aorta.', isCorrect: false },
      { letter: 'D', text: 'Right ventricle', explanation: 'The right ventricle pumps blood to the pulmonary trunk.', isCorrect: false },
      { letter: 'E', text: 'Superior vena cava', explanation: 'The SVC drains into the right atrium, not the coronary sinus.', isCorrect: false },
    ],
    professorsLogic: 'All venous blood must return to the right atrium. The coronary sinus is the main venous drainage of the heart and opens into the right atrium. The opening is guarded by the valve of the coronary sinus (Thebesian valve).',
    topic: 'Heart Anatomy',
  },
  {
    id: 'q7',
    text: 'Which intercostal space is used for chest tube insertion in the mid-axillary line for pneumothorax?',
    options: [
      { letter: 'A', text: '2nd intercostal space', explanation: 'This is the site for needle decompression (mid-clavicular line), not chest tube insertion.', isCorrect: false },
      { letter: 'B', text: '3rd intercostal space', explanation: 'Too high for safe chest tube insertion.', isCorrect: false },
      { letter: 'C', text: '4th-5th intercostal space', explanation: 'Correct! The safe triangle for chest tube insertion is bounded by the lateral edge of pectoralis major, the lateral edge of latissimus dorsi, and a horizontal line at nipple level (4th-5th ICS).', isCorrect: true },
      { letter: 'D', text: '7th intercostal space', explanation: 'Too low - risk of entering the abdominal cavity and injuring the diaphragm or liver.', isCorrect: false },
      { letter: 'E', text: '9th intercostal space', explanation: 'Below the dome of the diaphragm - high risk of abdominal injury.', isCorrect: false },
    ],
    professorsLogic: 'The "safe triangle" is the preferred site for chest tube insertion. Insert just above the rib (to avoid the neurovascular bundle running in the costal groove) at the 4th-5th intercostal space in the mid-axillary line.',
    topic: 'Thoracic Wall',
  },
  {
    id: 'q8',
    text: 'A stab wound to the posterior triangle of the neck most likely injures which nerve?',
    options: [
      { letter: 'A', text: 'Hypoglossal nerve', explanation: 'The hypoglossal nerve runs deep in the neck, below the posterior belly of digastric.', isCorrect: false },
      { letter: 'B', text: 'Vagus nerve', explanation: 'The vagus runs in the carotid sheath in the anterior triangle.', isCorrect: false },
      { letter: 'C', text: 'Accessory nerve', explanation: 'Correct! The accessory nerve (CN XI) crosses the posterior triangle superficially, making it vulnerable to injury. It supplies trapezius and sternocleidomastoid.', isCorrect: true },
      { letter: 'D', text: 'Phrenic nerve', explanation: 'The phrenic nerve runs deep on the anterior surface of scalenus anterior.', isCorrect: false },
      { letter: 'E', text: 'Facial nerve', explanation: 'The facial nerve exits the skull through the stylomastoid foramen and enters the parotid gland.', isCorrect: false },
    ],
    professorsLogic: 'The accessory nerve is the most superficial structure crossing the posterior triangle. Injury causes weakness of shoulder shrug (trapezius) and head turning to the opposite side (sternocleidomastoid). The posterior triangle is bounded by sternocleidomastoid, trapezius, and the middle third of the clavicle.',
    topic: 'Head and Neck',
  },
  {
    id: 'q9',
    text: 'Which ligament prevents posterior dislocation of the femur on the tibia?',
    options: [
      { letter: 'A', text: 'Anterior cruciate ligament (ACL)', explanation: 'The ACL prevents anterior tibial translation and limits hyperextension.', isCorrect: false },
      { letter: 'B', text: 'Posterior cruciate ligament (PCL)', explanation: 'Correct! The PCL prevents posterior displacement of the tibia relative to the femur. Dashboard injury (where the tibia is pushed posteriorly) classically tears the PCL.', isCorrect: true },
      { letter: 'C', text: 'Medial collateral ligament (MCL)', explanation: 'The MCL resists valgus stress at the knee.', isCorrect: false },
      { letter: 'D', text: 'Lateral collateral ligament (LCL)', explanation: 'The LCL resists varus stress at the knee.', isCorrect: false },
      { letter: 'E', text: 'Patellar ligament', explanation: 'The patellar ligament connects the patella to the tibial tuberosity.', isCorrect: false },
    ],
    professorsLogic: 'The cruciate ligaments are named for their tibial attachments. The PCL is the strongest ligament in the knee and prevents posterior tibial translation. Classic mechanism: dashboard injury in a car accident.',
    topic: 'Lower Limb Vasculature',
  },
  {
    id: 'q10',
    text: 'The pudendal nerve arises from which spinal cord segments?',
    options: [
      { letter: 'A', text: 'L2-L4', explanation: 'L2-L4 gives rise to the femoral nerve and obturator nerve.', isCorrect: false },
      { letter: 'B', text: 'L4-S1', explanation: 'L4-S1 contributes to the sciatic nerve.', isCorrect: false },
      { letter: 'C', text: 'S2-S4', explanation: 'Correct! The pudendal nerve (S2-S4) is the main nerve of the perineum. It supplies most of the skin and muscles of the perineum and is blocked during childbirth (pudendal block).', isCorrect: true },
      { letter: 'D', text: 'T12-L2', explanation: 'T12-L2 gives rise to the ilioinguinal and genitofemoral nerves.', isCorrect: false },
      { letter: 'E', text: 'S1-S3', explanation: 'Close, but the correct segments are S2-S4 for the pudendal nerve.', isCorrect: false },
    ],
    professorsLogic: 'Remember "S2, 3, 4 keeps the pelvic floor off the floor." The pudendal nerve exits the pelvis through the greater sciatic foramen, hooks around the ischial spine, and re-enters through the lesser sciatic foramen to reach the perineum.',
    topic: 'Pelvic Floor',
  },
];

// Mock Quiz History
export const mockQuizHistory: QuizResult[] = [
  {
    id: 'r1',
    date: '2024-01-28',
    topic: 'Brachial Plexus',
    score: 8,
    total: 10,
    mode: 'tutor',
    questions: mockQuizQuestions.slice(0, 3),
    userAnswers: { q1: 'B', q2: 'A', q3: 'C' },
  },
  {
    id: 'r2',
    date: '2024-01-27',
    topic: 'Cranial Nerves',
    score: 7,
    total: 10,
    mode: 'exam',
    questions: mockQuizQuestions.slice(3, 5),
    userAnswers: { q4: 'B', q5: 'B' },
  },
  {
    id: 'r3',
    date: '2024-01-26',
    topic: 'Heart Anatomy',
    score: 9,
    total: 10,
    mode: 'tutor',
    questions: mockQuizQuestions.slice(5, 7),
    userAnswers: { q6: 'B', q7: 'C' },
  },
  {
    id: 'r4',
    date: '2024-01-25',
    topic: 'Head and Neck',
    score: 6,
    total: 10,
    mode: 'exam',
    questions: mockQuizQuestions.slice(7, 8),
    userAnswers: { q8: 'C' },
  },
  {
    id: 'r5',
    date: '2024-01-24',
    topic: 'Pelvic Floor',
    score: 8,
    total: 10,
    mode: 'tutor',
    questions: mockQuizQuestions.slice(9, 10),
    userAnswers: { q10: 'C' },
  },
];

// Mock Flashcards
export const mockFlashcards: FlashCard[] = [
  {
    id: 'f1',
    front: 'Which nerve innervates the supraspinatus and infraspinatus muscles?',
    back: 'Suprascapular nerve (C5-C6)',
    topic: 'Brachial Plexus',
    nextReview: new Date(),
    interval: 1,
    easeFactor: 2.5,
  },
  {
    id: 'f2',
    front: 'What is the classic presentation of long thoracic nerve injury?',
    back: 'Winged scapula - the medial border of the scapula protrudes posteriorly',
    topic: 'Brachial Plexus',
    nextReview: new Date(),
    interval: 1,
    easeFactor: 2.5,
  },
  {
    id: 'f3',
    front: 'Which structure passes through the foramen ovale?',
    back: 'Mandibular nerve (V3)',
    topic: 'Cranial Nerves',
    nextReview: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    interval: 3,
    easeFactor: 2.6,
  },
  {
    id: 'f4',
    front: 'What triad defines Horner syndrome?',
    back: 'Ptosis, Miosis, Anhidrosis (on the affected side)',
    topic: 'Autonomic Nervous System',
    nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    interval: 7,
    easeFactor: 2.8,
  },
  {
    id: 'f5',
    front: 'Into which chamber does the coronary sinus drain?',
    back: 'Right atrium',
    topic: 'Heart Anatomy',
    nextReview: new Date(),
    interval: 1,
    easeFactor: 2.5,
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  { id: 't1', date: '2024-01-28', activity: 'Quiz Generated', model: 'GPT-4', tokensUsed: 1, systemCost: '$0.03' },
  { id: 't2', date: '2024-01-27', activity: 'Quiz Generated', model: 'GPT-4', tokensUsed: 1, systemCost: '$0.03' },
  { id: 't3', date: '2024-01-26', activity: 'Quiz Generated', model: 'GPT-4', tokensUsed: 1, systemCost: '$0.03' },
  { id: 't4', date: '2024-01-26', activity: 'Demo Token Refill', model: 'System', tokensUsed: -5, systemCost: '$0.00' },
  { id: 't5', date: '2024-01-25', activity: 'Quiz Generated', model: 'GPT-4', tokensUsed: 1, systemCost: '$0.03' },
];

// Mock Daily Missions
export const mockDailyMissions: DailyMission[] = [
  {
    id: 'm1',
    title: 'Review Due Cards',
    description: '3 flashcards are due for review',
    type: 'review',
  },
  {
    id: 'm2',
    title: 'Strengthen Weak Area',
    description: 'Practice your weakest topic',
    type: 'quiz',
    topic: 'Pelvic Floor',
  },
  {
    id: 'm3',
    title: 'Daily Challenge',
    description: 'Complete a 10-question quiz',
    type: 'quiz',
    topic: 'Brachial Plexus',
  },
];

// Performance data for charts
export const mockPerformanceByTopic = [
  { topic: 'Brachial Plexus', accuracy: 80 },
  { topic: 'Cranial Nerves', accuracy: 70 },
  { topic: 'Heart Anatomy', accuracy: 90 },
  { topic: 'Thoracic Wall', accuracy: 85 },
  { topic: 'Head and Neck', accuracy: 60 },
  { topic: 'Pelvic Floor', accuracy: 75 },
];

// Pricing plans
export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For casual review',
    price: 0,
    period: 'month',
    features: ['50 tokens/day', 'Basic quizzes', 'No history'],
    popular: false,
  },
  {
    id: 'pro_monthly',
    name: 'Pro Monthly',
    description: 'Serious prep',
    price: 9.99,
    period: 'month',
    features: ['1,200 tokens/month', 'Advanced analytics', 'SRS memory coach', 'Full quiz history'],
    popular: true,
  },
  {
    id: 'pro_annual',
    name: 'Annual',
    description: 'Commit & save',
    price: 99,
    period: 'year',
    features: ['15,000 tokens/year', 'Priority support', 'All Pro features', 'Save 17%'],
    popular: false,
  },
];

// Exam styles
export const examStyles = [
  { value: 'impp', label: 'IMPP (Germany Physikum/M2)' },
  { value: 'iranian', label: 'Iranian Residency' },
  { value: 'usmle', label: 'USMLE (USA Step 1/2)' },
  { value: 'plab', label: 'PLAB (UK Part 1)' },
  { value: 'mccqe', label: 'MCCQE (Canada)' },
  { value: 'amc', label: 'AMC (Australia)' },
  { value: 'nzrex', label: 'NZREX (New Zealand)' },
  { value: 'clinical', label: 'Clinical Case (General Vignette)' },
  { value: 'flashcard', label: 'Flashcard (Recall)' },
];

// Languages
export const languages = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German' },
  { value: 'fa', label: 'Persian' },
];
