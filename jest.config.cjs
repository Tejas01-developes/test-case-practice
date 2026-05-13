const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset:"ts-jest",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  extensionsToTreatAsEsm:[".ts"],
  moduleNameMapper:{
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }  
};