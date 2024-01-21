const insights = {
  insights: [
    "Use a newer version of pandocfilters",
    "Use pathlib instead of pathvalidate",
    "Use albumentations-pytorch instead of albumentations",
  ],
  replacements: {
    pandocfilters: "pandocfilters==1.5.0",
    pathvalidate: "pathlib",
    albumentations: "albumentations-pytorch",
  },
  general_suggestions: [
    "Use a package manager to keep your packages up to date",
    "Use a linting tool to check for potential security vulnerabilities",
    "Use a testing framework to catch bugs early",
  ],
  other_suggestions: [
    "Use a dependency graph to visualize your dependencies",
    "Use a security scanner to identify potential vulnerabilities",
    "Use a sandbox to run untrusted code",
  ],
};
// const vulnerabilities = {
//   answer: "Reusability, Consistency, and Documentation",
//   follow_up: [
//     "What are some examples of good Python packages?",
//     "What are some bad Python packages?",
//     "How do I find good Python packages?",
//   ],
// };
export default insights;
