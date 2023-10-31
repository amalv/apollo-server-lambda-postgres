export function validateEnvVars(envVars: string[]) {
  envVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`${varName} is not defined`);
    }
  });
}
