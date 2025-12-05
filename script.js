const careerData = {
  tech: {
    title: "TECHNOLOGY & SOFTWARE DEVELOPMENT",
    description:
      "Build innovative solutions with cutting-edge technology. Roles include Software Engineer, Data Scientist, Cloud Architect, and AI/ML Specialist.",
    skills: ["programming", "data_analysis"],
    interests: ["tech"],
    salary: ["entry", "mid", "senior"],
  },
  finance: {
    title: "FINANCE & INVESTMENT BANKING",
    description:
      "Manage financial portfolios and investments. Roles include Financial Analyst, Investment Banker, Quantitative Analyst, and Wealth Manager.",
    skills: ["data_analysis"],
    interests: ["finance"],
    salary: ["mid", "senior"],
  },
  healthcare: {
    title: "HEALTHCARE & BIOTECH",
    description:
      "Improve healthcare outcomes. Roles include Healthcare Consultant, Clinical Data Analyst, Medical Device Developer, and Healthcare Manager.",
    skills: ["data_analysis", "communication"],
    interests: ["healthcare"],
    salary: ["mid", "senior"],
  },
  business: {
    title: "BUSINESS & MANAGEMENT",
    description:
      "Drive organizational growth and strategy. Roles include Management Consultant, Product Manager, Business Analyst, and Operations Manager.",
    skills: ["leadership", "project_management", "communication"],
    interests: ["business"],
    salary: ["mid", "senior"],
  },
  creative: {
    title: "DESIGN & CREATIVE INDUSTRIES",
    description:
      "Express creativity through design. Roles include UX/UI Designer, Graphic Designer, Content Strategist, and Creative Director.",
    skills: ["design", "communication"],
    interests: ["tech"],
    salary: ["entry", "mid"],
  },
  education: {
    title: "EDUCATION & RESEARCH",
    description:
      "Shape the future through teaching and research. Roles include Educator, Researcher, Curriculum Developer, and Education Technology Specialist.",
    skills: ["communication", "leadership"],
    interests: ["education"],
    salary: ["mid", "senior"],
  },
  sustainability: {
    title: "ENVIRONMENTAL & SUSTAINABILITY",
    description:
      "Make a positive environmental impact. Roles include Sustainability Consultant, Environmental Engineer, and ESG Analyst.",
    skills: ["data_analysis", "project_management"],
    interests: ["environment"],
    salary: ["mid", "senior"],
  },
};

let currentSection = 1;
let selectedSkills = [];
let selectedInterests = [];

function updateProgress() {
  const progress = (currentSection / 3) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  for (let i = 1; i <= 3; i++) {
    const step = document.getElementById("step" + i);
    step.classList.remove("active", "completed");
    if (i < currentSection) {
      step.classList.add("completed");
    } else if (i === currentSection) {
      step.classList.add("active");
    }
  }
}

function nextSection() {
  if (currentSection === 1 && !validateSection1()) return;
  if (currentSection === 2 && !validateSection2()) return;
  if (currentSection === 3 && !validateSection3()) return;

  if (currentSection < 3) {
    document
      .getElementById("section" + currentSection)
      .classList.remove("active");
    currentSection++;
    document.getElementById("section" + currentSection).classList.add("active");
    updateProgress();
  }
}

function prevSection() {
  if (currentSection > 1) {
    document
      .getElementById("section" + currentSection)
      .classList.remove("active");
    currentSection--;
    document.getElementById("section" + currentSection).classList.add("active");
    updateProgress();
  }
}

function validateSection1() {
  const name = document.getElementById("name").value.trim();
  const university = document.getElementById("university").value.trim();
  const major = document.getElementById("major").value.trim();
  const year = document.getElementById("year").value;
  const email = document.getElementById("email").value.trim();
  const bio = document.getElementById("bio").value.trim();

  if (!name || !university || !major || !year || !email || !bio) {
    alert("Please fill in all fields");
    return false;
  }
  return true;
}

function validateSection2() {
  if (selectedSkills.length === 0) {
    alert("Please select at least one skill");
    return false;
  }
  if (selectedInterests.length === 0) {
    alert("Please select at least one career interest");
    return false;
  }
  return true;
}

function validateSection3() {
  const environment = document.getElementById("environment").value;
  const salary = document.getElementById("salary").value;
  const goals = document.getElementById("goals").value.trim();

  if (!environment || !salary || !goals) {
    alert("Please fill in all fields");
    return false;
  }
  return true;
}

function trackSkills() {
  selectedSkills = [];
  for (let i = 1; i <= 6; i++) {
    const checkbox = document.getElementById("skill" + i);
    if (checkbox.checked) {
      selectedSkills.push(checkbox.value);
    }
  }
}

function trackInterests() {
  selectedInterests = [];
  for (let i = 1; i <= 6; i++) {
    const checkbox = document.getElementById("interest" + i);
    if (checkbox.checked) {
      selectedInterests.push(checkbox.value);
    }
  }
}

function calculateMatchScore(career) {
  let score = 0;
  let maxScore = 0;

  maxScore += career.skills.length;
  career.skills.forEach((skill) => {
    if (selectedSkills.includes(skill)) score++;
  });

  maxScore += career.interests.length;
  career.interests.forEach((interest) => {
    if (selectedInterests.includes(interest)) score++;
  });

  return Math.round((score / maxScore) * 100);
}

function generateRecommendations() {
  if (!validateSection3()) return;

  const selectedSalary = document.getElementById("salary").value;
  const recommendations = [];

  for (const [key, career] of Object.entries(careerData)) {
    const matchScore = calculateMatchScore(career);
    if (matchScore > 0 && career.salary.includes(selectedSalary)) {
      recommendations.push({
        key,
        ...career,
        matchScore,
      });
    }
  }

  recommendations.sort((a, b) => b.matchScore - a.matchScore);

  displayResults(recommendations);
}

function displayResults(recommendations) {
  document
    .getElementById("section" + currentSection)
    .classList.remove("active");
  document.getElementById("resultsSection").classList.add("show");

  const container = document.getElementById("recommendationsContainer");
  container.innerHTML = "";

  recommendations.forEach((rec, index) => {
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";
    resultCard.innerHTML = `
                    <div class="match-score">${rec.matchScore}% MATCH</div>
                    <h3>${index + 1}. ${rec.title}</h3>
                    <p>${rec.description}</p>
                `;
    container.appendChild(resultCard);
  });

  updateProgress();
}

function resetApp() {
  currentSection = 1;
  selectedSkills = [];
  selectedInterests = [];

  document.getElementById("profileForm").reset();
  document.getElementById("skillsForm").reset();
  document.getElementById("goalsForm").reset();

  document.getElementById("resultsSection").classList.remove("show");
  document.getElementById("section1").classList.add("active");

  updateProgress();
}

function downloadResults() {
  const name = document.getElementById("name").value;
  const recommendations = document.getElementById(
    "recommendationsContainer"
  ).innerText;
  const text = `CAREER MENTOR REPORT\n\nSTUDENT: ${name}\n\nRECOMMENDATIONS:\n${recommendations}`;

  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", "career-mentor-report.txt");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

updateProgress();
