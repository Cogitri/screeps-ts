export default {
  GITLAB_ENV_VAR: "SCREEPS_MASTER_DEPLOY",
  GITLAB_API_URL:
    process.env.NODE_ENV === "production"
      ? "https://gitlab.iue.fh-kiel.de/api/v4/projects/659/pipeline?ref=master"
      : "/api/v4/projects/659/pipeline?ref=master",
};
