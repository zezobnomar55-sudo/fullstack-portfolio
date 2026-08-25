require("dotenv").config();
const mongoose = require("mongoose");
const Profile = require("./models/Profile");
const Post = require("./models/Post");
const Skill = require("./models/Skill");
const Experience = require("./models/Experience");
const Message = require("./models/Message");
const User = require("./models/User");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB for seeding...");

    // Clear existing data
    await Profile.deleteMany({});
    await Post.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await User.deleteMany({});
    await Message.deleteMany({});

    // 1. Seed Profile
    await Profile.create({
      name: "Ziad Omar",
      role: "Full-Stack Engineer & Software Architect",
      bio: "Full-stack engineer building high-precision web architectures, scalable Node.js & Express backends, and modern reactive interfaces.",
      email: "zezobnomar55@gmail.com",
      github: "https://github.com/zezobnomar55-sudo",
      linkedin: "https://www.linkedin.com/in/ziad-omar-880571247",
      location: "Cairo, Egypt",
      avatar: "assets/ziad_profile.jpg",
    });
    console.log(" Profile Seeded");

    // 2. Seed Posts / Projects
    await Post.create([
      {
        title: "AURUM LUXURY STORE",
        excerpt: "High-performance modern e-commerce web application featuring dynamic category filtering, shopping cart drawer, and state management.",
        category: "E-Commerce",
        tags: ["React 19", "Vite", "Context API", "CSS Grid"],
        githubUrl: "https://github.com/zezobnomar55-sudo/ecommerce-project",
        liveUrl: "#",
        featured: true,
      },
      {
        title: "FULL-STACK CMS PLATFORM",
        excerpt: "Enterprise-grade Full-Stack MEAN application with live inline CMS capabilities, password-authenticated admin dashboard, and MongoDB inbox.",
        category: "Full-Stack & CMS",
        tags: ["Node.js", "Express.js", "MongoDB", "REST API"],
        githubUrl: "https://github.com/zezobnomar55-sudo/fullstack-portfolio",
        liveUrl: "#",
        featured: true,
      },
      {
        title: "OBSIDIAN FITNESS STORE",
        excerpt: "Athletic fitness gear and supplements store equipped with product catalogs, inventory categorization, and cart state persistence.",
        category: "Fitness E-Commerce",
        tags: ["JavaScript ES6+", "LocalStorage", "CSS Grid"],
        githubUrl: "https://github.com/zezobnomar55-sudo/gym-store",
        liveUrl: "#",
        featured: true,
      },
    ]);
    console.log(" Projects/Posts Seeded");

    // 3. Seed Skills
    await Skill.create([
      { name: "Node.js & Express", category: "Backend", level: 92 },
      { name: "MongoDB & Mongoose", category: "Database", level: 88 },
      { name: "React 19 & Angular 18", category: "Frontend", level: 90 },
      { name: "JavaScript (ES6+) & TypeScript", category: "Frontend", level: 95 },
      { name: "RESTful APIs & GraphQL", category: "Backend", level: 90 },
      { name: "Git, GitHub & CI/CD", category: "Tools & DevOps", level: 85 },
    ]);
    console.log(" Skills Seeded");

    // 4. Seed Experiences
    await Experience.create([
      {
        title: "Full-Stack Web Developer",
        company: "Freelance / Tech Projects",
        period: "2024 - Present",
        location: "Cairo, Egypt",
        description: "Architecting RESTful web services, building responsive single page applications, and implementing custom CMS solutions.",
        technologies: ["Node.js", "Express", "MongoDB", "React", "Angular"],
      },
      {
        title: "Frontend Engineering Specialist",
        company: "Web Development Projects",
        period: "2023 - 2024",
        location: "Cairo, Egypt",
        description: "Crafting pixel-perfect responsive user interfaces with modular CSS architectures and reactive state management.",
        technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Vite"],
      },
    ]);
    console.log(" Experiences Seeded");

    // 5. Seed Admin User
    await User.create({
      username: "admin",
      password: "adminpassword123",
      role: "admin",
    });
    console.log(" Admin User Seeded (username: admin, password: adminpassword123)");

    // 6. Seed Sample Message
    await Message.create({
      name: "Client Inquiry",
      email: "client@example.com",
      message: "Hello Ziad, we loved your portfolio! We would like to discuss a full-stack project with you.",
    });
    console.log(" Sample Message Seeded");

    console.log(" All 5 Modules Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error(" Error Seeding Data:", error);
    process.exit(1);
  }
};

seedData();
