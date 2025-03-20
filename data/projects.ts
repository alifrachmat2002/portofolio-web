    
export interface Project {
        title: string;
        shortDescription: string;
        longDescription: string;
        images: string[];
        techStack: string[];
        liveUrl?: string;
        repoUrl: string;
        year: string;
    }

export const PROJECTS: Record<string, Project> = {
    "anjab-abk": {
        title: "Anjab ABK",
        shortDescription:
            "A web application to conduct Analisis Jabatan and Analisis Beban Kerja in Universitas Diponegoro.",
        longDescription: `
        Anjab ABK is a comprehensive web application developed for Universitas Diponegoro to streamline and digitize their Analisis Jabatan (Job Analysis) and Analisis Beban Kerja (Workload Analysis) processes.
        
        The system allows administrators to create and manage job positions, define job requirements, and analyze workload distribution across departments. Users can input their daily tasks, which are then automatically calculated to determine appropriate number of employees for each job/position.
        
        Key features include:
        • Automated number of employees per job/position calculation based on task input
        • Comprehensive reporting and analytics dashboard
        • Role-based access control for different user types
        • Document generation for official job analysis reports
        `,
        images: [
            "/images/anjab-abk/dashboard.png",
            "/images/anjab-abk/buat_ajuan.png",
            "/images/anjab-abk/info_jab.png",
            "/images/anjab-abk/isi_abk.png",
            "/images/anjab-abk/peta_jabatan.png",
        ],
        techStack: [
            "Laravel",
            "PHP",
            "MySQL",
            "JavaScript",
            "Bootstrap",
            "jQuery",
            "HTML",
            "CSS",
        ],
        repoUrl: "https://github.com/alifrachmat2002/anjab-abk",
        year: "2024",
    },
    "e-office": {
        title: "E-Office",
        shortDescription:
            "A prototype for automatic task recording for Universitas Diponegoro.",
        longDescription: `
        E-Office is a prototype application designed to automate task recording and management for administrative staff at Universitas Diponegoro.
        
        The system provides a digital solution for tracking daily tasks, managing documents, and generating reports on productivity and task completion. It aims to replace manual paper-based processes with an efficient digital workflow.
        
        Key features include:
        • task tracking based on Anjab-ABK
        • Document management system with versioning
        • Approval workflows for administrative processes
        • Calendar for scheduling 
        `,
        images: [
            "/images/e-office/1.png",
            "/images/e-office/2.png",
            "/images/e-office/3.png",
            "/images/e-office/4.png",
            "/images/e-office/5.png",
        ],
        techStack: [
            "Laravel",
            "PHP",
            "MySQL",
            "JavaScript",
            "Bootstrap",
            "jQuery",
            "HTML",
            "CSS",
        ],
        repoUrl: "https://github.com/nadhiflazuardi/e-office-undip",
        year: "2024",
    },
    mhsc: {
        title: "MHSC (Mental Health Screening)",
        shortDescription:
            "Web application to conduct mental health screenings in Psychology Faculty of Universitas Diponegoro.",
        longDescription: `
        MHSC (Mental Health Screening) is a web application developed for the Psychology Faculty of Universitas Diponegoro to facilitate mental health assessments and screenings.
        
        The platform provides a secure environment for employees and students to complete standardized psychological assessments (GHQ-12, DASS-21, HSCL-25, HTQ), while giving faculty members tools to analyze results and identify employees and students who may need additional support.
        
        Key features include:
        • Standardized psychological assessment forms
        • Secure and anonymous data collection
        • Automated scoring and preliminary analysis
        • Dashboard for faculty to monitor aggregate mental health trends
        • Referral system for connecting students with appropriate resources
        • Data visualization tools for research purposes
        `,
        images: [
            "/images/mhsc/dashboard.png",
            "/images/mhsc/test.png",
            "/images/mhsc/test-finished.png",
            "/images/mhsc/rekap-1.png",
            "/images/mhsc/rekap-2.png",
            "/images/mhsc/rekap-3.png",
        ],
        techStack: [
            "Laravel",
            "PHP",
            "MySQL",
            "JavaScript",
            "Bootstrap",
            "jQuery",
            "HTML",
            "CSS",
        ],
        liveUrl: "https://mhsc-psikologi.apps.undip.ac.id/",
        repoUrl: "https://github.com/alifrachmat2002/psi-test",
        year: "2024",
    },
};