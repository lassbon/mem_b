module.exports = function(grunt) {
    grunt.config.set('apidoc', {
        ACCIAPI: {
            src: "api/controllers/",
            dest: "apidoc/"
        }
    });
    grunt.loadNpmTasks('grunt-apidoc');
};