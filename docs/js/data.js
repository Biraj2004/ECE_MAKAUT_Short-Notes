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
    repoUrl: 'https://github.com/Biraj2004/ECE_MAKAUT_Short-Notes',
    stats: {
      readySemesters: 5,
      totalSemesters: 8,
      totalSubjects: 39,
      totalModules: 221,
      totalCombinedPdfs: 39
    }
  };

  const SEMESTERS = [
    {
      id: 'sem-1',
      number: 1,
      name: '1st Semester',
      code: 'SEM-I',
      status: 'ready',
      description: 'Foundational Engineering Sciences & Physics/Chemistry Laboratory Theory',
      syllabusPdf: {
        title: 'MAKAUT 1st & 2nd Semester Syllabus',
        path: '1st SEM/Sem 1 & 2.pdf',
        description: 'Official MAKAUT First Year Curriculum & Module Breakdown'
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
            { number: 2, name: 'Spectroscopic Techniques & Applications', file: 'BS-CH101_Module2_Notes.pdf' },
            { number: 3, name: 'Intermolecular Forces and Potential Energy Surfaces', file: 'BS-CH101_Module3_Notes.pdf' },
            { number: 4, name: 'Use of Free Energy in Chemical Equilibria', file: 'BS-CH101_Module4_Notes.pdf' },
            { number: 5, name: 'Periodic Properties', file: 'BS-CH101_Module5_Notes.pdf' },
            { number: 6, name: 'Stereochemistry', file: 'BS-CH101_Module6_Notes.pdf' },
            { number: 7, name: 'Organic Reactions and Synthesis of a Drug Molecule', file: 'BS-CH101_Module7_Notes.pdf' }
          ]
        },
        {
          code: 'BS-PH101',
          name: 'Physics-I',
          folder: '1st SEM/02. Physics-I',
          combinedPdf: 'BS-PH101_PhysicsI.pdf',
          category: 'Basic Science',
          modules: [
            { number: 1, name: 'Oscillations & Waves', file: 'BS-PH101_Module1_Notes.pdf' },
            { number: 2, name: 'Optics (Interference, Diffraction & Polarization)', file: 'BS-PH101_Module2_Notes.pdf' },
            { number: 3, name: 'Lasers & Fiber Optics', file: 'BS-PH101_Module3_Notes.pdf' },
            { number: 4, name: 'Quantum Mechanics', file: 'BS-PH101_Module4_Notes.pdf' },
            { number: 5, name: 'Electromagnetism & Maxwell Equations', file: 'BS-PH101_Module5_Notes.pdf' }
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
      description: 'Second Phase Foundational Engineering Sciences (Group Exchange Stream)',
      syllabusPdf: {
        title: 'MAKAUT 1st & 2nd Semester Syllabus',
        path: '2nd SEM/Sem 1 & 2.pdf',
        description: 'Official MAKAUT First Year Curriculum & Module Breakdown'
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
            { number: 2, name: 'Spectroscopic Techniques & Applications', file: 'BS-CH101_Module2_Notes.pdf' },
            { number: 3, name: 'Intermolecular Forces & Potential Energy Surfaces', file: 'BS-CH101_Module3_Notes.pdf' },
            { number: 4, name: 'Use of Free Energy in Chemical Equilibria', file: 'BS-CH101_Module4_Notes.pdf' },
            { number: 5, name: 'Periodic Properties', file: 'BS-CH101_Module5_Notes.pdf' },
            { number: 6, name: 'Stereochemistry', file: 'BS-CH101_Module6_Notes.pdf' },
            { number: 7, name: 'Organic Reactions & Synthesis of Drug Molecules', file: 'BS-CH101_Module7_Notes.pdf' }
          ]
        },
        {
          code: 'BS-PH101',
          name: 'Physics-I',
          folder: '2nd SEM/02. Physics-I',
          combinedPdf: 'BS-PH101_PhysicsI.pdf',
          category: 'Basic Science',
          modules: [
            { number: 1, name: 'Oscillations & Waves', file: 'BS-PH101_Module1_Notes.pdf' },
            { number: 2, name: 'Optics (Interference, Diffraction & Polarization)', file: 'BS-PH101_Module2_Notes.pdf' },
            { number: 3, name: 'Lasers & Fiber Optics', file: 'BS-PH101_Module3_Notes.pdf' },
            { number: 4, name: 'Quantum Mechanics', file: 'BS-PH101_Module4_Notes.pdf' },
            { number: 5, name: 'Electromagnetism & Maxwell Equations', file: 'BS-PH101_Module5_Notes.pdf' }
          ]
        }
      ]
    },
    {
      id: 'sem-3',
      number: 3,
      name: '3rd Semester',
      code: 'SEM-III',
      status: 'coming-soon',
      description: 'Core Electronics Foundations: Solid State Devices, Digital Logic, Signals & Circuits',
      expectedSubjects: [
        { code: 'EC301', name: 'Electronic Devices', modules: 5 },
        { code: 'EC302', name: 'Digital System Design', modules: 5 },
        { code: 'EC303', name: 'Signals and Systems', modules: 4 },
        { code: 'EC304', name: 'Network Theory', modules: 4 },
        { code: 'BS-M301', name: 'Mathematics-III (Differential Calculus & Transform)', modules: 4 }
      ],
      note: 'Currently in authoring and syllabus verification pipeline in accordance with MAKAUT NEP regulations.'
    },
    {
      id: 'sem-4',
      number: 4,
      name: '4th Semester',
      code: 'SEM-IV',
      status: 'coming-soon',
      description: 'Analog Communications, Microprocessors & Algorithm Foundations',
      expectedSubjects: [
        { code: 'EC401', name: 'Analog Communication', modules: 5 },
        { code: 'EC402', name: 'Analog Electronic Circuits', modules: 5 },
        { code: 'EC403', name: 'Microprocessor & Microcontrollers', modules: 5 },
        { code: 'ES-CS401', name: 'Design & Analysis of Algorithms', modules: 4 }
      ],
      note: 'Scheduled for compilation following Semester 3 notes completion.'
    },
    {
      id: 'sem-5',
      number: 5,
      name: '5th Semester',
      code: 'SEM-V',
      status: 'coming-soon',
      description: 'Advanced Communications, Electromagnetic Theory & Computer Architecture',
      expectedSubjects: [
        { code: 'EC501', name: 'Electromagnetic Waves & Transmission Lines', modules: 5 },
        { code: 'EC502', name: 'Computer Architecture', modules: 4 },
        { code: 'EC503', name: 'Digital Communication', modules: 5 },
        { code: 'EC504', name: 'Digital Signal Processing', modules: 5 }
      ],
      note: 'Scheduled for compilation in the upcoming development sprint.'
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
        path: '6th SEM/sem6 - syllabus.pdf',
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
            { number: 2, name: 'Mathematical Modelling of Physical Systems', file: 'EC601_Module2_Notes.pdf' },
            { number: 3, name: 'Time Response Analysis', file: 'EC601_Module3_Notes.pdf' },
            { number: 4, name: 'Stability Analysis & Routh-Hurwitz', file: 'EC601_Module4_Notes.pdf' },
            { number: 5, name: 'Root Locus Techniques', file: 'EC601_Module5_Notes.pdf' },
            { number: 6, name: 'Frequency Domain Analysis & Bode/Nyquist', file: 'EC601_Module6_Notes.pdf' },
            { number: 7, name: 'State Space Analysis & Compensator Design', file: 'EC601_Module7_Notes.pdf' }
          ]
        },
        {
          code: 'EC602',
          name: 'Computer Network',
          folder: '6th SEM/02. Computer Network',
          combinedPdf: 'EC602_Computer_Network.pdf',
          category: 'Professional Core',
          modules: [
            { number: 1, name: 'Data Communication & Physical Layer', file: 'EC602_Module1_Notes.pdf' },
            { number: 2, name: 'Data Link Layer & MAC Protocols', file: 'EC602_Module2_Notes.pdf' },
            { number: 3, name: 'Network Layer & Routing Protocols', file: 'EC602_Module3_Notes.pdf' },
            { number: 4, name: 'Transport & Application Layers', file: 'EC602_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'HS-HU601',
          name: 'Economics For Engineers',
          folder: '6th SEM/03. Economics For Engineers',
          combinedPdf: 'HS-HU601_Economics_for_Engineers.pdf',
          category: 'Humanities & Social Sciences',
          modules: [
            { number: 1, name: 'Economic Decisions & Cash Flow Concepts', file: 'HS-HU601_Module1_Notes.pdf' },
            { number: 2, name: 'Present Worth & Annual Equivalent Analysis', file: 'HS-HU601_Module2_Notes.pdf' },
            { number: 3, name: 'Rate of Return & Benefit-Cost Analysis', file: 'HS-HU601_Module3_Notes.pdf' },
            { number: 4, name: 'Depreciation, Inflation & Financial Management', file: 'HS-HU601_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC603D',
          name: 'Information Theory and Coding',
          folder: '6th SEM/04. Information Theory and Coding',
          combinedPdf: 'PE-EC603D_Information_Theory_and_Coding.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Source Coding & Entropy', file: 'PE-EC603D_Module1_Notes.pdf' },
            { number: 2, name: 'Channel Capacity & Linear Block Codes', file: 'PE-EC603D_Module2_Notes.pdf' },
            { number: 3, name: 'Cyclic & Convolutional Codes', file: 'PE-EC603D_Module3_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC604C',
          name: 'Object Oriented Programming',
          folder: '6th SEM/05. Object Oriented Programming',
          combinedPdf: 'OE-EC604C_Object_Oriented_Programming.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to OOP & Java Basics', file: 'OE-EC604C_Module1_Notes.pdf' },
            { number: 2, name: 'Classes, Objects & Methods', file: 'OE-EC604C_Module2_Notes.pdf' },
            { number: 3, name: 'Inheritance & Polymorphism', file: 'OE-EC604C_Module3_Notes.pdf' },
            { number: 4, name: 'Packages & Interfaces', file: 'OE-EC604C_Module4_Notes.pdf' },
            { number: 5, name: 'Exception Handling', file: 'OE-EC604C_Module5_Notes.pdf' },
            { number: 6, name: 'Multithreading & Concurrency', file: 'OE-EC604C_Module6_Notes.pdf' },
            { number: 7, name: 'I/O Streams & File Handling', file: 'OE-EC604C_Module7_Notes.pdf' },
            { number: 8, name: 'Collections Framework & Generics', file: 'OE-EC604C_Module8_Notes.pdf' },
            { number: 9, name: 'Applets & Modern Java Features', file: 'OE-EC604C_Module9_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC603A',
          name: 'Introduction to MEMS',
          folder: '6th SEM/06. Introduction to MEMS',
          combinedPdf: 'PE-EC603A_Introduction_to_MEMS.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Overview of MEMS & Microsystems', file: 'PE-EC603A_Module1_Notes.pdf' },
            { number: 2, name: 'Working Principles of Microsystems', file: 'PE-EC603A_Module2_Notes.pdf' },
            { number: 3, name: 'Micro-engineering Science & Scaling', file: 'PE-EC603A_Module3_Notes.pdf' },
            { number: 4, name: 'Microsystem Fabrication & Packaging', file: 'PE-EC603A_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC603B',
          name: 'Bio-Medical Electronics',
          folder: '6th SEM/07. Bio-Medical Electronics',
          combinedPdf: 'PE-EC603B_BioMedical_Electronics.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Physiology & Bioelectric Potentials (ECG, EEG, EMG)', file: 'PE-EC603B_Module1_Notes.pdf' },
            { number: 2, name: 'Bio-Potential Electrodes & Transducers', file: 'PE-EC603B_Module2_Notes.pdf' },
            { number: 3, name: 'Diagnostic Instruments & Patient Monitoring', file: 'PE-EC603B_Module3_Notes.pdf' },
            { number: 4, name: 'Therapeutic Equipment & Electrical Safety', file: 'PE-EC603B_Module4_Notes.pdf' }
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
            { number: 2, name: 'Processes & Threads', file: 'OE-EC604B_Module2_Notes.pdf' },
            { number: 3, name: 'CPU Scheduling Algorithms', file: 'OE-EC604B_Module3_Notes.pdf' },
            { number: 4, name: 'Process Synchronization & Semaphores', file: 'OE-EC604B_Module4_Notes.pdf' },
            { number: 5, name: 'Deadlock Handling & Prevention', file: 'OE-EC604B_Module5_Notes.pdf' },
            { number: 6, name: 'Memory Management & Paging', file: 'OE-EC604B_Module6_Notes.pdf' },
            { number: 7, name: 'Virtual Memory & Page Replacement', file: 'OE-EC604B_Module7_Notes.pdf' },
            { number: 8, name: 'File Systems & Storage Management', file: 'OE-EC604B_Module8_Notes.pdf' },
            { number: 9, name: 'I/O Systems & Secondary Storage Scheduling', file: 'OE-EC604B_Module9_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC604A',
          name: 'Electronic Measurement and Measuring Instruments',
          folder: '6th SEM/09. Electronic Measurement and Measuring Instruments',
          combinedPdf: 'OE-EC604A_Electronic_Measurement_and_Measuring_Instruments.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Characteristics of Measurement & Errors', file: 'OE-EC604A_Module1_Notes.pdf' },
            { number: 2, name: 'Analog & Digital Indicating Instruments', file: 'OE-EC604A_Module2_Notes.pdf' },
            { number: 3, name: 'Bridge Circuits for R, L, C Measurement', file: 'OE-EC604A_Module3_Notes.pdf' },
            { number: 4, name: 'Oscilloscopes (CRO & DSO) & Signal Generators', file: 'OE-EC604A_Module4_Notes.pdf' },
            { number: 5, name: 'Transducers & Data Acquisition Systems (DAS)', file: 'OE-EC604A_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC603C',
          name: 'CMOS VLSI Design',
          folder: '6th SEM/10. CMOS VLSI Design',
          combinedPdf: 'PE-EC603C_CMOS_VLSI_Design.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'MOS Transistor Theory & Inverter DC Analysis', file: 'PE-EC603C_Module1_Notes.pdf' },
            { number: 2, name: 'CMOS Processing Technology & Layout Rules', file: 'PE-EC603C_Module2_Notes.pdf' },
            { number: 3, name: 'Delay, Logical Effort & Power Dissipation', file: 'PE-EC603C_Module3_Notes.pdf' },
            { number: 4, name: 'Combinational & Sequential Circuit Design', file: 'PE-EC603C_Module4_Notes.pdf' },
            { number: 5, name: 'Datapath Subsystems & Memory Architecture', file: 'PE-EC603C_Module5_Notes.pdf' },
            { number: 6, name: 'Design for Testability (DFT) & Fault Modelling', file: 'PE-EC603C_Module6_Notes.pdf' }
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
        path: '7th SEM/sem7.pdf',
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
            { number: 1, name: 'Management Concepts & Evolution of Thought', file: 'HS-HU701_Module1_Notes.pdf' },
            { number: 2, name: 'Planning & Decision Making', file: 'HS-HU701_Module2_Notes.pdf' },
            { number: 3, name: 'Organizing & Staffing Functions', file: 'HS-HU701_Module3_Notes.pdf' },
            { number: 4, name: 'Directing, Leading & Controlling Systems', file: 'HS-HU701_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC701A',
          name: 'Microwave Theory and Technique',
          folder: '7th SEM/02. Microwave Theory and Technique',
          combinedPdf: 'PE-EC701A_Microwave_Theory_and_Technique.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Microwave Waveguides & Transmission Lines', file: 'PE-EC701A_Module1_Notes.pdf' },
            { number: 2, name: 'Microwave Network Analysis & S-Parameters', file: 'PE-EC701A_Module2_Notes.pdf' },
            { number: 3, name: 'Passive Microwave Components & Junctions', file: 'PE-EC701A_Module3_Notes.pdf' },
            { number: 4, name: 'Ferrite Devices & Resonators', file: 'PE-EC701A_Module4_Notes.pdf' },
            { number: 5, name: 'Microwave Tubes (Klystron, TWT, Magnetron)', file: 'PE-EC701A_Module5_Notes.pdf' },
            { number: 6, name: 'Microwave Solid-State Devices (Gunn, IMPATT)', file: 'PE-EC701A_Module6_Notes.pdf' },
            { number: 7, name: 'Strip Lines & Microstrip Technologies', file: 'PE-EC701A_Module7_Notes.pdf' },
            { number: 8, name: 'Microwave Antennas & Radiators', file: 'PE-EC701A_Module8_Notes.pdf' },
            { number: 9, name: 'Microwave Measurements & Applications', file: 'PE-EC701A_Module9_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC701B',
          name: 'Satellite Communication',
          folder: '7th SEM/03. Satellite Communication',
          combinedPdf: 'PE-EC701B_Satellite_Communication.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Orbital Mechanics & Launch Vehicles', file: 'PE-EC701B_Module1_Notes.pdf' },
            { number: 2, name: 'Satellite Subsystems & Transponders', file: 'PE-EC701B_Module2_Notes.pdf' },
            { number: 3, name: 'Satellite Link Design & Budget', file: 'PE-EC701B_Module3_Notes.pdf' },
            { number: 4, name: 'Multiple Access Techniques (FDMA, TDMA, CDMA)', file: 'PE-EC701B_Module4_Notes.pdf' },
            { number: 5, name: 'Earth Station Technology & Antennas', file: 'PE-EC701B_Module5_Notes.pdf' },
            { number: 6, name: 'Satellite Navigation, GPS & Remote Sensing', file: 'PE-EC701B_Module6_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC701C',
          name: 'Mobile Communication and Networks',
          folder: '7th SEM/04. Mobile Communication and Networks',
          combinedPdf: 'PE-EC701C_Mobile_Communication_and_Networks.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Cellular System Fundamentals & Frequency Reuse', file: 'PE-EC701C_Module1_Notes.pdf' },
            { number: 2, name: 'Mobile Radio Propagation & Path Loss Models', file: 'PE-EC701C_Module2_Notes.pdf' },
            { number: 3, name: 'Small-Scale Fading & Multipath Reception', file: 'PE-EC701C_Module3_Notes.pdf' },
            { number: 4, name: 'Modulation & Diversity Techniques in Mobile Systems', file: 'PE-EC701C_Module4_Notes.pdf' },
            { number: 5, name: 'GSM Architecture & Standards', file: 'PE-EC701C_Module5_Notes.pdf' },
            { number: 6, name: '3G, 4G LTE & 5G NR Evolution', file: 'PE-EC701C_Module6_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC702A',
          name: 'Adaptive Signal Processing',
          folder: '7th SEM/05. Adaptive Signal Processing',
          combinedPdf: 'PE-EC702A_Adaptive_Signal_Processing.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Stationary Processes & Correlation Theory', file: 'PE-EC702A_Module1_Notes.pdf' },
            { number: 2, name: 'Wiener Filter Theory & Optimum Filtering', file: 'PE-EC702A_Module2_Notes.pdf' },
            { number: 3, name: 'LMS (Least Mean Squares) Algorithm', file: 'PE-EC702A_Module3_Notes.pdf' },
            { number: 4, name: 'RLS (Recursive Least Squares) Algorithm', file: 'PE-EC702A_Module4_Notes.pdf' },
            { number: 5, name: 'Applications of Adaptive Filters (Echo/Noise Cancellation)', file: 'PE-EC702A_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC702B',
          name: 'Digital Image and Video Processing',
          folder: '7th SEM/06. Digital Image and Video Processing',
          combinedPdf: 'PE-EC702B_Digital_Image_and_Video_Processing.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Digital Image Fundamentals & Sampling', file: 'PE-EC702B_Module1_Notes.pdf' },
            { number: 2, name: 'Spatial Domain Image Enhancement', file: 'PE-EC702B_Module2_Notes.pdf' },
            { number: 3, name: 'Frequency Domain Image Transforms (DFT, DCT)', file: 'PE-EC702B_Module3_Notes.pdf' },
            { number: 4, name: 'Image Restoration & Degradation Models', file: 'PE-EC702B_Module4_Notes.pdf' },
            { number: 5, name: 'Morphological Image Processing', file: 'PE-EC702B_Module5_Notes.pdf' },
            { number: 6, name: 'Image Segmentation & Edge Detection', file: 'PE-EC702B_Module6_Notes.pdf' },
            { number: 7, name: 'Image Compression Standards (JPEG)', file: 'PE-EC702B_Module7_Notes.pdf' },
            { number: 8, name: 'Video Processing, Motion Estimation & MPEG Standards', file: 'PE-EC702B_Module8_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC702C',
          name: 'Neural Network and Fuzzy Logic Control',
          folder: '7th SEM/07. Neural Network and Fuzzy Logic Control',
          combinedPdf: 'PE-EC702C_Neural_Network_and_Fuzzy_Logic_Control.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Biological Neurons & Artificial Neuron Models', file: 'PE-EC702C_Module1_Notes.pdf' },
            { number: 2, name: 'Perceptron & Backpropagation Learning', file: 'PE-EC702C_Module2_Notes.pdf' },
            { number: 3, name: 'Associative Memory & Hopfield Networks', file: 'PE-EC702C_Module3_Notes.pdf' },
            { number: 4, name: 'Fuzzy Sets, Membership Functions & Operations', file: 'PE-EC702C_Module4_Notes.pdf' },
            { number: 5, name: 'Fuzzy Logic Controllers & Neuro-Fuzzy Systems (ANFIS)', file: 'PE-EC702C_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC703A',
          name: 'Embedded System',
          folder: '7th SEM/08. Embedded System',
          combinedPdf: 'PE-EC703A_Embedded_System.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Embedded Architecture & Hardware Foundations', file: 'PE-EC703A_Module1_Notes.pdf' },
            { number: 2, name: 'ARM Cortex-M Processors & Assembly', file: 'PE-EC703A_Module2_Notes.pdf' },
            { number: 3, name: 'Embedded Peripheral Interfacing (I2C, SPI, UART, ADC)', file: 'PE-EC703A_Module3_Notes.pdf' },
            { number: 4, name: 'Real-Time Operating Systems (RTOS) Concepts', file: 'PE-EC703A_Module4_Notes.pdf' },
            { number: 5, name: 'Embedded System Design, Debugging & Low-Power', file: 'PE-EC703A_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC703B',
          name: 'Wireless Sensor Networks',
          folder: '7th SEM/09. Wireless Sensor Networks',
          combinedPdf: 'PE-EC703B_Wireless_Sensor_Networks.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'WSN Architecture & Sensor Node Hardware', file: 'PE-EC703B_Module1_Notes.pdf' },
            { number: 2, name: 'Physical & MAC Layer Protocols for WSN (S-MAC)', file: 'PE-EC703B_Module2_Notes.pdf' },
            { number: 3, name: 'Routing Protocols in WSN (LEACH, PEGASIS, Directed Diffusion)', file: 'PE-EC703B_Module3_Notes.pdf' },
            { number: 4, name: 'Localization, Synchronization & Power Management', file: 'PE-EC703B_Module4_Notes.pdf' },
            { number: 5, name: 'WSN Operating Systems (TinyOS, Contiki) & Security', file: 'PE-EC703B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC704A',
          name: 'Web Technology',
          folder: '7th SEM/10. Web Technology',
          combinedPdf: 'OE-EC704A_Web_Technology.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Web Architecture & HTML5/CSS3 Fundamentals', file: 'OE-EC704A_Module1_Notes.pdf' },
            { number: 2, name: 'JavaScript & Client-Side DOM Scripting', file: 'OE-EC704A_Module2_Notes.pdf' },
            { number: 3, name: 'XML, JSON & AJAX Communications', file: 'OE-EC704A_Module3_Notes.pdf' },
            { number: 4, name: 'Server-Side Programming with Servlets/JSP', file: 'OE-EC704A_Module4_Notes.pdf' },
            { number: 5, name: 'Database Connectivity (JDBC) & Web Security', file: 'OE-EC704A_Module5_Notes.pdf' },
            { number: 6, name: 'PHP & Modern Scripting Frameworks', file: 'OE-EC704A_Module6_Notes.pdf' },
            { number: 7, name: 'RESTful Web Services & APIs', file: 'OE-EC704A_Module7_Notes.pdf' },
            { number: 8, name: 'Web Application Security (XSS, CSRF, SQLi)', file: 'OE-EC704A_Module8_Notes.pdf' },
            { number: 9, name: 'Modern Front-End Frameworks (SPA Principles)', file: 'OE-EC704A_Module9_Notes.pdf' },
            { number: 10, name: 'Cloud Deployment, SEO & Web Performance', file: 'OE-EC704A_Module10_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC703C',
          name: 'Wavelet Transforms',
          folder: '7th SEM/11. Wavelet Transforms',
          combinedPdf: 'PE-EC703C_Wavelet_Transforms.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Continuous Wavelet Transform (CWT) Foundations', file: 'PE-EC703C_Module1_Notes.pdf' },
            { number: 2, name: 'Discrete Wavelet Transform (DWT) & Multiresolution', file: 'PE-EC703C_Module2_Notes.pdf' },
            { number: 3, name: 'Filter Banks & Subband Decomposition', file: 'PE-EC703C_Module3_Notes.pdf' },
            { number: 4, name: 'Orthogonal & Biorthogonal Wavelet Families', file: 'PE-EC703C_Module4_Notes.pdf' },
            { number: 5, name: 'Wavelet Packets & Time-Frequency Localization', file: 'PE-EC703C_Module5_Notes.pdf' },
            { number: 6, name: 'Signal Denoising & Wavelet Thresholding', file: 'PE-EC703C_Module6_Notes.pdf' },
            { number: 7, name: 'Image Compression & Wavelet Applications', file: 'PE-EC703C_Module7_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC704C',
          name: 'Entrepreneurship',
          folder: '7th SEM/12. Entrepreneurship',
          combinedPdf: 'OE-EC704C_Entrepreneurship.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Entrepreneurship Dynamics & Mindset', file: 'OE-EC704C_Module1_Notes.pdf' },
            { number: 2, name: 'Opportunity Identification & Feasibility Studies', file: 'OE-EC704C_Module2_Notes.pdf' },
            { number: 3, name: 'Business Plan Formulation & Venture Capital', file: 'OE-EC704C_Module3_Notes.pdf' },
            { number: 4, name: 'Legal Forms, IP Rights & Enterprise Growth', file: 'OE-EC704C_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC704B',
          name: 'Optimization Technique',
          folder: '7th SEM/13. Optimization Technique',
          combinedPdf: 'OE-EC704B_Optimization_Technique.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to Optimization & Classical Methods', file: 'OE-EC704B_Module1_Notes.pdf' },
            { number: 2, name: 'Linear Programming & Simplex Method', file: 'OE-EC704B_Module2_Notes.pdf' },
            { number: 3, name: 'Duality & Transportation / Assignment Models', file: 'OE-EC704B_Module3_Notes.pdf' },
            { number: 4, name: 'Unconstrained Non-linear Programming', file: 'OE-EC704B_Module4_Notes.pdf' },
            { number: 5, name: 'Constrained Non-linear Optimization (KKT Conditions)', file: 'OE-EC704B_Module5_Notes.pdf' },
            { number: 6, name: 'Modern Meta-heuristic Optimization (GA, PSO)', file: 'OE-EC704B_Module6_Notes.pdf' }
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
        path: '8th SEM/sem8.pdf',
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
            { number: 1, name: 'Antenna Radiation Fundamentals & Parameters', file: 'PE-EC801A_Module1_Notes.pdf' },
            { number: 2, name: 'Dipoles, Monopoles & Loop Antennas', file: 'PE-EC801A_Module2_Notes.pdf' },
            { number: 3, name: 'Linear Antenna Arrays & Pattern Multiplication', file: 'PE-EC801A_Module3_Notes.pdf' },
            { number: 4, name: 'Broadband & Frequency Independent Antennas', file: 'PE-EC801A_Module4_Notes.pdf' },
            { number: 5, name: 'Aperture, Horn & Reflector Antennas', file: 'PE-EC801A_Module5_Notes.pdf' },
            { number: 6, name: 'Microstrip Patch Antennas', file: 'PE-EC801A_Module6_Notes.pdf' },
            { number: 7, name: 'Radio Wave Propagation (Ground, Sky & Space)', file: 'PE-EC801A_Module7_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC801B',
          name: 'Fiber Optic Communication',
          folder: '8th SEM/02. Fiber Optic Communication',
          combinedPdf: 'PE-EC801B_Fiber_Optic_Communication.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Optical Fiber Structure & Waveguiding Principles', file: 'PE-EC801B_Module1_Notes.pdf' },
            { number: 2, name: 'Signal Degradation (Attenuation & Dispersion)', file: 'PE-EC801B_Module2_Notes.pdf' },
            { number: 3, name: 'Optical Sources (LED & Semiconductor Lasers)', file: 'PE-EC801B_Module3_Notes.pdf' },
            { number: 4, name: 'Optical Detectors (PIN & APD) and Receivers', file: 'PE-EC801B_Module4_Notes.pdf' },
            { number: 5, name: 'Optical Link Design, WDM Networks & Amplifiers', file: 'PE-EC801B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC801C',
          name: 'Error Correcting Codes',
          folder: '8th SEM/03. Error Correcting Codes',
          combinedPdf: 'PE-EC801C_Error_Correcting_Codes.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Algebraic Foundations & Finite Fields (Galois Fields)', file: 'PE-EC801C_Module1_Notes.pdf' },
            { number: 2, name: 'Linear Block Codes & Syndrome Decoding', file: 'PE-EC801C_Module2_Notes.pdf' },
            { number: 3, name: 'Cyclic Codes & BCH Codes', file: 'PE-EC801C_Module3_Notes.pdf' },
            { number: 4, name: 'Reed-Solomon (RS) Codes & Decoding Algorithms', file: 'PE-EC801C_Module4_Notes.pdf' },
            { number: 5, name: 'Convolutional Codes, Viterbi Algorithm & Turbo Codes', file: 'PE-EC801C_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC802A',
          name: 'Mixed Signal Design',
          folder: '8th SEM/04. Mixed Signal Design',
          combinedPdf: 'PE-EC802A_Mixed_Signal_Design.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Sampling, Reconstruction & Sample-and-Hold Circuits', file: 'PE-EC802A_Module1_Notes.pdf' },
            { number: 2, name: 'Digital-to-Analog Converters (DAC) Architectures', file: 'PE-EC802A_Module2_Notes.pdf' },
            { number: 3, name: 'Analog-to-Digital Converters (ADC) Architectures', file: 'PE-EC802A_Module3_Notes.pdf' },
            { number: 4, name: 'Phase Locked Loops (PLL) & Clock Synthesizers', file: 'PE-EC802A_Module4_Notes.pdf' },
            { number: 5, name: 'Layout, Noise Coupling & Substrate Noise Isolation', file: 'PE-EC802A_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC802B',
          name: 'Industrial Automation and Control',
          folder: '8th SEM/05. Industrial Automation and Control',
          combinedPdf: 'PE-EC802B_Industrial_Automation_and_Control.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'Industrial Process Control & Actuators', file: 'PE-EC802B_Module1_Notes.pdf' },
            { number: 2, name: 'Programmable Logic Controllers (PLC) & Ladder Logic', file: 'PE-EC802B_Module2_Notes.pdf' },
            { number: 3, name: 'Supervisory Control and Data Acquisition (SCADA)', file: 'PE-EC802B_Module3_Notes.pdf' },
            { number: 4, name: 'Distributed Control Systems (DCS) Architecture', file: 'PE-EC802B_Module4_Notes.pdf' },
            { number: 5, name: 'Industrial Communication Buses (Modbus, Profibus, Fieldbus)', file: 'PE-EC802B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'PE-EC802C',
          name: 'VLSI Design Automation',
          folder: '8th SEM/06. VLSI Design Automation',
          combinedPdf: 'PE-EC802C_VLSI_Design_Automation.pdf',
          category: 'Professional Elective',
          modules: [
            { number: 1, name: 'VLSI CAD Design Flow & Algorithmic Graph Theory', file: 'PE-EC802C_Module1_Notes.pdf' },
            { number: 2, name: 'Logic Synthesis & Technology Mapping (Dagon)', file: 'PE-EC802C_Module2_Notes.pdf' },
            { number: 3, name: 'High-Level Synthesis (HLS), Scheduling & Allocation', file: 'PE-EC802C_Module3_Notes.pdf' },
            { number: 4, name: 'Physical Design: Partitioning & Floorplanning', file: 'PE-EC802C_Module4_Notes.pdf' },
            { number: 5, name: 'Placement, Global Routing & Clock Tree Synthesis', file: 'PE-EC802C_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC803A',
          name: 'Internet of Things',
          folder: '8th SEM/07. Internet of Things',
          combinedPdf: 'OE-EC803A_Internet_of_Things.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'IoT Architecture, Protocols & IoT Levels', file: 'OE-EC803A_Module1_Notes.pdf' },
            { number: 2, name: 'Sensors, Actuators & Microcontroller End-Points (ESP32)', file: 'OE-EC803A_Module2_Notes.pdf' },
            { number: 3, name: 'IoT Communication Protocols (MQTT, CoAP, HTTP, BLE)', file: 'OE-EC803A_Module3_Notes.pdf' },
            { number: 4, name: 'IoT Cloud Platforms & Storage Architecture', file: 'OE-EC803A_Module4_Notes.pdf' },
            { number: 5, name: 'Data Analytics & Edge Computing in IoT', file: 'OE-EC803A_Module5_Notes.pdf' },
            { number: 6, name: 'IoT Security, Privacy & Smart City Applications', file: 'OE-EC803A_Module6_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC803B',
          name: 'Big Data Analysis',
          folder: '8th SEM/08. Big Data Analysis',
          combinedPdf: 'OE-EC803B_Big_Data_Analysis.pdf',
          category: 'Open Elective',
          modules: [
            { number: 0, name: 'Big Data Foundations & Hadoop Ecosystem', file: 'OE-EC803B_Module0_Notes.pdf' },
            { number: 1, name: 'Hadoop Distributed File System (HDFS) & Architecture', file: 'OE-EC803B_Module1_Notes.pdf' },
            { number: 2, name: 'MapReduce Paradigm & Execution Flow', file: 'OE-EC803B_Module2_Notes.pdf' },
            { number: 3, name: 'NoSQL Databases (MongoDB, Cassandra, HBase)', file: 'OE-EC803B_Module3_Notes.pdf' },
            { number: 4, name: 'Apache Spark, RDD & In-Memory Computing', file: 'OE-EC803B_Module4_Notes.pdf' },
            { number: 5, name: 'Stream Processing, Kafka & Big Data Analytics', file: 'OE-EC803B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC803C',
          name: 'Cyber Security',
          folder: '8th SEM/09. Cyber Security',
          combinedPdf: 'OE-EC803C_Cyber_Security.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Cyber Threats, Threat Actors & Attack Surfaces', file: 'OE-EC803C_Module1_Notes.pdf' },
            { number: 2, name: 'Applied Cryptography, Hashes & Digital Signatures', file: 'OE-EC803C_Module2_Notes.pdf' },
            { number: 3, name: 'Network Security, Firewalls & IDS/IPS', file: 'OE-EC803C_Module3_Notes.pdf' },
            { number: 4, name: 'Cyber Law, Incident Response & Information Security Standards', file: 'OE-EC803C_Module4_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC804A',
          name: 'Artificial Intelligence',
          folder: '8th SEM/10. Artificial Intelligence',
          combinedPdf: 'OE-EC804A_Artificial_Intelligence.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'AI Foundations & Intelligent Agents', file: 'OE-EC804A_Module1_Notes.pdf' },
            { number: 2, name: 'Problem Solving & Uninformed / Informed Search (A*)', file: 'OE-EC804A_Module2_Notes.pdf' },
            { number: 3, name: 'Adversarial Search & Game Playing (Minimax, Alpha-Beta)', file: 'OE-EC804A_Module3_Notes.pdf' },
            { number: 4, name: 'Knowledge Representation & First Order Logic', file: 'OE-EC804A_Module4_Notes.pdf' },
            { number: 5, name: 'Probabilistic Reasoning & Bayesian Networks', file: 'OE-EC804A_Module5_Notes.pdf' },
            { number: 6, name: 'Machine Learning Basics, Reinforcement Learning & Applications', file: 'OE-EC804A_Module6_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC804B',
          name: 'Microwave Integrated Circuits',
          folder: '8th SEM/11. Microwave Integrated Circuits',
          combinedPdf: 'OE-EC804B_Microwave_Integrated_Circuits.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Planar Transmission Lines for MICs (Microstrip, Coplanar)', file: 'OE-EC804B_Module1_Notes.pdf' },
            { number: 2, name: 'Hybrid & Monolithic (MMIC) Technologies & Materials', file: 'OE-EC804B_Module2_Notes.pdf' },
            { number: 3, name: 'Passive Elements, Discontinuities & Impedance Matching', file: 'OE-EC804B_Module3_Notes.pdf' },
            { number: 4, name: 'Active Devices for MMIC (MESFET, HEMT, HBT)', file: 'OE-EC804B_Module4_Notes.pdf' },
            { number: 5, name: 'MIC Amplifiers, Oscillators & Packaging Techniques', file: 'OE-EC804B_Module5_Notes.pdf' }
          ]
        },
        {
          code: 'OE-EC804C',
          name: 'Organizational Behavior',
          folder: '8th SEM/12. Organizational Behavior',
          combinedPdf: 'OE-EC804C_Organizational_Behavior.pdf',
          category: 'Open Elective',
          modules: [
            { number: 1, name: 'Introduction to OB & Individual Behavior Models', file: 'OE-EC804C_Module1_Notes.pdf' },
            { number: 2, name: 'Personality, Perception, Attitudes & Motivation Theories', file: 'OE-EC804C_Module2_Notes.pdf' },
            { number: 3, name: 'Group Dynamics, Teamwork & Interpersonal Communication', file: 'OE-EC804C_Module3_Notes.pdf' },
            { number: 4, name: 'Leadership, Conflict Resolution & Organizational Culture', file: 'OE-EC804C_Module4_Notes.pdf' }
          ]
        }
      ]
    }
  ];

  return {
    META,
    SEMESTERS
  };
})();

// Export for module or global use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AcademicCatalog;
}
