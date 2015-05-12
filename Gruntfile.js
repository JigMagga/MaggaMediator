module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect:{
            maggamediator :{
                port:8080,
                base: "public"
            }
        }
    });

    grunt.loadNpmTasks('grunt-connect');

    grunt.registerTask('default',['connect']);
};