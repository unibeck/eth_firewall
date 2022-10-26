export default {
    files: ['test/**', '!test/**/{fixtures,helpers}/**'],
    ignoredByWatcher: ['{coverage,docs,media,test-types,test-tap}/**'],
    typescript: {
        rewritePaths: {
            "src/": "build/"
        },
        compile: false
    },
};
