/**
 * ECE MAKAUT Short Notes - Academic Data Catalog
 * 
 * Author: Biraj Sarkar
 * Department: Electronics & Communication Engineering (ECE)
 * Institution: Cooch Behar Government Engineering College (CGEC)
 * Affiliation: Maulana Abul Kalam Azad University of Technology (MAKAUT)
 * Academic Batch: 2023-2027
 * License: CC BY-NC-SA 4.0 (Non-Commercial Educational Use Only - Resale Strictly Prohibited)
 */

const AcademicCatalog = (function () {
  'use strict';

  const META = {
    title: 'ECE MAKAUT Short Notes Portal',
    author: 'Biraj Sarkar',
    department: 'Electronics & Communication Engineering',
    institution: 'Cooch Behar Government Engineering College (CGEC)',
    affiliation: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    batch: '2023-2027',
    degree: 'B.Tech in Electronics & Communication Engineering',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    repoUrl: 'https://github.com/Biraj2004/ECE_MAKAUT_Short-Notes'
  };

  const SEMESTERS = [
    {
      id: 'sem-1',
      number: 1,
      name: '1st Semester',
      code: 'SEM-I',
      status: 'ready',
      curricula: [
        {
          title: '2026–27 Curriculum',
          searchAliases: 'new',
          syllabusPdf: {
            title: '2026–27 Curriculum Syllabus',
            path: '1st SEM/New Syllabus Subjects/SEM-1 NEW_ECE_MAKAUT_SYLLABUS_2026-27.pdf',
            description: 'MAKAUT NEP 2020 first-year curriculum, effective from academic year 2026–27.'
          },
          subjects: [
            {
              code: '26-ES-EE101',
              name: 'Basic Electrical and Electronics Engineering',
              folder: '1st SEM/New Syllabus Subjects/01. Basic Electrical and Electronics Engineering',
              combinedPdf: '26-ES-EE101_Basic_Electrical_and_Electronics_Engineering.pdf',
              category: 'Engineering Science',
              modules: [
                { number: 1, name: 'Basics of Electrical Wiring and Safety', file: '26-ES-EE101_Module1_Notes.pdf' },
                { number: 2, name: 'Direct-Current Circuits', file: '26-ES-EE101_Module2_Notes.pdf' },
                { number: 3, name: 'Alternating-Current Circuits', file: '26-ES-EE101_Module3_Notes.pdf' },
                { number: 4, name: 'Transformers and Rotating Machines', file: '26-ES-EE101_Module4_Notes.pdf' },
                { number: 5, name: 'Semiconductor Fundamentals and Diode Applications', file: '26-ES-EE101_Module5_Notes.pdf' },
                { number: 6, name: 'Transistors and Operational Amplifiers', file: '26-ES-EE101_Module6_Notes.pdf' }
              ]
            }
          ]
        },
        {
          title: 'Previous Curriculum',
          searchAliases: 'old legacy',
          syllabusPdf: {
            title: 'Previous Curriculum Syllabus',
            path: '1st SEM/SEM-1 OLD_ECE_MAKAUT_SYLLABUS.pdf',
            description: 'Earlier MAKAUT ECE curriculum for Physics-I and Chemistry-I.'
          },
          subjects: [
            {
              code: 'BS-CH101',
              name: 'Chemistry-I',
              folder: '1st SEM/01. Chemistry-I',
              combinedPdf: 'BS-CH101_ChemistryI.pdf',
              category: 'Basic Science',
              modules: [
                { number: 1, name: 'Atomic and Molecular Structure', file: 'BS-CH101_Module1_Notes.pdf' },
                { number: 2, name: 'Spectroscopic Techniques and Applications', file: 'BS-CH101_Module2_Notes.pdf' },
                { number: 3, name: 'Intermolecular Forces and Potential Energy Surfaces', file: 'BS-CH101_Module3_Notes.pdf' },
                { number: 4, name: 'Free Energy and Chemical Equilibria', file: 'BS-CH101_Module4_Notes.pdf' },
                { number: 5, name: 'Periodic Properties', file: 'BS-CH101_Module5_Notes.pdf' },
                { number: 6, name: 'Stereochemistry', file: 'BS-CH101_Module6_Notes.pdf' },
                { number: 7, name: 'Organic Reactions and Drug Molecule Synthesis', file: 'BS-CH101_Module7_Notes.pdf' }
              ]
            },
            {
              code: 'BS-PH101',
              name: 'Physics-I',
              folder: '1st SEM/02. Physics-I',
              combinedPdf: 'BS-PH101_PhysicsI.pdf',
              category: 'Basic Science',
              modules: [
                { number: 1, name: 'Mechanics', file: 'BS-PH101_Module1_Notes.pdf' },
                { number: 2, name: 'Optics', file: 'BS-PH101_Module2_Notes.pdf' },
                { number: 3, name: 'Electromagnetism & Materials', file: 'BS-PH101_Module3_Notes.pdf' },
                { number: 4, name: 'Quantum Mechanics', file: 'BS-PH101_Module4_Notes.pdf' },
                { number: 5, name: 'Statistical Mechanics', file: 'BS-PH101_Module5_Notes.pdf' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sem-2',
      number: 2,
      name: '2nd Semester',
      code: 'SEM-II',
      status: 'ready',
      curricula: [
        {
          title: '2026–27 Curriculum',
          searchAliases: 'new',
          syllabusPdf: {
            title: '2026–27 Curriculum Syllabus',
            path: '2nd SEM/New Syllabus Subjects/SEM-2 NEW_ECE_MAKAUT_SYLLABUS_2026-27.pdf',
            description: 'MAKAUT NEP 2020 first-year curriculum, effective from academic year 2026–27.'
          },
          subjects: [],
          emptyNote: 'Combined notes are pending'
        },
        {
          title: 'Previous Curriculum',
          searchAliases: 'old legacy',
          syllabusPdf: {
            title: 'Previous Curriculum Syllabus',
            path: '2nd SEM/SEM-2 OLD_ECE_MAKAUT_SYLLABUS.pdf',
            description: 'Earlier MAKAUT ECE curriculum for Physics-I and Chemistry-I.'
          },
          subjects: [
            {
              code: 'BS-CH101',
              name: 'Chemistry-I',
              folder: '2nd SEM/01. Chemistry-I',
              combinedPdf: 'BS-CH101_ChemistryI.pdf',
              category: 'Basic Science',
              modules: [
                { number: 1, name: 'Atomic and Molecular Structure', file: 'BS-CH101_Module1_Notes.pdf' },
                { number: 2, name: 'Spectroscopic Techniques and Applications', file: 'BS-CH101_Module2_Notes.pdf' },
                { number: 3, name: 'Intermolecular Forces and Potential Energy Surfaces', file: 'BS-CH101_Module3_Notes.pdf' },
                { number: 4, name: 'Free Energy and Chemical Equilibria', file: 'BS-CH101_Module4_Notes.pdf' },
                { number: 5, name: 'Periodic Properties', file: 'BS-CH101_Module5_Notes.pdf' },
                { number: 6, name: 'Stereochemistry', file: 'BS-CH101_Module6_Notes.pdf' },
                { number: 7, name: 'Organic Reactions and Drug Molecule Synthesis', file: 'BS-CH101_Module7_Notes.pdf' }
              ]
            },
            {
              code: 'BS-PH101',
              name: 'Physics-I',
              folder: '2nd SEM/02. Physics-I',
              combinedPdf: 'BS-PH101_PhysicsI.pdf',
              category: 'Basic Science',
              modules: [
                { number: 1, name: 'Mechanics', file: 'BS-PH101_Module1_Notes.pdf' },
                { number: 2, name: 'Optics', file: 'BS-PH101_Module2_Notes.pdf' },
                { number: 3, name: 'Electromagnetism & Materials', file: 'BS-PH101_Module3_Notes.pdf' },
                { number: 4, name: 'Quantum Mechanics', file: 'BS-PH101_Module4_Notes.pdf' },
                { number: 5, name: 'Statistical Mechanics', file: 'BS-PH101_Module5_Notes.pdf' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sem-3',
      number: 3,
      name: '3rd Semester',
      code: 'SEM-III',
      status: 'in-progress',
      syllabusPdf: {
        title: 'MAKAUT 3rd Semester Syllabus',
        path: '3rd SEM/SEM-3 ECE_MAKAUT_SYLLABUS.pdf',
        description: 'Official course structure and detailed syllabus.'
      },
      subjects: [
        {
          code: 'EC301',
          name: 'Electronic Devices',
          folder: '3rd SEM/01. Electronic Devices',
          combinedPdf: 'EC301_Electronic_Devices.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Energy Bands & Current Carriers in Semiconductors', file: 'EC301_Module1_Notes.pdf' },
            { number: 2, name: 'P-N Junction & Bipolar Junction Transistor', file: 'EC301_Module2_Notes.pdf' },
            { number: 3, name: 'MOSFET Physics, C-V & Small Signal Models', file: 'EC301_Module3_Notes.pdf' },
            { number: 4, name: 'Opto-Electronics & IC Fabrication Process', file: 'EC301_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'EC302',
          name: 'Digital System Design',
          folder: '3rd SEM/02. Digital System Design',
          combinedPdf: 'EC302_Digital_System_Design.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Number Systems, Boolean Algebra & Combinational Logic', file: 'EC302_Module1_Notes.pdf' },
            { number: 2, name: 'Sequential Logic Design, Counters & FSM', file: 'EC302_Module2_Notes.pdf' },
            { number: 3, name: 'Logic Families, Memories, PLDs & Data Converters', file: 'EC302_Module3_Notes.pdf' },
            { number: 4, name: 'VLSI Design Flow & VHDL Modeling', file: 'EC302_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'EC303',
          name: 'Signals and System',
          folder: '3rd SEM/03. Signals and System',
          combinedPdf: 'EC303_Signals_and_System.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Signal Classifications, Elementary Signals & System Properties', file: 'EC303_Module1_Notes.pdf' },
            { number: 2, name: 'Linear Shift-Invariant Systems & Convolution', file: 'EC303_Module2_Notes.pdf' },
            { number: 3, name: 'Fourier Analysis, Frequency Response & Signal Space', file: 'EC303_Module3_Notes.pdf' },
            { number: 4, name: 'Laplace Transform, Z-Transform & LSI System Analysis', file: 'EC303_Module4_Notes.pdf' },
            { number: 5, name: 'The Sampling Theorem & Signal Reconstruction', file: 'EC303_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'EC304',
          name: 'Network Theory',
          folder: '3rd SEM/04. Network Theory',
          combinedPdf: 'EC304_Network_Theory.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Mesh, Nodal Analysis and AC Network Theorems', file: 'EC304_Module1_Notes.pdf' },
            { number: 2, name: 'Fourier Analysis and Three-Phase Unbalanced Systems', file: 'EC304_Module2_Notes.pdf' },
            { number: 3, name: 'Laplace Transforms, Network Transients & Initial Conditions', file: 'EC304_Module3_Notes.pdf' },
            { number: 4, name: 'Network Functions, Two-Port Networks, Resonance & Filters', file: 'EC304_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'ES-CS301',
          name: 'Data Structure and Algorithms',
          folder: '3rd SEM/05. Data Structure and Algorithms',
          combinedPdf: 'ES-CS301_Data_Structure_and_Algorithms.pdf',
          category: 'Engineering Science',
          modules: [
            { number: 1, name: 'Introduction, Algorithm Analysis and Searching', file: 'ES-CS301_Module1_Notes.pdf' },
            { number: 2, name: 'Stacks and Queues: Principles, Operations and Applications', file: 'ES-CS301_Module2_Notes.pdf' },
            { number: 3, name: 'Linked Lists and Tree Data Structures', file: 'ES-CS301_Module3_Notes.pdf' },
            { number: 4, name: 'Sorting Algorithms, Hashing Techniques and Graph Theory', file: 'ES-CS301_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'BS-M301',
          name: 'Probability and Statistics',
          folder: '3rd SEM/06. Probability and Statistics',
          combinedPdf: 'BS-M301_Probability_and_Statistics.pdf',
          category: 'Basic Science',
          modules: [
            { number: 1, name: 'Basic Probability, Discrete Random Variables and Inequalities', file: 'BS-M301_Module1_Notes.pdf' },
            { number: 2, name: 'Continuous Probability Distributions', file: 'BS-M301_Module2_Notes.pdf' },
            { number: 3, name: 'Bivariate Distributions, Sums, Quotients and Bayes’ Rule', file: 'BS-M301_Module3_Notes.pdf' },
            { number: 4, name: 'Basic Statistics, Moments, Distributions, Correlation and Regression', file: 'BS-M301_Module4_Notes.pdf' },
            { number: 5, name: 'Applied Statistics, Curve Fitting and Tests of Significance', file: 'BS-M301_Module5_Notes.pdf' },
            { number: 6, name: 'Small Samples, t-, F- and Chi-Square Tests', file: 'BS-M301_Module6_Notes.pdf' }
          ]
        }
      ]
    },
    {
      id: 'sem-4',
      number: 4,
      name: '4th Semester',
      code: 'SEM-IV',
      status: 'in-progress',
      syllabusPdf: {
        title: 'MAKAUT 4th Semester Syllabus',
        path: '4th SEM/SEM-4 ECE_MAKAUT_SYLLABUS.pdf',
        description: 'Official course structure and detailed syllabus.'
      },
      subjects: [
        {
          code: 'EC401',
          name: 'Analog Communication',
          folder: '4th SEM/01. Analog Communication',
          combinedPdf: 'EC401_Analog_Communication.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Introduction and Continuous Wave Linear Modulation', file: 'EC401_Module1_Notes.pdf' },
            { number: 2, name: 'AM and SSB Generation, Detection and Superheterodyne Reception', file: 'EC401_Module2_Notes.pdf' },
            { number: 3, name: 'Angle Modulation, Generation and Demodulation', file: 'EC401_Module3_Notes.pdf' },
            { number: 4, name: 'Multiplexing, Stereo, Random Signals and Noise', file: 'EC401_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'EC402',
          name: 'Analog Circuits',
          folder: '4th SEM/02. Analog Circuits',
          combinedPdf: 'EC402_Analog_Circuits.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Diode Circuits, Amplifier Models and Transistor Biasing', file: 'EC402_Module1_Notes.pdf' },
            { number: 2, name: 'High Frequency Models, Frequency Response, Power Amplifiers and Feedback', file: 'EC402_Module2_Notes.pdf' },
            { number: 3, name: 'Oscillators, Multivibrators and Current Mirrors', file: 'EC402_Module3_Notes.pdf' },
            { number: 4, name: 'Differential Amplifiers, Op-Amps and Active Filters', file: 'EC402_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'EC403',
          name: 'Microprocessor and Microcontroller',
          folder: '4th SEM/03. Microprocessor and Microcontroller',
          combinedPdf: 'EC403_Microprocessor_and_Microcontroller.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: '8085 and 8086 Microprocessor Systems', file: 'EC403_Module1_Notes.pdf' },
            { number: 2, name: 'Peripheral Interfacing and Arithmetic Coprocessors', file: 'EC403_Module2_Notes.pdf' },
            { number: 3, name: 'Memory Hierarchy, Advanced x86 and 8051', file: 'EC403_Module3_Notes.pdf' },
            { number: 4, name: 'RISC Processors and ARM Interface Design', file: 'EC403_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'ES-CS401',
          name: 'Design and Analysis of Algorithms',
          folder: '4th SEM/04. Design and Analysis of Algorithms',
          combinedPdf: 'ES-CS401_Design_and_Analysis_of_Algorithms.pdf',
          category: 'Engineering Science',
          modules: [
            { number: 1, name: 'Algorithm Analysis and Recurrence Relations', file: 'ES-CS401_Module1_Notes.pdf' },
            { number: 2, name: 'Algorithm Design Strategies', file: 'ES-CS401_Module2_Notes.pdf' },
            { number: 3, name: 'Graph and Tree Algorithms', file: 'ES-CS401_Module3_Notes.pdf' },
            { number: 4, name: 'Computability and NP-Completeness', file: 'ES-CS401_Module4_Notes.pdf' },
            { number: 5, name: 'Approximation, Randomization and PSPACE', file: 'ES-CS401_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'BS-M401',
          name: 'Numerical Methods',
          folder: '4th SEM/05. Numerical Methods',
          combinedPdf: 'BS-M401_Numerical_Methods.pdf',
          category: 'Basic Science',
          modules: [
            { number: 1, name: 'Numerical Errors, Interpolation and Integration', file: 'BS-M401_Module1_Notes.pdf' },
            { number: 2, name: 'Linear Systems and Nonlinear Equations', file: 'BS-M401_Module2_Notes.pdf' },
            { number: 3, name: 'Numerical Solutions of Ordinary Differential Equations', file: 'BS-M401_Module3_Notes.pdf' }
          ]
        },
        {
          code: 'BS-B401',
          name: 'Biology for Engineers',
          folder: '4th SEM/06. Biology for Engineers',
          combinedPdf: 'BS-B401_Biology_for_Engineers.pdf',
          category: 'Basic Science',
          modules: [
            { number: 1, name: 'Biology and Engineering', file: 'BS-B401_Module1_Notes.pdf' },
            { number: 2, name: 'Classification and Model Organisms', file: 'BS-B401_Module2_Notes.pdf' },
            { number: 3, name: 'Genetics', file: 'BS-B401_Module3_Notes.pdf' },
            { number: 4, name: 'Biomolecules', file: 'BS-B401_Module4_Notes.pdf' },
            { number: 5, name: 'Enzymes', file: 'BS-B401_Module5_Notes.pdf' },
            { number: 6, name: 'Information Transfer', file: 'BS-B401_Module6_Notes.pdf' },
            { number: 7, name: 'Macromolecular Analysis', file: 'BS-B401_Module7_Notes.pdf' },
            { number: 8, name: 'Metabolism', file: 'BS-B401_Module8_Notes.pdf' },
            { number: 9, name: 'Microbiology', file: 'BS-B401_Module9_Notes.pdf' }
          ]
        }
      ]
    },
    {
      id: 'sem-5',
      number: 5,
      name: '5th Semester',
      code: 'SEM-V',
      status: 'in-progress',
      syllabusPdf: {
        title: 'MAKAUT 5th Semester Syllabus',
        path: '5th SEM/SEM-5 ECE_MAKAUT_SYLLABUS.pdf',
        description: 'Official course structure and detailed syllabus.'
      },
      subjects: [
        {
          code: 'EC501',
          name: 'Electromagnetic Waves',
          folder: '5th SEM/01. Electromagnetic Waves',
          combinedPdf: 'EC501_Electromagnetic_Waves.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Vectors, Maxwell Equations and Boundaries', file: 'EC501_Module1_Notes.pdf' },
            { number: 2, name: 'Uniform Plane Waves and Media Interfaces', file: 'EC501_Module2_Notes.pdf' },
            { number: 3, name: 'Transmission Lines and Smith Chart', file: 'EC501_Module3_Notes.pdf' },
            { number: 4, name: 'Parallel-Plate and Rectangular Waveguides', file: 'EC501_Module4_Notes.pdf' },
            { number: 5, name: 'Radiation and Antennas', file: 'EC501_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'EC502',
          name: 'Computer Architecture',
          folder: '5th SEM/02. Computer Architecture',
          combinedPdf: 'EC502_Computer_Architecture.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Computer Structure and Instruction Sets', file: 'EC502_Module1_Notes.pdf' },
            { number: 2, name: 'Processor Organisation and Data Representation', file: 'EC502_Module2_Notes.pdf' },
            { number: 3, name: 'Computer Arithmetic and ALU Design', file: 'EC502_Module3_Notes.pdf' },
            { number: 4, name: 'Hardwired and Microprogrammed Control', file: 'EC502_Module4_Notes.pdf' },
            { number: 5, name: 'Memory Organisation and Virtual Memory', file: 'EC502_Module5_Notes.pdf' },
            { number: 6, name: 'System Organisation and Input Output', file: 'EC502_Module6_Notes.pdf' },
            { number: 7, name: 'Pipelining and Parallel Processing', file: 'EC502_Module7_Notes.pdf' }
          ]
        },
        { code: 'EC503', name: 'Digital Communication and Stochastic Process', category: 'Professional Core', status: 'pending' },
        { code: 'EC504', name: 'Digital Signal Processing', category: 'Professional Core', status: 'pending' },
        { code: 'PE-EC505A', name: 'Nano Electronics', category: 'Professional Elective', status: 'pending' },
        { code: 'PE-EC505B', name: 'Speech and Audio Processing', category: 'Professional Elective', status: 'pending' },
        { code: 'PE-EC505C', name: 'Power Electronics', category: 'Professional Elective', status: 'pending' },
        { code: 'PE-EC505D', name: 'Scientific Computing', category: 'Professional Elective', status: 'pending' },
        { code: 'OE-EC506A', name: 'Soft Skill and Interpersonal Communication', category: 'Open Elective', status: 'pending' },
        { code: 'OE-EC506B', name: 'Cyber Law & Intellectual Property Rights', category: 'Open Elective', status: 'pending' },
        { code: 'OE-EC506C', name: 'Human Resource Management', category: 'Open Elective', status: 'pending' }
      ]
    },
    {
      id: 'sem-6',
      number: 6,
      name: '6th Semester',
      code: 'SEM-VI',
      status: 'ready',
      description: 'Control Systems, Networking, CMOS VLSI Design, MEMS & Operating Systems',
      syllabusPdf: {
        title: 'MAKAUT 6th Semester Official Syllabus',
        path: '6th SEM/SEM-6 ECE_MAKAUT_SYLLABUS.pdf',
        description: 'Official MAKAUT Semester VI detailed syllabus document with course outcomes'
      },
      extraResources: [
        {
          title: 'ECE 6th SEM Video Lectures & Reference Guide',
          path: '6th SEM/ECE 6th SEM YT Playlist.pdf',
          type: 'Curated Resource Guide'
        }
      ],
      subjects: [
        {
          code: 'EC601',
          name: 'Control System',
          folder: '6th SEM/01. Control System',
          combinedPdf: 'EC601_Control_System.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Introduction to Control Systems', file: 'EC601_Module1_Notes.pdf' },
            { number: 2, name: 'Stability of Feedback Control Systems', file: 'EC601_Module2_Notes.pdf' },
            { number: 3, name: 'Time Response of Second-Order Systems', file: 'EC601_Module3_Notes.pdf' },
            { number: 4, name: 'Frequency Response Analysis — Introduction', file: 'EC601_Module4_Notes.pdf' },
            { number: 5, name: 'State Variable Analysis — Introduction', file: 'EC601_Module5_Notes.pdf' },
            { number: 6, name: 'Nonlinear Control Systems — Basic Concepts', file: 'EC601_Module6_Notes.pdf' },
            { number: 7, name: 'Cathode Ray Oscilloscope (CRO)', file: 'EC601_Module7_Notes.pdf' }
          ]
        },
        {
          code: 'EC602',
          name: 'Computer Network',
          folder: '6th SEM/02. Computer Network',
          combinedPdf: 'EC602_Computer_Network.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Overview of Data Communication and Networking', file: 'EC602_Module1_Notes.pdf' },
            { number: 2, name: 'Data Link Layer', file: 'EC602_Module2_Notes.pdf' },
            { number: 3, name: 'Network Layer', file: 'EC602_Module3_Notes.pdf' },
            { number: 4, name: 'Application Layer Protocols', file: 'EC602_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'HS-HU601',
          name: 'Economics For Engineers',
          folder: '6th SEM/03. Economics For Engineers',
          combinedPdf: 'HS-HU601_Economics_for_Engineers.pdf',
          category: 'Humanities & Social Sciences',
          modules: [
            { number: 1, name: 'Economic Decision Making', file: 'HS-HU601_Module1_Notes.pdf' },
            { number: 2, name: 'Cash Flow, Interest, and Equivalence', file: 'HS-HU601_Module2_Notes.pdf' },
            { number: 3, name: 'Inflation and Price Change', file: 'HS-HU601_Module3_Notes.pdf' },
            { number: 4, name: 'Depreciation Calculations', file: 'HS-HU601_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC603D',
          name: 'Information Theory and Coding',
          folder: '6th SEM/04. Information Theory and Coding',
          combinedPdf: 'PE-EC603D_Information_Theory_and_Coding.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Basics & Source Coding', file: 'PE-EC603D_Module1_Notes.pdf' },
            { number: 2, name: 'Markov Sources & Channel Capacity', file: 'PE-EC603D_Module2_Notes.pdf' },
            { number: 3, name: 'Coding Techniques & Cyclic/Convolutional Codes', file: 'PE-EC603D_Module3_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC604C',
          name: 'Object Oriented Programming',
          folder: '6th SEM/05. Object Oriented Programming',
          combinedPdf: 'OE-EC604C_Object_Oriented_Programming.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Programming Paradigm & OOP Concepts', file: 'OE-EC604C_Module1_Notes.pdf' },
            { number: 2, name: 'Moving from C to C++', file: 'OE-EC604C_Module2_Notes.pdf' },
            { number: 3, name: 'Objects and Classes', file: 'OE-EC604C_Module3_Notes.pdf' },
            { number: 4, name: 'Constructors and Destructors', file: 'OE-EC604C_Module4_Notes.pdf' },
            { number: 5, name: 'Operator Overloading', file: 'OE-EC604C_Module5_Notes.pdf' },
            { number: 6, name: 'Inheritance', file: 'OE-EC604C_Module6_Notes.pdf' },
            { number: 7, name: 'Polymorphism', file: 'OE-EC604C_Module7_Notes.pdf' },
            { number: 8, name: 'Files and Streams', file: 'OE-EC604C_Module8_Notes.pdf' },
            { number: 9, name: 'Exception Handling & Templates', file: 'OE-EC604C_Module9_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC603A',
          name: 'Introduction to MEMS',
          folder: '6th SEM/06. Introduction to MEMS',
          combinedPdf: 'PE-EC603A_Introduction_to_MEMS.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Introduction and Historical Background', file: 'PE-EC603A_Module1_Notes.pdf' },
            { number: 2, name: 'Scaling Effects in Microsystems', file: 'PE-EC603A_Module2_Notes.pdf' },
            { number: 3, name: 'Sensors, Actuators & Fabrication', file: 'PE-EC603A_Module3_Notes.pdf' },
            { number: 4, name: 'Bulk Micromachining & Mechanics', file: 'PE-EC603A_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC603B',
          name: 'Bio-Medical Electronics',
          folder: '6th SEM/07. Bio-Medical Electronics',
          combinedPdf: 'PE-EC603B_BioMedical_Electronics.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Introduction to Human Physiology', file: 'PE-EC603B_Module1_Notes.pdf' },
            { number: 2, name: 'Biomedical Transducers and Bio-potential Amplifiers', file: 'PE-EC603B_Module2_Notes.pdf' },
            { number: 3, name: 'Physiological Measurement and Medical Imaging', file: 'PE-EC603B_Module3_Notes.pdf' },
            { number: 4, name: 'Prostheses, Therapeutic Devices and Electrical Safety', file: 'PE-EC603B_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC604B',
          name: 'Operating System',
          folder: '6th SEM/08. Operating System',
          combinedPdf: 'OE-EC604B_Operating_System.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to Operating Systems', file: 'OE-EC604B_Module1_Notes.pdf' },
            { number: 2, name: 'Operating System Structures', file: 'OE-EC604B_Module2_Notes.pdf' },
            { number: 3, name: 'Concurrent Processes', file: 'OE-EC604B_Module3_Notes.pdf' },
            { number: 4, name: 'CPU Scheduling', file: 'OE-EC604B_Module4_Notes.pdf' },
            { number: 5, name: 'Deadlocks', file: 'OE-EC604B_Module5_Notes.pdf' },
            { number: 6, name: 'Memory Management', file: 'OE-EC604B_Module6_Notes.pdf' },
            { number: 7, name: 'I/O Management and Disk Scheduling', file: 'OE-EC604B_Module7_Notes.pdf' },
            { number: 8, name: 'File Systems', file: 'OE-EC604B_Module8_Notes.pdf' },
            { number: 9, name: 'Protection, Security, and UNIX Case Study', file: 'OE-EC604B_Module9_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC604A',
          name: 'Electronic Measurement and Measuring Instruments',
          folder: '6th SEM/09. Electronic Measurement and Measuring Instruments',
          combinedPdf: 'OE-EC604A_Electronic_Measurement_and_Measuring_Instruments.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Block Schematics & Basic Instruments', file: 'OE-EC604A_Module1_Notes.pdf' },
            { number: 2, name: 'Signal Analyzers & Generators', file: 'OE-EC604A_Module2_Notes.pdf' },
            { number: 3, name: 'Oscilloscopes (CRO & DSO)', file: 'OE-EC604A_Module3_Notes.pdf' },
            { number: 4, name: 'Transducers', file: 'OE-EC604A_Module4_Notes.pdf' },
            { number: 5, name: 'Bridges, Parameter Measurement & DAS', file: 'OE-EC604A_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC603C',
          name: 'CMOS VLSI Design',
          folder: '6th SEM/10. CMOS VLSI Design',
          combinedPdf: 'PE-EC603C_CMOS_VLSI_Design.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'VLSI Design Flow & MOSFET Physics', file: 'PE-EC603C_Module1_Notes.pdf' },
            { number: 2, name: 'MOSFET Current Derivation & Scaling', file: 'PE-EC603C_Module2_Notes.pdf' },
            { number: 3, name: 'VLSI and IC Fabrication Technology', file: 'PE-EC603C_Module3_Notes.pdf' },
            { number: 4, name: 'MOS & CMOS Inverters (Static Characteristics)', file: 'PE-EC603C_Module4_Notes.pdf' },
            { number: 5, name: 'Dynamic CMOS Circuits & Sequential Logic', file: 'PE-EC603C_Module5_Notes.pdf' },
            { number: 6, name: 'Sizing, Power, Layout & Physical Design Automation', file: 'PE-EC603C_Module6_Notes.pdf' }
          ]
        }
      ]
    },
    {
      id: 'sem-7',
      number: 7,
      name: '7th Semester',
      code: 'SEM-VII',
      status: 'ready',
      description: 'Microwave Engineering, Satellite, Mobile Networks, DSP, Embedded Systems & Neural Networks',
      syllabusPdf: {
        title: 'MAKAUT 7th Semester Official Syllabus',
        path: '7th SEM/SEM-7 ECE_MAKAUT_SYLLABUS.pdf',
        description: 'Official MAKAUT Semester VII detailed syllabus document with subject electives'
      },
      subjects: [
        {
          code: 'HS-HU701',
          name: 'Principles of Management',
          folder: '7th SEM/01. Principles of Management',
          combinedPdf: 'HS-HU701_Principles_of_Management.pdf',
          category: 'Humanities & Social Sciences',
          modules: [
            { number: 1, name: 'Basic Concepts of Management', file: 'HS-HU701_Module1_Notes.pdf' },
            { number: 2, name: 'Management and Society', file: 'HS-HU701_Module2_Notes.pdf' },
            { number: 3, name: 'Leadership', file: 'HS-HU701_Module3_Notes.pdf' },
            { number: 4, name: 'Customer Management', file: 'HS-HU701_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC701A',
          name: 'Microwave Theory and Technique',
          folder: '7th SEM/02. Microwave Theory and Technique',
          combinedPdf: 'PE-EC701A_Microwave_Theory_and_Technique.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Introduction to Microwaves', file: 'PE-EC701A_Module1_Notes.pdf' },
            { number: 2, name: 'Mathematical Model of Microwave Transmission', file: 'PE-EC701A_Module2_Notes.pdf' },
            { number: 3, name: 'RF and Microwave Transmission Lines', file: 'PE-EC701A_Module3_Notes.pdf' },
            { number: 4, name: 'Microwave Network Analysis', file: 'PE-EC701A_Module4_Notes.pdf' },
            { number: 5, name: 'Passive and Active Microwave Devices', file: 'PE-EC701A_Module5_Notes.pdf' },
            { number: 6, name: 'Microwave Design Principles', file: 'PE-EC701A_Module6_Notes.pdf' },
            { number: 7, name: 'Microwave Antennas', file: 'PE-EC701A_Module7_Notes.pdf' },
            { number: 8, name: 'Microwave Measurements', file: 'PE-EC701A_Module8_Notes.pdf' },
            { number: 9, name: 'Microwave Systems & Modern Trends', file: 'PE-EC701A_Module9_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC701B',
          name: 'Satellite Communication',
          folder: '7th SEM/03. Satellite Communication',
          combinedPdf: 'PE-EC701B_Satellite_Communication.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Introduction to Satellite Communication', file: 'PE-EC701B_Module1_Notes.pdf' },
            { number: 2, name: 'Orbital Mechanics', file: 'PE-EC701B_Module2_Notes.pdf' },
            { number: 3, name: 'Satellite Sub-systems', file: 'PE-EC701B_Module3_Notes.pdf' },
            { number: 4, name: 'Typical Phenomena in Satellite Communication', file: 'PE-EC701B_Module4_Notes.pdf' },
            { number: 5, name: 'Satellite Link Budget', file: 'PE-EC701B_Module5_Notes.pdf' },
            { number: 6, name: 'Modulation and Multiple Access Schemes', file: 'PE-EC701B_Module6_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC701C',
          name: 'Mobile Communication and Networks',
          folder: '7th SEM/04. Mobile Communication and Networks',
          combinedPdf: 'PE-EC701C_Mobile_Communication_and_Networks.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Cellular Concepts and Wireless Standards', file: 'PE-EC701C_Module1_Notes.pdf' },
            { number: 2, name: 'Signal Propagation and Fading Channels', file: 'PE-EC701C_Module2_Notes.pdf' },
            { number: 3, name: 'Channel Capacity and Mobile Antennas', file: 'PE-EC701C_Module3_Notes.pdf' },
            { number: 4, name: 'Multiple Access and Modulation Schemes', file: 'PE-EC701C_Module4_Notes.pdf' },
            { number: 5, name: 'Receiver Structure and Diversity Techniques', file: 'PE-EC701C_Module5_Notes.pdf' },
            { number: 6, name: 'MIMO and Cellular System Examples', file: 'PE-EC701C_Module6_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC702A',
          name: 'Adaptive Signal Processing',
          folder: '7th SEM/05. Adaptive Signal Processing',
          combinedPdf: 'PE-EC702A_Adaptive_Signal_Processing.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Adaptive Filtering Concepts & Random Processes', file: 'PE-EC702A_Module1_Notes.pdf' },
            { number: 2, name: 'Wiener Filters, Steepest Descent & LMS', file: 'PE-EC702A_Module2_Notes.pdf' },
            { number: 3, name: 'LMS Variants & Signal Space Concepts', file: 'PE-EC702A_Module3_Notes.pdf' },
            { number: 4, name: 'Lattice Filters & Linear Prediction', file: 'PE-EC702A_Module4_Notes.pdf' },
            { number: 5, name: 'Recursive Least Squares (RLS) & Advanced Topics', file: 'PE-EC702A_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC702B',
          name: 'Digital Image and Video Processing',
          folder: '7th SEM/06. Digital Image and Video Processing',
          combinedPdf: 'PE-EC702B_Digital_Image_and_Video_Processing.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Digital Image Fundamentals', file: 'PE-EC702B_Module1_Notes.pdf' },
            { number: 2, name: 'Image Enhancements and Filtering', file: 'PE-EC702B_Module2_Notes.pdf' },
            { number: 3, name: 'Color Image Processing', file: 'PE-EC702B_Module3_Notes.pdf' },
            { number: 4, name: 'Image Segmentation', file: 'PE-EC702B_Module4_Notes.pdf' },
            { number: 5, name: 'Wavelets and Multi-resolution Image Processing', file: 'PE-EC702B_Module5_Notes.pdf' },
            { number: 6, name: 'Image Compression', file: 'PE-EC702B_Module6_Notes.pdf' },
            { number: 7, name: 'Fundamentals of Video Coding', file: 'PE-EC702B_Module7_Notes.pdf' },
            { number: 8, name: 'Video Segmentation', file: 'PE-EC702B_Module8_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC702C',
          name: 'Neural Network and Fuzzy Logic Control',
          folder: '7th SEM/07. Neural Network and Fuzzy Logic Control',
          combinedPdf: 'PE-EC702C_Neural_Network_and_Fuzzy_Logic_Control.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Neural Networks and Pattern Association', file: 'PE-EC702C_Module1_Notes.pdf' },
            { number: 2, name: 'Competitive Neural Networks', file: 'PE-EC702C_Module2_Notes.pdf' },
            { number: 3, name: 'Adaptive Resonance & Backpropagation', file: 'PE-EC702C_Module3_Notes.pdf' },
            { number: 4, name: 'Fuzzy Sets and Membership Functions', file: 'PE-EC702C_Module4_Notes.pdf' },
            { number: 5, name: 'Applications of Neural Networks & Fuzzy Logic', file: 'PE-EC702C_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC703A',
          name: 'Embedded System',
          folder: '7th SEM/08. Embedded System',
          combinedPdf: 'PE-EC703A_Embedded_System.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Overview of Embedded Systems', file: 'PE-EC703A_Module1_Notes.pdf' },
            { number: 2, name: 'Embedded Hardware — Processor & Memory', file: 'PE-EC703A_Module2_Notes.pdf' },
            { number: 3, name: 'I/O Types & Interrupt Service Mechanism', file: 'PE-EC703A_Module3_Notes.pdf' },
            { number: 4, name: 'Embedded Software Development & RTOS', file: 'PE-EC703A_Module4_Notes.pdf' },
            { number: 5, name: 'Embedded System Design using PIC Microcontroller', file: 'PE-EC703A_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC703B',
          name: 'Wireless Sensor Networks',
          folder: '7th SEM/09. Wireless Sensor Networks',
          combinedPdf: 'PE-EC703B_Wireless_Sensor_Networks.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Introduction to Wireless Sensor Networks', file: 'PE-EC703B_Module1_Notes.pdf' },
            { number: 2, name: 'MANETs, Enabling Technologies & Single-Node Architecture', file: 'PE-EC703B_Module2_Notes.pdf' },
            { number: 3, name: 'MAC Protocols, Routing Protocols, IEEE 802.15.4 & ZigBee', file: 'PE-EC703B_Module3_Notes.pdf' },
            { number: 4, name: 'Dissemination, Data Fusion, QoS & Security', file: 'PE-EC703B_Module4_Notes.pdf' },
            { number: 5, name: 'Design Principles, Gateway Concepts & TinyOS/nesC', file: 'PE-EC703B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC704A',
          name: 'Web Technology',
          folder: '7th SEM/10. Web Technology',
          combinedPdf: 'OE-EC704A_Web_Technology.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Web Development Basics (HTML & CSS)', file: 'OE-EC704A_Module1_Notes.pdf' },
            { number: 2, name: 'Introduction to Java Programming & OOP', file: 'OE-EC704A_Module2_Notes.pdf' },
            { number: 3, name: 'Classes, Inheritance & Polymorphism', file: 'OE-EC704A_Module3_Notes.pdf' },
            { number: 4, name: 'Interfaces and Packages', file: 'OE-EC704A_Module4_Notes.pdf' },
            { number: 5, name: 'Exception Handling', file: 'OE-EC704A_Module5_Notes.pdf' },
            { number: 6, name: 'String Handling', file: 'OE-EC704A_Module6_Notes.pdf' },
            { number: 7, name: 'Java I/O Streams', file: 'OE-EC704A_Module7_Notes.pdf' },
            { number: 8, name: 'Java Utility Package (Collections Framework)', file: 'OE-EC704A_Module8_Notes.pdf' },
            { number: 9, name: 'Java Applets', file: 'OE-EC704A_Module9_Notes.pdf' },
            { number: 10, name: 'Event Handling and AWT', file: 'OE-EC704A_Module10_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC703C',
          name: 'Wavelet Transforms',
          folder: '7th SEM/11. Wavelet Transforms',
          combinedPdf: 'PE-EC703C_Wavelet_Transforms.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Introduction to Wavelet Theory', file: 'PE-EC703C_Module1_Notes.pdf' },
            { number: 2, name: 'Continuous Wavelet Transform (CWT)', file: 'PE-EC703C_Module2_Notes.pdf' },
            { number: 3, name: 'Discrete Wavelet Transform & MRA', file: 'PE-EC703C_Module3_Notes.pdf' },
            { number: 4, name: 'MRA Ortho-normal Wavelets & Filter Banks', file: 'PE-EC703C_Module4_Notes.pdf' },
            { number: 5, name: 'Bi-orthogonal Wavelets', file: 'PE-EC703C_Module5_Notes.pdf' },
            { number: 6, name: 'Wavelet Transform and Applications', file: 'PE-EC703C_Module6_Notes.pdf' },
            { number: 7, name: 'Beyond Wavelet', file: 'PE-EC703C_Module7_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC704C',
          name: 'Entrepreneurship',
          folder: '7th SEM/12. Entrepreneurship',
          combinedPdf: 'OE-EC704C_Entrepreneurship.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction & Small Scale Industries', file: 'OE-EC704C_Module1_Notes.pdf' },
            { number: 2, name: 'Marketing, Financing & Launching', file: 'OE-EC704C_Module2_Notes.pdf' },
            { number: 3, name: 'Financial Management, Accounting & Taxation', file: 'OE-EC704C_Module3_Notes.pdf' },
            { number: 4, name: 'Decision Making, Motivation & Project Reports', file: 'OE-EC704C_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC704B',
          name: 'Optimization Technique',
          folder: '7th SEM/13. Optimization Technique',
          combinedPdf: 'OE-EC704B_Optimization_Technique.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Mathematical Formulation & Fundamentals', file: 'OE-EC704B_Module1_Notes.pdf' },
            { number: 2, name: 'Single-Variable Optimization Algorithms', file: 'OE-EC704B_Module2_Notes.pdf' },
            { number: 3, name: 'Gradient-Based Methods', file: 'OE-EC704B_Module3_Notes.pdf' },
            { number: 4, name: 'Multivariable Optimization Algorithms', file: 'OE-EC704B_Module4_Notes.pdf' },
            { number: 5, name: 'Constrained Optimization Algorithms', file: 'OE-EC704B_Module5_Notes.pdf' },
            { number: 6, name: 'Advanced & Swarm Optimization Algorithms', file: 'OE-EC704B_Module6_Notes.pdf' }
          ]
        }
      ]
    },
    {
      id: 'sem-8',
      number: 8,
      name: '8th Semester',
      code: 'SEM-VIII',
      status: 'ready',
      description: 'Antennas, Fiber Optics, Error Coding, Mixed Signal, Automation, IoT & AI',
      syllabusPdf: {
        title: 'MAKAUT 8th Semester Official Syllabus',
        path: '8th SEM/SEM-8 ECE_MAKAUT_SYLLABUS.pdf',
        description: 'Official MAKAUT Semester VIII detailed curriculum & capstone elective paths'
      },
      subjects: [
        {
          code: 'PE-EC801A',
          name: 'Antennas and Propagation',
          folder: '8th SEM/01. Antennas and Propagation',
          combinedPdf: 'PE-EC801A_Antennas_and_Propagation.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Physical Concept of Radiation', file: 'PE-EC801A_Module1_Notes.pdf' },
            { number: 2, name: 'Infinitesimal Dipole', file: 'PE-EC801A_Module2_Notes.pdf' },
            { number: 3, name: 'Huygens\' Principle and Field Equivalence', file: 'PE-EC801A_Module3_Notes.pdf' },
            { number: 4, name: 'Yagi-Uda Antenna', file: 'PE-EC801A_Module4_Notes.pdf' },
            { number: 5, name: 'Characteristics of Microstrip Antennas', file: 'PE-EC801A_Module5_Notes.pdf' },
            { number: 6, name: 'Uniform Linear Arrays (ULA)', file: 'PE-EC801A_Module6_Notes.pdf' },
            { number: 7, name: 'Basic Concepts of Smart Antennas', file: 'PE-EC801A_Module7_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC801B',
          name: 'Fiber Optic Communication',
          folder: '8th SEM/02. Fiber Optic Communication',
          combinedPdf: 'PE-EC801B_Fiber_Optic_Communication.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Vector Nature of Light — EM Wave Fundamentals', file: 'PE-EC801B_Module1_Notes.pdf' },
            { number: 2, name: 'Signal Attenuation in Optical Fibers', file: 'PE-EC801B_Module2_Notes.pdf' },
            { number: 3, name: 'Optical Sources — LED', file: 'PE-EC801B_Module3_Notes.pdf' },
            { number: 4, name: 'Optical Switches', file: 'PE-EC801B_Module4_Notes.pdf' },
            { number: 5, name: 'WDM Fundamentals', file: 'PE-EC801B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC801C',
          name: 'Error Correcting Codes',
          folder: '8th SEM/03. Error Correcting Codes',
          combinedPdf: 'PE-EC801C_Error_Correcting_Codes.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Linear Block Codes', file: 'PE-EC801C_Module1_Notes.pdf' },
            { number: 2, name: 'Galois Fields and Cyclic Codes', file: 'PE-EC801C_Module2_Notes.pdf' },
            { number: 3, name: 'BCH, Reed-Solomon and Special Codes', file: 'PE-EC801C_Module3_Notes.pdf' },
            { number: 4, name: 'Decoding of BCH and Reed-Solomon Codes', file: 'PE-EC801C_Module4_Notes.pdf' },
            { number: 5, name: 'Convolutional Codes and Decoding', file: 'PE-EC801C_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC802A',
          name: 'Mixed Signal Design',
          folder: '8th SEM/04. Mixed Signal Design',
          combinedPdf: 'PE-EC802A_Mixed_Signal_Design.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Analog vs. Discrete-Time Processing & Sampling Theory', file: 'PE-EC802A_Module1_Notes.pdf' },
            { number: 2, name: 'Switched-Capacitor (SC) Circuits & Resistor Equivalence', file: 'PE-EC802A_Module2_Notes.pdf' },
            { number: 3, name: 'Data Converter Performance Metrics', file: 'PE-EC802A_Module3_Notes.pdf' },
            { number: 4, name: 'Mixed-Signal Layout Issues & Mitigation', file: 'PE-EC802A_Module4_Notes.pdf' },
            { number: 5, name: 'Phase-Locked Loop (PLL) Architecture & Working', file: 'PE-EC802A_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC802B',
          name: 'Industrial Automation and Control',
          folder: '8th SEM/05. Industrial Automation and Control',
          combinedPdf: 'PE-EC802B_Industrial_Automation_and_Control.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Introduction to Industrial Sensors and Actuators', file: 'PE-EC802B_Module1_Notes.pdf' },
            { number: 2, name: 'Industrial Signal Conditioning', file: 'PE-EC802B_Module2_Notes.pdf' },
            { number: 3, name: 'PID Control Fundamentals', file: 'PE-EC802B_Module3_Notes.pdf' },
            { number: 4, name: 'PLC Hardware & Architecture', file: 'PE-EC802B_Module4_Notes.pdf' },
            { number: 5, name: 'Distributed Control Systems (DCS) & SCADA', file: 'PE-EC802B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC802C',
          name: 'VLSI Design Automation',
          folder: '8th SEM/06. VLSI Design Automation',
          combinedPdf: 'PE-EC802C_VLSI_Design_Automation.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Introduction to VLSI Design Methodologies & Algorithms', file: 'PE-EC802C_Module1_Notes.pdf' },
            { number: 2, name: 'Layout Compaction, Placement & Partitioning', file: 'PE-EC802C_Module2_Notes.pdf' },
            { number: 3, name: 'Floorplanning & Routing', file: 'PE-EC802C_Module3_Notes.pdf' },
            { number: 4, name: 'VLSI Simulation & Logic Synthesis', file: 'PE-EC802C_Module4_Notes.pdf' },
            { number: 5, name: 'High-Level Synthesis', file: 'PE-EC802C_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC803A',
          name: 'Internet of Things',
          folder: '8th SEM/07. Internet of Things',
          combinedPdf: 'OE-EC803A_Internet_of_Things.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to IoT & Design Principles', file: 'OE-EC803A_Module1_Notes.pdf' },
            { number: 2, name: 'Internet Principles & Networking in IoT', file: 'OE-EC803A_Module2_Notes.pdf' },
            { number: 3, name: 'Prototyping: Thinking & Embedded Hardware Platforms', file: 'OE-EC803A_Module3_Notes.pdf' },
            { number: 4, name: 'Prototyping Physical Design & Enclosures', file: 'OE-EC803A_Module4_Notes.pdf' },
            { number: 5, name: 'Prototyping Online Components & Embedded Programming', file: 'OE-EC803A_Module5_Notes.pdf' },
            { number: 6, name: 'Prototype to Reality: Business, Manufacturing & Ethics', file: 'OE-EC803A_Module6_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC803B',
          name: 'Big Data Analysis',
          folder: '8th SEM/08. Big Data Analysis',
          combinedPdf: 'OE-EC803B_Big_Data_Analysis.pdf',
          category: 'Open Elective',
          modules: [
            { number: 0, name: 'Pre-requisite Computer Science Fundamentals', file: 'OE-EC803B_Module0_Notes.pdf' },
            { number: 1, name: 'Introduction to Big Data & Hadoop Ecosystem', file: 'OE-EC803B_Module1_Notes.pdf' },
            { number: 2, name: 'HDFS (Hadoop Distributed File System) & I/O', file: 'OE-EC803B_Module2_Notes.pdf' },
            { number: 3, name: 'MapReduce Programming Paradigm & YARN Resource Manager', file: 'OE-EC803B_Module3_Notes.pdf' },
            { number: 4, name: 'Hadoop Ecosystem Components (Pig, Hive, HBase, Big SQL)', file: 'OE-EC803B_Module4_Notes.pdf' },
            { number: 5, name: 'Data Analytics with R & Machine Learning Algorithms', file: 'OE-EC803B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC803C',
          name: 'Cyber Security',
          folder: '8th SEM/09. Cyber Security',
          combinedPdf: 'OE-EC803C_Cyber_Security.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to Cyber Security & Policy', file: 'OE-EC803C_Module1_Notes.pdf' },
            { number: 2, name: 'Cyber Security Objectives, Guidance & Frameworks', file: 'OE-EC803C_Module2_Notes.pdf' },
            { number: 3, name: 'Cyber Governance Issues, Crimes & Conflicts', file: 'OE-EC803C_Module3_Notes.pdf' },
            { number: 4, name: 'Cyber Infrastructure Issues & International Relations', file: 'OE-EC803C_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC804A',
          name: 'Artificial Intelligence',
          folder: '8th SEM/10. Artificial Intelligence',
          combinedPdf: 'OE-EC804A_Artificial_Intelligence.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to Artificial Intelligence & Intelligent Agents', file: 'OE-EC804A_Module1_Notes.pdf' },
            { number: 2, name: 'Solving Problems by Searching (Uninformed Search)', file: 'OE-EC804A_Module2_Notes.pdf' },
            { number: 3, name: 'Informed Search & Constraint Satisfaction Problems', file: 'OE-EC804A_Module3_Notes.pdf' },
            { number: 4, name: 'Adversarial Search & Game Playing', file: 'OE-EC804A_Module4_Notes.pdf' },
            { number: 5, name: 'Knowledge Representation & Logical Agents', file: 'OE-EC804A_Module5_Notes.pdf' },
            { number: 6, name: 'First-Order Logic (FOL)', file: 'OE-EC804A_Module6_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC804B',
          name: 'Microwave Integrated Circuits',
          folder: '8th SEM/11. Microwave Integrated Circuits',
          combinedPdf: 'OE-EC804B_Microwave_Integrated_Circuits.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to MIC & MMIC', file: 'OE-EC804B_Module1_Notes.pdf' },
            { number: 2, name: 'Planar Transmission Lines-I (Stripline & Microstrip)', file: 'OE-EC804B_Module2_Notes.pdf' },
            { number: 3, name: 'Planar Lines-II (Slotline, Finlines & CPW)', file: 'OE-EC804B_Module3_Notes.pdf' },
            { number: 4, name: 'Parallel-Coupled Lines & Power Dividers', file: 'OE-EC804B_Module4_Notes.pdf' },
            { number: 5, name: 'MIC Measurement, Testing & Applications', file: 'OE-EC804B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC804C',
          name: 'Organizational Behavior',
          folder: '8th SEM/12. Organizational Behavior',
          combinedPdf: 'OE-EC804C_Organizational_Behavior.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to Organization & Organizational Behavior', file: 'OE-EC804C_Module1_Notes.pdf' },
            { number: 2, name: 'Personality and Motivation', file: 'OE-EC804C_Module2_Notes.pdf' },
            { number: 3, name: 'Leadership and Group Dynamics', file: 'OE-EC804C_Module3_Notes.pdf' },
            { number: 4, name: 'Organizational Change & Development', file: 'OE-EC804C_Module4_Notes.pdf' }
          ]
        }
      ]
    }
  ];

  function getGroups(semester) {
    return semester.curricula ?? [semester];
  }

  const subjects = SEMESTERS.flatMap(semester =>
    getGroups(semester).flatMap(group => group.subjects.filter(subject => subject.combinedPdf))
  );
  META.stats = {
    semestersWithNotes: SEMESTERS.filter(semester =>
      getGroups(semester).some(group => group.subjects.some(subject => subject.combinedPdf))
    ).length,
    totalSemesters: SEMESTERS.length,
    totalCombinedPdfs: subjects.length,
    totalModules: subjects.reduce((count, subject) => count + subject.modules.length, 0)
  };

  return {
    META,
    SEMESTERS,
    getGroups
  };
})();

// Export for module or global use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AcademicCatalog;
}
