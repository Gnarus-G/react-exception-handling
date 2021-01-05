module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/importJestDom.ts'],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.test.json"
        }
    },
};