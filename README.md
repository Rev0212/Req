# Req Extract - AI-Powered Requirements Management System

## Overview
An advanced requirements engineering tool that leverages AI to automate and streamline the requirement gathering, analysis, and documentation process.

## Problem Statement & Pain Points
### Current Challenges
- Manual requirement documentation is time-consuming and error-prone.
- Inconsistent requirement formats across teams.
- Difficulty in prioritizing requirements effectively.
- Missing critical requirements due to human oversight.
- Inefficient collaboration between stakeholders.

## Solution Approach
Our system addresses these challenges through AI-powered automation and standardization.

## Features
### 1. Multi-Source Input Processing
- Document Upload (PDF, DOCX, XLS)
- Web Page Content Extraction
- Direct Text Input
- Email Integration
- Meeting Minutes Parser

### 2. AI-Powered Analysis
- Automatic Requirement Extraction
- Ambiguity Detection
- Requirement Classification (Functional/Non-Functional)
- Real-time Suggestions
- Completeness Check

### 3. Collaborative Features
- Multi-user Editing
- Real-time Updates
- Comment System
- Version Control
- Change Tracking

### 4. Smart Prioritization
- MoSCoW Method Implementation
- Automated Priority Suggestions
- Dependency Analysis
- Impact Assessment

### 5. Export & Integration
- Standard Document Generation
- JIRA Integration
- Excel Export
- PDF Generation
- Custom Template Support

## Technical Architecture
### Frontend (React + Vite)
```
/src
├── components/
│   ├── Dashboard/
│   ├── RequirementInput/
│   ├── ExtractionReview/
│   ├── Prioritization/
│   └── DocumentGeneration/
├── pages/
├── services/
└── utils/
```

### Backend
```
/backend
├── api/
│   ├── routes/
│   ├── models/
│   └── services/
├── ml/
│   ├── extractors/
│   ├── analyzers/
│   └── models/
└── utils/
```

### Integration
```
/integration
├── services/
│   ├── jira/
│   ├── confluence/
│   └── email/
├── templates/
└── utils/
```

## Getting Started
### Prerequisites
- Node.js & npm (for frontend)
- Python & pip (for backend ML models)
- MongoDB/PostgreSQL (for database)

### Installation
```sh
# Clone the repository
git clone https://github.com/your-repo/ai-requirements-mgmt.git
cd ai-requirements-mgmt

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

### Running the Project
```sh
# Start the frontend
cd frontend
npm run dev

# Start the backend
cd ../backend
python app.py
```

## Contribution
We welcome contributions! Please create a pull request or open an issue.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

